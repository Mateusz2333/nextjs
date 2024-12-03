'use client';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_lib/AuthContext'; 

export default function VerifyEmail() {
  const { user } = useAuth(); 
  const router = useRouter();
  const auth = getAuth();

  
  useEffect(() => {
    if (user) {    
      signOut(auth)
        .then(() => {
          console.log('User signed out');      
          router.push('/user/login'); 
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    }
  }, [user, auth, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">
        Email not verified. Please verify by clicking the link in the email sent to your address{' '}
        {user?.email}
      </h1>
      <p className="text-gray-700">
        After clicking the verification link, you can log in to your account.
      </p>
    </div>
  );
}
