'use client';

import { useAuth } from "@/app/_lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

function Protected({ children }) {
    const { user } = useAuth(); 
    const returnUrl = usePathname(); 

    useLayoutEffect(() => {
        if (!user) {
            redirect(`/public/user/signin?returnUrl=${returnUrl}`);
        }
    }, [user]); 
    

    return <>{children}</>; 
}

export default Protected;
