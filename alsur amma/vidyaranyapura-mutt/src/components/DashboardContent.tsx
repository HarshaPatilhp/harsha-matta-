'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';

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
  const [activeTab, setActiveTab] = useState<'bookings' | 'qr' | 'volunteers'>('bookings');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status' | 'seva'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Demo data - in real app, this would come from API
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('temple_bookings') || '[]');
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

  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);

  // QR Scanner functions
  const startQRScan = async () => {
    console.log('Starting QR scan...');
    setIsScanning(true);
    setScanResult('');
  };

  const initializeQRScanner = async () => {
    if (!videoRef.current) {
      console.log('Video element not available');
      alert('Camera not available. Please refresh the page and try again.');
      setIsScanning(false);
      return;
    }

    try {
      console.log('Initializing QR scanner...');

      // Request camera permission and start scanning
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code detected:', result.data);
          setScanResult(result.data);
          simulateScan(result.data);
          stopQRScan();
        },
        {
          onDecodeError: (error) => {
            // Ignore decode errors, they're normal
            console.log('Decode error (normal):', error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScannerRef.current = qrScanner;
      await qrScanner.start();
      console.log('QR scanner started successfully');

    } catch (error) {
      console.error('Error starting QR scanner:', error);
      alert('Error accessing camera. Please check camera permissions and try again.');
      setIsScanning(false);
    }
  };

  const stopQRScan = () => {
    console.log('Stopping QR scan...');
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  // Simulate QR scan processing
  const showMemberEntryDialog = (bookingId: number, totalMembers: number) => {
    const enteredCount = prompt(`Member Entry Tracking\n\nTotal registered: ${totalMembers} members\n\nHow many members have actually entered? (0-${totalMembers})`);
    
    if (enteredCount !== null) {
      const count = parseInt(enteredCount);
      if (!isNaN(count) && count >= 0 && count <= totalMembers) {
        // Update booking with member entry info
        const updatedBookings = bookings.map(booking => 
          booking.id === bookingId 
            ? { 
                ...booking, 
                membersEntered: count,
                memberEntryTime: new Date().toLocaleString()
              }
            : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));
        
        const status = count === totalMembers ? 'All members entered' : `${count}/${totalMembers} members entered`;
        alert(`✅ Member entry recorded!\n\n${status}`);
      } else {
        alert('Invalid number. Please enter a number between 0 and ' + totalMembers);
        // Retry the dialog
        setTimeout(() => showMemberEntryDialog(bookingId, totalMembers), 100);
      }
    }
  };

  const simulateScan = (qrCode: string) => {
    try {
      // Parse QR code data (assuming it's JSON format from email QR codes)
      let bookingData;
      try {
        bookingData = JSON.parse(qrCode);
      } catch {
        // If not JSON, treat as booking ID
        const booking = bookings.find(b => b.qrCode === qrCode || b.id.toString() === qrCode);
        if (booking) {
          bookingData = booking;
        } else {
          alert('Invalid QR code. Booking not found.');
          return;
        }
      }

      // Update booking status if found
      if (bookingData && bookingData.id) {
        const bookingIndex = bookings.findIndex(b => b.id === bookingData.id);
        if (bookingIndex !== -1) {
          const updatedBookings = [...bookings];
          updatedBookings[bookingIndex] = {
            ...updatedBookings[bookingIndex],
            status: 'completed' as const
          };
          setBookings(updatedBookings);
          localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));

          // Determine additional information
          const lunchCount = bookingData.lunchCount || (bookingData.lunchRequired ? bookingData.numberOfPeople : 0);
          const lunchInfo = lunchCount > 0 ? `${lunchCount} people registered for lunch` : 'No lunch registered';
          const gotra = bookingData.gotra || '';

          // Check if Brahmin based on gotra (common Brahmin gotras)
          const brahminGotras = [
            'kashyapa', 'kashyap', 'kashyapa', 'kashyap',
            'vasishta', 'vashishta', 'vasistha', 'vashistha',
            'vikramaditya', 'vikramaditya',
            'bharadwaja', 'bharadwaj', 'bharadwaja', 'bharadwaj',
            'gautama', 'gautam', 'goutama', 'goutam',
            'atri', 'atray', 'atri',
            'vishwamitra', 'vishwamitra',
            'jamadagni', 'jamadagni',
            'agastya', 'agastya',
            'koundina', 'koundinya'
          ];

          const isBrahmin = gotra && brahminGotras.some(bg =>
            gotra.toLowerCase().includes(bg.toLowerCase())
          );

          const brahminInfo = isBrahmin ? 'Yes - Brahmin' : gotra ? 'No - Non-Brahmin' : 'Unknown';

          // Add to scan history
          const scanEntry: ScanHistory = {
            id: Date.now(),
            bookingId: bookingData.id,
            devoteeName: bookingData.devoteeName || bookingData.fullName,
            sevaName: bookingData.sevaName,
            scanTime: new Date().toLocaleString(),
            status: 'Verified'
          };
          setScanHistory(prev => [scanEntry, ...prev]);

          // Send completion email with review request
          sendCompletionEmail(bookingData);

          // Enhanced alert with lunch and caste information
          const numberOfPeople = parseInt(bookingData.numberOfPeople) || 1;
          const memberEntryMessage = numberOfPeople > 1 
            ? `\n\n📝 Member Entry Tracking:\n${numberOfPeople} members registered. Please mark how many have actually entered.`
            : '';

          alert(`✅ Booking Verified Successfully!\n\n` +
                `👤 Devotee: ${bookingData.devoteeName || bookingData.fullName}\n` +
                `🙏 Seva: ${bookingData.sevaName}\n` +
                `👥 Number of People: ${bookingData.numberOfPeople}\n` +
                `🍽️ Lunch: ${lunchInfo}\n` +
                `🕉️ Brahmin Status: ${brahminInfo}\n` +
                `📅 Date: ${new Date(bookingData.date).toLocaleDateString()}\n` +
                `🆔 Booking ID: ${bookingData.id}` +
                memberEntryMessage);

          // If multiple people, show member entry dialog
          if (numberOfPeople > 1) {
            setTimeout(() => {
              showMemberEntryDialog(bookingData.id, numberOfPeople);
            }, 100);
          }
        } else {
          alert('Booking not found in the system.');
        }
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      alert('Error processing QR code. Please try again.');
    }
  };

  // Cleanup QR scanner on unmount
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  // Initialize QR scanner when video element is available and scanning is enabled
  useEffect(() => {
    if (isScanning && videoRef.current) {
      console.log('Video element available, initializing scanner...');
      initializeQRScanner();
    }
  }, [isScanning]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Real-time updates - poll for new bookings every 5 seconds
  const [lastUpdateTime, setLastUpdateTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    if (!isAuthenticated) return;

    const pollBookings = () => {
      const latestBookings = JSON.parse(localStorage.getItem('temple_bookings') || '[]');

      // Check if there are new bookings
      if (latestBookings.length !== bookings.length) {
        setBookings(latestBookings);
      }
    };

    // Initial poll
    pollBookings();

    // Set up polling interval - more frequent for live updates
    const interval = setInterval(pollBookings, 2000); // Poll every 2 seconds for live updates

    return () => clearInterval(interval);
  }, [isAuthenticated, router, bookings.length]);

  const sendCompletionEmail = async (bookingData: any) => {
    try {
      const response = await fetch('/.netlify/functions/send-completion-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log('Completion email sent successfully');
      } else {
        console.error('Failed to send completion email');
      }
    } catch (error) {
      console.error('Error sending completion email:', error);
    }
  };

  const deleteAllBookings = () => {
    if (confirm('Are you sure you want to delete ALL bookings? This action cannot be undone and will remove ' + bookings.length + ' bookings.')) {
      setBookings([]);
      localStorage.setItem('temple_bookings', JSON.stringify([]));
      alert('All bookings deleted successfully.');
    }
  };

  const deleteBooking = (id: number) => {
    if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));
      alert('Booking deleted successfully.');
    }
  };

  const updateBookingStatus = (id: number, status: Booking['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));
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

  // Sort bookings based on selected criteria
  const sortedBookings = [...bookings].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        comparison = dateA - dateB;
        break;
      case 'name':
        comparison = a.devoteeName.localeCompare(b.devoteeName);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'seva':
        comparison = a.sevaName.localeCompare(b.sevaName);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

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
            <p className="text-sm text-black">Today's Date</p>
            <p className="font-semibold text-black">{new Date().toLocaleDateString()}</p>
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
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">All Seva Bookings</h3>
                <div className="flex space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'status' | 'seva')}
                    className="px-3 py-2 border border-gray-300 text-black rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                    <option value="seva">Sort by Seva</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-3 py-2 border border-gray-300 text-black rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                  <button
                    onClick={deleteAllBookings}
                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete All
                  </button>
                </div>
              </div>
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
                    {sortedBookings.map((booking) => (
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
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    {isScanning && (
                      <button
                        onClick={stopQRScan}
                        className="bg-red-600 text-white py-3 px-6 rounded-md font-medium hover:bg-red-700 transition-colors ml-4"
                      >
                        Stop Scanning
                      </button>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 relative">
                    {isScanning ? (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          className="w-full h-64 bg-black rounded"
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 border-2 border-green-400 rounded pointer-events-none">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-green-400 rounded">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-green-400 rounded"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                          Point camera at QR code
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l2 2-2 2" />
                        </svg>
                        <p className="text-gray-500">Camera feed will appear here when scanning</p>
                      </div>
                    )}
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
                    className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-md focus:ring-orange-500 focus:border-orange-500"
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
            <h4 className="text-lg font-semibold text-black mb-4">Add New Volunteer</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newVolunteer.name}
                  onChange={(e) => setNewVolunteer({...newVolunteer, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                  placeholder="Enter volunteer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newVolunteer.email}
                  onChange={(e) => setNewVolunteer({...newVolunteer, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                <input
                  type="tel"
                  value={newVolunteer.phone}
                  onChange={(e) => setNewVolunteer({...newVolunteer, phone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddVolunteer(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 text-black rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addVolunteer}
                className="px-4 py-2 bg-orange-600 text-white text-black rounded-md hover:bg-orange-700"
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
