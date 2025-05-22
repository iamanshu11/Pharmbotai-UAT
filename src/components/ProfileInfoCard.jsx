import React, { useState, useEffect } from 'react';
import { profileApi } from '../api/profile_api_helper';
import {
  FaUser, FaBuilding, FaEnvelope, FaMapMarkerAlt,
  FaEdit, FaSave, FaTimes, FaRobot
} from 'react-icons/fa';

const ProfileInfoCard = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('Component mounted. Fetching profile...');
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await profileApi.getProfile(token);
      console.log('Profile fetched:', response);

      if (response?.status === 'success' && response.data) {
        setProfile(response.data);
        setNewName(response.data.pharmacy?.name || '');
      } else {
        setError('Invalid profile data from server');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleNameUpdate = async () => {
    console.log('handleNameUpdate triggered with name:', newName);
    try {
      setLoading(true);
      setError(null);
      const response = await profileApi.updateProfileName(token, newName);
      console.log('Update response:', response);

      if (response?.data) {
        setProfile(response.data);
        setIsEditing(false);
        alert('Profile name updated successfully!');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Error in handleNameUpdate:', err);
      setError(err.message || 'Failed to update profile name');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-700 bg-red-100 border border-red-400">{error}</div>;
  }

  if (!profile) {
    return <div className="p-4 text-gray-600">No profile data available</div>;
  }

  return (
    <div className="bg-[#FAFBFD] text-black dark:bg-[#02410A] dark:text-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#02410A] dark:text-white">
          Profile Information
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#02410A] dark:text-white"
          >
            <FaEdit className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={async () => {
                console.log("Save button clicked with name:", newName);
                try {
                  await await profileApi.updateProfileName(token, newName);
                  setIsEditing(false);
                } catch (err) {
                  console.error("Save error:", err);
                }
              }}
              className="text-green-600 hover:text-green-800"
            >
              <FaSave className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewName(profile.pharmacy.name);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <InfoRow icon={<FaUser />} label="Username" value={profile.username} />
        <InfoRow
          icon={<FaBuilding />}
          label="Pharmacy Name"
          value={newName}
          isEditing={isEditing}
          onChange={setNewName}
        />
        <InfoRow
          icon={<FaEnvelope />}
          label="Email"
          value={profile.pharmacy.email}
        />
        <InfoRow
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={profile.pharmacy.address}
        />
        <InfoRow
          icon={<FaRobot />}
          label="AI Model"
          value={profile.pharmacy.ai_model}
        />
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, isEditing = false, onChange }) => (
  <div className="flex items-center">
    <div className="text-[#02410A] dark:text-white mr-3">{icon}</div>
    <div>
      <p className="text-sm text-[#02410A] dark:text-white">{label}</p>
      {isEditing && onChange ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  </div>
);

export default ProfileInfoCard;
