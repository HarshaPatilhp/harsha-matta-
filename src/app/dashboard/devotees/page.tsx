"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';

// Using the same interface as the old DashboardContent to maintain compatibility if real data is hooked up
interface Booking {
  id: number;
  devoteeName: string;
  sevaName: string;
  phone: string;
  date: string;
  status: string;
}

export default function DevoteesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load from local storage or populate dummy data if empty
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('temple_bookings');
      if (stored && stored !== '[]') {
        setBookings(JSON.parse(stored));
      } else {
        // Dummy data for design
        setBookings([
          { id: 1774804335277, devoteeName: 'Ashutosh Kumar', sevaName: 'Heavy Vehicle Pooja', phone: '9876543210', date: '2023-10-10', status: 'completed' },
          { id: 1774804335278, devoteeName: 'Srinivas Rao', sevaName: 'Navagraha Shanti', phone: '9876543211', date: '2023-10-10', status: 'confirmed' },
          { id: 1774804335279, devoteeName: 'Priya Sharma', sevaName: 'Rudra Homa', phone: '9876543212', date: '2023-10-10', status: 'pending' },
          { id: 1774804335280, devoteeName: 'Lakshmi N', sevaName: 'Sathyanarayana Pooja', phone: '9876543213', date: '2023-10-11', status: 'confirmed' },
          { id: 1774804335281, devoteeName: 'Rahul Varma', sevaName: 'Panchamrutha Abhisheka', phone: '9876543214', date: '2023-10-11', status: 'completed' },
        ]);
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.devoteeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.sevaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Devotee Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and manage all registered devotees and their sevas.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          + Add New Devotee
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50 dark:bg-slate-800/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or seva..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-900 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 font-medium text-gray-700 dark:text-gray-300">
            <Filter size={18} />
            Filter Status
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/80 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-gray-100 dark:border-slate-700/50">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Devotee Name</th>
                <th className="px-6 py-4">Seva Info</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                      #{String(booking.id).slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center font-bold text-emerald-700 dark:text-emerald-400">
                          {booking.devoteeName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white leading-tight">{booking.devoteeName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{booking.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{booking.sevaName}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors ml-2" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors ml-2" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors ml-2">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-gray-300 mb-3" />
                      <p className="text-lg font-medium">No devotees found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700/50 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-slate-800/30">
          <span>Showing 1 to {Math.min(filteredBookings.length, 10)} of {filteredBookings.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded bg-emerald-600 text-white">1</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
