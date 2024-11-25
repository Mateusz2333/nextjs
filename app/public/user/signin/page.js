'use client';  

import { useState } from "react";
import { auth } from "../../../_lib/firebase";  
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";  

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      
      router.push("/protected/user/profile");
    } catch (error) {
      
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Sign In
        </button>
      </form>
    </div>
  );
}
