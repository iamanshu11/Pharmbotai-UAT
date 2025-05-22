import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import logo from '../assets/logo_svg.svg';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { authApi } from '../api/login_api_helper';

export default function AdminLogin() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    checkAuthentication();
  }, [theme]);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      navigate('/login');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setPopup({ show: true, type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically make an API call to verify admin credentials
      const response = await authApi.login(email, password);
      
      if (response.success) {
        setPopup({ show: true, type: 'success', message: 'Login successful!' });
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        setPopup({ show: true, type: 'error', message: 'Invalid credentials' });
      }
    } catch (error) {
      setPopup({ 
        show: true, 
        type: 'error', 
        message: error.message || 'Login failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71BF44] mx-auto"></div>
          <p className="mt-4 text-[#02410A] dark:text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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

        {/* Admin Login Form */}
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <div className={`rounded-lg py-12 px-6 w-full max-w-md bg-[#FAFBFD] dark:bg-[#15400E]`}>
            <h2 className="dark:text-white text-[#02410A] py-4 text-2xl font-semibold mb-4">Admin Login</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#02410A] dark:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdminLogin}
                disabled={isLoading}
                className={`w-full bg-[#71BF44] text-white py-2 rounded hover:opacity-90 transition-all flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
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