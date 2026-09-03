"use client";

import { useState } from "react";

export default function UploadOrder() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);
    
    // Append dummy pricing data required by the CreateOrderDto
    formData.append("totalPages", "10");
    formData.append("colorPages", "2,4");
    formData.append("bwPages", "1,3,5,6,7,8,9,10");
    formData.append("totalPrice", "5.50");

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: formData,
        // We purposely do not set Content-Type so the browser sets it to multipart/form-data with the correct boundary automatically
      });

      if (!response.ok) {
        throw new Error("Upload failed: " + response.statusText);
      }

      setStatus("Order uploaded successfully!");
    } catch (error: any) {
      setStatus("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto", border: "1px solid #eaeaea", borderRadius: "10px", marginTop: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "1.5rem", fontFamily: "sans-serif" }}>Submit Print Order</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="document" style={{ display: "block", marginBottom: "0.5rem", fontFamily: "sans-serif", fontWeight: "bold" }}>Select PDF Document:</label>
          <input 
            type="file" 
            id="document" 
            name="document" 
            accept="application/pdf" 
            required 
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: "0.75rem", 
            backgroundColor: isLoading ? "#ccc" : "#0070f3", 
            color: "white", 
            border: "none", 
            borderRadius: "6px", 
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          {isLoading ? "Uploading..." : "Upload Order"}
        </button>
      </form>
      {status && (
        <p style={{ 
          marginTop: "1.5rem", 
          padding: "1rem", 
          backgroundColor: status.includes("Error") ? "#ffebee" : "#e8f5e9",
          color: status.includes("Error") ? "#c62828" : "#2e7d32",
          borderRadius: "6px",
          fontFamily: "sans-serif"
        }}>
          {status}
        </p>
      )}
    </div>
  );
}
