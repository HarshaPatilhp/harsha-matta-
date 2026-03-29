"use client";

import { useAuth } from '@/contexts/AuthContext';
import { RefreshCw, Users, BookOpen, Gift, ShieldCheck, QrCode, Clock, ArrowRight } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Dummy data
  const stats = [
    { title: 'Total Devotees Today', value: '207', Icon: Users, trend: { value: '12% today', isPositive: true }, subtitle: 'Active footfall' },
    { title: 'Sevas Completed', value: '163', Icon: BookOpen, trend: { value: '5% more', isPositive: true }, subtitle: 'Of 180 booked' },
    { title: 'Donation Count', value: '45', Icon: Gift, subtitle: '₹12,450 total today' },
    { title: 'Mutt Status', value: 'Open', Icon: ShieldCheck, subtitle: 'Closes at 9:00 PM' },
  ];

  const quickActions = [
    { title: 'QR Scanner', href: '/dashboard/scanner', description: 'Scan participant QR codes', icon: QrCode, live: true, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Devotees List', href: '/dashboard/devotees', description: 'View and manage participants', icon: Users, live: false, color: 'text-amber-500', bg: 'bg-amber-100' },
    { title: 'Activity Log', href: '/dashboard/activity', description: 'View event activity history', icon: Clock, live: false, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  const recentCheckins = [
    { id: 1, name: 'Ashutosh Kumar', time: '10:58 AM', seva: 'Panchamrutha Abhisheka', status: 'Checked In' },
    { id: 2, name: 'Priya Sharma', time: '10:45 AM', seva: 'Rudra Homa', status: 'Checked In' },
    { id: 3, name: 'Srinivas Rao', time: '09:30 AM', seva: 'Navagraha Shanti', status: 'Completed' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Vidyaranyapura Mutt Panel
          </h1>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider flex items-center gap-2">
            <span>Event Tag: <span className="text-gray-500 dark:text-gray-400">vidyaranyapura-mutt</span></span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </p>
        </div>
        
        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm">
          <RefreshCw size={18} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Event Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link 
                key={action.title} 
                href={action.href}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex items-start gap-5"
              >
                <div className={`p-4 rounded-xl ${action.bg} dark:bg-opacity-20 ${action.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{action.title}</h3>
                    {action.live && (
                      <span className="bg-red-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full animate-pulse">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug pr-4">{action.description}</p>
                </div>
                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={20} className="text-gray-300" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Check-ins</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {recentCheckins.map((checkin) => (
              <div key={checkin.id} className="p-5 hover:bg-gray-50/80 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/50">
                    {checkin.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{checkin.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {checkin.time} <span className="text-gray-300 dark:text-gray-600 mx-1">•</span> {checkin.seva}
                    </p>
                  </div>
                </div>
                <div>
                   <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    checkin.status === 'Completed' 
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    {checkin.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 border-t border-gray-100 dark:border-slate-700/50 text-center">
            <Link href="/dashboard/activity" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-amber-500 dark:hover:text-amber-400 uppercase tracking-widest transition-colors">
              View All Activity →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
