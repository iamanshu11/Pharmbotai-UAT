import {
  Menu,
  RotateCcw,
  Settings,
  Moon,
  Sun,
  LogOut,
  Plus,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { historyApi } from '../api/history_api_helper';
import { PharmacyHistory } from '../models/PharmacyHistoryModel';

export default function Sidebar({ isMobile, onClose, onNewChat }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // State for toggling the history section
  const [showHistory, setShowHistory] = useState(false);
  const [pharmacyHistory, setPharmacyHistory] = useState([]);

  // Fetch pharmacy history from the API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');; // Replace with actual token retrieval logic
        const response = await historyApi.getHistory(token);
        if (response.status === 'success') {
          const historyData = response.data.map((item) => new PharmacyHistory(item));
          setPharmacyHistory(historyData);
        } else {
          console.error('Failed to fetch history:', response.message);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = (item) => {
    console.log('Clicked history item:', item);
    // Optional: navigate or do something with the history item
  };

  return (
    <aside
      className={`h-full ${isMobile ? '' : 'hidden md:flex'
        } bg-[#FAFBFD] text-black dark:bg-[#15400E] dark:text-white flex flex-col md:justify-between p-4 transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div className="space-y-6 overflow-hidden">
        {!isMobile && (
          <div className="flex justify-center">
            <Menu size={24} />
          </div>
        )}

        {onNewChat && (
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-700 transition"
          >
            <Plus size={16} />
            New Chat
          </button>
        )}

        {/* Toggle Button for History */}
        <div className="space-y-3 text-sm text-center pl-2">
          <button
            className="flex items-center justify-center gap-2 hover:text-green-600 dark:hover:text-green-300 transition"
            onClick={() => setShowHistory((prev) => !prev)}
          >
            <RotateCcw size={16} />
            History
          </button>

          {/* Show history only if toggled */}
          {showHistory && (
            <div className="max-h-48 overflow-y-auto custom-scrollbar mt-2 px-1 space-y-2">
              {pharmacyHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleHistoryClick(item)}
                  className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-300 transition"
                >
                  {item.userQuery}
                </button>
              ))}
            </div>
          )}

          <button
            className="flex items-center justify-center gap-2 hover:text-green-600 dark:hover:text-green-300 transition"
            onClick={() => {
              navigate('/settings');
              if (isMobile && typeof onClose === 'function') {
                onClose();
              }
            }}
          >
            <Settings size={16} />
            Profile Settings
          </button>

          <button
            className="flex items-center justify-center gap-2 hover:text-green-600 dark:hover:text-green-300 transition"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-4 pl-2">
        <button
          className="flex items-center justify-center gap-2 text-sm hover:text-red-400 transition"
          onClick={() => navigate('/')}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
