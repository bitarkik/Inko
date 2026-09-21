"use client";

import { useState } from "react";
import { Store, MapPin, DollarSign, CheckCircle } from "lucide-react";

export default function PartnerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    basePrice: "0.50",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate a simple unique ID from the store name
    const generatedId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedId,
          name: formData.name,
          address: formData.address,
          basePrice: parseFloat(formData.basePrice)
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {successId ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Created!</h2>
            <p className="text-gray-600 mb-6">Your store is now live on the customer map.</p>
            
            <div className="bg-blue-50 p-4 rounded-xl text-left border border-blue-100 mb-6">
              <p className="text-sm text-blue-900 font-semibold mb-2">Next Steps:</p>
              <ol className="text-sm text-blue-800 list-decimal pl-4 space-y-2">
                <li>Download the PrintPanda Agent `.exe`</li>
                <li>Install it on your print shop computer</li>
                <li>Type this exact ID into the Agent: <br/><strong className="bg-white px-2 py-1 rounded text-lg font-mono text-blue-900 mt-2 inline-block border border-blue-200">{successId}</strong></li>
              </ol>
            </div>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Go to Customer Homepage
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

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="e.g. 123 Main St, New York, NY"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Page ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} className="text-gray-400" />
                  </div>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-3 rounded-xl transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isSubmitting ? "Creating Store..." : "Register Store"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
