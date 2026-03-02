'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  role: 'volunteer' | 'admin';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users - in real app, this would come from backend
const DEMO_USERS = [
  {
    id: 1,
    name: 'Gururaj Patil',
    email: 'gururaj@volunteer.com',
    password: 'volunteer123',
    role: 'volunteer' as const
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@temple.com',
    password: 'admin123',
    role: 'admin' as const
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('temple_auth_user');
    const wasManualRefresh = sessionStorage.getItem('manual_refresh');
    
    if (storedUser && !wasManualRefresh) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('temple_auth_user');
      }
    } else if (wasManualRefresh) {
      // Clear auth data on manual refresh
      localStorage.removeItem('temple_auth_user');
      sessionStorage.removeItem('manual_refresh');
    }
  }, []);

  // Detect manual page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('manual_refresh', 'true');
    };

    const handleLoad = () => {
      // Clear the flag after a short delay to distinguish between refresh and navigation
      setTimeout(() => {
        sessionStorage.removeItem('manual_refresh');
      }, 100);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role,
        email: foundUser.email
      };

      setUser(userData);
      localStorage.setItem('temple_auth_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('temple_auth_user');
    // Clear any manual refresh flag
    sessionStorage.removeItem('manual_refresh');
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
