'use client';

import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '@/app/_lib/firebase'; 
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form'; 

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');
  
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      street: '',
      city: '',
      zipCode: ''
    },
  });

  
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const snapshot = await getDoc(doc(db, 'users', user.uid)); 
          if (snapshot.exists()) {
            const address = snapshot.data().address; 
            setValue('street', address?.street || '');
            setValue('city', address?.city || '');
            setValue('zipCode', address?.zipCode || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Wystąpił błąd podczas ładowania danych.');
        }
      };
      fetchUserData();
    }
  }, [user, setValue]); 

  const onSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setIsUpdated(false);

    try {
      
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      
      await setDoc(doc(db, 'users', user.uid), {
        address: {
          street: formData.street,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      });

      console.log('Profile and address updated');
      setIsUpdated(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Wystąpił błąd podczas zapisywania danych. Proszę spróbować ponownie.');
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
          Profile and address updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="displayName" className="block font-semibold mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            {...register('displayName', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.displayName && <p className="text-red-500 text-xs">Display Name is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email}
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
            {...register('photoURL')}
            className="w-full p-2 border rounded"
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="street" className="block font-semibold mb-1">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            {...register('street', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.street && <p className="text-red-500 text-xs">Street is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            {...register('city', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.city && <p className="text-red-500 text-xs">City is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block font-semibold mb-1">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            {...register('zipCode', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.zipCode && <p className="text-red-500 text-xs">Zip Code is required</p>}
        </div>

        <div className="mb-4 text-center">
          <label className="block font-semibold mb-1">Profile Picture:</label>
          {user?.photoURL ? (
            <image
              src={user.photoURL}
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
