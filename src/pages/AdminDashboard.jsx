import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import logo from '../assets/logo_svg.svg';
import { Eye, EyeOff, CheckCircle, XCircle, Users, UserPlus, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // New user form states
  const [newUser, setNewUser] = useState({
    pharmacyName: '',
    username: '',
    password: '',
  });
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  
  // Dummy users data (replace with actual API call)
  const [users, setUsers] = useState([
    { id: 1, pharmacyName: 'Pharmacy A', username: 'user1', role: 'admin', status: 'active' },
    { id: 2, pharmacyName: 'Pharmacy B', username: 'user2', role: 'user', status: 'active' },
    { id: 3, pharmacyName: 'Pharmacy C', username: 'user3', role: 'user', status: 'inactive' },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    checkAuthentication();
  }, [theme]);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
        return;
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      navigate('/admin');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAddUser = () => {
    if (!newUser.pharmacyName || !newUser.username || !newUser.password) {
      setPopup({ show: true, type: 'error', message: 'Please fill in all fields' });
      return;
    }

    // Here you would typically make an API call to add the user
    const newUserData = {
      id: users.length + 1,
      pharmacyName: newUser.pharmacyName,
      username: newUser.username,
      role: 'user',
      status: 'active'
    };

    setUsers([...users, newUserData]);
    setNewUser({ pharmacyName: '', username: '', password: '' });
    setPopup({ show: true, type: 'success', message: 'User added successfully!' });
  };

  const handleLogout = () => {
    navigate('/admin');
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

        {/* Admin Dashboard */}
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-[#02410A] dark:text-white">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add New User Card */}
            <div className={`rounded-lg p-6 bg-[#FAFBFD] dark:bg-[#15400E]`}>
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="text-[#71BF44]" size={24} />
                <h3 className="text-xl font-semibold text-[#02410A] dark:text-white">Add New User</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">
                    Pharmacy Name
                  </label>
                  <input
                    type="text"
                    value={newUser.pharmacyName}
                    onChange={(e) => setNewUser({ ...newUser, pharmacyName: e.target.value })}
                    placeholder="Enter pharmacy name"
                    className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Enter username"
                    className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewUserPassword ? 'text' : 'password'}
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Enter password"
                      className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white dark:placeholder:text-[#ffff] placeholder:text-[#02410A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                      className="absolute right-3 top-2.5 text-[#02410A] dark:text-white"
                    >
                      {showNewUserPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddUser}
                  className="w-full bg-[#71BF44] text-white py-2 rounded hover:opacity-90 transition-all"
                >
                  Add User
                </button>
              </div>
            </div>

            {/* Users List Card */}
            <div className={`rounded-lg p-6 bg-[#FAFBFD] dark:bg-[#15400E]`}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-[#71BF44]" size={24} />
                <h3 className="text-xl font-semibold text-[#02410A] dark:text-white">All Users</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-[#02410A] dark:text-white">Pharmacy</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-[#02410A] dark:text-white">Username</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-[#02410A] dark:text-white">Role</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-[#02410A] dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-2 text-sm text-[#02410A] dark:text-white">{user.pharmacyName}</td>
                        <td className="py-3 px-2 text-sm text-[#02410A] dark:text-white">{user.username}</td>
                        <td className="py-3 px-2 text-sm text-[#02410A] dark:text-white capitalize">{user.role}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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