import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Glitchy background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-0.5 bg-cyan-400 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              width: '100%',
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="bg-black bg-opacity-80 backdrop-blur-md border-b border-purple-500 border-opacity-30 shadow-lg shadow-purple-500/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-cyan-400 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-50"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Contact Us
            </h1>
            <div className="h-6 w-6 rounded-full bg-purple-500 animate-pulse"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 sm:text-4xl glitch" data-text="Get in Touch">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-purple-200 mx-auto">
            We'd love to hear from you! Reach out through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg border border-purple-500 border-opacity-20 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-cyan-400 mt-1 mr-4 animate-pulse">
                  <FaEnvelope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-cyan-300">Email</h4>
                  <p className="text-purple-200">support@glitchtech.com</p>
                  <p className="text-purple-200">info@glitchtech.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-cyan-400 mt-1 mr-4 animate-pulse" style={{animationDelay: '0.3s'}}>
                  <FaPhone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-cyan-300">Phone</h4>
                  <p className="text-purple-200">+1 (555) 987-6543</p>
                  <p className="text-purple-300 text-sm">24/7 Glitch Support</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-cyan-400 mt-1 mr-4 animate-pulse" style={{animationDelay: '0.6s'}}>
                  <FaMapMarkerAlt className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-cyan-300">Neural Hub</h4>
                  <p className="text-purple-200">404 Cyberspace Lane</p>
                  <p className="text-purple-200">IIT Mandi Glitch Zone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg border border-cyan-400 border-opacity-20 backdrop-blur-sm hover:border-purple-500 transition-all duration-500">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 glitch" data-text="Transmit Message">
              Transmit Message
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cyan-300">
                  Designation
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full bg-gray-900 bg-opacity-70 border border-purple-500 border-opacity-30 rounded-md shadow-sm py-2 px-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-purple-800"
                  placeholder="Your alias"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
                  Neural Link
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full bg-gray-900 bg-opacity-70 border border-purple-500 border-opacity-30 rounded-md shadow-sm py-2 px-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-purple-800"
                  placeholder="your@neural.interface"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-cyan-300">
                  Transmission Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full bg-gray-900 bg-opacity-70 border border-purple-500 border-opacity-30 rounded-md shadow-sm py-2 px-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-purple-800"
                  placeholder="Priority level"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cyan-300">
                  Encoded Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full bg-gray-900 bg-opacity-70 border border-purple-500 border-opacity-30 rounded-md shadow-sm py-2 px-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-purple-800"
                  placeholder="Transmit your encrypted thoughts..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 hover:shadow-cyan-500/50 relative overflow-hidden group"
                >
                  <span className="relative z-10">Initiate Transmission</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Glitch effect styles */}
      <style jsx>{`
        .glitch {
          position: relative;
        }
        .glitch::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: 1px 0 cyan;
          top: 0;
          color: white;
          background: transparent;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-anim 2s infinite linear alternate-reverse;
        }
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -1px 0 purple;
          top: 0;
          color: white;
          background: transparent;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-anim-2 3s infinite linear alternate-reverse;
        }
        @keyframes noise-anim {
          0% { clip: rect(61px, 9999px, 52px, 0); }
          5% { clip: rect(33px, 9999px, 144px, 0); }
          10% { clip: rect(121px, 9999px, 115px, 0); }
          15% { clip: rect(144px, 9999px, 162px, 0); }
          20% { clip: rect(62px, 9999px, 180px, 0); }
          25% { clip: rect(34px, 9999px, 42px, 0); }
          30% { clip: rect(147px, 9999px, 179px, 0); }
          35% { clip: rect(99px, 9999px, 63px, 0); }
          40% { clip: rect(188px, 9999px, 122px, 0); }
          45% { clip: rect(154px, 9999px, 14px, 0); }
          50% { clip: rect(63px, 9999px, 37px, 0); }
          55% { clip: rect(161px, 9999px, 147px, 0); }
          60% { clip: rect(109px, 9999px, 175px, 0); }
          65% { clip: rect(157px, 9999px, 88px, 0); }
          70% { clip: rect(173px, 9999px, 131px, 0); }
          75% { clip: rect(62px, 9999px, 70px, 0); }
          80% { clip: rect(24px, 9999px, 126px, 0); }
          85% { clip: rect(138px, 9999px, 40px, 0); }
          90% { clip: rect(79px, 9999px, 155px, 0); }
          95% { clip: rect(25px, 9999px, 9px, 0); }
          100% { clip: rect(173px, 9999px, 130px, 0); }
        }
        @keyframes noise-anim-2 {
          0% { clip: rect(26px, 9999px, 33px, 0); }
          5% { clip: rect(140px, 9999px, 198px, 0); }
          10% { clip: rect(184px, 9999px, 89px, 0); }
          15% { clip: rect(121px, 9999px, 6px, 0); }
          20% { clip: rect(181px, 9999px, 99px, 0); }
          25% { clip: rect(154px, 9999px, 133px, 0); }
          30% { clip: rect(134px, 9999px, 169px, 0); }
          35% { clip: rect(26px, 9999px, 187px, 0); }
          40% { clip: rect(147px, 9999px, 137px, 0); }
          45% { clip: rect(31px, 9999px, 52px, 0); }
          50% { clip: rect(191px, 9999px, 109px, 0); }
          55% { clip: rect(74px, 9999px, 54px, 0); }
          60% { clip: rect(145px, 9999px, 75px, 0); }
          65% { clip: rect(153px, 9999px, 198px, 0); }
          70% { clip: rect(99px, 9999px, 136px, 0); }
          75% { clip: rect(118px, 9999px, 192px, 0); }
          80% { clip: rect(1px, 9999px, 83px, 0); }
          85% { clip: rect(145px, 9999px, 98px, 0); }
          90% { clip: rect(121px, 9999px, 154px, 0); }
          95% { clip: rect(156px, 9999px, 44px, 0); }
          100% { clip: rect(67px, 9999px, 122px, 0); }
        }
      `}</style>
    </div>
  );
};

export default Contact;