"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, FileText, MapPin, Printer } from "lucide-react";

type OrderStatus = "queued" | "printing" | "ready";

export default function StatusTrackerPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  const [status, setStatus] = useState<OrderStatus>("queued");
  const [storeName, setStoreName] = useState<string>("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    let intervalId: NodeJS.Timeout;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${apiUrl}/orders/${token}`);
        if (res.ok) {
          const order = await res.json();
          // Map backend status to our frontend OrderStatus
          if (order.status === "PENDING" || order.status === "PROCESSING") setStatus("queued");
          else if (order.status === "PRINTING") setStatus("printing");
          else if (order.status === "READY" || order.status === "COMPLETED") setStatus("ready");
          
          if (order.store?.name) {
            setStoreName(order.store.name);
          }
        }
      } catch (err) {
        console.error("Failed to fetch order status", err);
      }
    };

    // Initial fetch
    fetchStatus();

    // Poll every 5 seconds
    intervalId = setInterval(fetchStatus, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans pb-12 selection:bg-[var(--mint)] selection:text-[var(--green-2)] flex flex-col">
      
      {/* Topbar */}
      <header className="max-w-[700px] w-full mx-auto px-5 sm:px-7 min-h-[72px] flex items-center justify-between border-b border-[var(--line)]">
        <div className="font-[family:var(--font-dm-mono)] font-bold text-sm tracking-wide text-[var(--green)]">
          PrintPanda
        </div>
        <button 
          onClick={() => router.push("/")}
          className="text-xs font-bold bg-transparent border border-[var(--line)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--surface)] transition-colors"
        >
          New Order
        </button>
      </header>

      <main className="max-w-[700px] w-full mx-auto px-5 sm:px-7 pt-12 md:pt-16 flex-1">
        
        {/* Token Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold mb-3">Your Pickup Token</p>
          <div className="inline-block bg-[var(--surface)] border-2 border-[var(--ink)] rounded-2xl px-8 py-4 shadow-[4px_4px_0_var(--ink)]">
            <h1 className="text-4xl md:text-5xl font-[family:var(--font-dm-mono)] font-black tracking-tight m-0">{token}</h1>
          </div>
          <p className="text-[13px] text-[var(--muted)] mt-5 max-w-[300px] mx-auto font-medium">
            Show this token at the counter to collect your printed document.
          </p>
        </div>

        {/* Live Tracker */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[24px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Status Badge */}
          <div className="absolute top-6 right-6">
            <div className={`flex items-center gap-1.5 text-[11px] font-[family:var(--font-dm-mono)] font-bold px-3 py-1.5 rounded-full ${
              status === "ready" 
                ? "bg-[var(--mint)] text-[var(--green-2)]" 
                : "bg-[var(--yellow)] text-[#25301d]"
            }`}>
              <div className={`w-2 h-2 rounded-full ${status === "ready" ? "bg-[var(--green)]" : "bg-[#25301d] animate-pulse"}`} />
              {status === "queued" && "IN QUEUE"}
              {status === "printing" && "PRINTING"}
              {status === "ready" && "READY FOR PICKUP"}
            </div>
          </div>

          <h2 className="text-xl font-extrabold mb-8 mt-2">Live Order Status</h2>

          {/* Stepper */}
          <div className="relative pl-4 sm:pl-6 border-l-2 border-[var(--line)] flex flex-col gap-8">
            
            {/* Step 1: Queued */}
            <div className="relative">
              <div className="absolute -left-[27px] sm:-left-[35px] top-0 w-5 h-5 rounded-full bg-[var(--green)] border-4 border-[var(--surface)] flex items-center justify-center">
                <CheckCircle2 size={12} className="text-white" />
              </div>
              <h3 className="font-bold text-[15px] leading-none mb-1 text-[var(--ink)]">Order Received & Queued</h3>
              <p className="text-[13px] text-[var(--muted)] m-0">Sent to the shop's local print server.</p>
            </div>

            {/* Step 2: Printing */}
            <div className={`relative transition-opacity duration-500 ${status === "queued" ? "opacity-30" : "opacity-100"}`}>
              <div className={`absolute -left-[27px] sm:-left-[35px] top-0 w-5 h-5 rounded-full border-4 border-[var(--surface)] flex items-center justify-center transition-colors duration-500 ${
                status === "queued" ? "bg-[var(--line)]" : "bg-[var(--green)]"
              }`}>
                {status !== "queued" && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <h3 className="font-bold text-[15px] leading-none mb-1">Currently Printing</h3>
              <p className="text-[13px] text-[var(--muted)] m-0">The printer is actively running your job.</p>
            </div>

            {/* Step 3: Ready */}
            <div className={`relative transition-opacity duration-500 ${status !== "ready" ? "opacity-30" : "opacity-100"}`}>
              <div className={`absolute -left-[27px] sm:-left-[35px] top-0 w-5 h-5 rounded-full border-4 border-[var(--surface)] flex items-center justify-center transition-colors duration-500 ${
                status === "ready" ? "bg-[var(--green)]" : "bg-[var(--line)]"
              }`}>
                {status === "ready" && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <h3 className="font-bold text-[15px] leading-none mb-1">Ready for Pickup</h3>
              <p className="text-[13px] text-[var(--muted)] m-0">Your document is ready at the counter.</p>
            </div>

          </div>

          {/* Store Info Footer inside card */}
          {status === "ready" && (
            <div className="mt-10 pt-6 border-t border-[var(--line)] flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <MapPin className="text-[var(--green)] mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm mb-0.5">Pickup Location</h4>
                <p className="text-[13px] text-[var(--muted)] m-0">{storeName || "Your pickup store"}</p>
                <a href="#" className="text-[12px] font-bold text-[var(--green)] mt-1.5 inline-block hover:underline">Get directions →</a>
              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}
