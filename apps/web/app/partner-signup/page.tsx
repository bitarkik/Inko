"use client";

import { useState } from "react";
import { Store, MapPin, Banknote, CheckCircle, Clock, List, Map } from "lucide-react";
import dynamic from "next/dynamic";

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
    openTime: "09:00 AM",
    closeTime: "06:00 PM",
    services: "B&W Print, Color Print",
  });
  
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

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
          openTime: formData.openTime,
          closeTime: formData.closeTime,
          services: formData.services.split(',').map(s => s.trim()),
          basePrice: parseFloat(formData.basePrice)
        })
      });

      if (!response.ok) throw new Error("Failed to create store");
      setSuccessId(generatedId);
      
      // Auto prompt to download the desktop agent
      const link = document.createElement("a");
      link.href = "/PrintPanda-Agent-Setup.exe"; // Placeholder path
      link.download = "PrintPanda-Agent-Setup.exe";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
                <li>We've automatically started downloading the PrintPanda Agent `.exe`</li>
                <li>Install it on your print shop computer</li>
                <li>Type this exact 12-character ID into the Agent: <br/><strong className="bg-white px-2 py-1 rounded text-lg font-mono text-blue-900 mt-2 inline-block border border-blue-200">{successId}</strong></li>
              </ol>
            </div>
            
            <button 
              onClick={() => window.location.href = '/partner'}
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Go to Partner Dashboard
            </button>
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
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
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
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          type="text"
                          value={formData.openTime}
                          onChange={(e) => setFormData({...formData, openTime: e.target.value})}
                          placeholder="09:00 AM"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Close Time</label>
                      <input
                        required
                        type="text"
                        value={formData.closeTime}
                        onChange={(e) => setFormData({...formData, closeTime: e.target.value})}
                        placeholder="06:00 PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address (Manual)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin size={18} className="text-gray-400" />
                        </div>
                        <input
                          required
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="e.g. 123 Main St, Dhaka"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Map size={16} className="mr-1 text-gray-500" />
                      GPS Map Location
                    </label>
                    <MapPicker onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
                    {location && (
                      <p className="text-xs text-green-600 mt-2 font-mono bg-green-50 p-2 rounded border border-green-100">
                        GPS Captured: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                      </p>
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
