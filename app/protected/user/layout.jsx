'use client';

import { useAuth } from "@/app/_lib/AuthContext";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';

function Protected({ children }) {
  const { user, loading } = useAuth(); 
  const [redirecting, setRedirecting] = useState(false); 
  const router = useRouter();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!loading && !user) { 
      setRedirecting(true); 
      router.push(`/public/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, loading, returnUrl, router]);

  if (loading || redirecting) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>;
}

export default Protected;
