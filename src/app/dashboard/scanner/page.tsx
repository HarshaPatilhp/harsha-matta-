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
          (result) => {
            const data = result?.data || result;
            handleScanSuccess(data);
          },
          { returnDetailedScanResult: true }
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
    
    // Dummy check against a hardcoded booking or localStorage
    const stored = localStorage.getItem('temple_bookings');
    let found = false;
    let details = null;

    if (stored) {
      const bookings = JSON.parse(stored);
      details = bookings.find((b: any) => String(b.id) === String(data));
      found = !!details;
    }

    // Default fallback if localStorage is empty
    if (!found && data === "1774804335277") {
      found = true;
      details = { devoteeName: "Ashutosh Kumar", sevaName: "Heavy Vehicle Pooja" };
    }

    if (found) {
      setScanResult({ 
        status: 'success', 
        message: 'Devotee Verified!', 
        data: details 
      });
    } else {
      setScanResult({ 
        status: 'error', 
        message: 'Invalid QR Code or Booking not found.' 
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent inline-block">LIVE Check-in Module</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Position the devotee's QR code within the frame to verify their seva booking.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative">
        {/* Scanner Viewport */}
        <div className={`relative bg-black rounded-2xl overflow-hidden aspect-square sm:aspect-video flex items-center justify-center transition-all ${isScanning ? 'ring-4 ring-emerald-500/50' : ''}`}>
          
          {isScanning && (
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {!isScanning && scanResult.status === 'idle' && (
            <div className="text-center p-8 z-10">
              <div className="w-20 h-20 bg-emerald-100/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <QrCode size={40} className="text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-medium mb-6">Camera is sleeping</h3>
              <button 
                onClick={startScan}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(5,150,105,0.4)]"
              >
                Scan Target
              </button>
            </div>
          )}

          {isScanning && (
            <>
              {/* Animated scanning bar */}
              <div className="absolute inset-0 z-10 pointer-events-none w-full h-full flex justify-center items-center">
                <div className="w-3/4 h-3/4 border-2 border-emerald-500/50 rounded-lg relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg" />
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
             <div className="absolute inset-0 bg-emerald-900/90 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-sm animate-fade-in">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{scanResult.message}</h2>
                <div className="bg-white/10 p-6 rounded-2xl mt-4 max-w-sm w-full backdrop-blur-md border border-white/20">
                  <p className="text-emerald-200 text-sm uppercase tracking-wider mb-1 font-semibold">Devotee</p>
                  <p className="text-white text-2xl font-bold mb-4">{scanResult.data?.devoteeName || 'Unknown'}</p>
                  <p className="text-emerald-200 text-sm uppercase tracking-wider mb-1 font-semibold">Seva Type</p>
                  <p className="text-white text-xl">{scanResult.data?.sevaName || 'Standard Entry'}</p>
                </div>
                <button 
                  onClick={startScan}
                  className="mt-8 bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 rounded-full font-bold transition-all shadow-lg"
                >
                  Scan Next Devotee
                </button>
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
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
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
