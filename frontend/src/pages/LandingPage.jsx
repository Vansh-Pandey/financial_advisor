import { useState, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaArrowRight, FaCode, FaServer, FaBrain } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pixelGlitch, setPixelGlitch] = useState(false);
  const navigate = useNavigate();

  // Random big pixel glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setPixelGlitch(true);
      setTimeout(() => setPixelGlitch(false), 300);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) navigate('/login');
  };

  // Big pixel distortion effect
  const PixelGlitchBox = ({ children }) => (
    <span className={`inline-block relative ${pixelGlitch ? 'animate-big-pixel-glitch' : ''}`}>
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      
      {/* === CRT SCANLINES & NOISE === */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15"></div>
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-px w-full bg-green-500 opacity-10"
            style={{ top: `${i * 2}%` }}
          ></div>
        ))}
      </div>

      {/* === FLOATING PIXELS === */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7
            }}
          ></div>
        ))}
      </div>

      {/* === NAVIGATION BAR === */}
      <nav className="bg-black/90 border-b border-green-400/20 backdrop-blur-md z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-green-400 hover:text-purple-400 transition-colors">
              <PixelGlitchBox>GLITCH_OS</PixelGlitchBox>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              <NavButton path="/" text="HOME" />
              <NavButton path="/about" text="ABOUT" />
              <NavButton path="/contact" text="CONTACT" />
              
              {isLoggedIn ? (
                <NavButton path="/profile" text="PROFILE" icon={<FaUser className="mr-1" />} />
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-green-400 text-black font-bold rounded hover:bg-purple-400 transition-all duration-300 shadow-lg shadow-green-400/20"
                >
                  <PixelGlitchBox>LOGIN</PixelGlitchBox>
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-green-400 hover:text-purple-400 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-green-400/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavButton path="/" text="HOME" />
              <MobileNavButton path="/about" text="ABOUT" />
              <MobileNavButton path="/contact" text="CONTACT" />
              <button 
                onClick={handleLogin}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${isLoggedIn ? 'text-green-400 hover:bg-gray-900' : 'bg-green-400 text-black'}`}
              >
                {isLoggedIn ? 'PROFILE' : 'LOGIN'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* === HERO SECTION === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-green-400">
            <PixelGlitchBox>WELCOME_TO_THE_MATRIX</PixelGlitchBox>
          </h1>
          <p className="text-xl text-green-300 max-w-2xl mx-auto mb-10">
            <PixelGlitchBox>YOUR_CODE_IS_YOUR_WEAPON</PixelGlitchBox>
          </p>
          <div className="flex justify-center space-x-4">
            <GlitchButton 
              onClick={() => navigate('/signup')} 
              text="JOIN_THE_HACK" 
            />
            <GlitchButton 
              onClick={() => navigate('/about')} 
              text="EXPLORE" 
              secondary 
            />
          </div>
        </div>
      </div>

      {/* === FEATURES SECTION === */}
      <div className="relative py-20 overflow-hidden">
        {/* Binary rain background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-green-600 font-mono text-2xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-4">
              <PixelGlitchBox>SYSTEM_FEATURES</PixelGlitchBox>
            </h2>
            <p className="text-lg text-green-300 max-w-2xl mx-auto">
              <PixelGlitchBox>UNLOCK_THE_DIGITAL_DIMENSION</PixelGlitchBox>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlitchCard 
              icon="💻" 
              title="TERMINAL_ACCESS" 
              description="DIRECT_SYSTEM_CONTROL" 
              path="/features/terminal" 
            />
            <GlitchCard 
              icon="🔐" 
              title="DATA_ENCRYPTION" 
              description="UNBREAKABLE_CYPHER" 
              path="/features/encryption" 
            />
            <GlitchCard 
              icon="🌐" 
              title="NETWORK_HACK" 
              description="PENETRATE_ANY_SYSTEM" 
              path="/features/network" 
            />
          </div>
        </div>
      </div>

      {/* === CTA SECTION === */}
      <div className="relative py-28 bg-gradient-to-br from-green-900/20 to-purple-900/20 border-t border-b border-green-400/20 overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
            <PixelGlitchBox>READY_TO_HACK?</PixelGlitchBox>
          </h2>
          <p className="text-lg text-green-300 mb-8">
            <PixelGlitchBox>THE_MATRIX_AWAITS</PixelGlitchBox>
          </p>
          <GlitchButton 
            onClick={() => navigate('/signup')} 
            text="ACTIVATE_NOW" 
            large
          />
        </div>
      </div>

      {/* === FOOTER === */}
      <footer className="bg-black/80 border-t border-green-400/10 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-bold text-green-400 mb-4">
                <PixelGlitchBox>GLITCH_OS</PixelGlitchBox>
              </h3>
              <p className="text-green-400/70 text-sm">
                <PixelGlitchBox>REDEFINING_REALITY_SINCE_2023</PixelGlitchBox>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-4">
                <PixelGlitchBox>NAVIGATION</PixelGlitchBox>
              </h4>
              <ul className="space-y-2">
                <FooterLink path="/" text="HOME" />
                <FooterLink path="/about" text="ABOUT" />
                <FooterLink path="/contact" text="CONTACT" />
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-4">
                <PixelGlitchBox>CONNECT</PixelGlitchBox>
              </h4>
              <ul className="space-y-2">
                <FooterLink path="/matrix" text="MATRIX" />
                <FooterLink path="/support" text="SUPPORT" />
                <FooterLink path="/feedback" text="FEEDBACK" />
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-green-400/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-400/50 text-sm">
              <PixelGlitchBox>{`©_${new Date().getFullYear()}_GLITCH_OS`}</PixelGlitchBox>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <SocialIcon url="https://twitter.com" />
              <SocialIcon url="https://github.com" />
              <SocialIcon url="https://discord.com" />
            </div>
          </div>
        </div>
      </footer>

      {/* === GLOBAL STYLES === */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes big-pixel-glitch {
          0% { transform: translate(0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fall { animation: fall linear infinite; }
        .animate-big-pixel-glitch { 
          animation: big-pixel-glitch 0.3s steps(2) infinite; 
          text-shadow: 2px 2px 0 purple, -2px -2px 0 cyan;
        }
      `}</style>
    </div>
  );
};

