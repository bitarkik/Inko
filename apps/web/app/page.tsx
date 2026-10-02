"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  UploadCloud, 
  Clock, 
  ShieldCheck, 
  CreditCard,
  Search,
  ChevronDown
} from "lucide-react";
import { useFile } from "../context/FileContext";

interface Store {
  id: string;
  name: string;
  address: string;
  city?: string | null;
  area?: string | null;
  basePrice: number;
  isAcceptingOrders: boolean;
}

export default function LandingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");
  
  const { file, setFile, selectedStore, setSelectedStore } = useFile();
  
  // Store logic
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/stores`)
      .then(res => res.json())
      .then((data: Store[]) => {
        // Normalize data to ensure city/area exist for the UI filter
        const normalized = data.map(s => ({
          ...s,
          city: s.city || "Dhaka",
          area: s.area || s.address || "Unknown"
        }));
        setStores(normalized);
      })
      .catch(err => console.error("Failed to fetch stores", err));
  }, []);

  // Compute dropdown options dynamically
  const cities = Array.from(new Set(stores.map(s => s.city).filter(Boolean))) as string[];
  const areasInCity = Array.from(new Set(stores.filter(s => s.city === selectedCity).map(s => s.area).filter(Boolean))) as string[];

  // Reset area when city changes
  useEffect(() => {
    setSelectedArea("");
  }, [selectedCity]);

  // Filter stores based on search OR city+area selection
  let filteredStores = stores;
  if (searchQuery.trim() !== "") {
    filteredStores = stores.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  } else {
    if (selectedCity) filteredStores = filteredStores.filter(s => s.city === selectedCity);
    if (selectedArea) filteredStores = filteredStores.filter(s => s.area === selectedArea);
  }
  
  // Show closest 10 (or top 10 matched)
  const displayStores = filteredStores.slice(0, 10);

  // Calculator State
  const [pages, setPages] = useState(100);
  const [calcBase, setCalcBase] = useState(2.5);
  const [calcAdd, setCalcAdd] = useState(0);
  const [modeLabel, setModeLabel] = useState("B&W");
  const [finishLabel, setFinishLabel] = useState("no finishing");
  
  const calcTotal = Math.round(pages * calcBase + calcAdd);

  // File Handling
  const processFile = (fileToProcess: File) => {
    setFile(fileToProcess);
    if (selectedStore) {
      router.push("/studio");
    } else {
      const el = document.getElementById("store-finder");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      alert("Document selected! Please choose a pickup shop below to proceed.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans selection:bg-[var(--mint)] selection:text-[var(--green-2)] pb-12">
      
      {/* Topbar */}
      <header className="max-w-[1240px] mx-auto px-5 sm:px-7 min-h-[85px] flex items-center justify-between border-b border-[var(--line)]">
        <div className="flex flex-col items-start justify-center pt-2">
          <span className="font-extrabold text-[32px] tracking-tight leading-none text-[var(--green)]">PrintIt</span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)] mt-1.5 ml-0.5">by Inko</span>
        </div>
        <nav className="flex items-center gap-3">
          <button className="border border-[var(--line)] bg-[var(--surface)] rounded-xl px-4 py-2.5 font-bold text-xs sm:text-sm hover:bg-[var(--surface-2)] transition-colors cursor-pointer shadow-sm">
            Track order
          </button>
          <button 
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="border border-[var(--line)] bg-[var(--surface)] rounded-xl px-4 py-2.5 font-bold font-[family:var(--font-dm-mono)] text-xs sm:text-sm hover:bg-[var(--surface-2)] transition-colors cursor-pointer shadow-sm"
          >
            {lang === "en" ? "ENG" : "বাংলা"}
          </button>
        </nav>
      </header>

      <main className="max-w-[1240px] mx-auto px-5 sm:px-7">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-[68px] items-center pt-10 md:pt-[72px] pb-10 md:pb-[60px]">
          {/* Left: Pitch */}
          <div>
            <div className="uppercase tracking-widest text-[12px] font-extrabold text-[var(--green)] mb-3 opacity-90">
              Print from anywhere
            </div>
            
            <h1 className="text-[clamp(40px,5.4vw,74px)] leading-[1.02] tracking-tight mb-5 sm:mb-[22px] max-w-[680px] font-extrabold">
              {lang === "en" ? (
                <>Skip the queue. <span className="text-[var(--green)]">Print, pay, pick up.</span></>
              ) : (
                <>লাইন এড়িয়ে যান। <span className="text-[var(--green)]">প্রিন্ট, পে, পিক আপ।</span></>
              )}
            </h1>
            
            <p className="text-lg text-[var(--muted)] max-w-[590px] mb-7 sm:mb-[28px] leading-relaxed">
              {lang === "en" 
                ? "Turn a document on your laptop into a ready-to-collect print order — without waiting at the shop counter."
                : "ল্যাপটপের ডকুমেন্ট পাঠান, সেটিংস ঠিক করুন, তারপর লাইনে না দাঁড়িয়ে প্রিন্ট সংগ্রহ করুন।"}
            </p>
          </div>
          
          {/* Right: Dropzone */}
          <div className="bg-[var(--surface)] border border-[var(--line)] shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-[15px] rounded-[24px] md:rotate-1">
            <div 
              className={`min-h-[300px] md:min-h-[362px] border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center text-center p-8 transition-all cursor-pointer ${
                isDragging 
                  ? "bg-[var(--mint)] border-[var(--green)] scale-[0.99]" 
                  : "border-[color-mix(in_srgb,var(--green)_45%,var(--line))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--mint)_58%,transparent),transparent_68%)]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="relative w-[84px] h-[100px] mb-7 pointer-events-none">
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-sm -rotate-6 -translate-x-2 translate-y-1"></div>
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-sm rotate-6 translate-x-2 translate-y-0.5"></div>
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-md flex items-center justify-center text-[var(--green)] rotate-0 transition-transform bg-white">
                  <UploadCloud size={35} strokeWidth={1.8} />
                </div>
              </div>
              
              <h2 className="m-0 mb-2 text-[22px] tracking-tight font-bold">Drop your document here</h2>
              <p className="m-0 mb-5 text-[var(--muted)] text-sm">PDF, DOCX, PPTX or JPG · up to 50 MB</p>
              
              <button className="bg-[var(--green)] text-white border-0 rounded-xl px-6 py-3.5 font-extrabold shadow-[0_7px_18px_color-mix(in_srgb,var(--green)_22%,transparent)] hover:bg-[var(--green-2)] transition-colors cursor-pointer text-[15px]">
                Choose a file
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png" />
            </div>
          </div>
        </div>

        {/* Store Finder Section */}
        <section id="store-finder" className="mb-[90px] md:mb-[110px]">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[24px] shadow-sm overflow-hidden">
            {/* Store Finder Header / Search Bar */}
            <div className="p-6 md:p-8 border-b border-[var(--line)] bg-[var(--surface-2)]">
              <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Find your nearest print shop</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4">
                {/* Search by Name */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by store name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl pl-11 pr-4 py-3.5 text-[15px] font-medium outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] transition-all shadow-sm"
                  />
                </div>
                
                {/* City Dropdown */}
                <div className="relative min-w-[160px]">
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={searchQuery.length > 0}
                    className="w-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl pl-4 pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] transition-all shadow-sm appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Select City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" size={16} />
                </div>

                {/* Area Dropdown (appears if city is selected) */}
                {selectedCity && (
                  <div className="relative min-w-[200px] animate-in fade-in zoom-in-95 duration-200">
                    <select 
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      disabled={searchQuery.length > 0}
                      className="w-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl pl-4 pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] transition-all shadow-sm appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Select Area</option>
                      {areasInCity.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" size={16} />
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable Store List */}
            <div className="max-h-[440px] overflow-y-auto p-6 md:p-8 bg-[var(--surface)] custom-scrollbar">
              {displayStores.length === 0 ? (
                <div className="py-12 text-center text-[var(--muted)] flex flex-col items-center justify-center">
                  <MapPin size={32} className="mb-3 opacity-20" />
                  <p className="font-bold text-lg m-0">No shops found</p>
                  <p className="text-sm mt-1">Try adjusting your search or area.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {displayStores.map(store => (
                    <article 
                      key={store.id} 
                      className={`border p-5 rounded-[16px] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 transition-all cursor-pointer ${
                        store.isAcceptingOrders 
                          ? (selectedStore?.id === store.id ? 'border-[var(--green)] bg-[var(--mint)] shadow-md' : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--green)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]')
                          : 'border-[var(--line)] bg-[var(--surface-2)] opacity-60'
                      }`}
                      onClick={() => {
                        if (store.isAcceptingOrders) {
                          setSelectedStore(store);
                          if (file) {
                             router.push('/studio');
                          } else {
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                             fileInputRef.current?.click();
                          }
                        }
                      }}
                    >
                      <div>
                        <h3 className="m-0 mb-1.5 text-[17px] font-extrabold text-[var(--ink)]">{store.name}</h3>
                        <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted)] mb-3">
                          <MapPin size={14} className="text-[var(--green)]" />
                          <span className="font-medium">{store.area}, {store.city}</span>
                        </div>
                        <div className="inline-block bg-[var(--surface-2)] border border-[var(--line)] px-2.5 py-1 rounded-md text-[12px] font-bold text-[var(--ink)]">
                          B&W from ৳{Number(store.basePrice).toFixed(2)}/page
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`font-[family:var(--font-dm-mono)] text-[11px] px-3 py-1.5 rounded-full whitespace-nowrap font-bold tracking-wide ${
                          store.isAcceptingOrders ? 'bg-[var(--mint)] text-[var(--green-2)] ring-1 ring-[var(--green)]/20' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {store.isAcceptingOrders ? "AVAILABLE" : "OFFLINE"}
                        </span>
                        {store.isAcceptingOrders && (
                          <span className="text-[11px] text-[var(--muted)] font-bold uppercase tracking-wider">~ 5 min wait</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trustbar */}
        <div className="border-y border-[var(--line)] py-5 mb-16 md:mb-[84px] grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0">
          <div className="flex gap-3 items-center justify-start md:justify-center text-[13px] text-[var(--muted)]">
            <ShieldCheck size={24} className="text-[var(--green)]" />
            <div>
              <strong className="block text-[var(--ink)] text-[15px]">Files auto-expire</strong>
              after your order is complete
            </div>
          </div>
          <div className="flex gap-3 items-center justify-start md:justify-center text-[13px] text-[var(--muted)]">
            <CreditCard size={24} className="text-[var(--green)]" />
            <div>
              <strong className="block text-[var(--ink)] text-[15px]">Clear, upfront pricing</strong>
              see the exact total before checkout
            </div>
          </div>
          <div className="flex gap-3 items-center justify-start md:justify-center text-[13px] text-[var(--muted)]">
            <Clock size={24} className="text-[var(--green)]" />
            <div>
              <strong className="block text-[var(--ink)] text-[15px]">Ready-time estimates</strong>
              choose a shop with a shorter queue
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <section className="mb-[90px] md:mb-[110px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 mb-8">
            <h2 className="text-[clamp(31px,4vw,50px)] leading-[1.08] tracking-tight m-0 max-w-[650px] font-bold">
              From desktop to pickup counter in three moves.
            </h2>
            <p className="text-[var(--muted)] max-w-[420px] m-0">
              No account needed. Configure only what matters, then collect with a short pickup token.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t md:border-t-0 border-[var(--line)]">
            <div className="py-6 md:p-7 md:pl-0 border-b md:border-b-0 md:border-r border-[var(--line)] md:border-t">
              <span className="font-[family:var(--font-dm-mono)] text-[var(--green)] text-[13px] font-medium">01 / UPLOAD</span>
              <h3 className="text-xl font-bold mt-5 mb-2">Drop your file</h3>
              <p className="text-[var(--muted)] text-sm m-0">Preview pages in the browser and choose exactly which ones to print.</p>
            </div>
            <div className="py-6 md:p-7 border-b md:border-b-0 md:border-r border-[var(--line)] md:border-t">
              <span className="font-[family:var(--font-dm-mono)] text-[var(--green)] text-[13px] font-medium">02 / CONFIGURE</span>
              <h3 className="text-xl font-bold mt-5 mb-2">Set it your way</h3>
              <p className="text-[var(--muted)] text-sm m-0">Pick color, sides, paper, copies and finishing. The total updates instantly.</p>
            </div>
            <div className="py-6 md:p-7 md:pr-0 border-b md:border-b-0 border-[var(--line)] md:border-t">
              <span className="font-[family:var(--font-dm-mono)] text-[var(--green)] text-[13px] font-medium">03 / COLLECT</span>
              <h3 className="text-xl font-bold mt-5 mb-2">Skip the line</h3>
              <p className="text-[var(--muted)] text-sm m-0">Pay online or at the counter, then show your pickup token when it is ready.</p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-[90px] md:mb-[110px] grid grid-cols-1 md:grid-cols-[1fr_0.8fr] bg-[var(--ink)] text-[var(--bg)] rounded-[25px] overflow-hidden">
          <div className="p-7 md:p-12">
            <h2 className="text-[34px] md:text-[38px] leading-[1.1] tracking-tight mb-3 font-bold m-0">Know the cost before you upload.</h2>
            <p className="text-[color-mix(in_srgb,var(--bg)_70%,transparent)] mb-9 m-0">Move the page count and compare common print setups.</p>
            
            <div className="my-6">
              <label className="flex justify-between text-[13px] mb-2.5 font-bold">
                <span>Number of pages</span>
                <strong className="font-[family:var(--font-dm-mono)] text-[var(--yellow)]">{pages} pages</strong>
              </label>
              <input 
                type="range" 
                min="1" 
                max="500" 
                value={pages} 
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-[var(--yellow)] cursor-pointer" 
              />
            </div>
            
            <div className="my-6">
              <label className="flex justify-between text-[13px] mb-2.5 font-bold"><span>Print mode</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: "B&W", price: 2.5 },
                  { label: "Color", price: 8 },
                  { label: "Mixed", price: 3.75 },
                ].map((mode) => (
                  <button 
                    key={mode.label}
                    onClick={() => { setCalcBase(mode.price); setModeLabel(mode.label); }}
                    className={`p-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                      calcBase === mode.price 
                        ? "bg-[var(--bg)] text-[var(--ink)] border-[var(--bg)]" 
                        : "bg-transparent text-[var(--bg)] border-[color-mix(in_srgb,var(--bg)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--bg)_10%,transparent)]"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="my-6">
              <label className="flex justify-between text-[13px] mb-2.5 font-bold"><span>Finishing</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: "None", add: 0, text: "no finishing" },
                  { label: "Spiral", add: 25, text: "spiral binding" },
                  { label: "Hardcover", add: 120, text: "hardcover binding" },
                ].map((fin) => (
                  <button 
                    key={fin.label}
                    onClick={() => { setCalcAdd(fin.add); setFinishLabel(fin.text); }}
                    className={`p-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                      calcAdd === fin.add 
                        ? "bg-[var(--bg)] text-[var(--ink)] border-[var(--bg)]" 
                        : "bg-transparent text-[var(--bg)] border-[color-mix(in_srgb,var(--bg)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--bg)_10%,transparent)]"
                    }`}
                  >
                    {fin.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--yellow)] text-[#25301d] flex flex-col justify-between p-7 md:p-12 min-h-[300px]">
            <span className="font-[family:var(--font-dm-mono)] text-xs font-semibold">ILLUSTRATIVE ESTIMATE</span>
            <div>
              <div className="text-[70px] tracking-tight font-extrabold leading-none">৳{calcTotal.toLocaleString()}</div>
              <small className="block mt-3 opacity-70 font-semibold">{pages} {modeLabel} pages · {finishLabel}</small>
            </div>
            <div className="border-t border-[rgba(25,45,28,0.25)] pt-4 font-bold text-sm mt-8 md:mt-0">
              Calculated at a sample ৳2.50/page rate. Final price depends on your selected hub.
            </div>
          </div>
        </section>

        {/* Corporate Section */}
        <section className="border border-[var(--line)] rounded-[20px] p-7 md:p-11 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 bg-[var(--surface)] mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[var(--green)] font-bold text-sm mb-4 before:content-[''] before:w-6 before:h-0.5 before:bg-current">
              For teams & institutions
            </span>
            <h2 className="text-[34px] md:text-[36px] tracking-tight m-0 mb-3.5 font-bold">One print desk for the whole organization.</h2>
            <p className="text-[var(--muted)] mb-5">Built for tuition centres, university departments, legal chambers and growing teams that print in volume.</p>
            <button className="bg-[var(--green)] text-white border-0 rounded-xl px-5 py-3 font-extrabold hover:bg-[var(--green-2)] transition-colors mt-2 w-max shadow-[0_7px_18px_color-mix(in_srgb,var(--green)_22%,transparent)] cursor-pointer">
              Preview corporate enquiry
            </button>
          </div>
          <div className="grid gap-4 content-center">
            {[
              { t: "Monthly consolidated billing", s: "One statement instead of scattered reimbursements." },
              { t: "Volume pricing", s: "Planned rates for batches over 500 pages." },
              { t: "Shared team access", s: "Roles and order history for procurement workflows." },
            ].map((ben) => (
              <div key={ben.t} className="flex gap-3.5 items-start">
                <span className="w-[22px] h-[22px] rounded-full bg-[var(--mint)] text-[var(--green)] flex items-center justify-center shrink-0 text-[13px] font-black mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="block text-[var(--ink)] text-[15px] font-bold">{ben.t}</strong>
                  <small className="text-[var(--muted)] text-sm">{ben.s}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-[1240px] mx-auto px-5 sm:px-7 border-t border-[var(--line)] pt-7 pb-4 flex flex-col sm:flex-row justify-between text-[var(--muted)] text-[13px] font-medium gap-2">
        <span>PrintIt a product by Inko · browser-based printing for Bangladesh</span>
        <span>Counter pickup first · Delivery later</span>
      </footer>

    </div>
  );
}
