export default function History() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">History</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Discover the rich heritage and spiritual legacy of our mutt
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Spiritual Heritage</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The Mutt is part of the larger Raghavendra Math tradition, which has its origins in the teachings of Madhvacharya.
              The Vidyaranyapura mutt is associated with Sri Mathaji Ulsooramma, carrying forward the sacred legacy of Sri Raghavendra Swami.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Sri Raghavendra Swami, also known as Sri Raghavendra Tirtha, was a renowned saint and philosopher in the Dvaita Vedanta tradition.
              Born in 1595 CE in Bhuvanagiri (modern Tamil Nadu), he became one of the most revered spiritual figures in Karnataka and beyond.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mutt continues this noble tradition, serving as a center for spiritual learning, devotion, and community service,
              upholding the timeless values and teachings passed down through generations of enlightened masters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Madhvacharya Tradition</h3>
              <p className="text-gray-600 leading-relaxed">
                The foundation of our spiritual lineage rests upon the teachings of Sri Madhvacharya,
                the great reformer of Vedanta philosophy who established the Dvaita school of thought.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sri Mathaji Ulsooramma</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mutt bears the sacred association with Sri Mathaji Ulsooramma,
                continuing her legacy of devotion and service to Sri Raghavendra Swami.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Spiritual Continuity</h3>
              <p className="text-gray-600 leading-relaxed">
                Through centuries of unbroken tradition, we maintain the sacred rituals,
                teachings, and practices that connect devotees with the divine grace of our gurus.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Beyond spiritual guidance, our mutt actively engages in community welfare,
                education, and charitable activities as part of our sacred duty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
