import { useEffect, useState } from 'react';

function ToggleRow({ title, description, storageKey }) {
  const [enabled, setEnabled] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      setEnabled(saved === 'true');
    }
  }, [storageKey]);

  // Save toggle state to localStorage on change
  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem(storageKey, newValue.toString());
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="dark:text-white text-[#02410A] font-semibold text-sm">{title}</div>
        <div className="dark:text-white text-[#02410A] text-xs">{description}</div>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-[#013a0a] relative transition-colors duration-300">
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
        </div>
      </label>
    </div>
  );
}

export default function NotificationPreferencesCard() {
  return (
    <div className="rounded-lg p-6 dark:bg-[#0F5518] bg-[#E6EAF1]">
      <h2 className="font-semibold dark:text-white text-[#02410A] mb-4">Notification Preferences</h2>
      <ToggleRow
        title="Order Alerts"
        description="Receive Notification for new Orders"
        storageKey="toggle_order_alerts"
      />
      <ToggleRow
        title="Inventory Updates"
        description="Get alerts for low stock items"
        storageKey="toggle_inventory_updates"
      />
      <ToggleRow
        title="Prescription Reminders"
        description="Notifications for prescription renewals"
        storageKey="toggle_prescription_reminders"
      />
    </div>
  );
}
