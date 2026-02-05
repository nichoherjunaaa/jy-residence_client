// app/login-success/page.js
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "../api/auth";
import { useUser } from "../context/userContext";

export default function LoginSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUser } = useUser();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token);

            const syncUser = async () => {
                try {
                    const data = await getCurrentUser(token);
                    setUser(data); 
                    router.push("/");
                } catch (err) {
                    router.push("/login?error=sync_failed");
                }
            };
            syncUser();
        }
    }, [searchParams, setUser, router]);

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="animate-pulse">Menghubungkan akun...</p>
        </div>
    );
}