"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Settings, FileText, Printer, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function PartnerDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // We mock the login by hardcoding the downtown store ID for the demo
  const DOWNTOWN_STORE_ID = "downtown";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`http://localhost:3000/stores/${DOWNTOWN_STORE_ID}/dashboard`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboard();
    // Refresh every 10 seconds to show live orders
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold mr-3">P</div>
          <span className="font-bold text-lg tracking-tight">Partner Portal</span>
        </div>
        <div className="p-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Store
        </div>
        <div className="px-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="font-medium text-sm">{data?.store?.name || "Downtown Tech Hub"}</div>
            <div className="text-xs text-green-400 flex items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Agent Online
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="#" className="flex items-center px-3 py-2.5 bg-blue-600 rounded-lg text-sm font-medium">
            <LayoutDashboard size={18} className="mr-3" />
            Live Orders
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <FileText size={18} className="mr-3 text-gray-400" />
            History
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <Printer size={18} className="mr-3 text-gray-400" />
            Hardware Status
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <Settings size={18} className="mr-3 text-gray-400" />
            Settings
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
          <h1 className="text-xl font-bold text-gray-900">Live Orders</h1>
          <div className="text-sm text-gray-500">Auto-refreshing every 10s</div>
        </header>

        <div className="p-8 flex-1 overflow-auto">
          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Revenue</div>
              <div className="text-3xl font-bold text-gray-900">${data?.analytics?.totalRevenue?.toFixed(2) || "0.00"}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500 mb-1">Completed Jobs</div>
              <div className="text-3xl font-bold text-gray-900">{data?.analytics?.completedJobs || 0}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Local Agent</div>
                <div className="text-lg font-bold text-green-600 flex items-center">
                  <CheckCircle size={18} className="mr-2" /> Connected
                </div>
              </div>
            </div>
          </div>

          {/* ORDERS TABLE */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Queue</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {data?.recentOrders?.length || 0} Jobs
              </span>
            </div>
            
            {(!data?.recentOrders || data.recentOrders.length === 0) ? (
              <div className="p-12 text-center text-gray-500">
                <Printer size={48} className="mx-auto text-gray-300 mb-4" />
                <p>No recent orders. Waiting for customers...</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Created At</th>
                    <th className="px-6 py-3">File Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-900">#{order.id.slice(0,8)}</td>
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleTimeString()}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 line-clamp-1">{order.fileUrl ? order.fileUrl.split('/').pop() : "Document"}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">${order.totalPrice?.toFixed(2) || "0.00"}</td>
                      <td className="px-6 py-4">
                        {order.status === 'QUEUED' && (
                          <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md text-xs font-medium w-max">
                            <Clock size={14} className="mr-1" /> Queued
                          </span>
                        )}
                        {order.status === 'PRINTING' && (
                          <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs font-medium w-max">
                            <Printer size={14} className="mr-1" /> Printing
                          </span>
                        )}
                        {order.status === 'READY_TO_PICKUP' && (
                          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-medium w-max">
                            <CheckCircle size={14} className="mr-1" /> Ready for Pickup
                          </span>
                        )}
                        {order.status === 'COMPLETED' && (
                          <span className="flex items-center text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs font-medium w-max">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.status === 'READY_TO_PICKUP' ? (
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Mark Picked Up</button>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
