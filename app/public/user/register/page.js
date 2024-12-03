'use client';

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const auth = getAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerError, setRegisterError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setRegisterError(""); 

    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User registered:", userCredential.user);

      
      await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent!");

      
      await signOut(auth);

      
      router.push("/user/verify");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setRegisterError("This email address is already in use.");
      } else {
        setRegisterError(error.message);
      }
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {registerError && (
        <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
          {registerError}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white font-bold rounded ${loading ? "opacity-50" : ""}`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
