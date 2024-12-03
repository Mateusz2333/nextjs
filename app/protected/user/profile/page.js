'use client';

import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    photoURL: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsUpdated(false);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      console.log('Profile updated');

      
      if (user.displayName === formData.displayName && user.photoURL === formData.photoURL) {
        setIsUpdated(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {error && (
        <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {isUpdated && (
        <div className="mb-4 p-2 text-sm text-green-700 bg-green-100 border border-green-400 rounded">
          Profile updated successfully! Display name is now: {formData.displayName}
        </div>
      )}

      <form onSubmit={onSubmit}>
        
        <div className="mb-4">
          <label htmlFor="displayName" className="block font-semibold mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="photoURL" className="block font-semibold mb-1">
            Profile Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        
        <div className="mb-4 text-center">
          <label className="block font-semibold mb-1">Profile Picture:</label>
          {formData.photoURL ? (
            <img
              src={formData.photoURL}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center text-white">
              No Image
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white font-bold rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating Profile...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
