import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import logo from '../assets/logo_svg.svg';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { authApi } from '../api/login_api_helper';

export default function LoginPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleLogin = async () => {
    if (!username || !password) {
      setPopup({ show: true, type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(username, password);
      setPopup({ show: true, type: 'success', message: 'Login successful!' });

      if (rememberMe) {
        localStorage.setItem('rememberEmail', username);
      }

      setTimeout(() => {
        setPopup({ show: false, type: '', message: '' });
        navigate('/chat');
      }, 2000);

    } catch (error) {
      setPopup({ 
        show: true, 
        type: 'error', 
        message: error.message || 'Login failed. Please check your credentials.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] text-black dark:text-white`}>
      <div className="container mx-auto px-4">

        {/* Logo Header */}
        <header className="w-full pt-6 pb-2 flex flex-col items-start">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Pharmbot Logo" className="h-12" />
            <span className="text-2xl font-bold text-[#71BF44]">AIVA<span className="text-[#000] dark:text-[#fff]">e</span></span>
          </div>
          <span className="text-xs text-black dark:text-white mt-1 pl-1">0.1.0 Medic</span>
        </header>

        {/* Centered Login Form */}
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <div className={`rounded-lg py-12 px-6 w-full max-w-md bg-[#FAFBFD] dark:bg-[#15400E]`}>
            <h2 className="dark:text-white text-[#02410A] py-4 text-2xl font-semibold mb-4">Welcome Back</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded mb-3 bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
              disabled={isLoading}
            />

            <div className="relative mb-3">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#02410A] dark:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-[#02410A] dark:text-white text-sm">Remember me</label>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-[#71BF44] text-white py-2 rounded hover:opacity-90 transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-xs text-white mt-3 text-center">
              By logging in, you agree to GDPR guidelines
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Popup Notification */}
      {popup.show && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white
          ${popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {popup.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span className="text-sm">{popup.message}</span>
        </div>
      )}
    </div>
  );
}
