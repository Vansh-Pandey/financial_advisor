import { FaArrowLeft, FaUsers, FaLightbulb, FaChartLine, FaCode, FaServer, FaBrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden relative">
      {/* === GLITCH BACKGROUND ELEMENTS === */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      {/* === CYBERPUNK SCANLINES OVERLAY === */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      {/* === NAVIGATION BAR (GLOWING BORDER) === */}
      <nav className="bg-black bg-opacity-80 backdrop-blur-md border-b border-purple-500 border-opacity-30 shadow-lg shadow-purple-500/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-cyan-400 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-50"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 glitch" data-text="About Us">
              About Us
            </h1>
            <div className="h-6 w-6 rounded-full bg-cyan-500 animate-pulse"></div>
          </div>
        </div>
      </nav>

      {/* === MAIN CONTENT (FUTURISTIC UI) === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* === HERO SECTION (GLITCH ANIMATED HEADING) === */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 sm:text-5xl glitch" data-text="Our Story">
            Our Story
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-purple-200 mx-auto">
            We are the architects of the digital future. <br /> 
            <span className="text-cyan-300">Breaking reality since 2023.</span>
          </p>
        </div>

        {/* === CYBERPUNK CARDS (HOVER GLOW EFFECTS) === */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* === CARD 1: MISSION === */}
          <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg border border-cyan-400 border-opacity-20 backdrop-blur-sm hover:border-purple-500 transition-all duration-500 group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 text-white mb-4 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
              <FaLightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 text-center">
              Our Mission
            </h3>
            <p className="text-purple-200 text-center">
              To <span className="text-cyan-300">glitch the system</span> and redefine digital experiences. We build the impossible.
            </p>
          </div>

          {/* === CARD 2: TEAM === */}
          <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg border border-purple-500 border-opacity-20 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-cyan-500 text-white mb-4 mx-auto transform group-hover:-rotate-12 transition-transform duration-300">
              <FaUsers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 text-center">
              The Hackers
            </h3>
            <p className="text-purple-200 text-center">
              A <span className="text-cyan-300">neuro-linked collective</span> of coders, designers, and digital rebels.
            </p>
          </div>

          {/* === CARD 3: GROWTH === */}
          <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg border border-cyan-400 border-opacity-20 backdrop-blur-sm hover:border-purple-500 transition-all duration-500 group">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 text-white mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300">
              <FaChartLine className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 text-center">
              Our Growth
            </h3>
            <p className="text-purple-200 text-center">
              From <span className="text-cyan-300">0 to ∞ in 3.6 seconds</span>. The singularity is near.
            </p>
          </div>
        </div>

        {/* === CORE VALUES SECTION (CYBERPUNK TERMINAL STYLE) === */}
        <div className="mt-20 bg-black bg-opacity-70 p-8 rounded-lg shadow-xl border border-purple-500 border-opacity-30 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 glitch" data-text="Core Values">
            Core Values
          </h3>
          <div className="space-y-4">
            {[
              "> **INNOVATE OR DIE** - We break rules to build the future.",
              "> **GLITCH IS FEATURE** - Bugs are just undiscovered features.",
              "> **NEURAL SYNERGY** - Mind-machine fusion is the next evolution.",
              "> **CODE = ART** - Every line is a masterpiece.",
              "> **SPEED OF LIGHT** - If it's not instant, it's outdated."
            ].map((value, index) => (
              <div 
                key={index} 
                className="flex items-start font-mono text-purple-200 hover:text-cyan-300 transition-colors duration-300 cursor-default"
              >
                <span className="text-cyan-400 mr-2">{">"}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === TECH STACK (CYBERPUNK GRID) === */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 text-center glitch" data-text="Tech Stack">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "React", icon: <FaCode className="text-cyan-400" /> },
              { name: "Node.js", icon: <FaServer className="text-purple-400" /> },
              { name: "AI", icon: <FaBrain className="text-cyan-300" /> },
              { name: "Web3", icon: "Ξ" }
            ].map((tech, index) => (
              <div 
                key={index} 
                className="bg-black bg-opacity-60 p-4 rounded-lg border border-purple-500 border-opacity-20 hover:border-cyan-400 transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {tech.icon}
                </div>
                <p className="text-purple-200 group-hover:text-cyan-300 transition-colors duration-300">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* === FINAL CTA (GLOWING BUTTON) === */}
        <div className="mt-20 text-center">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:from-cyan-400 hover:to-purple-500 relative overflow-hidden group"
          >
            <span className="relative z-10">JOIN THE GLITCH REVOLUTION</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* === GLITCH ANIMATION STYLES === */}
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
          20% { clip: rect(62px, 9999px, 180px, 0); }
          40% { clip: rect(188px, 9999px, 122px, 0); }
          60% { clip: rect(109px, 9999px, 175px, 0); }
          80% { clip: rect(24px, 9999px, 126px, 0); }
          100% { clip: rect(173px, 9999px, 130px, 0); }
        }
        @keyframes noise-anim-2 {
          0% { clip: rect(26px, 9999px, 33px, 0); }
          20% { clip: rect(181px, 9999px, 99px, 0); }
          40% { clip: rect(147px, 9999px, 137px, 0); }
          60% { clip: rect(145px, 9999px, 75px, 0); }
          80% { clip: rect(1px, 9999px, 83px, 0); }
          100% { clip: rect(67px, 9999px, 122px, 0); }
        }
      `}</style>
    </div>
  );
};

export default About;