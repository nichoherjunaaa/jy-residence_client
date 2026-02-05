"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { List, X, UserCircle, SignOut, User } from "@phosphor-icons/react";
import { useUser } from "@/app/context/userContext";
import Image from 'next/image';
import { logout as apiLogout } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef(null);
  const { user, setUser } = useUser();
  useEffect(() => setMounted(true), []);
  const router = useRouter();
  
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsOpen(false);
    setIsDropdownOpen(false);
    apiLogout();
    router.push('/login')
  };

  const getInitial = (name) => {
    if (!name) return <UserCircle size={24} />;
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  if (!mounted) return null;

  return (
    <nav className={`fixed w-full z-50 bg-white/90 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/logo2.png"
              alt="JY Residence Logo"
              width={140}
              height={50}
              className="mr-2 object-contain" // object-contain menjaga rasio gambar
              priority // Tambahkan ini karena logo adalah elemen penting (LCP)
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-secondary hover:text-accent font-medium transition">Beranda</Link>
            <Link href="/rooms" className="text-secondary hover:text-accent font-medium transition">Kamar</Link>
            <Link href="/facilities" className="text-secondary hover:text-accent font-medium transition">Fasilitas</Link>
            {user && (
              <Link href="/bookings" className="text-secondary hover:text-accent font-medium transition">Pemesanan</Link>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm border-2 border-transparent group-hover:border-accent transition-all overflow-hidden shadow-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      getInitial(user.name)
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-primary truncate">{user.name}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-secondary hover:bg-gray-50 hover:text-accent transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={18} className="mr-2" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      <SignOut size={18} className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-accent transition shadow-md">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
              {isOpen ? <X size={32} /> : <List size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Beranda</Link>
            <Link href="/rooms" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Kamar</Link>
            <Link href="/facilities" className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Fasilitas</Link>

            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                      {getInitial(user.name)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-primary leading-none">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" className="flex items-center w-full px-3 py-2 text-secondary font-medium" onClick={() => setIsOpen(false)}>
                    <User size={20} className="mr-3" /> Profil
                  </Link>
                  <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-red-500 font-medium">
                    <SignOut size={20} className="mr-3" /> Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="block w-full text-center bg-primary text-white px-5 py-3 rounded-lg font-bold" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}