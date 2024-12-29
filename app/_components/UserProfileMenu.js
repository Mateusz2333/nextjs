'use client';

import { useAuth } from '@/app/lib/firebase/AuthContext';

export default function UserProfileMenu() {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      
      {user?.photoURL ? (
        <image
          src={user.photoURL}
          alt="Profile Picture"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        
        <image
          src="/public/windows.jpg" 
          alt="Default Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}

      <div>
        
        <p>{user?.displayName || 'Guest'}</p>
      </div>
    </div>
  );
}
