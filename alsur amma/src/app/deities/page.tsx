export default function Deities() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Deities</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            The divine presences worshipped at our temple
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Deity Section */}
          <div className="bg-orange-50 rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Sri Raghavendra Swami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-500">Sri Raghavendra Swami</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Sri Raghavendra Swami, also known as Sri Raghavendra Tirtha, was a renowned Hindu scholar, 
                  theologian and saint. He is considered to be one of the greatest saints of the Dvaita Vedanta 
                  philosophy and is revered as a manifestation of Sri Prahlada.
                </p>
                <p>
                  Born in 1595 CE in Bhuvanagiri, Tamil Nadu, he was a disciple of Sri Sudhindra Tirtha and 
                  succeeded him as the head of the Uttaradi Mutt. He is known for his scholarly works, miracles, 
                  and devotion to Lord Vishnu.
                </p>
                <p>
                  The Brindavana (sacred tomb) of Sri Raghavendra Swami at Mantralayama is a major pilgrimage 
                  center where devotees from all over the world come to seek his blessings.
                </p>
              </div>
            </div>
          </div>

          {/* Other Deities Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Other Deities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Lord Hanuman */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Lord Hanuman</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Lord Hanuman</h4>
                <p className="text-gray-600 text-sm">
                  The devoted servant of Lord Rama, symbol of strength and devotion
                </p>
              </div>

              {/* Lord Venkateshwara */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Lord Venkateshwara</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Lord Venkateshwara</h4>
                <p className="text-gray-600 text-sm">
                  Form of Lord Vishnu worshipped at Tirumala, bestower of boons
                </p>
              </div>

              {/* Goddess Lakshmi */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Goddess Lakshmi</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Goddess Lakshmi</h4>
                <p className="text-gray-600 text-sm">
                  Goddess of wealth, fortune and prosperity, consort of Lord Vishnu
                </p>
              </div>

              {/* Lord Ganesha */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Lord Ganesha</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Lord Ganesha</h4>
                <p className="text-gray-600 text-sm">
                  Remover of obstacles, lord of beginnings and wisdom
                </p>
              </div>

              {/* Lord Shiva */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Lord Shiva</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Lord Shiva</h4>
                <p className="text-gray-600 text-sm">
                  The destroyer and transformer, supreme deity of Hinduism
                </p>
              </div>

              {/* Navagrahas */}
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Navagrahas</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Navagrahas</h4>
                <p className="text-gray-600 text-sm">
                  Nine planetary deities influencing human destiny
                </p>
              </div>
            </div>
          </div>

          {/* Daily Worship Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Daily Worship Schedule
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Suprabhata Seva</h4>
                  <p className="text-gray-600">Morning awakening ceremony</p>
                </div>
                <span className="text-orange-600 font-semibold">5:30 AM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Abhisheka</h4>
                  <p className="text-gray-600">Sacred bathing ceremony</p>
                </div>
                <span className="text-orange-600 font-semibold">7:00 AM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Archana</h4>
                  <p className="text-gray-600">Flower offerings and prayers</p>
                </div>
                <span className="text-orange-600 font-semibold">8:00 AM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Madhyahna Pooja</h4>
                  <p className="text-gray-600">Noon worship ceremony</p>
                </div>
                <span className="text-orange-600 font-semibold">12:00 PM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Deeparadhana</h4>
                  <p className="text-gray-600">Evening lamp worship</p>
                </div>
                <span className="text-orange-600 font-semibold">6:00 PM</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">Ratri Pooja</h4>
                  <p className="text-gray-600">Night worship ceremony</p>
                </div>
                <span className="text-orange-600 font-semibold">8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Special Poojas Section */}
          <div className="bg-orange-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Special Poojas and Festivals
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Monthly Special Poojas</h4>
                <ul className="space-y-2 text-orange-100">
                  <li>• Ekadashi Special Pooja</li>
                  <li>• Poornima Pooja</li>
                  <li>• Amavasya Pooja</li>
                  <li>• Sankashti Chaturthi</li>
                  <li>• Pradosha Pooja</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Annual Festivals</h4>
                <ul className="space-y-2 text-orange-100">
                  <li>• Sri Raghavendra Aradhana Mahotsava</li>
                  <li>• Sri Ramanavami</li>
                  <li>• Sri Krishna Janmashtami</li>
                  <li>• Ganesh Chaturthi</li>
                  <li>• Deepavali</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Book Special Pooja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
