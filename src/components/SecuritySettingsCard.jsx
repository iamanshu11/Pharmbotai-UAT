import { useRef, useState } from 'react';
import { KeyRound, Upload, Eye, EyeOff, X, CheckCircle } from 'lucide-react';

export default function SecuritySettingsCard() {
    const fileInputRef = useRef(null);
    const [licenseName, setLicenseName] = useState('License_2024.pdf');
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLicenseName(file.name);
        }
    };

    const handleSavePassword = () => {
        const { current, new: newPass, confirm } = passwordData;

        if (!current || !newPass || !confirm) {
            alert('Please fill in all password fields.');
            return;
        }

        if (newPass !== confirm) {
            alert('New password and confirmation do not match.');
            return;
        }

        // Simulate success
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
            setShowModal(false);
            setPasswordData({ current: '', new: '', confirm: '' });
        }, 2000);
    };

    return (
        <div className="rounded-lg p-6 mb-6 dark:bg-[#0F5518] bg-[#E6EAF1] relative">
            <h2 className="font-semibold dark:text-white text-[#02410A] mb-4">Security Settings</h2>

            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 border border-[#71BF44] dark:text-white text-[#02410A] px-4 py-2 rounded-lg mb-4"
            >
                <KeyRound size={16} />
                Change Password
            </button>

            <div className="text-sm dark:text-white text-[#02410A] mb-2">Pharmacy License</div>
            <div className="flex items-center justify-between">
                <span className="text-xs dark:text-white text-[#02410A]">Current: {licenseName}</span>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    className="flex items-center gap-2 bg-[#71BF44] text-white px-4 py-2 rounded-lg"
                    onClick={handleUploadClick}
                >
                    <Upload size={16} />
                    Update License
                </button>
            </div>

            {/* Password Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000c4] bg-opacity-50">
                    <div className="bg-white dark:bg-[#15400E] p-6 rounded-lg w-full max-w-md relative shadow-xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-black dark:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-lg font-semibold mb-4 dark:text-white text-[#02410A]">Update Password</h3>

                        {['current', 'new', 'confirm'].map((field) => (
                            <div className="mb-4" key={field}>
                                <label className="block text-sm font-medium mb-1 dark:text-white text-[#02410A]">
                                    {field === 'current'
                                        ? 'Current Password'
                                        : field === 'new'
                                            ? 'New Password'
                                            : 'Confirm Password'}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword[field] ? 'text' : 'password'}
                                        value={passwordData[field]}
                                        onChange={(e) =>
                                            setPasswordData((prev) => ({ ...prev, [field]: e.target.value }))
                                        }
                                        className="w-full px-3 py-2 pr-10 border rounded dark:bg-[#0F5518] bg-[#F5F5F5] dark:text-white text-black"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-gray-600 dark:text-white"
                                        onClick={() =>
                                            setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
                                        }
                                    >
                                        {showPassword[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={handleSavePassword}
                            className="w-full bg-[#71BF44] text-white py-2 rounded mt-2"
                        >
                            Save Password
                        </button>

                        {showSuccess && (
                            <div className="flex items-center justify-center mt-4 text-green-600 dark:text-green-400">
                                <CheckCircle size={18} className="mr-2" />
                                Password updated
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
