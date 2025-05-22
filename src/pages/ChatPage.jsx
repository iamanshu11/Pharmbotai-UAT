import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo_svg.svg';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { messages, setMessages } = useChat();

  // Handler to clear chat (for New Chat)
  const handleNewChat = () => setMessages([]);

  return (
    <div className="flex h-screen bg-white text-black dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] dark:text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ease-in-out ${desktopSidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'}`}>
        <Sidebar onNewChat={handleNewChat} />
      </div>

      {/* Desktop Toggle Button (Burger when collapsed, X when expanded) */}
      <div className="hidden md:block fixed top-[5%] -translate-y-1/2 z-40" style={{ left: desktopSidebarCollapsed ? '1rem' : '16rem' }}>
        <button 
          onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)} 
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full shadow-lg"
        >
          {desktopSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Sliding Panel */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } bg-[#FAFBFD] dark:bg-[#15400E] shadow-lg`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-3">
          <button onClick={() => setSidebarOpen(false)} className="text-black dark:text-white">
            <X size={20} />
          </button>
        </div>

        <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="container mx-auto flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {/* Burger icon for mobile only */}
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-black dark:text-white">
                <Menu size={24} />
              </button>

              {/* Logo */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Pharmbot Logo" className="h-12" />
                  <span className="text-2xl font-bold text-[#71BF44]">AIVA<span className="text-[#000] dark:text-[#fff]">e</span></span>
                </div>
                <span className="text-xs text-black dark:text-white mt-2 pl-2">0.1.0 Medic</span>
              </div>
            </div>

            {/* HOME Button */}
            <div
              onClick={() => navigate('/chat')}
              className="text-sm font-medium cursor-pointer text-black dark:text-white hover:underline"
            >
              HOME
            </div>
          </header>

          {/* Chat Window */}
          <div className="flex-1 flex justify-center items-start pb-4 overflow-y-auto md:overflow-hidden">
            <ChatWindow messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}
