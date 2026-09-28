"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { OpenLocationCode } from 'open-location-code';

// @ts-ignore
const olc = new OpenLocationCode();

const MapPicker = dynamic(() => import("../components/MapPicker"), {
  ssr: false,
  loading: () => <div className="map-fallback">Loading map...</div>
});

export default function PartnerSignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentLang, setCurrentLang] = useState<'en' | 'bn'>('en');
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    area: "",
    basePrice: "2",
    openTime: "09:00",
    closeTime: "18:00",
    services: ["B&W Laser", "A4"],
    ownerName: "",
    contactNumber: "",
    email: "",
    payoutMethod: "bKash",
    payoutAccount: "",
  });
  
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapTarget, setMapTarget] = useState<{lat: number, lng: number} | null>(null);
  const [locationName, setLocationName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [expectedPages, setExpectedPages] = useState(150);
  
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const skipSearchRef = useRef(false);
  const skipReverseAddressRef = useRef(false);
  const googleAddressRef = useRef("");

  const plusCode = location ? (olc as any).encode(location.lat, location.lng) : null;

  const handleCopy = () => {
    if (successId) {
      navigator.clipboard.writeText(successId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setLocation(prev => {
      if (prev?.lat === lat && prev?.lng === lng) return prev;
      return { lat, lng };
    });
  }, []);

  useEffect(() => {
    if (!location) return;

    setLocationName("Loading precise address...");
    
    const skipAddress = skipReverseAddressRef.current;
    skipReverseAddressRef.current = false;
    
    const timeoutId = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1&email=hello@printpanda.app`)
        .then(res => {
          if (res.status === 429) throw new Error("Rate limited by mapping provider");
          return res.json();
        })
        .then(data => {
          if (data && data.address) {
            if (skipAddress) {
              setLocationName(googleAddressRef.current || data.display_name || "");
              setFormData(prev => ({
                ...prev,
                city: data.address.city || data.address.town || data.address.state || prev.city,
                area: data.address.suburb || data.address.neighbourhood || data.address.county || prev.area
              }));
              googleAddressRef.current = "";
            } else {
              setLocationName(data.display_name || "");
              setFormData(prev => ({
                ...prev,
                address: data.display_name || prev.address,
                city: data.address.city || data.address.town || data.address.state || prev.city,
                area: data.address.suburb || data.address.neighbourhood || data.address.county || prev.area
              }));
            }
          } else {
            throw new Error("Invalid address format returned");
          }
        })
        .catch(err => {
          console.error("Geocoding error:", err);
          setLocationName(`Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`);
        });
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [location]);

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }
    
    if (formData.address.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    
    setIsSearching(true);
    setShowDropdown(true);
    const timer = setTimeout(() => {
      fetch(`https://places.googleapis.com/v1/places:autocomplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "",
        },
        body: JSON.stringify({
          input: formData.address,
          includedRegionCodes: ["BD"],
          languageCode: "en"
        })
      })
        .then(res => res.json())
        .then(data => {
          const results = data.suggestions ? data.suggestions.map((s: any) => ({
            placeId: s.placePrediction.placeId,
            display_name: s.placePrediction.text.text
          })) : [];
          setSearchResults(results);
          setIsSearching(false);
        })
        .catch(err => {
          console.error("Search error:", err);
          setIsSearching(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.address]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
        if (!successId) setShowCompletion(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [successId]);

  const handleResultSelect = (item: any) => {
    skipSearchRef.current = true;
    setFormData(prev => ({...prev, address: item.display_name}));
    setSearchResults([]);
    setShowDropdown(false);
    
    fetch(`https://places.googleapis.com/v1/places/${item.placeId}?fields=location,formattedAddress`, {
      headers: {
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.location) {
          skipReverseAddressRef.current = true;
          googleAddressRef.current = data.formattedAddress || item.display_name;
          setMapTarget({ lat: data.location.latitude, lng: data.location.longitude });
        }
      })
      .catch(err => console.error("Place details error:", err));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedId = '';
    for (let i = 0; i < 12; i++) {
      generatedId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedId,
          name: formData.name,
          address: formData.address,
          city: formData.city,
          area: formData.area,
          latitude: location?.lat,
          longitude: location?.lng,
          plusCode: plusCode,
          openTime: formData.openTime,
          closeTime: formData.closeTime,
          services: formData.services,
          basePrice: parseFloat(formData.basePrice),
          ownerName: formData.ownerName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          payoutMethod: formData.payoutMethod,
          payoutAccount: formData.payoutAccount
        })
      });

      if (!response.ok) throw new Error("Failed to create store");
      setSuccessId(generatedId);
      setShowCompletion(true);
    } catch (err) {
      alert("Error creating store: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.ownerName || !formData.contactNumber || !formData.email) {
        alert(currentLang === 'bn' ? "অনুগ্রহ করে সব তথ্য দিন" : "Please fill in all required fields.");
        return;
      }
    } else if (currentStep === 1) {
      if (!formData.address || !formData.city || !formData.area || !location) {
        alert(currentLang === 'bn' ? "অনুগ্রহ করে লোকেশন নিশ্চিত করুন" : "Please confirm your location details and place the pin on the map.");
        return;
      }
    }
    
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (!formData.basePrice) {
        alert("Please set a base price.");
        return;
      }
      handleSubmit();
    }
  };

  const monthlyProfit = Math.round((expectedPages * 18500 / 150) / 100) * 100;
  
  const copyMap = {
    en: {
      network:'INKO PARTNER NETWORK', headline:'Turn your print shop into an online order hub.', lead:'A guided setup for your shop profile, service area, equipment and payouts — designed to finish in a few focused steps.',
      benefit1:'Keep your printers', benefit1sub:'Tell us what each machine can handle.', benefit2:'Pin the shop door', benefit2sub:'Help customers reach the right counter.', benefit3:'Choose your payout', benefit3sub:'Add bKash, Nagad or bank details.',
      earningsTitle:'Live earnings estimator', estimateBadge:'LIVE ESTIMATE', sliderLabel:'Drag to set your expected extra daily volume', estimateNote:'Illustrative planning estimate based on the example earnings rate.',
      afterSignup:'AFTER SIGNUP', journey1:'Download the desktop agent', journey2:'Pair it with your store key', journey3:'Run a test print and go online',
      step1small:'STEP 1', step1:'Shop', step2small:'STEP 2', step2:'Location', step3small:'STEP 3', step3:'Capabilities',
      shopTitle:'Let’s start with your shop.', shopIntro:'Only the details customers and the partner team need.', shopName:'Shop name', ownerName:'Owner / manager name', phone:'Mobile or WhatsApp number', phoneHint:'Used for OTP login and important order alerts.', email:'Email address', emailHint:'For account updates and support.', hours:'Regular opening hours',
      locationTitle:'Place the pin at your shop door.', locationIntro:'Search anywhere in Bangladesh, then drag the pin for a precise pickup point.', address:'Shop address', mapHint:'Tap the map to place your pin', city:'City', area:'Area',
      capTitle:'What can your shop handle?', capIntro:'These choices help route the right orders to you.', printers:'Printer setup', chooseAll:'Choose all that apply', bwLaser:'B&W Laser', colorInk:'Color Inkjet', colorLaser:'Color Laser', services:'Paper & finishing', chooseAll2:'Choose all that apply', spiral:'Spiral binding', lamination:'Lamination', basePrice:'B&W price per A4 page', payout:'Preferred payout', bank:'Bank', review:'You’ll review payout details and verify your phone before the shop goes live.', payoutAcc: 'Account Number',
      back:'Back', continue:'Continue', preview:'Register', microcopy:'You can review everything before registering.',
      progress:['Your shop profile','Your pickup location','Equipment & payout'], count:'Step {n} of 3',
      
      confirmTitle: 'Ready to register?',
      confirmText: 'Click below to finalize your shop registration and generate your unique Store Key.',
      storeKeyPreview: 'STORE KEY PREVIEW',
      registerBtn: 'Register & Download Desktop Agent',
      registering: 'Registering...',
      close: 'Back to wizard',
      successTitle: 'Store Created!',
      successText: 'Your store is now live on the network. Install the agent and use this Store Key to pair it.',
      yourStoreKey: 'YOUR STORE KEY',
      downloadAgent: 'Download PrintPanda Agent (.exe)',
      goToDashboard: 'Go to Partner Dashboard'
    },
    bn: {
      network:'ইনকো পার্টনার নেটওয়ার্ক', headline:'আপনার প্রিন্ট শপকে অনলাইন অর্ডার হাবে পরিণত করুন।', lead:'দোকানের তথ্য, লোকেশন, মেশিন ও পেমেন্ট — কয়েকটি সহজ ধাপে সব সেটআপ করুন।',
      benefit1:'বর্তমান প্রিন্টারই রাখুন', benefit1sub:'কোন মেশিনে কী করা যায়, জানিয়ে দিন।', benefit2:'দোকানের দরজায় পিন দিন', benefit2sub:'ক্রেতাকে সঠিক কাউন্টারে পৌঁছাতে সাহায্য করুন।', benefit3:'পেমেন্ট বেছে নিন', benefit3sub:'বিকাশ, নগদ বা ব্যাংক যোগ করুন।',
      earningsTitle:'লাইভ আয়ের হিসাব', estimateBadge:'লাইভ হিসাব', sliderLabel:'প্রতিদিনের সম্ভাব্য অতিরিক্ত পৃষ্ঠার সংখ্যা ঠিক করতে টানুন', estimateNote:'উদাহরণের আয়ের হার অনুযায়ী পরিকল্পনার জন্য আনুমানিক হিসাব।',
      afterSignup:'সাইনআপের পরে', journey1:'ডেস্কটপ এজেন্ট ডাউনলোড করুন', journey2:'স্টোর কী দিয়ে পেয়ার করুন', journey3:'টেস্ট প্রিন্ট করে অনলাইনে যান',
      step1small:'ধাপ ১', step1:'দোকান', step2small:'ধাপ ২', step2:'লোকেশন', step3small:'ধাপ ৩', step3:'সুবিধাসমূহ',
      shopTitle:'প্রথমে আপনার দোকানের তথ্য দিন।', shopIntro:'ক্রেতা ও পার্টনার টিমের প্রয়োজনীয় তথ্যই শুধু।', shopName:'দোকানের নাম', ownerName:'মালিক / ম্যানেজারের নাম', phone:'মোবাইল বা হোয়াটসঅ্যাপ নম্বর', phoneHint:'ওটিপি লগইন ও জরুরি অর্ডার আপডেটের জন্য।', email:'ইমেইল ঠিকানা', emailHint:'অ্যাকাউন্ট আপডেট ও সহায়তার জন্য।', hours:'সাধারণ খোলার সময়',
      locationTitle:'দোকানের দরজায় পিন বসান।', locationIntro:'বাংলাদেশের যেকোনো ঠিকানা খুঁজে সঠিক পিকআপ পয়েন্টে পিন টানুন।', address:'দোকানের ঠিকানা', mapHint:'পিন বসাতে ম্যাপে ট্যাপ করুন', city:'শহর', area:'এলাকা',
      capTitle:'আপনার দোকানে কী কী করা যায়?', capIntro:'এই তথ্য সঠিক অর্ডার আপনার দোকানে পাঠাতে সাহায্য করবে।', printers:'প্রিন্টার সেটআপ', chooseAll:'যা যা প্রযোজ্য বেছে নিন', bwLaser:'সাদা-কালো লেজার', colorInk:'কালার ইঙ্কজেট', colorLaser:'কালার লেজার', services:'কাগজ ও ফিনিশিং', chooseAll2:'যা যা প্রযোজ্য বেছে নিন', spiral:'স্পাইরাল বাইন্ডিং', lamination:'লেমিনেশন', basePrice:'প্রতি A4 সাদা-কালো পাতার দাম', payout:'পছন্দের পেমেন্ট', bank:'ব্যাংক', review:'দোকান লাইভ হওয়ার আগে পেমেন্টের তথ্য ও ফোন নম্বর যাচাই করা হবে।', payoutAcc: 'অ্যাকাউন্ট নম্বর',
      back:'পেছনে', continue:'এগিয়ে যান', preview:'রেজিস্টার করুন', microcopy:'রেজিস্টার করার আগে সব তথ্য দেখে নিতে পারবেন।',
      progress:['আপনার দোকানের তথ্য','আপনার পিকআপ লোকেশন','মেশিন ও পেমেন্ট'], count:'৩টির মধ্যে ধাপ {n}',

      confirmTitle: 'রেজিস্টার করতে প্রস্তুত?',
      confirmText: 'নিচে ক্লিক করে আপনার দোকানের রেজিস্ট্রেশন সম্পন্ন করুন এবং স্টোর কী তৈরি করুন।',
      storeKeyPreview: 'স্টোর কী প্রিভিউ',
      registerBtn: 'রেজিস্টার ও ডেস্কটপ এজেন্ট ডাউনলোড',
      registering: 'রেজিস্টার হচ্ছে...',
      close: 'উইজার্ডে ফিরে যান',
      successTitle: 'স্টোর তৈরি হয়েছে!',
      successText: 'আপনার দোকান এখন নেটওয়ার্কে লাইভ। এজেন্ট ইনস্টল করুন এবং পেয়ার করতে এই স্টোর কী ব্যবহার করুন।',
      yourStoreKey: 'আপনার স্টোর কী',
      downloadAgent: 'প্রিন্টপান্ডা এজেন্ট (.exe) ডাউনলোড',
      goToDashboard: 'পার্টনার ড্যাশবোর্ডে যান'
    }
  };
  const t = copyMap[currentLang];

  const Chip = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button type="button" className={`chip ${selected ? 'selected' : ''}`} onClick={onClick}>
      <span className="check">
        <svg viewBox="0 0 16 16" fill="none"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2"/></svg>
      </span>
      {label}
    </button>
  );

  return (
    <>
      <main className="page" style={{ fontFamily: currentLang === 'bn' ? '"Noto Sans Bengali", "DM Sans", sans-serif' : '"DM Sans", "Noto Sans Bengali", sans-serif' }}>
        <div className="utility" aria-label="Language selector">
          <div className="lang-toggle">
            <button type="button" onClick={() => setCurrentLang('en')} aria-pressed={currentLang === 'en'}>English</button>
            <button type="button" onClick={() => setCurrentLang('bn')} aria-pressed={currentLang === 'bn'}>বাংলা</button>
          </div>
        </div>

        <div className="layout">
          <aside className="story">
            <div className="network-label">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>{t.network}</span>
            </div>
            <h1>{t.headline}</h1>
            <p className="lead">{t.lead}</p>

            <div className="proof">
              <div className="proof-item">
                <div className="proof-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9V4h12v5M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg></div>
                <div><strong>{t.benefit1}</strong><span>{t.benefit1sub}</span></div>
              </div>
              <div className="proof-item">
                <div className="proof-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="2"/></svg></div>
                <div><strong>{t.benefit2}</strong><span>{t.benefit2sub}</span></div>
              </div>
              <div className="proof-item">
                <div className="proof-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h18v11H3zM7 7V5h10v2M7 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div><strong>{t.benefit3}</strong><span>{t.benefit3sub}</span></div>
              </div>
            </div>

            <section className="earnings">
              <div className="earnings-head">
                <h2 className="earnings-title">{t.earningsTitle}</h2>
                <span className="earnings-badge">{t.estimateBadge}</span>
              </div>
              <p className="earnings-copy">
                {currentLang === 'bn' ? (
                  <>ইনকোর মাধ্যমে প্রতিদিন <strong>{expectedPages.toLocaleString('bn-BD')} অতিরিক্ত পৃষ্ঠা</strong> প্রিন্ট করলে, আপনার আনুমানিক অতিরিক্ত মাসিক নিট লাভ <strong className="profit">৳ {monthlyProfit.toLocaleString('bn-BD')}।</strong></>
                ) : (
                  <>If you print <strong>{expectedPages.toLocaleString()} extra pages/day</strong> via Inko, your estimated additional monthly net profit is <strong className="profit">৳ {monthlyProfit.toLocaleString()}.</strong></>
                )}
              </p>
              <label className="earnings-note" htmlFor="dailyVolume">{t.sliderLabel}</label>
              <input className="earnings-slider" id="dailyVolume" type="range" min="25" max="300" step="25" value={expectedPages} onChange={(e) => setExpectedPages(Number(e.target.value))} />
              <div className="earnings-scale" aria-hidden="true">
                <span>25 pages</span><span>300 pages</span>
              </div>
              <p className="earnings-note">{t.estimateNote}</p>
            </section>

            <div className="journey">
              <div className="journey-title">{t.afterSignup}</div>
              <ol>
                <li><span className="num">1</span><span>{t.journey1}</span></li>
                <li><span className="num">2</span><span>{t.journey2}</span></li>
                <li><span className="num">3</span><span>{t.journey3}</span></li>
              </ol>
            </div>
          </aside>

          <section className="form-shell">
            <div className="progress-wrap">
              <div className="progress-head">
                <div className="progress-copy">{t.progress[currentStep]}</div>
                <div className="progress-count">{t.count.replace('{n}', String(currentStep + 1))}</div>
              </div>
              <div className="progress-line"><span style={{ width: `${(currentStep + 1) * 33.333}%` }}></span></div>
            </div>

            <nav className="steps">
              <button className={`step-tab ${currentStep === 0 ? 'active' : ''} ${currentStep > 0 ? 'complete' : ''}`} onClick={() => setCurrentStep(0)} type="button"><span>{t.step1small}</span><b>{t.step1}</b></button>
              <button className={`step-tab ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'complete' : ''}`} onClick={() => setCurrentStep(1)} type="button"><span>{t.step2small}</span><b>{t.step2}</b></button>
              <button className={`step-tab ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'complete' : ''}`} onClick={() => setCurrentStep(2)} type="button"><span>{t.step3small}</span><b>{t.step3}</b></button>
            </nav>

            <div className={`panel ${currentStep === 0 ? 'active' : ''}`}>
              <h2>{t.shopTitle}</h2>
              <p className="panel-intro">{t.shopIntro}</p>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="shopName">{t.shopName}</label>
                  <input id="shopName" type="text" placeholder={currentLang === 'bn' ? "যেমন: সিটি প্রিন্ট অ্যান্ড স্টেশনারি" : "e.g. City Print & Stationery"} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="field">
                  <label htmlFor="ownerName">{t.ownerName}</label>
                  <input id="ownerName" type="text" placeholder={currentLang === 'bn' ? "পুরো নাম" : "Full name"} value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} required />
                </div>
              </div>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="phone">{t.phone}</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 3H6a2 2 0 0 0-2 2c0 8.28 6.72 15 15 15a2 2 0 0 0 2-2v-2.5l-4-1-1.2 2c-2.45-1.05-4.7-3.3-5.75-5.75l2-1.2L11 3.5 8.5 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                    <input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} required />
                  </div>
                  <div className="hint">{t.phoneHint}</div>
                </div>
                <div className="field">
                  <label htmlFor="email">{t.email}</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <input id="email" type="email" placeholder="owner@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="hint">{t.emailHint}</div>
                </div>
              </div>
              <div className="field">
                <span className="field-label">{t.hours}</span>
                <div className="hours">
                  <input type="time" value={formData.openTime} onChange={(e) => setFormData({...formData, openTime: e.target.value})} required />
                  <span>—</span>
                  <input type="time" value={formData.closeTime} onChange={(e) => setFormData({...formData, closeTime: e.target.value})} required />
                </div>
              </div>
            </div>

            <div className={`panel ${currentStep === 1 ? 'active' : ''}`}>
              <h2>{t.locationTitle}</h2>
              <p className="panel-intro">{t.locationIntro}</p>
              <div className="field relative">
                <label htmlFor="address">{t.address}</label>
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  <input id="address" type="search" placeholder={currentLang === 'bn' ? "রাস্তা, মার্কেট বা ল্যান্ডমার্ক খুঁজুন" : "Search road, market or landmark"} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} onFocus={() => { if (searchResults.length > 0 || formData.address.length >= 3) setShowDropdown(true); }} onBlur={() => setTimeout(() => setShowDropdown(false), 150)} required />
                </div>
                {isSearching && (
                  <div className="absolute right-3 top-9 flex items-center pointer-events-none">
                    <span className="animate-spin h-4 w-4 border-2 border-[#0b7250] rounded-full border-t-transparent"></span>
                  </div>
                )}
                {showDropdown && (
                  <div className="absolute top-full left-0 z-[1000] mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                    {searchResults.length > 0 ? (
                      <ul className="max-h-60 overflow-auto m-0 p-0 list-none text-left">
                        {searchResults.map((result: any, i: number) => (
                          <li 
                            key={i} 
                            onMouseDown={() => handleResultSelect(result)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800 border-b border-gray-50 last:border-0"
                          >
                            {result.display_name}
                          </li>
                        ))}
                      </ul>
                    ) : formData.address.length >= 3 && !isSearching ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No results found.</div>
                    ) : null}
                  </div>
                )}
              </div>
              <div className="map-frame">
                <MapPicker onLocationSelect={handleLocationSelect} targetPosition={mapTarget} isActive={currentStep === 1} />
                <div className="map-chip">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="2"/></svg>
                  <span>{location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : t.mapHint}</span>
                </div>
              </div>
              <div className="location-details">
                <div className="field">
                  <label htmlFor="city">{t.city}</label>
                  <input id="city" type="text" placeholder={currentLang === 'bn' ? "যেমন: ঢাকা" : "e.g. Dhaka"} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                </div>
                <div className="field">
                  <label htmlFor="area">{t.area}</label>
                  <input id="area" type="text" placeholder={currentLang === 'bn' ? "যেমন: ধানমন্ডি" : "e.g. Dhanmondi"} value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} required />
                </div>
                <div className="field">
                  <span className="field-label">Plus Code</span>
                  <div className="location-readout"><strong>{plusCode || '—'}</strong></div>
                </div>
              </div>
            </div>

            <div className={`panel ${currentStep === 2 ? 'active' : ''}`}>
              <h2>{t.capTitle}</h2>
              <p className="panel-intro">{t.capIntro}</p>
              <div className="group">
                <div className="group-head"><span className="field-label">{t.printers}</span><span>{t.chooseAll}</span></div>
                <div className="chips">
                  <Chip label={t.bwLaser} selected={formData.services.includes("B&W Laser")} onClick={() => toggleService("B&W Laser")} />
                  <Chip label={t.colorInk} selected={formData.services.includes("Color Inkjet")} onClick={() => toggleService("Color Inkjet")} />
                  <Chip label={t.colorLaser} selected={formData.services.includes("Color Laser")} onClick={() => toggleService("Color Laser")} />
                </div>
              </div>
              <div className="group">
                <div className="group-head"><span className="field-label">{t.services}</span><span>{t.chooseAll2}</span></div>
                <div className="chips">
                  <Chip label="A4" selected={formData.services.includes("A4")} onClick={() => toggleService("A4")} />
                  <Chip label="Legal" selected={formData.services.includes("Legal")} onClick={() => toggleService("Legal")} />
                  <Chip label={t.spiral} selected={formData.services.includes("Spiral binding")} onClick={() => toggleService("Spiral binding")} />
                  <Chip label={t.lamination} selected={formData.services.includes("Lamination")} onClick={() => toggleService("Lamination")} />
                </div>
              </div>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="basePrice">{t.basePrice}</label>
                  <div className="input-wrap">
                    <span className="absolute left-[16px] top-[12px] font-bold text-[var(--muted)] pointer-events-none select-none text-[15px]">৳</span>
                    <input id="basePrice" type="number" min="0" placeholder="2.00" value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: e.target.value})} required />
                  </div>
                </div>
                <div className="field">
                  <span className="field-label">{t.payout}</span>
                  <div className="payouts">
                    {['bKash', 'Nagad', t.bank].map(method => (
                      <button key={method} type="button" className={`payout ${formData.payoutMethod === method ? 'selected' : ''}`} onClick={() => setFormData({...formData, payoutMethod: method})}>
                        {method}
                      </button>
                    ))}
                  </div>
                  {formData.payoutMethod && (
                    <div className="mt-2">
                      <input type="text" placeholder={t.payoutAcc} value={formData.payoutAccount} onChange={(e) => setFormData({...formData, payoutAccount: e.target.value})} />
                    </div>
                  )}
                </div>
              </div>
              <div className="review-strip">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 7v6M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span>{t.review}</span>
              </div>
            </div>

            <div className="actions">
              <button className="back" onClick={() => setCurrentStep(prev => prev - 1)} type="button" hidden={currentStep === 0}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>{t.back}</span>
              </button>
              <div className="microcopy">{t.microcopy}</div>
              <button className="next" onClick={handleNext} type="button" disabled={isSubmitting}>
                <span>{currentStep === 2 ? (isSubmitting ? t.registering : t.preview) : t.continue}</span>
                {!isSubmitting && <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            </div>
          </section>
        </div>

        {showCompletion && successId && (
          <div className="completion open" role="dialog" aria-modal="true" aria-labelledby="completeTitle">
            <div className="modal">
              <div className="success-mark"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              
              <h3 id="completeTitle">{t.successTitle}</h3>
              <p>{t.successText}</p>
              
              <div className="pairing !pb-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span>{t.yourStoreKey}</span>
                    <strong className="tracking-widest mt-1 text-[#0b7250]">{successId}</strong>
                  </div>
                  <button 
                    onClick={handleCopy} 
                    className="p-2 mb-1 bg-[#173d2d] rounded-lg text-[#75e5b6] hover:bg-[#2c3d33] transition-colors relative" 
                    title="Copy ID"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    {copied && <span className="absolute -top-8 -right-2 bg-[#173d2d] text-white text-xs px-2 py-1 rounded">Copied!</span>}
                  </button>
                </div>
              </div>
              
              {plusCode && (
                <p className="text-sm text-gray-400 mt-2 mb-6">
                  Plus Code: <strong className="text-gray-200 bg-[#1a2820] px-2 py-0.5 rounded ml-1">{plusCode}</strong>
                </p>
              )}
              
              <div className="flex flex-col gap-3 mt-4">
                <a 
                  href="https://github.com/bitarkik/Inko/releases/latest/download/PrintPanda-Agent-Setup.exe" 
                  className="w-full min-h-[46px] flex items-center justify-center border-0 rounded-[10px] bg-[#0b7250] text-white font-bold hover:bg-[#095f43] transition-colors"
                >
                  <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  {t.downloadAgent}
                </a>
                <button 
                  onClick={() => window.location.href = '/partner'} 
                  type="button" 
                  className="close-modal !bg-[#152019] border border-[#2c3d33] !text-[#edf7f0]"
                >
                  {t.goToDashboard}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          color-scheme: light dark;
          --bg: #edf4ef;
          --surface: #ffffff;
          --surface-2: #f4f8f5;
          --ink: #12211a;
          --muted: #56645d;
          --line: #d7e1da;
          --brand: #0b7250;
          --brand-2: #095f43;
          --brand-soft: #dff4e9;
          --lime: #b9ee65;
          --warm: #ffedc2;
          --shadow: 0 22px 60px rgba(20, 54, 39, .12);
          --danger: #9b351f;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0e1511;
            --surface: #152019;
            --surface-2: #1a2820;
            --ink: #edf7f0;
            --muted: #a9b8ae;
            --line: #2c3d33;
            --brand: #58d6a3;
            --brand-2: #75e5b6;
            --brand-soft: #173d2d;
            --lime: #aee762;
            --warm: #4b3c1e;
            --shadow: 0 26px 70px rgba(0, 0, 0, .35);
            --danger: #ff9d83;
          }
        }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          min-height: 100vh;
          background: linear-gradient(130deg, color-mix(in srgb, var(--brand-soft) 74%, transparent), transparent 38%), var(--bg);
          color: var(--ink);
          font-family: "DM Sans", "Noto Sans Bengali", sans-serif;
          line-height: 1.5;
        }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
        .page { width: min(1220px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 44px; }
        .utility { display: flex; justify-content: flex-end; margin-bottom: 14px; }
        .lang-toggle { display: inline-flex; padding: 4px; gap: 3px; background: color-mix(in srgb, var(--surface) 90%, transparent); border: 1px solid var(--line); border-radius: 999px; box-shadow: 0 8px 24px rgba(20, 54, 39, .07); }
        .lang-toggle button { border: 0; border-radius: 999px; background: transparent; color: var(--muted); padding: 7px 12px; font-weight: 700; font-size: 13px; }
        .lang-toggle button[aria-pressed="true"] { background: var(--ink); color: var(--surface); }
        .layout { display: grid; grid-template-columns: minmax(260px, .75fr) minmax(0, 1.55fr); gap: 20px; align-items: start; }
        .story { background: #0d6649; color: #fff; border-radius: 26px 10px 10px 26px; padding: clamp(28px, 5vw, 54px); position: relative; overflow: hidden; min-height: 720px; display: flex; flex-direction: column; }
        .story:before { content: ""; position: absolute; width: 260px; height: 260px; right: -150px; top: -95px; border: 55px solid rgba(185, 238, 101, .22); border-radius: 50%; }
        .story:after { content: ""; position: absolute; width: 150px; height: 150px; left: -90px; bottom: 95px; border: 34px solid rgba(255,255,255,.09); transform: rotate(23deg); }
        .network-label { display: inline-flex; gap: 8px; align-items: center; font-size: 13px; font-weight: 700; letter-spacing: .04em; margin-bottom: 34px; color: #d9f7e8; }
        .network-label svg { width: 18px; height: 18px; }
        .story h1 { font-size: clamp(34px, 4.2vw, 58px); line-height: 1.02; letter-spacing: -.045em; margin: 0 0 20px; max-width: 630px; }
        .story .lead { margin: 0; max-width: 540px; color: #d7eadf; font-size: 17px; }
        .proof { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 38px 0; }
        .proof-item { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: start; }
        .proof-icon { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.12); color: var(--lime); }
        .proof-icon svg { width: 18px; height: 18px; }
        .proof-item strong { display: block; font-size: 15px; }
        .proof-item span { display: block; font-size: 13px; color: #c9dfd2; margin-top: 2px; }
        .earnings { position: relative; z-index: 1; margin: 0 0 28px; padding: 18px; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; background: rgba(5, 53, 37, .36); }
        .earnings-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .earnings-title { margin: 0; font-size: 14px; color: #fff; }
        .earnings-badge { flex: 0 0 auto; padding: 4px 7px; border-radius: 5px; background: var(--lime); color: #163020; font-size: 10px; font-weight: 800; letter-spacing: .04em; }
        .earnings-copy { margin: 11px 0 14px; color: #d7eadf; font-size: 14px; line-height: 1.48; }
        .earnings-copy strong { color: #fff; font-size: 16px; }
        .earnings-copy .profit { color: var(--lime); }
        .earnings-slider { width: 100%; height: 24px; margin: 0; padding: 0; border: 0; background: transparent; accent-color: var(--lime); }
        .earnings-slider:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
        .earnings-slider::-webkit-slider-runnable-track { height: 5px; border-radius: 99px; background: rgba(255,255,255,.28); }
        .earnings-slider::-webkit-slider-thumb { width: 20px; height: 20px; margin-top: -7px; border: 3px solid #0d6649; border-radius: 50%; background: var(--lime); -webkit-appearance: none; }
        .earnings-slider::-moz-range-track { height: 5px; border-radius: 99px; background: rgba(255,255,255,.28); }
        .earnings-slider::-moz-range-thumb { width: 16px; height: 16px; border: 3px solid #0d6649; border-radius: 50%; background: var(--lime); }
        .earnings-scale { display: flex; justify-content: space-between; margin-top: 3px; color: #bdd7c8; font-size: 10px; }
        .earnings-note { margin: 10px 0 0; color: #bdd7c8; font-size: 10px; }
        .journey { margin-top: auto; position: relative; z-index: 1; padding-top: 26px; border-top: 1px solid rgba(255,255,255,.18); }
        .journey-title { font-size: 12px; color: #cbe1d4; font-weight: 700; margin-bottom: 14px; }
        .journey ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        .journey li { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 14px; }
        .journey .num { width: 25px; height: 25px; border-radius: 50%; display: grid; place-items: center; flex: 0 0 auto; background: var(--lime); color: #163020; font-size: 12px; font-weight: 800; }
        .form-shell { background: var(--surface); border: 1px solid var(--line); border-radius: 10px 26px 26px 10px; box-shadow: var(--shadow); overflow: hidden; min-width: 0; display: flex; flex-direction: column; }
        .progress-wrap { padding: 28px 34px 0; }
        .progress-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; }
        .progress-copy { font-size: 13px; color: var(--muted); }
        .progress-count { font-size: 13px; font-weight: 700; color: var(--brand); white-space: nowrap; }
        .progress-line { height: 5px; background: var(--surface-2); border-radius: 99px; margin-top: 12px; overflow: hidden; }
        .progress-line span { display: block; height: 100%; background: var(--brand); border-radius: inherit; transition: width .28s ease; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 22px 34px 0; }
        .step-tab { border: 0; background: transparent; color: var(--muted); text-align: left; padding: 0 0 13px; border-bottom: 2px solid var(--line); font-size: 13px; font-weight: 700; }
        .step-tab.active { color: var(--brand); border-color: var(--brand); }
        .step-tab.complete { color: var(--ink); }
        .step-tab span { display: block; font-weight: 500; opacity: .78; font-size: 11px; margin-top: 2px; }
        .panel { display: none; padding: 30px 34px 18px; flex: 1; }
        .panel.active { display: block; animation: panelIn .24s ease both; }
        @keyframes panelIn { from { opacity: .3; transform: translateY(5px); } }
        .panel h2 { margin: 0 0 6px; font-size: clamp(25px, 3vw, 34px); letter-spacing: -.03em; }
        .panel-intro { margin: 0 0 25px; color: var(--muted); font-size: 15px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .field { display: grid; gap: 7px; margin-bottom: 18px; }
        .field label, .field-label { font-size: 13px; font-weight: 700; color: var(--ink); }
        input, select { width: 100%; min-height: 48px; border: 1px solid var(--line); border-radius: 10px; background: var(--surface-2); color: var(--ink); padding: 0 13px; outline: none; }
        input:focus, select:focus { border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 16%, transparent); }
        input::placeholder { color: color-mix(in srgb, var(--muted) 75%, transparent); }
        .input-wrap { position: relative; }
        .input-wrap svg { position: absolute; width: 19px; height: 19px; left: 14px; top: 15px; color: var(--muted); pointer-events: none; }
        .input-wrap input { padding-left: 44px; }
        .hours { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; }
        .hours span { color: var(--muted); }
        .hint { font-size: 12px; color: var(--muted); margin-top: -1px; }
        .map-frame { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: var(--surface-2); position: relative; }
        .map-frame > div:first-child { width: 100%; height: 330px; z-index: 1; background: var(--surface-2); }
        .map-chip { position: absolute; z-index: 500; left: 12px; bottom: 12px; display: flex; align-items: center; gap: 7px; max-width: calc(100% - 24px); padding: 8px 11px; background: var(--surface); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,.12); font-size: 12px; font-weight: 700; }
        .map-chip svg { width: 16px; height: 16px; color: var(--brand); flex: 0 0 auto; }
        .location-details { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 14px; align-items: end; }
        .location-details .field { margin-bottom: 0; }
        .location-readout { min-height: 48px; display: flex; align-items: center; padding: 0 13px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 10px; }
        .location-readout strong { font-size: 13px; }
        .group { margin-bottom: 22px; }
        .group-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
        .group-head span:last-child { font-size: 12px; color: var(--muted); }
        .chips { display: flex; flex-wrap: wrap; gap: 9px; }
        .chip { border: 1px solid var(--line); background: var(--surface-2); color: var(--ink); border-radius: 999px; padding: 9px 13px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s; }
        .chip .check { width: 16px; height: 16px; border: 1.5px solid var(--muted); border-radius: 50%; display: grid; place-items: center; transition: all 0.2s; }
        .chip.selected { background: var(--brand-soft); color: var(--brand-2); border-color: color-mix(in srgb, var(--brand) 35%, var(--line)); }
        .chip.selected .check { background: var(--brand); border-color: var(--brand); color: #fff; }
        .chip .check svg { width: 11px; height: 11px; opacity: 0; }
        .chip.selected .check svg { opacity: 1; }
        .payouts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .payout { border: 1px solid var(--line); background: var(--surface-2); color: var(--ink); padding: 13px; border-radius: 11px; text-align: center; font-weight: 700; min-height: 48px; transition: all 0.2s; }
        .payout.selected { border-color: var(--brand); background: var(--brand-soft); color: var(--brand-2); }
        .review-strip { display: flex; gap: 10px; align-items: start; padding: 13px 14px; background: var(--warm); color: var(--ink); border-radius: 10px; margin-top: 20px; font-size: 13px; }
        .review-strip svg { width: 18px; height: 18px; flex: 0 0 auto; margin-top: 1px; color: #825e12; }
        .actions { padding: 18px 34px 28px; display: flex; justify-content: space-between; gap: 12px; align-items: center; border-top: 1px solid var(--line); background: color-mix(in srgb, var(--surface) 94%, var(--surface-2)); }
        .back, .next { border-radius: 10px; min-height: 48px; padding: 0 20px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 9px; }
        .back { border: 1px solid var(--line); background: transparent; color: var(--ink); }
        .back[hidden] { display: none; }
        .next { border: 0; background: var(--brand); color: #fff; margin-left: auto; min-width: 160px; transition: background 0.2s; }
        .next:hover { background: var(--brand-2); }
        .next svg, .back svg { width: 18px; height: 18px; }
        .microcopy { font-size: 11px; color: var(--muted); max-width: 210px; }
        .completion { position: fixed; inset: 0; z-index: 3000; background: rgba(6, 18, 12, .66); display: none; place-items: center; padding: 18px; }
        .completion.open { display: grid; }
        .modal { width: min(480px, 100%); background: var(--surface); color: var(--ink); border-radius: 20px; box-shadow: 0 30px 100px rgba(0,0,0,.35); padding: 28px; }
        .success-mark { width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); }
        .success-mark svg { width: 28px; height: 28px; }
        .modal h3 { font-size: 25px; margin: 20px 0 8px; letter-spacing: -.025em; }
        .modal p { margin: 0; color: var(--muted); }
        .pairing { margin: 20px 0; padding: 15px; border: 1px dashed var(--brand); border-radius: 10px; background: var(--brand-soft); }
        .pairing span { font-size: 11px; color: var(--muted); display: block; }
        .pairing strong { display: block; letter-spacing: .08em; font-size: 22px; color: var(--brand-2); margin-top: 3px; }
        .close-modal { width: 100%; min-height: 46px; border: 0; border-radius: 10px; background: var(--surface-2); color: var(--ink); font-weight: 700; transition: background 0.2s; }
        .close-modal:hover { background: var(--line); }
        @media (max-width: 860px) {
          .page { width: min(100% - 22px, 720px); padding: 18px 0 30px; }
          .layout { grid-template-columns: 1fr; gap: 12px; }
          .story { min-height: auto; border-radius: 20px 20px 8px 8px; padding: 28px 24px; }
          .story h1 { font-size: clamp(34px, 11vw, 48px); max-width: 580px; }
          .network-label { margin-bottom: 20px; }
          .proof { grid-template-columns: repeat(3, 1fr); margin: 26px 0 0; }
          .earnings { margin-top: 24px; }
          .proof-item { grid-template-columns: 1fr; gap: 8px; }
          .proof-item span { display: none; }
          .journey { display: none; }
          .form-shell { border-radius: 8px 8px 20px 20px; }
        }
        @media (max-width: 600px) {
          .page { width: 100%; padding: 0; }
          .utility { margin: 0; padding: 12px 14px; background: var(--surface); }
          .layout { gap: 0; }
          .story { border-radius: 0; padding: 24px 18px; }
          .story h1 { font-size: 36px; }
          .story .lead { font-size: 15px; max-width: 95%; }
          .proof { gap: 9px; }
          .proof-item strong { font-size: 12px; line-height: 1.25; }
          .form-shell { border: 0; box-shadow: none; border-radius: 0; }
          .progress-wrap { padding: 22px 18px 0; }
          .steps { margin: 18px 18px 0; gap: 5px; }
          .step-tab { font-size: 12px; }
          .step-tab span { display: none; }
          .panel { padding: 24px 18px 16px; }
          .grid-2, .location-details { grid-template-columns: 1fr; gap: 0; }
          .location-details { gap: 8px; }
          .hours { grid-template-columns: 1fr 20px 1fr; }
          .map-frame > div:first-child { height: 270px; min-height: 270px; }
          .payouts { grid-template-columns: 1fr; }
          .actions { padding: 15px 18px calc(18px + env(safe-area-inset-bottom)); position: sticky; bottom: 0; z-index: 900; }
          .microcopy { display: none; }
          .back, .next { min-height: 46px; padding: 0 16px; }
          .next { min-width: 140px; }
        }
      `}} />
    </>
  );
}
