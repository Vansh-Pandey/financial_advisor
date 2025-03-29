import { useState, useEffect } from 'react';
import { FaTimes, FaUserShield, FaFingerprint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
const Login = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [pixelGlitch, setPixelGlitch] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();

  // Random big pixel glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setPixelGlitch(true);
      setTimeout(() => setPixelGlitch(false), 200);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate authentication
    setAccessDenied(true);
    // const success = await login(credentials);
    while (!credentials) {
        setAccessDenied(true);
    }
    navigate("/home");
  };

  const PixelGlitchBox = ({ children }) => (
    <span className={`inline-block relative ${pixelGlitch ? 'animate-big-pixel-glitch' : ''}`}>
      {children}
    </span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      {/* CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-px w-full bg-green-500 opacity-10"
            style={{ top: `${i * 2}%` }}
          />
        ))}
      </div>

      {/* Floating Pixels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
          />
        ))}
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md bg-black/80 border-2 border-green-400/30 rounded-lg overflow-hidden shadow-xl shadow-green-400/20">
        {/* Header */}
        <div className="p-6 border-b border-green-400/20 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-400">
            <PixelGlitchBox>SYSTEM_ACCESS</PixelGlitchBox>
          </h2>
          <button 
            onClick={onClose}
            className="text-green-400 hover:text-purple-400 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Access Denied Animation */}
        {accessDenied && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-10 animate-pulse">
            <div className="text-center p-6">
              <div className="text-4xl font-mono text-red-400 mb-4">FINDING_YOU</div>
              <div className="text-lg text-red-300">INVALID_CREDENTIALS</div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-green-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>NEURAL_ID</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserShield className="text-green-400/70" />
              </div>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-green-400/30 rounded-lg text-green-200 font-mono focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                placeholder="user@glitch.net"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-green-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>CIPHER_KEY</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFingerprint className="text-green-400/70" />
              </div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-green-400/30 rounded-lg text-green-200 font-mono focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 bg-black border-green-400/30 rounded focus:ring-green-400/50"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-green-400/70 font-mono">
                <PixelGlitchBox>REMEMBER_ME</PixelGlitchBox>
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-green-400 hover:text-purple-400 font-mono"
            >
              <PixelGlitchBox>FORGOT_KEY?</PixelGlitchBox>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-purple-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-green-400/20 relative overflow-hidden group"
          >
            <span className="relative z-10 font-mono">
              <PixelGlitchBox>AUTHENTICATE</PixelGlitchBox>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-green-400/20 text-center">
          <p className="text-sm text-green-400/50 font-mono">
            <PixelGlitchBox>NO_ACCOUNT?_</PixelGlitchBox>
            <button 
              onClick={() => navigate('/signup')}
              className="ml-1 text-green-400 hover:text-purple-400"
            >
              <PixelGlitchBox>REQUEST_ACCESS</PixelGlitchBox>
            </button>
          </p>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes big-pixel-glitch {
          0% { transform: translate(0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0); }
        }
        .animate-big-pixel-glitch { 
          animation: big-pixel-glitch 0.3s steps(2) infinite; 
          text-shadow: 2px 2px 0 purple, -2px -2px 0 cyan;
        }
      `}</style>
    </div>
  );
};

export default Login;