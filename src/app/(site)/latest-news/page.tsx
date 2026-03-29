export default function LatestNews() {
  const news = [
    {
      id: 1,
      title: "Aradhana Mahotsava 2024 Successfully Completed",
      date: "March 20, 2024",
      category: "Festival",
      excerpt: "The three-day Aradhana Mahotsava concluded with overwhelming participation from devotees across the region.",
      content: "The annual Aradhana Mahotsava of Sri Raghavendra Swami was celebrated with great devotion and enthusiasm. Over 5000 devotees participated in the three-day event featuring special poojas, spiritual discourses by renowned scholars, and cultural programs. The highlight of the event was the grand procession on the final day.",
      image: "/news-aradhana.jpg",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Community Kitchen Opens at Temple",
      date: "March 15, 2024",
      category: "Charity",
      excerpt: "Temple inaugurates state-of-the-art community kitchen to serve free meals to the underprivileged.",
      content: "In a noble initiative to serve the community, the temple has inaugurated a modern community kitchen equipped with latest facilities. The kitchen will provide free meals to hundreds of underprivileged people daily, continuing the tradition of Annadana that was dear to Sri Raghavendra Swami.",
      image: "/news-kitchen.jpg",
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Youth Spiritual Leadership Program Launched",
      date: "March 10, 2024",
      category: "Education",
      excerpt: "New program aims to develop spiritual leaders among the younger generation.",
      content: "A comprehensive spiritual leadership program for youth has been launched by the temple. The six-month program includes scripture study, meditation, community service, and leadership training. Over 50 young devotees have enrolled for the inaugural batch.",
      image: "/news-youth.jpg",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Temple Wins Green Initiative Award",
      date: "March 5, 2024",
      category: "Environment",
      excerpt: "Recognized for outstanding efforts in environmental conservation and sustainability.",
      content: "The temple has been awarded the 'Green Temple Award' by the Karnataka Government for its pioneering work in environmental conservation. The temple has implemented solar power, rainwater harvesting, and extensive green cover, setting an example for other religious institutions.",
      image: "/news-green.jpg",
      readTime: "2 min read"
    },
    {
      id: 5,
      title: "Rare Manuscript Discovered in Temple Archives",
      date: "February 28, 2024",
      category: "Heritage",
      excerpt: "Ancient manuscript containing teachings of Sri Raghavendra Swami found during restoration.",
      content: "During the ongoing restoration of the temple archives, a rare manuscript containing personal notes and teachings of Sri Raghavendra Swami has been discovered. The manuscript, dating back to the 17th century, provides valuable insights into the saint's thoughts and practices.",
      image: "/news-manuscript.jpg",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Medical Camp Serves 1000+ Patients",
      date: "February 20, 2024",
      category: "Health",
      excerpt: "Free medical camp provides healthcare services to rural community.",
      content: "The monthly free medical camp organized by the temple served over 1000 patients from nearby villages. The camp included general health check-ups, specialist consultations, and distribution of free medicines. This initiative has become a lifeline for many in the rural areas.",
      image: "/news-medical.jpg",
      readTime: "2 min read"
    },
    {
      id: 7,
      title: "New Digital Library Opens",
      date: "February 15, 2024",
      category: "Education",
      excerpt: "State-of-the-art digital library with ancient texts and modern resources inaugurated.",
      content: "A modern digital library has been inaugurated at the temple premises, containing digitized versions of ancient scriptures, research papers, and contemporary spiritual literature. The library features advanced search capabilities and is accessible to scholars and devotees alike.",
      image: "/news-library.jpg",
      readTime: "3 min read"
    },
    {
      id: 8,
      title: "Interfaith Dialogue Series Begins",
      date: "February 10, 2024",
      category: "Community",
      excerpt: "Monthly interfaith discussions promote understanding and harmony among different religions.",
      content: "The temple has initiated a monthly interfaith dialogue series bringing together leaders from different religious communities. The first session focused on common spiritual values and shared humanity, fostering greater understanding and cooperation among diverse faith groups.",
      image: "/news-interfaith.jpg",
      readTime: "2 min read"
    }
  ];

  const categories = ['All', 'Festival', 'Charity', 'Education', 'Environment', 'Heritage', 'Health', 'Community'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Festival: 'bg-orange-100 text-orange-800',
      Charity: 'bg-red-100 text-red-800',
      Education: 'bg-blue-100 text-blue-800',
      Environment: 'bg-green-100 text-green-800',
      Heritage: 'bg-purple-100 text-purple-800',
      Health: 'bg-teal-100 text-teal-800',
      Community: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Latest News</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Stay connected with the latest developments, events, and initiatives from our temple community
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
                  key={category}
                  className="px-6 py-3 rounded-full font-semibold bg-white text-gray-700 hover:bg-orange-100 border border-gray-300 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured News */}
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-orange-100 to-orange-200 aspect-video md:aspect-auto flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p className="text-lg font-semibold text-gray-600">Featured News</p>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(news[0].category)}`}>
                      {news[0].category}
                    </span>
                    <span className="ml-4 text-gray-500 text-sm">{news[0].date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{news[0].title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{news[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{news[0].readTime}</span>
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* News Image */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">{item.title}</p>
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>
                </div>

                {/* News Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">{item.date}</span>
                    <span className="text-gray-500 text-sm">{item.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{item.excerpt}</p>

                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Load More News
            </button>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-orange-50 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Informed</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest news, event updates, and spiritual insights directly in your inbox.
              </p>

              <div className="max-w-md mx-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Archive Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">News Archive</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { year: 2024, months: ['January', 'February', 'March'] },
                { year: 2023, months: ['December', 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January'] }
              ].map((archive) => (
                <div key={archive.year} className="text-center">
                  <h3 className="font-bold text-gray-800 mb-4">{archive.year}</h3>
                  <div className="space-y-2">
                    {archive.months.map((month) => (
                      <button key={month} className="block w-full text-left text-gray-600 hover:text-orange-600 transition-colors text-sm py-1">
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
