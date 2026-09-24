"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "../../context/FileContext";
import { ArrowLeft, CheckCircle2, Store } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { file, selectedStore, printSettings } = useFile();
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "counter">("online");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no file/store/settings, they likely refreshed. We could redirect to home, 
  // but for mockup purposes we'll provide fallbacks.
  const displayFileName = file?.name || "mock_document.pdf";
  const displayPages = printSettings?.pages || 10;
  const displayMode = printSettings?.mode || "B&W";
  const displayFinish = printSettings?.finish || "no finishing";
  const displayTotal = printSettings?.total || 25;
  const storeName = selectedStore?.name || "Bismillah Print & Xerox";

  const handleConfirm = async () => {
    if (!phone) return alert("Please enter a phone number to receive your token.");
    if (!file || !selectedStore || !printSettings) return alert("Missing order information.");
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("storeId", selectedStore.id);
      formData.append("totalPages", printSettings.pages.toString());
      formData.append("totalPrice", printSettings.total.toString());
      
      // Calculate basic color/bw page splits based on mode
      const isColor = printSettings.mode.toLowerCase().includes("color");
      const pagesArray = Array.from({ length: printSettings.pages }, (_, i) => i + 1);
      
      if (isColor) {
        formData.append("colorPages", pagesArray.join(","));
        formData.append("bwPages", "");
      } else {
        formData.append("colorPages", "");
        formData.append("bwPages", pagesArray.join(","));
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error("Failed to create order");
      }
      
      const data = await res.json();
      
      // Navigate to status using the real returned token/ID
      router.push(`/status/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans pb-12 selection:bg-[var(--mint)] selection:text-[var(--green-2)]">
      
      {/* Topbar */}
      <header className="max-w-[1000px] mx-auto px-5 sm:px-7 min-h-[72px] flex items-center justify-between border-b border-[var(--line)]">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold bg-transparent border-0 cursor-pointer hover:text-[var(--green)] transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Studio
        </button>
        <div className="font-[family:var(--font-dm-mono)] font-bold text-sm tracking-wide">
          CHECKOUT
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-5 sm:px-7 pt-8 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-10">
          
          {/* Left Column: Guest info & Payment */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 m-0">Guest Checkout</h1>
            <p className="text-[var(--muted)] mb-8 m-0">No account needed. Just your number for the pickup token.</p>
            
            <div className="mb-8">
              <label className="block text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold mb-2">Mobile Number</label>
              <div className="flex bg-[var(--surface)] border border-[var(--line)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--green)] focus-within:border-[var(--green)] transition-all">
                <div className="bg-[var(--surface-2)] px-4 flex items-center justify-center font-[family:var(--font-dm-mono)] font-bold text-sm border-r border-[var(--line)]">
                  +880
                </div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="17XXXXXXXX"
                  className="flex-1 bg-transparent border-0 p-3.5 font-bold outline-none text-[15px]"
                />
              </div>
              <p className="text-xs text-[var(--muted)] mt-2 font-medium">We'll SMS your ready-to-pickup token here.</p>
            </div>

            <div className="mb-10">
              <label className="block text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold mb-3">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-1 ${
                    paymentMethod === "online" 
                      ? "border-[var(--green)] bg-[var(--mint)] ring-1 ring-[var(--green)]" 
                      : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[15px]">Pay Online</span>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="accent-[var(--green)] w-4 h-4" 
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                    />
                  </div>
                  <span className="text-[13px] text-[var(--muted)] font-medium">bKash, Nagad, Cards</span>
                </label>
                
                <label 
                  className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-1 ${
                    paymentMethod === "counter" 
                      ? "border-[var(--green)] bg-[var(--mint)] ring-1 ring-[var(--green)]" 
                      : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[15px]">Pay at Counter</span>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="accent-[var(--green)] w-4 h-4"
                      checked={paymentMethod === "counter"}
                      onChange={() => setPaymentMethod("counter")}
                    />
                  </div>
                  <span className="text-[13px] text-[var(--muted)] font-medium">Cash when picking up</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sticky top-8 shadow-sm">
              <h2 className="text-lg font-extrabold mb-4 m-0">Order Summary</h2>
              
              <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[var(--line)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center shrink-0">
                  <span className="font-[family:var(--font-dm-mono)] text-[10px] font-bold text-[var(--muted)]">PDF</span>
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm truncate">{displayFileName}</div>
                  <div className="text-[13px] text-[var(--muted)] mt-0.5">
                    {displayPages} pages · {displayMode} · {displayFinish}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5 pb-5 border-b border-[var(--line)]">
                <span className="text-[13px] font-bold text-[var(--muted)]">Subtotal</span>
                <span className="font-[family:var(--font-dm-mono)] font-bold">৳{displayTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="font-bold">Total</span>
                <span className="text-3xl font-extrabold tracking-tight">৳{displayTotal.toFixed(2)}</span>
              </div>

              <div className="bg-[var(--mint)] rounded-xl p-3.5 mb-6 flex items-start gap-2.5">
                <Store size={18} className="text-[var(--green)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-[var(--green)] tracking-wider">Pickup Location</div>
                  <div className="text-[13px] font-bold text-[var(--green-2)] leading-tight mt-0.5">{storeName}</div>
                </div>
              </div>

              <button 
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full bg-[var(--green)] text-white border-0 rounded-xl px-5 py-3.5 font-extrabold shadow-[0_7px_18px_color-mix(in_srgb,var(--green)_22%,transparent)] hover:bg-[var(--green-2)] transition-colors cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : (
                  <>Confirm & get token <CheckCircle2 size={18} /></>
                )}
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
