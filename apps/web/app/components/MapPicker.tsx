"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true} 
      eventHandlers={{ dragend: (e) => setPosition(e.target.getLatLng()) }} 
    />
  );
}

function MapController({ center }: { center: L.LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  
  useEffect(() => {
    // Fix leaflet grey box issue when rendering inside dynamic containers
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
  return null;
}

export default function MapPicker({ 
  onLocationSelect,
  targetPosition
}: { 
  onLocationSelect: (lat: number, lng: number) => void;
  targetPosition?: { lat: number, lng: number } | null;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (targetPosition) {
      setPosition(new L.LatLng(targetPosition.lat, targetPosition.lng));
    }
  }, [targetPosition]);

  useEffect(() => {
    if (position) {
      onLocationSelect(position.lat, position.lng);
    }
  }, [position, onLocationSelect]);

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = new L.LatLng(pos.coords.latitude, pos.coords.longitude);
        setPosition(newPos);
        setIsLocating(false);
      },
      (err) => {
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <button 
        type="button" 
        onClick={handleLocateMe}
        disabled={isLocating}
        className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
      >
        <MapPin size={18} />
        {isLocating ? "Finding Location..." : "Use Current Location"}
      </button>
      
      <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
        <MapContainer 
          center={[23.8103, 90.4125]} // Default to Dhaka 
          zoom={12} 
          scrollWheelZoom={true} 
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
          <MapController center={position} />
        </MapContainer>
      </div>
      <p className="text-xs text-gray-500 text-center">You can also click on the map to place a pin manually.</p>
    </div>
  );
}
