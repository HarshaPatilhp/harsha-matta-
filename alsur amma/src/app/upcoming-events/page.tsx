export default function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Aradhana Mahotsava 2024",
      date: "March 15-17, 2024",
      time: "6:00 AM - 9:00 PM",
      category: "Festival",
      description: "Grand annual celebration of Sri Raghavendra Swami's Aradhana with special poojas, discourses, and cultural programs.",
      location: "Main Temple Hall",
      highlights: ["Special Poojas", "Spiritual Discourses", "Cultural Programs", "Prasada Distribution"],
      registration: true,
      image: "/event-aradhana.jpg"
    },
    {
      id: 2,
      title: "Ram Navami Celebrations",
      date: "April 17, 2024",
      time: "5:30 AM - 8:00 PM",
      category: "Festival",
      description: "Celebration of Lord Rama's birth anniversary with procession, special poojas, and devotional programs.",
      location: "Temple Premises",
      highlights: ["Morning Pooja", "Procession", "Bhajana Session", "Annadana"],
      registration: false,
      image: "/event-ram-navami.jpg"
    },
    {
      id: 3,
      title: "Bhagavad Gita Discourse Series",
      date: "Every Sunday, April - June 2024",
      time: "10:00 AM - 12:00 PM",
      category: "Education",
      description: "Weekly discourse series on Bhagavad Gita with practical applications for modern life.",
      location: "Temple Auditorium",
      highlights: ["Scripture Study", "Q&A Session", "Meditation", "Group Discussion"],
      registration: true,
      image: "/event-gita.jpg"
    },
    {
      id: 4,
      title: "Youth Bhajana Workshop",
      date: "May 5, 2024",
      time: "2:00 PM - 6:00 PM",
      category: "Education",
      description: "Interactive workshop for young devotees to learn traditional bhajans and devotional music.",
      location: "Community Hall",
      highlights: ["Music Training", "Bhajana Learning", "Group Singing", "Certificate"],
      registration: true,
      image: "/event-youth.jpg"
    },
    {
      id: 5,
      title: "Sri Ramanavami Festival",
      date: "April 2, 2024",
      time: "6:00 AM - 9:00 PM",
      category: "Festival",
      description: "Celebration of Lord Rama's birth anniversary with special rituals and community programs.",
      location: "Temple Complex",
      highlights: ["Abhisheka", "Special Poojas", "Ramayana Recitation", "Community Feast"],
      registration: false,
      image: "/event-ramanavami.jpg"
    },
    {
      id: 6,
      title: "Meditation and Yoga Camp",
      date: "June 15-16, 2024",
      time: "7:00 AM - 5:00 PM",
      category: "Wellness",
      description: "Two-day residential camp focusing on meditation, yoga, and spiritual wellness practices.",
      location: "Temple Retreat Center",
      highlights: ["Daily Meditation", "Yoga Sessions", "Spiritual Talks", "Healthy Meals"],
      registration: true,
      image: "/event-meditation.jpg"
    },
    {
      id: 7,
      title: "Community Service Day",
      date: "May 25, 2024",
      time: "9:00 AM - 4:00 PM",
      category: "Charity",
      description: "Day dedicated to community service including food distribution, medical camp, and educational support.",
      location: "Local Community Center",
      highlights: ["Food Distribution", "Medical Camp", "Educational Support", "Cleaning Drive"],
      registration: true,
      image: "/event-service.jpg"
    },
    {
      id: 8,
      title: "Classical Music Concert",
      date: "July 8, 2024",
      time: "6:00 PM - 9:00 PM",
      category: "Cultural",
      description: "Evening concert featuring renowned classical musicians performing devotional music.",
      location: "Temple Auditorium",
      highlights: ["Carnatic Music", "Instrumental Performance", "Devotional Songs", "Cultural Fusion"],
      registration: true,
      image: "/event-music.jpg"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Festival: 'bg-orange-100 text-orange-800',
      Education: 'bg-blue-100 text-blue-800',
      Wellness: 'bg-green-100 text-green-800',
      Charity: 'bg-red-100 text-red-800',
      Cultural: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Upcoming Events</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Join us in celebrating faith, culture, and community through our upcoming spiritual events
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Event Image */}
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">{event.title}</p>
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </div>

                  {/* Registration Badge */}
                  {event.registration && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Registration Open
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{event.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{event.time}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight, index) => (
                        <span key={index} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {event.registration ? (
                      <>
                        <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                          Register Now
                        </button>
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                          Learn More
                        </button>
                      </>
                    ) : (
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                        Get Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-orange-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about upcoming events, festivals, and spiritual programs.
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Calendar View */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Event Calendar</h2>
            <div className="text-center">
              <div className="inline-block bg-gray-100 rounded-lg p-8">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">Interactive calendar view coming soon</p>
                <p className="text-sm text-gray-400 mt-2">View all events in calendar format</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
