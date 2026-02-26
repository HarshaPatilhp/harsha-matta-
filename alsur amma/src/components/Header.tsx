'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center items-center py-4 space-x-4">
         <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
            <img 
              src="images/6.jpg"
              alt="Mathaji Ulsooramma Raghavendra Swamy Mutt" 
              className="w-full h-full object-cover"
            />
          </div>
          <Link href="/" className="text-2xl md:text-5xl font-bold tracking-wider">
            Mathaji Ulsooramma Raghavendra Swamy Mutt
          </Link>
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
            <img 
              src="images/7.jpeg"
              alt="Mathaji Ulsooramma Raghavendra Swamy Mutt" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-center pb-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden absolute right-4 top-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex justify-between items-center">
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-orange-200 transition-colors">Home</Link>

              {/* About Us Dropdown */}
              <div className="relative group">
                <button className="hover:text-orange-200 transition-colors flex items-center">
                  About Us
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/history" className="block px-4 py-2 hover:bg-orange-50">History</Link>
                <Link href="/activities" className="block px-4 py-2 hover:bg-orange-50">Activities</Link>
                <Link href="/bhajana-mandali" className="block px-4 py-2 hover:bg-orange-50">Bhajana Mandali</Link>
                <Link href="/parayana-samithi" className="block px-4 py-2 hover:bg-orange-50">Paryana Samithi</Link>
                <Link href="/deities" className="block px-4 py-2 hover:bg-orange-50">Deities</Link>
                <Link href="/trustees" className="block px-4 py-2 hover:bg-orange-50">Trustees</Link>
                <Link href="/volunteers" className="block px-4 py-2 hover:bg-orange-50">Volunteers</Link>
              </div>
            </div>

            {/* Sevas */}
            <Link href="/seva-list" className="hover:text-orange-200 transition-colors">Sevas</Link>

            {/* Events Dropdown */}
            <div className="relative group">
              <button className="hover:text-orange-200 transition-colors flex items-center">
                Events
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/upcoming-events" className="block px-4 py-2 hover:bg-orange-50">Upcoming Events</Link>
                <Link href="/latest-news" className="block px-4 py-2 hover:bg-orange-50">Latest News</Link>
              </div>
            </div>

            {/* Gallery Dropdown */}
            <div className="relative group">
              <button className="hover:text-orange-200 transition-colors flex items-center">
                Gallery
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/photos" className="block px-4 py-2 hover:bg-orange-50">Photos</Link>
                <Link href="/videos" className="block px-4 py-2 hover:bg-orange-50">Videos</Link>
                <Link href="/slokas" className="block px-4 py-2 hover:bg-orange-50">Slokas</Link>
              </div>
            </div>

            <Link href="/contact" className="hover:text-orange-200 transition-colors">Contact</Link>
          </nav>

          {/* User Info / Login Button - Extreme right side */}
          <div className="hidden md:flex">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <path d="M12 3a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  <span className="font-semibold">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="ml-2 text-xs bg-orange-600 text-white px-2 py-1 rounded-full">Admin</span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="hover:text-orange-200 transition-colors flex items-center bg-red-600 text-white px-4 py-2 rounded-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-orange-200 transition-colors flex items-center bg-white text-orange-600 px-4 py-2 rounded-full ml-8">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 7h-4l-4-4h4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6h-6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12h10l-5-5" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-orange-200 transition-colors py-2">Home</Link>

                <div className="border-t border-orange-500 pt-2">
                  <div className="font-semibold mb-2">About Us</div>
                  <Link href="/history" className="block pl-4 py-1 hover:text-orange-200">History</Link>
                  <Link href="/activities" className="block pl-4 py-1 hover:text-orange-200">Activities</Link>
                  <Link href="/bhajana-mandali" className="block pl-4 py-1 hover:text-orange-200">Bhajana Mandali</Link>
                  <Link href="/parayana-samithi" className="block pl-4 py-1 hover:text-orange-200">Parayana Samithi</Link>
                  <Link href="/deities" className="block pl-4 py-1 hover:text-orange-200">Deities</Link>
                  <Link href="/trustees" className="block pl-4 py-1 hover:text-orange-200">Trustees</Link>
                  <Link href="/volunteers" className="block pl-4 py-1 hover:text-orange-200">Volunteers</Link>
                </div>

                <div className="border-t border-orange-500 pt-2">
                  <div className="font-semibold mb-2">Events</div>
                  <Link href="/seva-list" className="block pl-4 py-1 hover:text-orange-200">Seva List</Link>
                  <Link href="/volunteers" className="block pl-4 py-1 hover:text-orange-200">Volunteers</Link>
                  <Link href="/upcoming-events" className="block pl-4 py-1 hover:text-orange-200">Upcoming Events</Link>
                </div>

                <div className="border-t border-orange-500 pt-2">
                  <div className="font-semibold mb-2">Gallery</div>
                  <Link href="/photos" className="block pl-4 py-1 hover:text-orange-200">Photos</Link>
                  <Link href="/videos" className="block pl-4 py-1 hover:text-orange-200">Videos</Link>
                  <Link href="/slokas" className="block pl-4 py-1 hover:text-orange-200">Slokas</Link>
                </div>

                <Link href="/contact" className="hover:text-orange-200 transition-colors py-2 block">Contact</Link>

              {/* Mobile User Info / Login */}
              {isAuthenticated ? (
                <div className="border-t border-orange-500 pt-2 mt-2">
                  <div className="flex items-center justify-between bg-white text-orange-600 px-3 py-2 rounded-full mb-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <path d="M12 3a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                      <span className="font-semibold text-sm">{user?.name}</span>
                      {user?.role === 'admin' && (
                        <span className="ml-2 text-xs bg-orange-600 text-white px-2 py-1 rounded-full">Admin</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full hover:text-orange-200 transition-colors flex items-center bg-red-600 text-white px-3 py-2 rounded-full justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-orange-500 pt-2 mt-2">
                  <Link
                    href="/login"
                    className="flex items-center bg-white text-orange-600 px-3 py-2 rounded-full hover:bg-orange-50 transition justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <path d="M12 3a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                    Login
                  </Link>
                </div>
              )}


              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
