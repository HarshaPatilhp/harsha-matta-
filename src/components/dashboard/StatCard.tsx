import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  Icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, subtitle, Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700/50 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1.5">{value}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
