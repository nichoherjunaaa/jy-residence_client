"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    EnvelopeSimple,
    LockKey,
    Eye,
    EyeSlash,
    SignIn,
    GoogleLogo,
    FacebookLogo,
    Spinner,
    CheckCircle,
    WarningCircle
} from "@phosphor-icons/react";
import { login } from "../api/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");

    const { setUser } = useUser();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const response = await login(email, password);
            setStatus("success");
            localStorage.setItem("token", response.token);
            setUser(response);
            setTimeout(() => router.push("/"), 800);
        } catch (error) {
            console.error("Login failed:", error);
            setStatus("failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-light text-primary font-sans">
            {/* Left Side */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-primary items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
                        alt="Hotel Lobby"
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
                </div>

                <div className="relative z-10 text-white p-12 max-w-xl">
                    <h2 className="text-5xl font-bold brand-font mb-6 leading-tight">Welcome Back to Paradise.</h2>
                    <p className="text-gray-300 text-lg font-light mb-8">
                        "Kemewahan bukan hanya tentang tempat, tapi tentang perasaan saat Anda tiba. Masuk untuk mengelola pesanan Anda."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=1" alt="User" />
                            <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=5" alt="User" />
                            <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://i.pravatar.cc/100?img=8" alt="User" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Join 5k+ Happy Guests</span>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-2/5 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-20 relative h-full overflow-y-auto">
                <Link href="/" className="absolute top-8 left-8 text-secondary hover:text-primary transition flex items-center gap-2 text-sm font-medium">
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                <div className="w-full max-w-md mx-auto animate-fade-in">
                    <h1 className="text-2xl font-bold text-primary mb-2">Sign In</h1>
                    <p className="text-secondary text-sm mb-8">Welcome back! Please enter your details.</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-primary">Email</label>
                            <div className="relative">
                                <EnvelopeSimple size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-semibold text-primary">Password</label>
                            <div className="relative">
                                <LockKey size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary focus:outline-none"
                                >
                                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
                                <span className="text-xs text-secondary font-medium">Remember for 30 days</span>
                            </label>
                            <Link href="#" className="text-xs font-semibold text-accent hover:text-yellow-700 transition">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || status === "success"}
                            className={`w-full font-bold py-3 rounded-lg transition duration-300 shadow-lg flex justify-center items-center gap-2 group ${status === "success" ? "bg-success text-white"
                                : status === "failed" ? "bg-red-600 text-white"
                                    : "bg-primary text-white hover:bg-slate-800"
                                } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="animate-spin" size={20} /> Processing...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle size={20} /> Success!
                                </>
                            ) : status === "failed" ? (
                                <>
                                    <WarningCircle size={20} /> Failed
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <SignIn size={20} className="group-hover:translate-x-1 transition" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button type="button"
                            onClick={() => {
                                const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
                                window.location.href = `${backendUrl}/api/users/google`;
                            }}
                            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-secondary">
                            <GoogleLogo size={20} color="#DB4437" weight="bold"
                            /> Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-secondary">
                        Don't have an account?
                        <Link href="/register" className="font-bold text-accent hover:underline ml-1">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
