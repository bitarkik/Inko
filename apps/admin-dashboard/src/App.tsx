import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, TrendingUp, Clock, FileText } from 'lucide-react';

interface StoreStat {
  id: string;
  name: string;
  createdAt: string;
  lastPingAt: string | null;
  isActive: boolean;
  revenue: number;
  completedJobs: number;
}

interface PlatformStats {
  totalRevenue: number;
  totalCompletedJobs: number;
  totalColorPages: number;
  totalBwPages: number;
}

function App() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [stores, setStores] = useState<StoreStat[]>([]);
  const [topPerformers, setTopPerformers] = useState<StoreStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would be an env variable like import.meta.env.VITE_API_URL
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/stats');
        const data = await res.json();
        setStats(data.platformStats);
        setStores(data.allStores);
        setTopPerformers(data.topPerformers);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    // Refresh every 10 seconds to show active agents
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">Loading Master Dashboard...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1b0a38] text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="font-bold text-xl tracking-wider">PRINTPANDA OS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-3 bg-white/10 rounded-lg text-sm font-medium">
            <LayoutDashboard className="mr-3 h-5 w-5 text-blue-400" />
            Platform Overview
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-medium">
            <Users className="mr-3 h-5 w-5 text-gray-400" />
            All Stores
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Master Dashboard</h1>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">Platform Total Revenue</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mt-4">${stats?.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">Total Jobs Completed</h3>
              <LayoutDashboard className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mt-4">{stats?.totalCompletedJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">Color Pages Printed</h3>
              <FileText className="h-5 w-5 text-pink-500" />
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mt-4">{stats?.totalColorPages}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">B&W Pages Printed</h3>
              <FileText className="h-5 w-5 text-gray-700" />
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mt-4">{stats?.totalBwPages}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Stores Monitor */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Live Agent Fleet Status
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Store Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Agent Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Signup Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Jobs</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {stores.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No stores registered yet.</td></tr>
                  ) : stores.map(store => (
                    <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`h-2.5 w-2.5 rounded-full mr-2 ${store.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                          <span className="text-sm text-gray-600 font-medium">
                            {store.isActive ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        {store.lastPingAt && (
                          <div className="text-xs text-gray-400 mt-1">
                            Ping: {new Date(store.lastPingAt).toLocaleTimeString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(store.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.completedJobs}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${store.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
            </div>
            <div className="p-0">
              {topPerformers.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">No data yet.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {topPerformers.map((store, index) => (
                    <li key={store.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          index === 1 ? 'bg-gray-100 text-gray-600' : 
                          index === 2 ? 'bg-orange-100 text-orange-800' : 
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{store.name}</p>
                          <p className="text-xs text-gray-500">{store.completedJobs} orders</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">${store.revenue.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
