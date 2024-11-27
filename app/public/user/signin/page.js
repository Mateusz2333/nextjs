'use client';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/app/_lib/firebase"; 

export default function SignInForm() {
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/"; 
  const [error, setError] = useState(null); 

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            router.push(returnUrl); 
          })
          .catch((error) => {
            const errorCode = error.code;
            let errorMessage = "Invalid credentials. Please check your login information.";

            if (errorCode === "auth/user-not-found") {
              errorMessage = "User not found.";
            } else if (errorCode === "auth/wrong-password") {
              errorMessage = "Incorrect password.";
            }

            setError(errorMessage); 
          });
      })
      .catch(() => {
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
