"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Store, MapPin, Banknote, CheckCircle, Clock, List, Map, Download, Copy, Search, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { OpenLocationCode } from 'open-location-code';

// @ts-ignore - The @types package wrongly declares methods as static, bypassing TS here
const olc = new OpenLocationCode();

const MapPicker = dynamic(() => import("../components/MapPicker"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-500">Loading map...</div>
});

export default function PartnerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    area: "",
    basePrice: "2",
    openTime: "09:00",
    closeTime: "18:00",
    services: "B&W Print, Color Print",
    ownerName: "",
    contactNumber: "",
    email: "",
  });
  
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapTarget, setMapTarget] = useState<{lat: number, lng: number} | null>(null);
  const [locationName, setLocationName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const skipSearchRef = useRef(false);

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

  // Reverse geocode when map pin changes (Debounced to prevent API rate limits)
  useEffect(() => {
    if (!location) return;

    setLocationName("Loading precise address...");
    
    // We use a 1.5 second debounce to prevent spamming the Nominatim API
    const timeoutId = setTimeout(() => {
      // Added zoom=18 for street level precision and email parameter to comply with openstreetmap rate limits
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1&email=hello@printpanda.app`)
        .then(res => {
          if (res.status === 429) throw new Error("Rate limited by mapping provider");
          return res.json();
        })
        .then(data => {
          if (data && data.address) {
            setLocationName(data.display_name || "");
            setFormData(prev => ({
              ...prev,
              address: data.display_name || prev.address,
              city: data.address.city || data.address.town || data.address.state || prev.city,
              area: data.address.suburb || data.address.neighbourhood || data.address.county || prev.area
            }));
          } else {
            throw new Error("Invalid address format returned");
          }
        })
        .catch(err => {
          console.error("Geocoding error:", err);
          setLocationName(`Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`);
        });
    }, 1200); // 1.2 second debounce

    return () => clearTimeout(timeoutId);
  }, [location]);

  // Forward Search Geocoding (Debounced)
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
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}&countrycodes=bd&limit=5&addressdetails=1&email=hello@printpanda.app`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data || []);
          setIsSearching(false);
        })
        .catch(err => {
          console.error("Search error:", err);
          setIsSearching(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.address]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDropdown(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultSelect = (item: any) => {
    skipSearchRef.current = true;
    setFormData(prev => ({...prev, address: item.display_name}));
    setSearchResults([]);
    setShowDropdown(false);
    setMapTarget({ lat: parseFloat(item.lat), lng: parseFloat(item.lon) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate exactly 12 characters store ID
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
          services: formData.services.split(',').map(s => s.trim()),
          basePrice: parseFloat(formData.basePrice),
          ownerName: formData.ownerName,
          contactNumber: formData.contactNumber,
          email: formData.email
        })
      });

      if (!response.ok) throw new Error("Failed to create store");
      setSuccessId(generatedId);
    } catch (err) {
      alert("Error creating store: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        
        {successId ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Created!</h2>
            <p className="text-gray-600 mb-6">Your store is now live on the network.</p>
            
            <div className="bg-blue-50 p-4 rounded-xl text-left border border-blue-100 mb-6">
              <p className="text-sm text-blue-900 font-semibold mb-2">Next Steps:</p>
              <ol className="text-sm text-blue-800 list-decimal pl-4 space-y-2">
                <li>Download the PrintPanda Agent `.exe` using the button below.</li>
                <li>Install it on your print shop computer.</li>
                <li>Type this exact 12-character ID into the Agent: <br/>
                  <div className="flex items-center gap-2 mt-2">
                    <strong className="bg-white px-3 py-1.5 rounded text-lg font-mono text-blue-900 inline-block border border-blue-200 shadow-sm">{successId}</strong>
                    <button 
                      onClick={handleCopy}
                      className="p-1.5 bg-white border border-blue-200 rounded text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center relative"
                      title="Copy ID"
                    >
                      <Copy size={18} />
                      {copied && <span className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded">Copied!</span>}
                    </button>
                  </div>
                </li>
                {plusCode && (
                  <li className="mt-2">
                    Share your Plus Code: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">{plusCode}</strong> so customers can find you easily.
                  </li>
                )}
              </ol>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href="https://github.com/bitarkik/Inko/releases/latest/download/PrintPanda-Agent-Setup.exe"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Download className="mr-2" size={20} />
                Download PrintPanda Agent (.exe)
              </a>
              <button 
                onClick={() => window.location.href = '/partner'}
                className="w-full bg-gray-100 text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Go to Partner Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Store size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Partner Onboarding</h1>
              <p className="text-gray-500 mt-1">Register your print shop on the PrintPanda network.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">1. Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Store size={18} className="text-gray-400" />
                      </div>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Mike's Print Shop"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (BDT)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Banknote size={18} className="text-gray-400" />
                      </div>
                      <input
                        required
                        type="number"
                        step="1"
                        min="1"
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                        placeholder="e.g. 2"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <input
                      required
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                      placeholder="e.g. +8801700000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g. shop@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-1">We will send your welcome pack and Agent setup link here.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Services (comma separated)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <List size={18} className="text-gray-400" />
                      </div>
                      <input
                        required
                        type="text"
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        placeholder="B&W Print, Color Print"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Open Time</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock size={18} className="text-gray-400" />
                        </div>
                        <input
                          required
                          type="time"
                          value={formData.openTime}
                          onChange={(e) => setFormData({...formData, openTime: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Close Time</label>
                      <input
                        required
                        type="time"
                        value={formData.closeTime}
                        onChange={(e) => setFormData({...formData, closeTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">2. Location</h3>
                <p className="text-sm text-gray-500">Provide the manual address and pinpoint your exact shop location on the map.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address (Search or Manual)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin size={18} className="text-gray-400" />
                        </div>
                        <input
                          required
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          onFocus={() => {
                            if (searchResults.length > 0 || formData.address.length >= 3) setShowDropdown(true);
                          }}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                          placeholder="e.g. 123 Main St, Dhaka"
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                        />
                        {isSearching && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Loader2 size={16} className="text-gray-400 animate-spin" />
                          </div>
                        )}
                        {showDropdown && (
                          <div className="absolute top-full left-0 z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                            {searchResults.length > 0 ? (
                              <ul className="max-h-60 overflow-auto">
                                {searchResults.map((result: any, i: number) => (
                                  <li 
                                    key={i} 
                                    onMouseDown={() => handleResultSelect(result)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800 border-b border-gray-50 last:border-0"
                                  >
                                    <div className="flex items-start gap-2">
                                      <Search size={14} className="mt-0.5 text-gray-400 shrink-0" />
                                      <span>{result.display_name}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : formData.address.length >= 3 && !isSearching ? (
                              <div className="px-4 py-3 text-sm text-gray-500">No results found.</div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          required
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="City"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                        <input
                          required
                          type="text"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                          placeholder="Area"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Map size={16} className="mr-1 text-gray-500" />
                      GPS Map Location
                    </label>
                    <MapPicker onLocationSelect={handleLocationSelect} targetPosition={mapTarget} />
                    {location && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-green-700 font-semibold mb-1">Location Captured Successfully!</p>
                        <p className="text-xs text-green-600 leading-snug mb-1">{locationName || `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`}</p>
                        {plusCode && (
                          <p className="text-xs text-green-800 font-medium">Plus Code: <strong className="font-mono">{plusCode}</strong> — share this so customers can find you</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3.5 rounded-xl transition-colors text-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                >
                  {isSubmitting ? "Creating Store..." : "Register Store"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
