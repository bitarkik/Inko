"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFile } from "../../../context/FileContext";
import { MapPin, FileText, Upload, Clock, Phone, Mail } from "lucide-react";

interface Store {
  id: string;
  name: string;
  address: string;
  basePrice: number;
  isAcceptingOrders: boolean;
  openTime?: string;
  closeTime?: string;
  contactNumber?: string;
  email?: string;
}

export default function StoreDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile, setSelectedStore } = useFile();
  
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/stores`);
        const stores = await response.json();
        const found = stores.find((s: Store) => s.id === id);
        if (found) {
          setStore(found);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Failed to fetch store:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [id, router]);

  const handleFileSelection = (fileToProcess: File) => {
    setFile(fileToProcess);
    if (store) {
      setSelectedStore(store);
      router.push("/studio");
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleOrderClick = () => {
    if (file) {
      if (store) setSelectedStore(store);
      router.push("/studio");
    } else {
      fileInputRef.current?.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="w-8 h-8 rounded-full border-4 border-[var(--line)] border-t-[var(--green)] animate-spin"></div>
      </div>
    );
  }

  if (!store) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans pb-12 selection:bg-[var(--mint)] selection:text-[var(--green-2)]">
      {/* Topbar */}
      <header className="max-w-[700px] w-full mx-auto px-5 sm:px-7 min-h-[72px] flex items-center justify-between border-b border-[var(--line)]">
        <div 
          onClick={() => router.push("/")}
          className="font-[family:var(--font-dm-mono)] font-bold text-sm tracking-wide text-[var(--green)] cursor-pointer"
        >
          PrintIt by Inko
        </div>
        <button 
          onClick={() => router.back()}
          className="text-xs font-bold bg-transparent border border-[var(--line)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--surface)] transition-colors"
        >
          Back
        </button>
      </header>

      <main className="max-w-[700px] w-full mx-auto px-5 sm:px-7 pt-12 md:pt-16">
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[24px] shadow-sm overflow-hidden p-6 sm:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full text-[11px] font-[family:var(--font-dm-mono)] font-bold uppercase tracking-widest ${store.isAcceptingOrders ? 'bg-[var(--mint)] text-[var(--green-2)]' : 'bg-[var(--line)] text-[var(--muted)]'}`}>
              {store.isAcceptingOrders ? 'Accepting Orders' : 'Offline'}
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">{store.name}</h1>
          
          <div className="flex items-start gap-2 text-[var(--muted)] mb-8">
            <MapPin size={18} className="mt-0.5 shrink-0" />
            <p className="text-[15px] m-0">{store.address}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 p-6 bg-[var(--surface-2)] rounded-[16px] border border-[var(--line)]">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-[var(--green)]" />
              <div>
                <p className="text-[11px] uppercase font-bold text-[var(--muted)]">Hours</p>
                <p className="text-[14px] font-medium">{store.openTime || "9:00 AM"} - {store.closeTime || "6:00 PM"}</p>
              </div>
            </div>
            
            {(store.contactNumber || store.email) && (
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--green)]" />
                <div>
                  <p className="text-[11px] uppercase font-bold text-[var(--muted)]">Contact</p>
                  <p className="text-[14px] font-medium">{store.contactNumber || store.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={onFileChange} 
            />
            
            <button 
              onClick={handleOrderClick}
              disabled={!store.isAcceptingOrders}
              className={`w-full py-4 rounded-xl font-extrabold text-lg transition-all flex items-center justify-center gap-2 ${
                store.isAcceptingOrders
                  ? "bg-[var(--green)] text-white hover:bg-[var(--green-2)] shadow-[0_8px_20px_rgba(30,121,68,0.25)] hover:shadow-[0_12px_24px_rgba(30,121,68,0.3)] hover:-translate-y-0.5"
                  : "bg-[var(--line)] text-[var(--muted)] cursor-not-allowed"
              }`}
            >
              {file ? (
                <>
                  <FileText size={20} />
                  Order with {file.name}
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Document to Print
                </>
              )}
            </button>
            
            {!store.isAcceptingOrders && (
              <p className="mt-4 text-sm font-medium text-[var(--red)]">
                This shop is currently not accepting orders.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
