'use client';  

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase"; 
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  
  const signOut = async () => {
    try {
      await firebaseSignOut(auth); 
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  
  const isEmailVerified = user?.emailVerified;

  return (
    <AuthContext.Provider value={{ user, loading, signOut, isEmailVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
