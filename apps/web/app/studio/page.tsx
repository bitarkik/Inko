"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "../../context/FileContext";
import { FileText, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Safely setup worker using CDN to avoid Next.js bundling issues with web workers
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function StudioPage() {
  const router = useRouter();
  const { file, selectedStore, setPrintSettings } = useFile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  // Settings State
  const [colorMode, setColorMode] = useState<number>(2.5);
  const [sides, setSides] = useState<string>("single");
  const [paper, setPaper] = useState<number>(0);
  const [finishing, setFinishing] = useState<number>(0);
  const [copies, setCopies] = useState<number>(1);

  const total = ((numPages * colorMode + paper) * copies) + finishing;
  const modeLabel = colorMode === 2.5 ? "B&W" : "Color";
  const finishLabel = finishing === 0 ? "no finishing" : finishing === 2 ? "staple" : "spiral binding";

  useEffect(() => {
    if (!file) {
      router.push("/");
      return;
    }

    const loadPdf = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch (err) {
        console.error("Error loading PDF", err);
      }
    };
    loadPdf();
  }, [file, router]);

  useEffect(() => {
    let renderTask: any = null;
    if (pdfDoc && canvasRef.current) {
      const renderPage = async () => {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;

        // Scale down large pages to fit container nicely (around 380px wide)
        const scale = Math.min(1.5, 380 / viewport.width);
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext: any = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        
        renderTask = page.render(renderContext);
        try {
          await renderTask.promise;
        } catch (e: any) {
          if (e.name !== "RenderingCancelledException") {
            console.error(e);
          }
        }
      };
      renderPage();
    }
    
    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, currentPage]);

  if (!file) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-8 text-[var(--ink)]">
        <p className="font-bold text-lg">No file found.</p>
        <button onClick={() => router.push("/")} className="mt-4 text-[var(--green)] underline font-semibold">Go back to upload</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans pb-16 selection:bg-[var(--mint)] selection:text-[var(--green-2)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-7 pt-7 pb-14">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[13px] text-[var(--muted)] my-2.5 mb-6">
          <button onClick={() => router.push("/")} className="border-0 bg-transparent text-[var(--green)] font-bold p-0 flex items-center gap-1 hover:underline cursor-pointer">
            <ArrowLeft size={14} /> Back
          </button>
          <span>/</span>
          <span>Print studio</span>
        </div>

        {/* Studio Head */}
        <div className="flex flex-col md:flex-row justify-between gap-5 md:items-end mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-12 rounded-lg bg-[var(--mint)] text-[var(--green)] flex items-center justify-center shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-2xl tracking-tight m-0 mb-1 font-bold">{file.name}</h1>
              <p className="text-[var(--muted)] text-[13px] m-0">
                <span className="font-bold text-[var(--ink)]">{numPages > 0 ? numPages : "..."}</span> pages · {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="text-left md:text-right mt-3 md:mt-0">
            <span className="text-[12px] text-[var(--muted)] uppercase tracking-wider font-bold block mb-1">Order Total</span>
            <strong className="font-[family:var(--font-dm-mono)] text-[25px] block font-extrabold">৳{total.toFixed(2)}</strong>
          </div>
        </div>

        {/* Studio Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] border border-[var(--line)] rounded-[20px] overflow-hidden bg-[var(--surface)] shadow-[var(--shadow)]">
          
          {/* Preview Panel */}
          <div className="p-5 md:p-8 bg-[var(--surface-2)] flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-5 text-[13px]">
              <strong className="font-bold">Document preview</strong>
              <span className="text-[var(--muted)]">{numPages} of {numPages} pages selected</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="bg-white shadow-[0_14px_35px_rgba(0,0,0,0.16)] flex items-center justify-center overflow-hidden border border-gray-200">
                 <canvas ref={canvasRef}></canvas>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-auto text-[13px] font-bold">
              <button 
                disabled={currentPage <= 1 || !pdfDoc}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-[34px] h-[34px] rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <span>Page {currentPage} of <b className="font-extrabold">{numPages || "..."}</b></span>
              <button 
                disabled={currentPage >= numPages || !pdfDoc}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-[34px] h-[34px] rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl m-0 mb-6 font-bold">Print preferences</h2>
            
            <div className="py-4 border-t border-[var(--line)] first:border-0 first:pt-0">
              <span className="text-xs font-bold block mb-2.5 uppercase tracking-wider text-[var(--muted)]">Color mode</span>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setColorMode(2.5)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${colorMode === 2.5 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>B&W · ৳2.5</button>
                <button onClick={() => setColorMode(8)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${colorMode === 8 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Color · ৳8</button>
              </div>
            </div>

            <div className="py-4 border-t border-[var(--line)]">
              <span className="text-xs font-bold block mb-2.5 uppercase tracking-wider text-[var(--muted)]">Sides</span>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setSides('single')} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${sides === 'single' ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Single-sided</button>
                <button onClick={() => setSides('duplex')} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${sides === 'duplex' ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Duplex</button>
              </div>
            </div>

            <div className="py-4 border-t border-[var(--line)]">
              <span className="text-xs font-bold block mb-2.5 uppercase tracking-wider text-[var(--muted)]">Paper</span>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setPaper(0)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${paper === 0 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Standard 70 GSM</button>
                <button onClick={() => setPaper(3)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${paper === 3 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Premium 80 GSM</button>
              </div>
            </div>

            <div className="py-4 border-t border-[var(--line)]">
              <span className="text-xs font-bold block mb-2.5 uppercase tracking-wider text-[var(--muted)]">Finishing</span>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFinishing(0)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${finishing === 0 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>None</button>
                <button onClick={() => setFinishing(2)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${finishing === 2 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Staple +৳2</button>
                <button onClick={() => setFinishing(25)} className={`border rounded-[9px] px-3 py-2 text-[13px] font-bold transition-colors cursor-pointer ${finishing === 25 ? 'border-[var(--green)] bg-[var(--mint)] text-[var(--green-2)]' : 'border-[var(--line)] bg-transparent hover:bg-gray-50'}`}>Spiral +৳25</button>
              </div>
            </div>

            <div className="py-4 border-t border-[var(--line)]">
              <span className="text-xs font-bold block mb-2.5 uppercase tracking-wider text-[var(--muted)]">Copies</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setCopies(Math.max(1, copies - 1))} className="w-[35px] h-[35px] border border-[var(--line)] rounded-lg flex items-center justify-center font-bold bg-transparent cursor-pointer hover:bg-gray-50">
                  -
                </button>
                <strong className="font-[family:var(--font-dm-mono)] text-lg">{copies}</strong>
                <button onClick={() => setCopies(Math.min(20, copies + 1))} className="w-[35px] h-[35px] border border-[var(--line)] rounded-lg flex items-center justify-center font-bold bg-transparent cursor-pointer hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3.5 sm:items-center mt-5 pt-5 border-t border-[var(--line)]">
              <div className="text-xs text-[var(--muted)]">
                Pickup at<br/>
                <strong className="text-[var(--ink)] font-bold text-sm">
                  {selectedStore ? selectedStore.name : "Dhaka University / TSC"}
                </strong>
              </div>
              <button 
                onClick={() => {
                  setPrintSettings({ pages: numPages || 1, mode: modeLabel, finish: finishLabel, total });
                  router.push("/checkout");
                }}
                className="bg-[var(--green)] text-white border-0 rounded-xl px-5 py-3.5 font-extrabold shadow-[0_7px_18px_color-mix(in_srgb,var(--green)_22%,transparent)] hover:bg-[var(--green-2)] transition-colors w-full sm:w-auto cursor-pointer">
                Continue · ৳{total.toFixed(2)}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
