"use client";

import { useState, useEffect, useRef } from 'react';
import { QrCode, X, CheckCircle, AlertCircle } from 'lucide-react';
import QrScanner from 'qr-scanner';

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ status: 'idle' | 'success' | 'error', message: string, data?: any }>({ status: 'idle', message: '' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  useEffect(() => {
    if (isScanning && videoRef.current) {
      if (!qrScannerRef.current) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result: any) => {
            const data = result?.data || result;
            handleScanSuccess(String(data));
          },
          { 
            returnDetailedScanResult: true,
            maxScansPerSecond: 60,
          }
        );
      }
      qrScannerRef.current.start().catch((err) => {
        setScanResult({ status: 'error', message: 'Camera access denied or unavailable.' });
        setIsScanning(false);
      });
    } else {
      stopScan();
    }
  }, [isScanning]);

  const stopScan = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  const startScan = () => {
    setScanResult({ status: 'idle', message: '' });
    setIsScanning(true);
  };

  const handleScanSuccess = (data: string) => {
    // Stop scanning immediately to prevent duplicate scans
    setIsScanning(false);
    
    const stored = localStorage.getItem('temple_bookings');
    let found = false;
    let details = null;
    let bookings: any[] = [];

    if (stored) {
      bookings = JSON.parse(stored);
      details = bookings.find((b: any) => String(b.id) === String(data));
      found = !!details;
    }

    if (found && details) {
      if (details.status === 'completed') {
        setScanResult({ 
          status: 'error', 
          message: 'Oops! Sorry, this QR code has already been claimed.' 
        });
        return;
      }

      // 1. Update Booking Status
      const updatedBookings = bookings.map(b => 
        String(b.id) === String(data) ? { ...b, status: 'completed' } : b
      );
      localStorage.setItem('temple_bookings', JSON.stringify(updatedBookings));

      // 2. Add to scan history
      const scanHistoryJson = localStorage.getItem('scanHistory');
      const scanHistory = scanHistoryJson ? JSON.parse(scanHistoryJson) : [];
      
      const newScan = {
        id: Date.now(),
        bookingId: details.id,
        devoteeName: details.devoteeName || details.fullName,
        sevaName: details.sevaName,
        scanTime: new Date().toLocaleString(),
        status: 'Verified'
      };
      
      localStorage.setItem('scanHistory', JSON.stringify([newScan, ...scanHistory]));

      const gotra = String(details.gotra || '').toLowerCase().trim();
      const brahminGotras = [
        'kashyapa', 'kasyapa', 'bharadwaja', 'bhardwaj', 'vasishta', 'vashishta', 'vishwamitra',
        'gautama', 'jamadagni', 'atri', 'agastya', 'kaundinya', 'koundinya', 'srivatsa', 'shrivatsa',
        'harita', 'haritha', 'gargya', 'sandilya', 'shandilya', 'mudgala', 'naidhruva',
        'bhargava', 'kamakayana', 'visvamitra', 'vatsa'
      ];
      
      const isBrahmin = brahminGotras.some(bg => gotra.includes(bg));
      
      let devoteeCategory = "Non-Brahmin";
      let redirectHall = "General Dining / Main Hall";
      
      if (gotra && isBrahmin) {
        devoteeCategory = "Brahmin";
        redirectHall = "Bhojana Shale (Special Hall)";
      } else if (gotra) {
        devoteeCategory = "Non-Brahmin";
        redirectHall = "Annapurna Hall (General Dining)";
      } else {
        devoteeCategory = "Unknown";
        redirectHall = "Enquiry Counter";
      }

      // Attach to details
      details.devoteeCategory = devoteeCategory;
      details.redirectHall = redirectHall;

      setScanResult({ 
        status: 'success', 
        message: 'Devotee Verified!', 
        data: details 
      });
    } else {
      setScanResult({ 
        status: 'error', 
        message: 'Invalid QR Code or Booking not found in database.' 
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent inline-block">LIVE Check-in Module</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 px-4">Position the devotee's QR code within the frame to verify their seva booking.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-3 sm:p-6 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative">
        {/* Scanner Viewport */}
        <div className={`relative bg-black rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-video w-full flex items-center justify-center transition-all ${isScanning ? 'ring-2 sm:ring-4 ring-orange-500/50' : ''}`}>
          
          {isScanning && (
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {!isScanning && scanResult.status === 'idle' && (
            <div className="text-center p-8 z-10">
              <div className="w-20 h-20 bg-orange-100/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <QrCode size={40} className="text-orange-400" />
              </div>
              <h3 className="text-white text-xl font-medium mb-6">Camera is sleeping</h3>
              <button 
                onClick={startScan}
                className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(5,150,105,0.4)]"
              >
                Scan Target
              </button>
            </div>
          )}

          {isScanning && (
            <>
              {/* Animated scanning bar */}
              <div className="absolute inset-0 z-10 pointer-events-none w-full h-full flex justify-center items-center">
                <div className="w-[85%] h-[85%] sm:w-3/4 sm:h-3/4 border-2 border-orange-500/50 rounded-lg relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-t-4 border-l-4 border-orange-500 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-t-4 border-r-4 border-orange-500 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-b-4 border-l-4 border-orange-500 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-b-4 border-r-4 border-orange-500 rounded-br-lg" />
                </div>
              </div>
              <style jsx>{`
                @keyframes scan {
                  0% { top: 0; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}</style>
            </>
          )}

          {scanResult.status === 'success' && (
             <div className="absolute inset-0 bg-emerald-900/90 z-20 backdrop-blur-sm animate-fade-in overflow-y-auto">
               <div className="flex flex-col items-center justify-center min-h-full p-4 sm:p-6 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(16,185,129,0.5)] shrink-0">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 shrink-0">{scanResult.message}</h2>
                  <div className="bg-white/10 p-4 sm:p-6 rounded-2xl mt-2 max-w-sm w-full backdrop-blur-md border border-white/20 shrink-0">
                    <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider mb-1 font-semibold">Devotee</p>
                    <p className="text-white text-xl sm:text-2xl font-bold mb-3">{scanResult.data?.devoteeName || 'Unknown'}</p>
                    <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider mb-1 font-semibold">Seva Type</p>
                    <p className="text-white text-lg sm:text-xl leading-tight">{scanResult.data?.sevaName || 'Standard Entry'}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                      <div>
                        <p className="text-emerald-200 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Category</p>
                        <p className="text-white font-medium text-sm sm:text-base">{scanResult.data?.devoteeCategory}</p>
                        <p className="text-emerald-100/70 text-[10px] sm:text-xs mt-0.5">({scanResult.data?.gotra || 'No Gotra'})</p>
                      </div>
                      <div>
                        <p className="text-emerald-200 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Redirect To</p>
                        <p className="text-yellow-300 font-bold leading-tight text-sm sm:text-base">📍 {scanResult.data?.redirectHall}</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={startScan}
                    className="mt-6 bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold transition-all shadow-lg shrink-0"
                  >
                    Scan Next Devotee
                  </button>
               </div>
             </div>
          )}

          {scanResult.status === 'error' && (
            <div className="absolute inset-0 bg-red-900/95 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-sm animate-fade-in">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(239,68,68,0.5)]">
                  <AlertCircle size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Scan Failed</h2>
              <p className="text-red-200 mb-8 max-w-xs">{scanResult.message}</p>
              <button 
                  onClick={startScan}
                  className="bg-white hover:bg-red-50 text-red-900 px-8 py-3 rounded-full font-bold transition-all shadow-lg"
                >
                  Try Again
              </button>
            </div>
          )}
        </div>

        {/* Status indicator bar underneath */}
        {isScanning && (
          <div className="mt-6 flex items-center justify-between text-sm animate-fade-in">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              System Active • Awaiting code...
            </div>
            <button 
              onClick={stopScan} 
              className="text-gray-500 hover:text-red-500 flex items-center gap-1 font-medium bg-gray-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <X size={16} /> Stop Scanner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
