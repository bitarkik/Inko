"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  UploadCloud, 
  Clock, 
  ShieldCheck, 
  CreditCard
} from "lucide-react";
import { useFile } from "../context/FileContext";

interface Store {
  id: string;
  name: string;
  address: string;
  basePrice: number;
  isAcceptingOrders: boolean;
}

export default function LandingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");
  
  const { setFile, setSelectedStore } = useFile();
  
  // Store logic
  const [stores, setStores] = useState<Store[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/stores`)
      .then(res => res.json())
      .then((data: Store[]) => {
        setStores(data);
        const uniqueAreas = Array.from(new Set(data.map(s => s.address)));
        setAreas(uniqueAreas);
        if (uniqueAreas.length > 0) {
          setSelectedArea(uniqueAreas[0]);
        }
      })
      .catch(err => console.error("Failed to fetch stores", err));
  }, []);

  const filteredStores = stores.filter(s => s.address === selectedArea);

  // Calculator State
  const [pages, setPages] = useState(100);
  const [calcBase, setCalcBase] = useState(2.5);
  const [calcAdd, setCalcAdd] = useState(0);
  const [modeLabel, setModeLabel] = useState("B&W");
  const [finishLabel, setFinishLabel] = useState("no finishing");
  
  const calcTotal = Math.round(pages * calcBase + calcAdd);

  // File Handling
  const processFile = (file: File) => {
    setFile(file);
    if (filteredStores.length > 0) {
      // Default to the first available store in the area
      setSelectedStore(filteredStores[0]);
    }
    router.push("/studio");
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
      <header className="max-w-[1240px] mx-auto px-7 min-h-[72px] flex items-center justify-between border-b border-[var(--line)]">
        <div className="flex items-center gap-2.5 text-sm font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-[#27b675] shadow-[0_0_0_4px_color-mix(in_srgb,#27b675_16%,transparent)]" />
          <span className="hidden sm:inline">Mock network preview · Dhaka</span>
        </div>
        <nav className="flex items-center gap-2">
          <button className="border border-[var(--line)] bg-transparent rounded-lg px-3.5 py-2.5 font-semibold text-xs sm:text-sm hover:bg-[var(--surface-2)] transition-colors cursor-pointer">
            Track order
          </button>
          <button 
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="border border-[var(--line)] bg-transparent rounded-lg px-3.5 py-2.5 font-bold font-[family:var(--font-dm-mono)] text-xs sm:text-sm hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
          >
            {lang === "en" ? "ENG" : "বাংলা"}
          </button>
        </nav>
      </header>

      <main className="max-w-[1240px] mx-auto px-5 sm:px-7">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-[68px] items-center pt-10 md:pt-[72px] pb-14 md:pb-[58px]">
          {/* Left: Pitch */}
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--green)] font-bold text-sm mb-4 sm:mb-5 before:content-[''] before:w-6 before:h-0.5 before:bg-current">
              PrintPanda · print from anywhere
            </div>
            
            <h1 className="text-[clamp(40px,5.4vw,74px)] leading-[1.02] tracking-tight mb-5 sm:mb-[22px] max-w-[680px] font-extrabold">
              {lang === "en" ? (
                <>Skip the queue. <span className="text-[var(--green)]">Print, pay, pick up.</span></>
              ) : (
                <>লাইন এড়িয়ে যান। <span className="text-[var(--green)]">প্রিন্ট, পে, পিক আপ।</span></>
              )}
            </h1>
            
            <p className="text-lg text-[var(--muted)] max-w-[590px] mb-7 sm:mb-[28px]">
              {lang === "en" 
                ? "Turn a document on your laptop into a ready-to-collect print order — without waiting at the shop counter."
                : "ল্যাপটপের ডকুমেন্ট পাঠান, সেটিংস ঠিক করুন, তারপর লাইনে না দাঁড়িয়ে প্রিন্ট সংগ্রহ করুন।"}
            </p>
            
            {/* Location Selector */}
            <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--line)] p-2 pl-4 rounded-xl max-w-[475px] shadow-[0_8px_30px_rgba(13,62,41,0.05)]">
              <MapPin className="text-[var(--green)] flex-shrink-0" size={22} />
              <div className="flex-1">
                <label className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold block mb-0.5">Pickup area</label>
                {areas.length > 0 ? (
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-transparent font-bold outline-none text-[var(--ink)] cursor-pointer appearance-none"
                  >
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                ) : (
                  <select className="w-full bg-transparent font-bold outline-none text-[var(--ink)] cursor-pointer appearance-none">
                    <option>Loading areas...</option>
                  </select>
                )}
              </div>
            </div>
          </div>
          
          {/* Right: Dropzone */}
          <div className="bg-[var(--surface)] border border-[var(--line)] shadow-[var(--shadow)] p-[15px] rounded-[24px] md:rotate-1">
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
              {/* Fake Paper Stack */}
              <div className="relative w-[84px] h-[100px] mb-7 pointer-events-none">
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-sm -rotate-6 -translate-x-2 translate-y-1"></div>
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-sm rotate-6 translate-x-2 translate-y-0.5"></div>
                <div className="absolute inset-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-md flex items-center justify-center text-[var(--green)] rotate-0 transition-transform bg-white">
                  <UploadCloud size={35} strokeWidth={1.8} />
                </div>
              </div>
              
              <h2 className="m-0 mb-2 text-[22px] tracking-tight font-bold">Drop your document here</h2>
              <p className="m-0 mb-5 text-[var(--muted)] text-sm">PDF, DOCX, PPTX or JPG · up to 50 MB</p>
              
              <button className="bg-[var(--green)] text-white border-0 rounded-xl px-5 py-3 font-extrabold shadow-[0_7px_18px_color-mix(in_srgb,var(--green)_22%,transparent)] hover:bg-[var(--green-2)] transition-colors cursor-pointer">
                Choose a file
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png" />
              
              <div className="font-[family:var(--font-dm-mono)] text-[var(--muted)] text-[11px] mt-4 tracking-wide font-medium">OR TRY THE INTERACTIVE DEMO</div>
              <button 
                onClick={(e) => { e.stopPropagation(); alert("Interactive demo click! (Transitions to Studio)"); }}
                className="mt-2 text-[var(--green)] font-bold text-sm bg-transparent hover:underline cursor-pointer"
              >
                Load sample thesis →
              </button>
            </div>
          </div>
        </div>

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
            {/* Step 1 */}
            <div className="py-6 md:p-7 md:pl-0 border-b md:border-b-0 md:border-r border-[var(--line)] md:border-t">
              <span className="font-[family:var(--font-dm-mono)] text-[var(--green)] text-[13px] font-medium">01 / UPLOAD</span>
              <h3 className="text-xl font-bold mt-5 mb-2">Drop your file</h3>
              <p className="text-[var(--muted)] text-sm m-0">Preview pages in the browser and choose exactly which ones to print.</p>
            </div>
            {/* Step 2 */}
            <div className="py-6 md:p-7 border-b md:border-b-0 md:border-r border-[var(--line)] md:border-t">
              <span className="font-[family:var(--font-dm-mono)] text-[var(--green)] text-[13px] font-medium">02 / CONFIGURE</span>
              <h3 className="text-xl font-bold mt-5 mb-2">Set it your way</h3>
              <p className="text-[var(--muted)] text-sm m-0">Pick color, sides, paper, copies and finishing. The total updates instantly.</p>
            </div>
            {/* Step 3 */}
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

        {/* Hubs Section */}
        <section className="mb-[90px] md:mb-[110px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 mb-8">
            <h2 className="text-[clamp(31px,4vw,50px)] leading-[1.08] tracking-tight m-0 max-w-[650px] font-bold">
              Nearby counters in your area.
            </h2>
            <p className="text-[var(--muted)] max-w-[420px] m-0">
              Live status and queues for partner hubs in <strong>{selectedArea || "your area"}</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStores.length === 0 ? (
              <div className="p-6 text-[var(--muted)] border border-[var(--line)] rounded-[16px] col-span-1 md:col-span-2 text-center bg-[var(--surface-2)]">
                No stores found in {selectedArea}.
              </div>
            ) : (
              filteredStores.map(store => (
                <article 
                  key={store.id} 
                  className={`bg-[var(--surface)] border p-6 rounded-[16px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-colors cursor-pointer ${
                    store.isAcceptingOrders ? 'border-[var(--green)] ring-1 ring-[var(--green)] hover:bg-[var(--mint)]' : 'border-[var(--line)] opacity-60'
                  }`}
                  onClick={() => {
                    // Optional: clicking a hub selects it as default before dropping
                    if (store.isAcceptingOrders) setSelectedStore(store);
                  }}
                >
                  <div>
                    <h3 className="m-0 mb-1 text-[17px] font-bold">{store.name}</h3>
                    <p className="m-0 text-[var(--muted)] text-[13px]">B&W from ৳{Number(store.basePrice).toFixed(2)}/page</p>
                  </div>
                  <span className={`font-[family:var(--font-dm-mono)] text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap w-max font-bold ${
                    store.isAcceptingOrders ? 'bg-[var(--mint)] text-[var(--green-2)]' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {store.isAcceptingOrders ? "~ 5 MIN" : "OFFLINE"}
                  </span>
                </article>
              ))
            )}
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
        <span>PrintPanda · browser-based printing for Bangladesh</span>
        <span>Counter pickup first · Delivery later</span>
      </footer>

    </div>
  );
}
