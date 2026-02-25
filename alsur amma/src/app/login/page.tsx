'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Volunteer Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the volunteer management system
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Demo Credentials</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={() => handleDemoLogin('gururaj@volunteer.com', 'volunteer123')}
              className="bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium"
            >
              🚀 Quick Login as Volunteer
            </button>
            <button
              onClick={() => handleDemoLogin('admin@temple.com', 'admin123')}
              className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              👑 Quick Login as Admin
            </button>
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
              <div className="text-sm">
                <p className="font-medium text-orange-800">Volunteer Account:</p>
                <p className="text-orange-600">gururaj@volunteer.com / volunteer123</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="text-sm">
                <p className="font-medium text-blue-800">Admin Account:</p>
                <p className="text-blue-600">admin@temple.com / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
