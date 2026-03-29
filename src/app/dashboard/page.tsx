import { Metadata } from 'next';
import DashboardContent from '@/components/DashboardContent';

export const metadata: Metadata = {
  title: 'Volunteer Dashboard | Mathaji Ulsooramma Raghavendra Swamy Mutt',
  description: 'Volunteer and administrator dashboard for managing bookings and attendance',
};

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Volunteer Dashboard
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Manage Bookings & Track Attendance
          </p>
          <p className="text-lg text-orange-100 max-w-3xl mx-auto">
            Access all seva bookings, monitor lunch attendance, and manage temple operations
            with our comprehensive volunteer management system.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Content */}
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
