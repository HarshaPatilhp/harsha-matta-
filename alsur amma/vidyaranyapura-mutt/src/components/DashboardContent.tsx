'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Booking {
  id: number;
  sevaName: string;
  devoteeName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  qrCode: string;
}

interface LunchAttendance {
  id: number;
  name: string;
  phone: string;
  checkedIn: boolean;
  checkInTime?: string;
  qrCode: string;
}

interface ScanHistory {
  id: number;
  bookingId: number;
  devoteeName: string;
  sevaName: string;
  scanTime: string;
  status: string;
}

export default function DashboardContent() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookings' | 'lunch' | 'qr' | 'volunteers'>('bookings');

  // Demo data - in real app, this would come from API
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('temple_bookings') || '[]');
    }
    return [];
  });

  const [lunchAttendance, setLunchAttendance] = useState<LunchAttendance[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('temple_lunch_attendance') || '[]');
    }
    return [];
  });

  const [volunteers, setVolunteers] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('temple_volunteers') || '[]');
    }
    return [];
  });
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({ name: '', email: '', phone: '' });

  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Real-time updates - poll for new bookings every 5 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const pollBookings = () => {
      const latestBookings = JSON.parse(localStorage.getItem('temple_bookings') || '[]');
      const latestLunch = JSON.parse(localStorage.getItem('temple_lunch_attendance') || '[]');

      // Check if there are new bookings
      if (latestBookings.length !== bookings.length) {
        setBookings(latestBookings);
      }

      // Check if there are new lunch attendance entries
      if (latestLunch.length !== lunchAttendance.length) {
        setLunchAttendance(latestLunch);
      }
    };

    // Initial poll
    pollBookings();

    // Set up polling interval
    const interval = setInterval(pollBookings, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, router, bookings.length, lunchAttendance.length]);

  const startQRScan = () => {
    setIsScanning(true);
    // In a real app, this would open camera and use a QR scanning library
    alert('Camera would open for QR scanning in production app');
  };

  const simulateScan = (qrCode: string) => {
    // Simulate scanning a QR code
    const booking = bookings.find(b => b.qrCode === qrCode);
    if (booking) {
      const newScan = {
        id: Date.now(),
        bookingId: booking.id,
        devoteeName: booking.devoteeName,
        sevaName: booking.sevaName,
        scanTime: new Date().toLocaleString(),
        status: 'verified'
      };
      setScanHistory([newScan, ...scanHistory]);
      alert(`Verified: ${booking.devoteeName} for ${booking.sevaName}`);
    } else {
      alert('Invalid QR code');
    }
  };

  const updateBookingStatus = (id: number, status: Booking['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));
  };

  const checkInLunch = (id: number) => {
    const updatedAttendance = lunchAttendance.map(person =>
      person.id === id
        ? { ...person, checkedIn: true, checkInTime: new Date().toLocaleTimeString() }
        : person
    );
    setLunchAttendance(updatedAttendance);
    localStorage.setItem('temple_lunch_attendance', JSON.stringify(updatedAttendance));
  };

  const addVolunteer = () => {
    if (newVolunteer.name && newVolunteer.email) {
      const volunteer = {
        id: Date.now(),
        ...newVolunteer,
        role: 'volunteer',
        createdAt: new Date().toISOString()
      };
      const updatedVolunteers = [...volunteers, volunteer];
      setVolunteers(updatedVolunteers);
      localStorage.setItem('temple_volunteers', JSON.stringify(updatedVolunteers));
      setNewVolunteer({ name: '', email: '', phone: '' });
      setShowAddVolunteer(false);
      alert('Volunteer added successfully!');
    }
  };

  const removeVolunteer = (id: number) => {
    if (confirm('Are you sure you want to remove this volunteer?')) {
      const updatedVolunteers = volunteers.filter(v => v.id !== id);
      setVolunteers(updatedVolunteers);
      localStorage.setItem('temple_volunteers', JSON.stringify(updatedVolunteers));
    }
  };

  if (!isAuthenticated || !user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const checkedInCount = lunchAttendance.filter(person => person.checkedIn).length;
  const totalLunch = lunchAttendance.length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
            <p className="text-gray-600">Role: {user.role === 'admin' ? 'Administrator' : 'Volunteer'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today's Date</p>
            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Total Bookings</h3>
          <p className="text-3xl font-bold text-orange-600">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Pending Bookings</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Lunch Attendance</h3>
          <p className="text-3xl font-bold text-blue-600">{checkedInCount}/{totalLunch}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Today's Sevas</h3>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('lunch')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'lunch'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lunch Attendance
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'qr'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              QR Code Management
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('volunteers')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'volunteers'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Volunteers
              </button>
            )}
          </nav>
        </div>

        <div className="p-6">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">All Seva Bookings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seva
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Devotee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.sevaName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.devoteeName}</div>
                          <div className="text-sm text-gray-500">{booking.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.date}</div>
                          <div className="text-sm text-gray-500">{booking.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Lunch Attendance Tab */}
          {activeTab === 'lunch' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Lunch Attendance</h3>
                <div className="text-sm text-gray-600">
                  Total Registered: {totalLunch} | Checked In: {checkedInCount}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lunchAttendance.map((person) => (
                  <div key={person.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.phone}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        person.checkedIn
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {person.checkedIn ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </div>
                    {person.checkedIn && person.checkInTime && (
                      <p className="text-sm text-gray-500">Check-in: {person.checkInTime}</p>
                    )}
                    {!person.checkedIn && (
                      <button
                        onClick={() => checkInLunch(person.id)}
                        className="mt-2 w-full bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-orange-700"
                      >
                        Check In
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code Management Tab */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">QR Code Management</h3>

              {/* QR Scanner Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">QR Code Scanner</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Scan QR codes to verify bookings and check-in devotees.
                    </p>
                    <button
                      onClick={startQRScan}
                      className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      {isScanning ? 'Scanning...' : 'Start QR Scanner'}
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300">
                    <p className="text-sm text-gray-500 text-center">
                      Camera feed would appear here in production
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual QR Code Entry */}
              <div className="bg-white rounded-lg p-6 border">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Manual QR Verification</h4>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter QR Code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        simulateScan((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Enter QR Code"]') as HTMLInputElement;
                      if (input.value) {
                        simulateScan(input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700"
                  >
                    Verify
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Press Enter or click Verify to check QR code</p>
              </div>

              {/* Scan History */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recent QR Scans</h4>
                {scanHistory.length === 0 ? (
                  <div className="p-4 border rounded-lg">
                    <p className="text-gray-600">No recent scans</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Devotee
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seva
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Scan Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scanHistory.slice(0, 10).map((scan: ScanHistory) => (
                          <tr key={scan.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {scan.devoteeName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scan.sevaName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scan.scanTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                {scan.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Volunteers Tab - Admin Only */}
          {user?.role === 'admin' && activeTab === 'volunteers' && (
            <VolunteersTab />
          )}

          {/* End of tabs */}
        </div>
      </div>
    </div>
  );
}

// VolunteersTab component
function VolunteersTab() {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('temple_volunteers') || '[]');
    }
    return [];
  });
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({ name: '', email: '', phone: '' });

  const addVolunteer = () => {
    if (newVolunteer.name && newVolunteer.email) {
      const volunteer = {
        id: Date.now(),
        ...newVolunteer,
        role: 'volunteer',
        createdAt: new Date().toISOString()
      };
      const updatedVolunteers = [...volunteers, volunteer];
      setVolunteers(updatedVolunteers);
      localStorage.setItem('temple_volunteers', JSON.stringify(updatedVolunteers));
      setNewVolunteer({ name: '', email: '', phone: '' });
      setShowAddVolunteer(false);
      alert('Volunteer added successfully!');
    }
  };

  const removeVolunteer = (id: number) => {
    if (confirm('Are you sure you want to remove this volunteer?')) {
      const updatedVolunteers = volunteers.filter(v => v.id !== id);
      setVolunteers(updatedVolunteers);
      localStorage.setItem('temple_volunteers', JSON.stringify(updatedVolunteers));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Volunteer Management</h3>
        <button
          onClick={() => setShowAddVolunteer(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700"
        >
          Add Volunteer
        </button>
      </div>

      {/* Add Volunteer Modal */}
      {showAddVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">Add New Volunteer</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newVolunteer.name}
                  onChange={(e) => setNewVolunteer({...newVolunteer, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter volunteer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newVolunteer.email}
                  onChange={(e) => setNewVolunteer({...newVolunteer, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                <input
                  type="tel"
                  value={newVolunteer.phone}
                  onChange={(e) => setNewVolunteer({...newVolunteer, phone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddVolunteer(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addVolunteer}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Add Volunteer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No volunteers added yet
                </td>
              </tr>
            ) : (
              volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {volunteer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {volunteer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {volunteer.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(volunteer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => removeVolunteer(volunteer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
