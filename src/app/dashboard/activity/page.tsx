"use client";

import { useState, useEffect } from 'react';
import { Calendar, Filter, Clock, CheckCircle, Search } from 'lucide-react';

interface Activity {
  id: string;
  type: 'check_in' | 'seva_completed' | 'system_alert';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Dummy Data
    setActivities([
      { id: '1', type: 'check_in', title: 'QR Check-in', description: 'Ashutosh Kumar checked in for Heavy Vehicle Pooja.', timestamp: '10:58 AM, Today', user: 'Scanner Terminal 1' },
      { id: '2', type: 'seva_completed', title: 'Seva Completed', description: 'Panchamrutha Abhisheka batch 2 completed.', timestamp: '10:30 AM, Today', user: 'Admin' },
      { id: '3', type: 'check_in', title: 'QR Check-in', description: 'Priya Sharma checked in for Rudra Homa.', timestamp: '10:15 AM, Today', user: 'Scanner Terminal 1' },
      { id: '4', type: 'system_alert', title: 'System Notice', description: 'Mutt opened for devotees.', timestamp: '06:00 AM, Today', user: 'System' },
      { id: '5', type: 'check_in', title: 'Manual Check-in', description: 'Rahul Varma checked in without QR.', timestamp: '09:20 AM, Yesterday', user: 'Srinivas (Volunteer)' },
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'check_in': return <Clock className="h-5 w-5 text-emerald-600" />;
      case 'seva_completed': return <CheckCircle className="h-5 w-5 text-amber-500" />;
      default: return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'check_in': return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800/50';
      case 'seva_completed': return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800/50';
      default: return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Audit trail of all actions and check-ins within the system.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
             <Filter size={16} /> Filter
           </button>
           <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
             Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
        {/* Timeline */}
        <div className="p-6">
          <div className="relative border-l-2 border-gray-100 dark:border-slate-700/50 ml-4 md:ml-6 space-y-8 pl-8 md:pl-10 before:hidden">
            
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative group">
                {/* Connector dot */}
                <div className={`absolute -left-[45px] md:-left-[52px] top-1 h-10 w-10 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 ${getTypeStyle(activity.type)}`}>
                  {getTypeIcon(activity.type)}
                </div>

                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-5 border border-gray-100 dark:border-slate-700/50 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activity.title}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{activity.description}</p>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-slate-700/50">
                    <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-white dark:border-slate-600">
                      {activity.user.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">By {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-slate-700/50 text-center bg-gray-50/50 dark:bg-slate-800/30">
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">
            Load Older Activity ↓
          </button>
        </div>
      </div>
    </div>
  );
}
