'use client';  

import { useState } from "react";
import { auth } from "@/app/_lib/firebase";  
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";  


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {  
      await createUserWithEmailAndPassword(auth, email, password);  
      router.push("/public/user/signin");
    } catch (error) {
      
      console.error("Error registering:", error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>
    </div>
  );
}
