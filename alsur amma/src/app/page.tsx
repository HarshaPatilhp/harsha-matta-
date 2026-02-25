import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
           Hari Sarvothama! 
           <br />
           Vayu Jeevothama !!
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8">
            Mathaji Ulsooramma Raghavendra Swamy Mutt, Vidyaranyapura, Bangalore
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/seva-list"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Book a Seva Online
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Religious Organization Section */}
        <section className="mb-16 bg-gray-50 py-12 rounded-lg">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Mathaji Ulsooramma Raghavendra Swamy Mutt, Vidyaranyapura Bangalore is a revered religious organization
              dedicated to the teachings and service of Sri Raghavendra Swamy, a saint known for his unwavering devotion
              and miracles. The mutt serves as a sacred place of worship, offering devotees an opportunity to participate
              in daily poojas, sevas, and various religious rituals that uphold the rich spiritual traditions of Sri Raghavendra Swamy.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The mutt actively organizes religious celebrations, spiritual discourses, and cultural events, with a special
              focus on the Sri Raghavendra Swamy Aradhana Mahotsava, which draws numerous devotees each year. Through
              these events, the mutt fosters a strong sense of community, devotion, and continuity of tradition among followers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We remain committed to serving devotees and promoting the timeless values of faith, service, and spiritual
              growth as exemplified by Sri Raghavendra Swamy's life and teachings.
            </p>
          </div>
        </section>

        
        {/* Book Online Section */}
        <section className="mb-16 bg-orange-50 py-12 rounded-lg">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Book a Online</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are pleased to offer devotees the convenience of booking various religious services and participating
              in our sacred events from anywhere.
            </p>
            <Link
              href="/contact"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
            >
              Book Now
            </Link>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16 bg-gray-100 py-12 rounded-lg">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Wish to receive details of upcoming events?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Register your WhatsApp number / email ID below
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="WhatsApp Number / Email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>

        


        {/* Contact Information */}
        <section className="bg-orange-600 text-white py-12 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Vidyaranyapura Raghavendra Swamy Mutt</h2>
            <p className="text-lg mb-8">
              CA Site No. 8, 6th Main Road, BEL Layout, 3rd Block, Vidyaranyapura, Bangalore-560097
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                <div className="flex justify-center space-x-4">
                  <Link href="tel:#" className="hover:text-orange-200 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </Link>
                  <Link href="#" className="hover:text-orange-200 transition-colors">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Email</h3>
                <p className="text-orange-200">vidyaranyapura@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Number</h3>
                <div className="text-orange-200 space-y-1">
                  <p>+91 9823260156</p>
                  <p>080 4972 3252</p>
                  <p>9538320752</p>
                  <p>6366133799</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
