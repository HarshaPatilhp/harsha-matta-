'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import { KeyRound, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const { login } = useAuth();
  const router = useRouter();

  const handleDemoLogin = async (email: string, password: string) => {
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        alert('Demo login failed. Please try again.');
      }
    } catch (error) {
      alert('Demo login error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 bg-gray-50/50">
      {/* Left side: Beautiful branding / imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 text-white overflow-hidden justify-center items-center">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-lg px-12 animate-fade-in text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-2xl mx-auto mb-8">
             <ShieldCheck size={48} className="text-white drop-shadow-md" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-md">
            Mutt Management Portal
          </h1>
          <p className="text-xl text-orange-100/90 font-medium leading-relaxed drop-shadow-sm mb-10">
            Secure, efficient, and streamlined administration for all temple activities and volunteer coordination.
          </p>
          <div className="flex gap-4 justify-center">
             <div className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-2">
                <ShieldCheck size={18} className="text-orange-200" />
                <span className="text-sm font-semibold tracking-wide">Secure Access</span>
             </div>
          </div>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24 bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] relative z-10 h-screen overflow-y-auto">
        
        <div className="mx-auto w-full max-w-md animate-fade-in-up">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-base font-medium text-gray-500">Sign in to access your volunteer dashboard</p>
          </div>

          <div className="bg-white">
            <LoginForm />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="text-center mb-6">
              <span className="px-4 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full">
                Quick Demo Access
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleDemoLogin('admin@temple.com', 'admin123')}
                className="group relative flex items-center justify-between p-4 border border-blue-100 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Administrator</span>
                  </div>
                  <div className="text-[11px] text-blue-600/70 font-medium font-mono">admin@temple.com</div>
                </div>
                <ArrowRight size={20} className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleDemoLogin('gururaj@volunteer.com', 'volunteer123')}
                className="group relative flex items-center justify-between p-4 border border-orange-100 bg-gradient-to-br from-orange-50 to-white rounded-2xl hover:border-orange-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck size={16} className="text-orange-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-800">Volunteer</span>
                  </div>
                  <div className="text-[11px] text-orange-600/70 font-medium font-mono">gururaj@...</div>
                </div>
                <ArrowRight size={20} className="text-orange-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-gray-400">
              &copy; {new Date().getFullYear()} Vidyaranyapura Mutt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
