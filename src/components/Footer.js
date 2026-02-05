"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Phone,
    Envelope,
    FacebookLogo,
    InstagramLogo,
    TwitterLogo,
} from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Image
                            src="/logo2.png"
                            alt="JY Residence Logo"
                            width={140}
                            height={50}
                            className="mr-2 object-contain bg-white mb-3" // object-contain menjaga rasio gambar
                            priority // Tambahkan ini karena logo adalah elemen penting (LCP)
                        />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Menghadirkan pengalaman menginap tak terlupakan dengan sentuhan
                            kemewahan dan kenyamanan modern.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-accent transition">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms" className="hover:text-accent transition">
                                    Kamar
                                </Link>
                            </li>
                            <li>
                                <Link href="/facilities" className="hover:text-accent transition">
                                    Fasilitas
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookings" className="hover:text-accent transition">
                                    Pemesanan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={24} className="text-accent" />
                                <span>
                                    Jl. Setrasari Raya No.10, <br/> 
                                    Sukarasa, Kec. Sukasari
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={24} className="text-accent" />
                                <span>+62 821 3125 3143</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Envelope size={24} className="text-accent" />
                                <span>booking@jyresidence.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2026 JY Residence. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition">
                            <FacebookLogo size={24} />
                        </Link>
                        <Link href="#" className="hover:text-white transition">
                            <InstagramLogo size={24} />
                        </Link>
                        <Link href="#" className="hover:text-white transition">
                            <TwitterLogo size={24} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
