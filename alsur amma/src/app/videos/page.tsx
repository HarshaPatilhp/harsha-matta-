'use client';

import { useState } from 'react';

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos', count: 18 },
    { id: 'festivals', name: 'Festivals', count: 6 },
    { id: 'discourses', name: 'Discourses', count: 4 },
    { id: 'sevas', name: 'Sevas', count: 4 },
    { id: 'events', name: 'Events', count: 4 }
  ];

  const videos = [
    {
      id: 1,
      title: 'Aradhana Mahotsava 2024 - Day 1',
      category: 'festivals',
      duration: '45:32',
      views: '2.1K',
      date: 'Jan 15, 2024',
      description: 'Grand opening ceremony of Aradhana Mahotsava with special poojas and bhajans',
      thumbnail: '/placeholder-video-1.jpg'
    },
    {
      id: 2,
      title: 'Sri Raghavendra Swami Discourse',
      category: 'discourses',
      duration: '62:18',
      views: '1.8K',
      date: 'Dec 20, 2023',
      description: 'Enlightening discourse on the life and teachings of Sri Raghavendra Swami',
      thumbnail: '/placeholder-video-2.jpg'
    },
    {
      id: 3,
      title: 'Morning Suprabhata Seva',
      category: 'sevas',
      duration: '28:45',
      views: '3.2K',
      date: 'Feb 10, 2024',
      description: 'Beautiful morning suprabhata seva with vedic chanting and traditional rituals',
      thumbnail: '/placeholder-video-3.jpg'
    },
    {
      id: 4,
      title: 'Deepavali Celebrations 2023',
      category: 'festivals',
      duration: '38:21',
      views: '2.8K',
      date: 'Nov 12, 2023',
      description: 'Festive celebrations with special lighting ceremony and cultural programs',
      thumbnail: '/placeholder-video-4.jpg'
    },
    {
      id: 5,
      title: 'Bhagavad Gita Chapter 12',
      category: 'discourses',
      duration: '55:42',
      views: '1.5K',
      date: 'Jan 8, 2024',
      description: 'Detailed explanation of Bhakti Yoga from Bhagavad Gita',
      thumbnail: '/placeholder-video-5.jpg'
    },
    {
      id: 6,
      title: 'Abhisheka Ceremony',
      category: 'sevas',
      duration: '41:15',
      views: '2.4K',
      date: 'Mar 5, 2024',
      description: 'Sacred abhisheka ceremony performed with traditional rituals',
      thumbnail: '/placeholder-video-6.jpg'
    },
    {
      id: 7,
      title: 'Ram Navami Procession',
      category: 'festivals',
      duration: '52:33',
      views: '3.1K',
      date: 'Apr 17, 2024',
      description: 'Grand procession and celebrations for Sri Ram Navami',
      thumbnail: '/placeholder-video-7.jpg'
    },
    {
      id: 8,
      title: 'Youth Bhajana Program',
      category: 'events',
      duration: '35:28',
      views: '1.9K',
      date: 'Feb 25, 2024',
      description: 'Young devotees performing devotional bhajans and songs',
      thumbnail: '/placeholder-video-8.jpg'
    },
    {
      id: 9,
      title: 'Spiritual Guidance Session',
      category: 'discourses',
      duration: '48:57',
      views: '2.3K',
      date: 'Dec 15, 2023',
      description: 'Practical spiritual guidance for daily life',
      thumbnail: '/placeholder-video-9.jpg'
    },
    {
      id: 10,
      title: 'Evening Deeparadhana',
      category: 'sevas',
      duration: '24:18',
      views: '2.7K',
      date: 'Mar 12, 2024',
      description: 'Peaceful evening lamp lighting ceremony',
      thumbnail: '/placeholder-video-10.jpg'
    },
    {
      id: 11,
      title: 'Gokulashtami 2023',
      category: 'festivals',
      duration: '46:52',
      views: '2.9K',
      date: 'Sep 7, 2023',
      description: 'Celebrations of Lord Krishna\'s birthday with special programs',
      thumbnail: '/placeholder-video-11.jpg'
    },
    {
      id: 12,
      title: 'Community Service Initiative',
      category: 'events',
      duration: '39:44',
      views: '1.7K',
      date: 'Jan 22, 2024',
      description: 'Documentary on our charitable activities and community service',
      thumbnail: '/placeholder-video-12.jpg'
    },
    {
      id: 13,
      title: 'Upanishad Study Session',
      category: 'discourses',
      duration: '58:33',
      views: '1.4K',
      date: 'Nov 28, 2023',
      description: 'Study of ancient Upanishadic wisdom and its relevance today',
      thumbnail: '/placeholder-video-13.jpg'
    },
    {
      id: 14,
      title: 'Annadana Seva Distribution',
      category: 'sevas',
      duration: '31:27',
      views: '2.5K',
      date: 'Feb 18, 2024',
      description: 'Free meal service for devotees and the underprivileged',
      thumbnail: '/placeholder-video-14.jpg'
    },
    {
      id: 15,
      title: 'Sri Ramanavami Festival',
      category: 'festivals',
      duration: '49:16',
      views: '3.0K',
      date: 'Apr 2, 2024',
      description: 'Special celebrations for the birth anniversary of Lord Rama',
      thumbnail: '/placeholder-video-15.jpg'
    },
    {
      id: 16,
      title: 'Cultural Dance Program',
      category: 'events',
      duration: '42:51',
      views: '2.2K',
      date: 'Mar 20, 2024',
      description: 'Traditional dance performances by local artists',
      thumbnail: '/placeholder-video-16.jpg'
    },
    {
      id: 17,
      title: 'Temple History Documentary',
      category: 'events',
      duration: '37:29',
      views: '2.6K',
      date: 'Oct 15, 2023',
      description: 'Journey through the history and significance of our temple',
      thumbnail: '/placeholder-video-17.jpg'
    },
    {
      id: 18,
      title: 'Meditation and Yoga Session',
      category: 'events',
      duration: '33:44',
      views: '1.8K',
      date: 'Feb 5, 2024',
      description: 'Guided meditation and yoga session for spiritual wellness',
      thumbnail: '/placeholder-video-18.jpg'
    }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Video Gallery</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Experience the divine through our collection of spiritual videos and ceremonies
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Video Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 relative group cursor-pointer">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3 7.5A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 2.5z" />
                      </svg>
                      <p className="text-sm text-gray-500 font-medium">Watch Video</p>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {video.views}
                      </span>
                      <span>{video.date}</span>
                    </div>
                    <span className="capitalize bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      {video.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Load More Videos
            </button>
          </div>

          {/* Featured Video Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Videos</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Featured Video */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <div className="aspect-video bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-orange-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3 7.5A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 2.5z" />
                    </svg>
                    <p className="text-lg font-semibold text-gray-600">Featured Video</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Aradhana Mahotsava 2024 Highlights</h3>
                <p className="text-gray-600 mb-4">A comprehensive overview of this year's grand Aradhana Mahotsava celebrations</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Duration: 52:18</span>
                  <span>Views: 4.2K</span>
                </div>
              </div>

              {/* Video Playlist */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Videos</h3>
                <div className="space-y-4">
                  {videos.slice(0, 5).map((video, index) => (
                    <div key={index} className="flex space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-20 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3 7.5A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 2.5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{video.title}</h4>
                        <p className="text-gray-500 text-xs">{video.duration} • {video.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
