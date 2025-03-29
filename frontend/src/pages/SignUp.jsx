import { useState, useEffect } from 'react';
import { FaTimes, FaUserAstronaut, FaFingerprint, FaKey, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
const SignupOverlay = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [pixelGlitch, setPixelGlitch] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const navigate = useNavigate();
  const { signup, isRegistering } = useAuthStore();
  // Random big pixel glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setPixelGlitch(true);
      setTimeout(() => setPixelGlitch(false), 200);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit =async (e) => {
      e.preventDefault();
      if (validateForm()) {
          const success = await signup(formData);
          if (success) {
        setAccessGranted(true);
          navigate("/home");
        }
      }
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
            className="absolute h-px w-full bg-cyan-500 opacity-10"
            style={{ top: `${i * 2}%` }}
          />
        ))}
      </div>

      {/* Floating Pixels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-sm"
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

      {/* Signup Container */}
      <div className="relative w-full max-w-md bg-black/80 border-2 border-cyan-400/30 rounded-lg overflow-hidden shadow-xl shadow-cyan-400/20">
        {/* Header */}
        <div className="p-6 border-b border-cyan-400/20 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-cyan-400">
            <PixelGlitchBox>NEW_USER_INIT</PixelGlitchBox>
          </h2>
          <button 
            onClick={onClose}
            className="text-cyan-400 hover:text-purple-400 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Access Granted Animation */}
        {accessGranted && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 z-10 animate-pulse">
            <div className="text-center p-6">
              <div className="text-4xl font-mono text-green-400 mb-4">ACCESS_GRANTED</div>
              <div className="text-lg text-green-300">SYNCING_NEURAL_PROFILE</div>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-cyan-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>AGENT_ID</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAstronaut className="text-cyan-400/70" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-cyan-400/30 rounded-lg text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                placeholder="hacker1337"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-cyan-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>NEURAL_ID</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaShieldAlt className="text-cyan-400/70" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-cyan-400/30 rounded-lg text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                placeholder="user@glitch.net"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-cyan-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>CIPHER_KEY</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaKey className="text-cyan-400/70" />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-cyan-400/30 rounded-lg text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* <div className="mb-6">
            <label className="block text-cyan-400 mb-2 font-mono text-sm">
              <PixelGlitchBox>CONFIRM_KEY</PixelGlitchBox>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFingerprint className="text-cyan-400/70" />
              </div>
              <input
                type="password"
                value={formData.confirmKey}
                onChange={(e) => setFormData({...formData, confirmKey: e.target.value})}
                className="w-full pl-10 pr-3 py-3 bg-black/50 border border-cyan-400/30 rounded-lg text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div> */}

          <div className="flex items-center mb-6">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 bg-black border-cyan-400/30 rounded focus:ring-cyan-400/50"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-cyan-400/70 font-mono">
              <PixelGlitchBox>ACCEPT_GLITCH_TERMS</PixelGlitchBox>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-400/20 relative overflow-hidden group"
          >
            <span className="relative z-10 font-mono">
              <PixelGlitchBox>INITIALIZE_PROFILE</PixelGlitchBox>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-400/20 text-center">
          <p className="text-sm text-cyan-400/50 font-mono">
            <PixelGlitchBox>EXISTING_AGENT?_</PixelGlitchBox>
            <button 
              onClick={() => navigate('/login')}
              className="ml-1 text-cyan-400 hover:text-purple-400"
            >
              <PixelGlitchBox>AUTHENTICATE</PixelGlitchBox>
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

export default SignupOverlay;