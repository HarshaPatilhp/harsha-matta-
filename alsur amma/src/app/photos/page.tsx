'use client';

import { useState } from 'react';

interface Photo {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
}

export default function Photos() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos', count: 24 },
    { id: 'temple', name: 'Temple', count: 8 },
    { id: 'festivals', name: 'Festivals', count: 6 },
    { id: 'sevas', name: 'Sevas', count: 5 },
    { id: 'events', name: 'Events', count: 5 }
  ];

  const photos: Photo[] = [
    {
      id: 1,
      title: 'Main Temple Entrance',
      category: 'temple',
      src: '/placeholder-temple-1.jpg',
      alt: 'Beautiful entrance of the temple with traditional architecture'
    },
    {
      id: 2,
      title: 'Sri Raghavendra Swami Idol',
      category: 'temple',
      src: '/placeholder-idol-1.jpg',
      alt: 'Sacred idol of Sri Raghavendra Swami'
    },
    {
      id: 3,
      title: 'Morning Pooja',
      category: 'sevas',
      src: '/placeholder-pooja-1.jpg',
      alt: 'Devotees participating in morning pooja'
    },
    {
      id: 4,
      title: 'Aradhana Mahotsava',
      category: 'festivals',
      src: '/placeholder-festival-1.jpg',
      alt: 'Grand celebration of Aradhana Mahotsava'
    },
    {
      id: 5,
      title: 'Bhajana Session',
      category: 'events',
      src: '/placeholder-bhajana-1.jpg',
      alt: 'Devotional bhajana session with devotees'
    },
    {
      id: 6,
      title: 'Temple Garden',
      category: 'temple',
      src: '/placeholder-garden-1.jpg',
      alt: 'Peaceful temple garden with flowers'
    },
    {
      id: 7,
      title: 'Abhisheka Ceremony',
      category: 'sevas',
      src: '/placeholder-abhisheka-1.jpg',
      alt: 'Sacred abhisheka ceremony in progress'
    },
    {
      id: 8,
      title: 'Deepavali Celebrations',
      category: 'festivals',
      src: '/placeholder-deepavali-1.jpg',
      alt: 'Temple decorated for Deepavali festival'
    },
    {
      id: 9,
      title: 'Spiritual Discourse',
      category: 'events',
      src: '/placeholder-discourse-1.jpg',
      alt: 'Scholar delivering spiritual discourse'
    },
    {
      id: 10,
      title: 'Prasada Distribution',
      category: 'sevas',
      src: '/placeholder-prasada-1.jpg',
      alt: 'Blessed prasada being distributed to devotees'
    },
    {
      id: 11,
      title: 'Ram Navami',
      category: 'festivals',
      src: '/placeholder-ram-navami-1.jpg',
      alt: 'Ram Navami celebrations at the temple'
    },
    {
      id: 12,
      title: 'Youth Program',
      category: 'events',
      src: '/placeholder-youth-1.jpg',
      alt: 'Young devotees participating in temple activities'
    },
    {
      id: 13,
      title: 'Temple Architecture',
      category: 'temple',
      src: '/placeholder-architecture-1.jpg',
      alt: 'Detailed view of temple architecture'
    },
    {
      id: 14,
      title: 'Annadana Seva',
      category: 'sevas',
      src: '/placeholder-annadana-1.jpg',
      alt: 'Free meal service for devotees'
    },
    {
      id: 15,
      title: 'Gokulashtami',
      category: 'festivals',
      src: '/placeholder-gokulashtami-1.jpg',
      alt: 'Gokulashtami celebrations with decorated temple'
    },
    {
      id: 16,
      title: 'Cultural Program',
      category: 'events',
      src: '/placeholder-cultural-1.jpg',
      alt: 'Cultural program with music and dance'
    },
    {
      id: 17,
      title: 'Sacred Texts',
      category: 'temple',
      src: '/placeholder-texts-1.jpg',
      alt: 'Ancient sacred texts preserved in the temple'
    },
    {
      id: 18,
      title: 'Evening Aarti',
      category: 'sevas',
      src: '/placeholder-aarti-1.jpg',
      alt: 'Evening aarti ceremony'
    },
    {
      id: 19,
      title: 'Sri Ramanavami',
      category: 'festivals',
      src: '/placeholder-ramanavami-1.jpg',
      alt: 'Sri Ramanavami festival celebrations'
    },
    {
      id: 20,
      title: 'Community Gathering',
      category: 'events',
      src: '/placeholder-community-1.jpg',
      alt: 'Community gathering at the temple premises'
    },
    {
      id: 21,
      title: 'Temple Bells',
      category: 'temple',
      src: '/placeholder-bells-1.jpg',
      alt: 'Sacred temple bells'
    },
    {
      id: 22,
      title: 'Flower Decorations',
      category: 'temple',
      src: '/placeholder-flowers-1.jpg',
      alt: 'Beautiful flower decorations in the temple'
    },
    {
      id: 23,
      title: 'Devotees in Prayer',
      category: 'sevas',
      src: '/placeholder-prayer-1.jpg',
      alt: 'Devotees engaged in deep prayer'
    },
    {
      id: 24,
      title: 'Festival Procession',
      category: 'events',
      src: '/placeholder-procession-1.jpg',
      alt: 'Religious procession during festival'
    }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const openModal = (photo: Photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Photo Gallery</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Explore the divine beauty and sacred moments captured at our temple
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

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openModal(photo)}
              >
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for actual images */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500 font-medium">{photo.title}</p>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">{photo.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Load More Photos
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-orange-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-semibold text-gray-600">{selectedImage.title}</p>
                  <p className="text-sm text-gray-500 capitalize">{selectedImage.category}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
