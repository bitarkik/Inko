"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Settings, CreditCard, Menu, User, CheckCircle, ChevronDown, Repeat } from "lucide-react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState<"store-selection" | "setup" | "success">("store-selection");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isColor, setIsColor] = useState(false);
  const [isTwoSided, setIsTwoSided] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [orderPin, setOrderPin] = useState<string>("");
  
  // Dummy data
  const basePrice = selectedStore === "library" ? 0.3 : 0.5;
  const colorMultiplier = isColor ? 3 : 1;
  const sidedMultiplier = isTwoSided ? 0.8 : 1;
  const total = file ? (basePrice * colorMultiplier * sidedMultiplier).toFixed(2) : "0.00";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePayAndPrint = async () => {
    if (!file || !selectedStore) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("document", file);
    formData.append("storeId", selectedStore);
    formData.append("totalPages", "10"); // Dummy for now
    formData.append("colorPages", isColor ? "1,2,3,4,5,6,7,8,9,10" : "");
    formData.append("bwPages", isColor ? "" : "1,2,3,4,5,6,7,8,9,10");
    formData.append("totalPrice", total);

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      // Generate random PIN
      setOrderPin(Math.floor(1000 + Math.random() * 9000).toString());
      setStep("success");
    } catch (error) {
      alert("Error uploading document: " + error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24 lg:pb-0">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">P</div>
            <span className="font-bold text-xl tracking-tight">PrintShop</span>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)} className="p-2 -mr-2 text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <User size={24} />
              </button>
            ) : (
              <button onClick={() => setIsLoggedIn(true)} className="p-2 -mr-2 text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button className="text-gray-900 hover:text-blue-600 transition-colors">New Print</button>
            <button className="text-gray-500 hover:text-blue-600 transition-colors">Print History</button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2 cursor-pointer ml-4 pl-4 border-l border-gray-200" onClick={() => setIsLoggedIn(false)}>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <User size={16} />
                </div>
                <span>Jane Doe</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="ml-4 pl-4 border-l border-gray-200 text-blue-600 hover:text-blue-700 font-semibold min-h-[44px] flex items-center"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        
        {step === "store-selection" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Where do you want to print?</h1>
              <p className="text-gray-500">Select a partner location to see live pricing and capabilities.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div 
                className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
                onClick={() => { setSelectedStore("downtown"); setStep("setup"); }}
              >
                <div>
                  <h3 className="font-bold text-lg group-hover:text-blue-700">Downtown Tech Hub</h3>
                  <p className="text-sm text-gray-500 mt-1">1.2 miles away • Premium Quality</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$0.50<span className="text-sm font-normal text-gray-500">/pg</span></div>
                </div>
              </div>

              <div 
                className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
                onClick={() => { setSelectedStore("library"); setStep("setup"); }}
              >
                <div>
                  <h3 className="font-bold text-lg group-hover:text-blue-700">University Library Shop</h3>
                  <p className="text-sm text-gray-500 mt-1">3.5 miles away • Student Discount</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$0.30<span className="text-sm font-normal text-gray-500">/pg</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "setup" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT COLUMN: Upload & History */}
            <div className="w-full lg:flex-1 flex flex-col gap-8">
              
              {/* Upload Zone */}
              <section>
                <h1 className="text-2xl font-bold mb-4">Start a new print job</h1>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="application/pdf" 
                  className="hidden" 
                />
                <div 
                  className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[200px]
                    ${file ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {file ? (
                    <>
                      <FileText size={48} className="text-blue-600 mb-4" />
                      <h3 className="font-bold text-lg text-gray-900">{file.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button className="mt-4 text-sm text-blue-600 font-medium px-4 py-2 hover:bg-blue-100 rounded-lg transition-colors min-h-[44px]">Replace File</button>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={48} className="text-gray-400 mb-4" />
                      <h3 className="font-bold text-lg text-gray-900">Tap or drag files here</h3>
                      <p className="text-sm text-gray-500 mt-1">Supports PDF up to 50MB</p>
                      <button className="mt-6 bg-white border border-gray-200 shadow-sm text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]">
                        Browse Files
                      </button>
                    </>
                  )}
                </div>
                
                {/* Guest Banner */}
                {!isLoggedIn && (
                  <div className="mt-3 text-sm text-gray-500 text-center lg:text-left">
                    Printing as Guest. <button onClick={() => setIsLoggedIn(true)} className="text-blue-600 font-medium hover:underline p-1 -m-1 min-h-[44px]">Sign in</button> to save this to your print history.
                  </div>
                )}
              </section>

              {/* Logged-In History */}
              {isLoggedIn && (
                <section className="mt-4 lg:mt-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    Recent Prints
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 line-clamp-1">{i === 1 ? 'History_Essay_Draft.pdf' : 'Shipping_Labels.pdf'}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Oct 12 • {i === 1 ? 'B&W, 2-Sided' : 'Color, 1-Sided'}</p>
                          </div>
                        </div>
                        <button className="mt-4 flex items-center justify-center gap-2 w-full bg-blue-50 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors min-h-[44px]">
                          <Repeat size={16} />
                          1-Click Reprint
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN: Settings & Pricing */}
            <div className="w-full lg:w-[380px] lg:sticky lg:top-24 flex flex-col gap-6">
              
              {/* Settings Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Settings size={20} className="text-gray-400" />
                  Print Settings
                </h2>
                
                <div className="space-y-6">
                  {/* Color Toggle */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Color Mode</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button 
                        onClick={() => setIsColor(false)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md min-h-[44px] transition-colors ${!isColor ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Black & White
                      </button>
                      <button 
                        onClick={() => setIsColor(true)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md min-h-[44px] transition-colors ${isColor ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Color
                      </button>
                    </div>
                  </div>

                  {/* Sides Toggle */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Sides</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button 
                        onClick={() => setIsTwoSided(false)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md min-h-[44px] transition-colors ${!isTwoSided ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        1-Sided
                      </button>
                      <button 
                        onClick={() => setIsTwoSided(true)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md min-h-[44px] transition-colors ${isTwoSided ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        2-Sided
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Pricing Card */}
              <div className="hidden lg:block bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-gray-400" />
                  Order Summary
                </h2>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Total Price</span>
                  <span className="text-2xl font-bold">${total}</span>
                </div>
                <button 
                  disabled={!file || isUploading}
                  onClick={handlePayAndPrint}
                  className={`w-full py-3.5 rounded-xl font-bold text-lg min-h-[44px] transition-colors ${file ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {isUploading ? "Processing..." : "Pay & Print"}
                </button>
              </div>

            </div>
          </div>
        )}

        {step === "success" && (
          <div className="max-w-md mx-auto mt-8 lg:mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-green-50 p-8 text-center border-b border-green-100">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Ready for pickup!</h2>
              <p className="text-green-700 font-medium">Head to the front counter.</p>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Order PIN</p>
                <div className="text-4xl font-mono font-bold tracking-widest text-gray-900">
                  {orderPin}
                </div>
              </div>

              {/* Mock QR Code */}
              <div className="w-48 h-48 bg-gray-900 rounded-xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden">
                 <div className="absolute inset-2 border-4 border-dashed border-gray-700 rounded-lg"></div>
                 <div className="grid grid-cols-4 grid-rows-4 gap-1 w-32 h-32 opacity-80">
                   {Array.from({ length: 16 }).map((_, i) => (
                     <div key={i} className={`bg-white rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                   ))}
                 </div>
              </div>

              {!isLoggedIn && (
                <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 text-left">
                  <h4 className="font-bold text-blue-900 mb-1 text-sm">Save your receipt and reprint this later?</h4>
                  <p className="text-xs text-blue-700 mb-3">Create a password to claim this account.</p>
                  <div className="flex gap-2">
                    <input type="password" placeholder="Password" className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-lg min-h-[44px] focus:outline-none focus:border-blue-500" />
                    <button className="bg-blue-600 text-white px-4 font-medium rounded-lg text-sm min-h-[44px] hover:bg-blue-700">Claim</button>
                  </div>
                </div>
              )}

              <button 
                onClick={() => { setStep("store-selection"); setFile(null); }}
                className="text-gray-500 font-medium hover:text-gray-900 min-h-[44px] px-4"
              >
                Start another print
              </button>
            </div>
          </div>
        )}

      </main>

      {/* MOBILE STICKY FOOTER */}
      {step === "setup" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 font-medium text-sm">Order Total</span>
            <span className="text-xl font-bold">${total}</span>
          </div>
          <button 
            disabled={!file || isUploading}
            onClick={handlePayAndPrint}
            className={`w-full py-3.5 rounded-xl font-bold text-lg min-h-[44px] transition-colors ${file ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            {isUploading ? "Processing..." : "Pay & Print"}
          </button>
        </div>
      )}
    </div>
  );
}