// Reusable Components
const NavButton = ({ path, text, icon }) => (
  <Link
    to={path}
    className="px-3 py-2 text-green-400 hover:text-purple-400 rounded-md text-sm font-medium transition-colors hover:bg-black/30"
  >
    {icon}{text}
  </Link>
);

const MobileNavButton = ({ path, text }) => (
  <button
    onClick={() => navigate(path)}
    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-400 hover:bg-gray-900 hover:text-purple-400 transition-colors"
  >
    {text}
  </button>
);

const GlitchButton = ({ onClick, text, secondary = false, large = false }) => (
  <button
    onClick={onClick}
    className={`${large ? 'px-8 py-4 text-lg' : 'px-6 py-3'} rounded-md font-bold relative overflow-hidden ${
      secondary 
        ? 'text-green-400 border border-green-400 hover:bg-green-400/10' 
        : 'bg-green-400 text-black hover:bg-purple-400'
    } transition-all duration-300 shadow-lg ${secondary ? 'shadow-green-400/10' : 'shadow-green-400/20'}`}
  >
    {text.split('_').join(' ')}
  </button>
);

const GlitchCard = ({ icon, title, description, path }) => (
  <div 
    onClick={() => navigate(path)}
    className="bg-black/50 border border-green-400/20 rounded-lg p-6 hover:border-purple-400/40 hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300 cursor-pointer group"
  >
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-400/20 text-green-400 mb-4 text-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-green-400 mb-2 group-hover:text-purple-400 transition-colors">
      {title.split('_').join(' ')}
    </h3>
    <p className="text-green-300/80">
      {description.split('_').join(' ')}
    </p>
  </div>
);

const FooterLink = ({ path, text }) => (
  <li>
    <button
      onClick={() => navigate(path)}
      className="text-sm text-green-400/70 hover:text-purple-400 transition-colors"
    >
      {text.split('_').join(' ')}
    </button>
  </li>
);

const SocialIcon = ({ url }) => (
  <button
    onClick={() => window.open(url, '_blank')}
    className="text-green-400/50 hover:text-purple-400 transition-colors"
  >
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  </button>
);

export default LandingPage;