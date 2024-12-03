'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/app/_lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true); 
    try {
      await signOut(auth); 
      router.push("/public/user/signin"); 
    } catch (error) {
      console.error("Wylogowanie nie powiodło się:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <button
      onClick={onSubmit}
      className={`px-4 py-2 font-bold rounded ${
        loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
      } text-white`}
      disabled={loading} 
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
