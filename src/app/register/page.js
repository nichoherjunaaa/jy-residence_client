"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    User,
    EnvelopeSimple,
    LockKey,
    CheckSquareOffset,
    WarningCircle,
    CircleNotch,
    CheckCircle,
    Tag,
    Star,
    ArrowRight
} from "@phosphor-icons/react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            setStatus("success");

            // Simulate Login immediately after register
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }, 2000);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-light text-primary font-sans">

            {/* Left Side (Form) */}
            <div className="w-full md:w-1/2 lg:w-2/5 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-20 relative h-full overflow-y-auto">

                <Link href="/" className="absolute top-8 left-8 text-secondary hover:text-primary transition flex items-center gap-2 text-sm font-medium">
                    <ArrowLeft size={18} /> Home
                </Link>

                <div className="w-full max-w-md mx-auto animate-fade-in py-10">
                    <h1 className="text-2xl font-bold text-primary mb-12">Create Account</h1>

                    <form onSubmit={handleRegister} className="space-y-4">

                        <div className="space-y-1">
                            <label htmlFor="fullname" className="text-sm font-semibold text-primary">Full Name</label>
                            <div className="relative">
                                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                <input
                                    type="text"
                                    id="fullname"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary"
                                    placeholder="John Doe"
                                    required
                                    value={formData.fullname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-primary">Email Address</label>
                            <div className="relative">
                                <EnvelopeSimple size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary"
                                    placeholder="name@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="password" className="text-sm font-semibold text-primary">Password</label>
                                <div className="relative">
                                    <LockKey size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="confirmPassword" className="text-sm font-semibold text-primary">Confirm</label>
                                <div className="relative">
                                    <CheckSquareOffset size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition text-sm text-primary ${error ? "border-failed ring-1 ring-failed" : "border-gray-200"
                                            }`}
                                        placeholder="••••••••"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-failed font-medium flex items-center gap-1">
                                <WarningCircle size={16} /> {error}
                            </p>
                        )}

                        <div className="flex items-start gap-2 pt-2">
                            <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" required />
                            <label htmlFor="terms" className="text-xs text-secondary leading-relaxed">
                                I agree to the <Link href="#" className="text-accent hover:underline">Terms of Service</Link> and <Link href="#" className="text-accent hover:underline">Privacy Policy</Link> of JY Residence.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || status === "success"}
                            className={`w-full font-bold py-3 rounded-lg transition duration-300 shadow-lg flex justify-center items-center gap-2 group mt-2 ${status === "success"
                                ? "bg-success text-white"
                                : "bg-primary text-white hover:bg-slate-800"
                                } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (
                                <>
                                    <CircleNotch className="animate-spin" size={20} /> Creating Account...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle size={20} /> Account Created!
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-secondary">
                        Already have an account?
                        <Link href="/login" className="font-bold text-accent hover:underline ml-1">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* Right Side (Image) */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-primary items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Resort View"
                        fill
                        className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-primary/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-white p-12 max-w-xl text-right">
                    <h2 className="text-5xl font-bold brand-font mb-6 leading-tight">Start Your Journey.</h2>
                    <p className="text-gray-200 text-lg font-light mb-8 ml-auto max-w-md">
                        "Daftarkan diri Anda dan nikmati akses prioritas booking, diskon khusus member, dan layanan concierge 24/7."
                    </p>

                    <div className="flex flex-wrap gap-3 justify-end">
                        <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
                            <Tag size={18} className="text-accent" /> Best Rate Guarantee
                        </span>
                        <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
                            <Star size={18} weight="fill" className="text-accent" /> Priority Service
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}
