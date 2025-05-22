import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import logo from '../assets/logo_svg.svg';
import {
  Eye,
  EyeOff,
  Users,
  UserPlus,
  LogOut,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { adminPharmacyApi } from '../api/admin_add_pharmacy_helper';
import { adminDetailsPharmacyApi } from '../api/admin_details_pharmacy_helper';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState('pharma');

  // Pharma data state
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [pharmacies, setPharmacies] = useState([]);
  const [newPharmacy, setNewPharmacy] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    logo_url: '',
    ai_model: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Prompt Topic Manager state
  const [topicName, setTopicName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState([{ title: '', details: '' }]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (activeTab === 'pharma') initPharma();
  }, [theme, activeTab]);

  const initPharma = async () => {
    try {
      const resp = await adminDetailsPharmacyApi.fetchPharmacies();
      setPharmacies(resp.data);
    } catch (error) {
      console.error(error);
      navigate('/admin');
    }
  };

  const handleAddPharmacy = async () => {
    const { name, email, password, address, logo_url, ai_model } = newPharmacy;
    if (!name || !email || !password || !address || !logo_url || !ai_model) {
      setPopup({ show: true, type: 'error', message: 'Please fill in all fields' });
      return;
    }
    setIsLoading(true);
    try {
      const resp = await adminPharmacyApi.addPharmacy(newPharmacy);
      setPharmacies(prev => [...prev, resp.data]);
      setNewPharmacy({ name: '', email: '', password: '', address: '', logo_url: '', ai_model: '' });
      setPopup({ show: true, type: 'success', message: 'Pharmacy added successfully!' });
    } catch (error) {
      setPopup({ show: true, type: 'error', message: error.message || 'Add pharmacy failed' });
    } finally {
      setIsLoading(false);
    }
  };

  // Prompt Topic Manager handlers
  const addRule = () => setRules(prev => [...prev, { title: '', details: '' }]);
  const updateRuleTitle = (idx, value) =>
    setRules(prev => prev.map((r, i) => i === idx ? { ...r, title: value } : r));
  const updateRuleDetails = (idx, value) =>
    setRules(prev => prev.map((r, i) => i === idx ? { ...r, details: value } : r));
  const deleteRule = idx =>
    setRules(prev => prev.filter((_, i) => i !== idx));
  const handleSaveTopic = () => {
    console.log({ topicName, description, rules });
    setPopup({ show: true, type: 'success', message: 'Topic saved (stub)!' });
  };
  const handleCancel = () => {
    setTopicName('');
    setDescription('');
    setRules([{ title: '', details: '' }]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-[linear-gradient(to_right,_#042904_0%,_#265818_31%,_#71BF44_100%)] text-black dark:text-white`}>
      <div className="container mx-auto px-4">
        <header className="w-full pt-6 pb-2 flex flex-col items-start">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Pharmbot Logo" className="h-12" />
            <span className="text-2xl font-bold text-[#71BF44]">
              AIVA<span className="text-[#000] dark:text-[#fff]">e</span>
            </span>
          </div>
          <span className="text-xs text-black dark:text-white mt-1 pl-1">0.1.0 Medic</span>
        </header>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setActiveTab('pharma')}
            className={`px-4 py-2 focus:outline-none ${activeTab === 'pharma' ? 'border-b-2 border-[#71BF44] text-[#71BF44]' : 'text-gray-600'}`}
          >
            Pharma Data
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2 focus:outline-none ${activeTab === 'prompt' ? 'border-b-2 border-[#71BF44] text-[#71BF44]' : 'text-gray-600'}`}
          >
            Enter Prompt
          </button>
        </div>

        {/* Pharma Data */}
        {activeTab === 'pharma' && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add Pharmacy Card */}
            <div className="rounded-lg p-6 bg-[#FAFBFD] dark:bg-[#15400E]">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="text-[#71BF44]" size={24} />
                <h3 className="text-xl font-semibold text-[#02410A] dark:text-white">Add Pharmacy</h3>
              </div>
              <div className="space-y-4">
                {['name', 'email', 'password', 'address', 'logo_url', 'ai_model'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1 capitalize">
                      {field.replace('_', ' ')}
                    </label>
                    <div className={field === 'password' ? 'relative' : ''}>
                      <input
                        type={field === 'password' && !showPassword ? 'password' : 'text'}
                        value={newPharmacy[field]}
                        onChange={e => setNewPharmacy(prev => ({ ...prev, [field]: e.target.value }))}
                        placeholder={`Enter ${field.replace('_', ' ')}`}
                        className="w-full p-2 rounded bg-[#E6EAF1] dark:bg-[#0F5518] border-gray-300 text-[#02410A] dark:text-white placeholder:text-[#02410A] dark:placeholder:text-[#fff]"
                      />
                      {field === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-[#02410A] dark:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddPharmacy}
                  disabled={isLoading}
                  className="w-full bg-[#71BF44] text-white py-2 rounded hover:opacity-90 transition-all"
                >
                  {isLoading ? 'Adding…' : 'Add Pharmacy'}
                </button>
              </div>
            </div>

            {/* Pharmacies List Card */}
            <div className="rounded-lg p-6 bg-[#FAFBFD] dark:bg-[#15400E] overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="text-[#71BF44]" size={24} />
                  <h3 className="text-xl font-semibold text-[#02410A] dark:text-white">All Pharmacies</h3>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 px-2 text-left text-sm font-medium text-[#02410A] dark:text-white">Name</th>
                    <th className="py-2 px-2 text-left text-sm font-medium text-[#02410A] dark:text-white">Email</th>
                    <th className="py-2 px-2 text-left text-sm font-medium text-[#02410A] dark:text-white">Address</th>
                    <th className="py-2 px-2 text-left text-sm font-medium text-[#02410A] dark:text-white">AI Model</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacies.map(ph => (
                    <tr key={ph.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-2 text-sm text-[#02410A] dark:text-white">{ph.name}</td>
                      <td className="py-2 px-2 text-sm text-[#02410A] dark:text-white">{ph.email}</td>
                      <td className="py-2 px-2 text-sm text-[#02410A] dark:text-white">{ph.address}</td>
                      <td className="py-2 px-2 text-sm text-[#02410A] dark:text-white">{ph.ai_model}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prompt Topic Manager */}
        {activeTab === 'prompt' && (
          <div className="py-8 bg-[#FAFBFD] dark:bg-[#15400E] rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-[#02410A] dark:text-white mb-6">Prompt Topic Manager</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">Topic Name</label>
                <input
                  value={topicName}
                  onChange={e => setTopicName(e.target.value)}
                  className="w-full rounded p-2 bg-[#E6EAF1] dark:bg-[#0F5518] text-[#02410A] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full rounded p-2 h-24 bg-[#E6EAF1] dark:bg-[#0F5518] text-[#02410A] dark:text-white"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#02410A] dark:text-white">Rules</span>
                <button
                  onClick={addRule}
                  className="px-3 py-1 bg-[#71BF44] text-white rounded hover:opacity-90 transition"
                >
                  ➕ Add Rule
                </button>
              </div>

              {rules.map((rule, idx) => (
                <div key={idx} className="border rounded p-4 bg-white dark:bg-[#0F5518]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-[#02410A] dark:text-white">Rule #{idx + 1}</span>
                    <button onClick={() => deleteRule(idx)} className="text-red-600 hover:text-red-800">❌</button>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">Rule Title</label>
                    <input
                      value={rule.title}
                      onChange={e => updateRuleTitle(idx, e.target.value)}
                      className="w-full rounded p-2 bg-[#E6EAF1] dark:bg-[#0F5518] text-[#02410A] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#02410A] dark:text-white mb-1">Rule Details</label>
                    <textarea
                      value={rule.details}
                      onChange={e => updateRuleDetails(idx, e.target.value)}
                      className="w-full rounded p-2 h-20 bg-[#E6EAF1] dark:bg-[#0F5518] text-[#02410A] dark:text-white"
                    />
                  </div>
                </div>
              ))}

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSaveTopic}
                  className="flex items-center gap-2 bg-[#71BF44] text-white px-4 py-2 rounded hover:opacity-90 transition"
                >
                  ✅ Save Topic
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 dark:bg-gray-600 text-[#02410A] dark:text-white px-4 py-2 rounded hover:opacity-90 transition"
                >
                  ✖ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup Notification */}
      {popup.show && ( 
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white ${popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {popup.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span className="text-sm">{popup.message}</span>
        </div>
      )}
    </div>
  );
}
