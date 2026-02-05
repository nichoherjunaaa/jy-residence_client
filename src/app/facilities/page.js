"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Waves, ForkKnife, Barbell, WifiHigh,
    Car, TShirt, Briefcase, Clock, Martini, Door
} from "@phosphor-icons/react";

// 1. Data Structure for Main Facilities
const MAIN_FACILITIES = [
    {
        title: "Sky Infinity Pool",
        category: "Outdoors",
        description: "Berenang di atas awan dengan pemandangan cakrawala kota yang menakjubkan. Kolam renang kami dilengkapi dengan pengatur suhu otomatis.",
        image: "/images/pool.webp",
        icon: <Waves className="text-accent text-2xl" />,
        details: [
            { icon: <Clock />, text: "Open: 06:00 AM - 10:00 PM" },
            { icon: <Martini />, text: "Poolside Bar Available" }
        ],
        reverse: false,
        color: "bg-accent/20"
    },
    {
        title: "The Golden Fork",
        category: "Gastronomy",
        description: "Rasakan pengalaman kuliner bintang lima dengan menu fusion lokal dan internasional yang dikurasi oleh Chef pemenang penghargaan.",
        image: "/images/dinning.webp",
        icon: <ForkKnife className="text-accent text-2xl" />,
        details: [
            { icon: <Clock />, text: "Breakfast, Lunch & Dinner" },
            { icon: <Door />, text: "Private Room Available" }
        ],
        reverse: true,
        color: "bg-primary/10"
    },
    {
        title: "State-of-the-Art Fitness Center",
        category: "Wellness",
        description: "Tetap bugar selama menginap dengan peralatan fitness terbaru, area yoga, dan pelatih pribadi yang siap membantu Anda mencapai tujuan kebugaran.",
        image: "/images/gym.webp",
        icon: <Barbell className="text-accent text-2xl" />,
        details: [
            { icon: <Clock />, text: "Open 24/7" },
            { icon: <WifiHigh />, text: "Free Wifi Access" }
        ],
        reverse: false,
        color: "bg-accent/20"
    }
];

// 2. Small Services Data
const ADDITIONAL_SERVICES = [
    { icon: <WifiHigh />, title: "High-Speed Wifi", desc: "Up to 100 Mbps" },
    { icon: <Car />, title: "Valet Parking", desc: "24/7 Secure" },
    { icon: <TShirt />, title: "Express Laundry", desc: "Same day service" },
    { icon: <Briefcase />, title: "Meeting Rooms", desc: "Professional spaces" },
];

export default function FacilitiesPage() {
    return (
        <main className="bg-light text-primary">
            {/* Optimized Header */}
            <header className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1571896349842-6e53ce41be03?auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Pool Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">World Class Amenities</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 brand-font">Relax & Rejuvenate</h1>
                    <p className="text-gray-200 max-w-xl mx-auto text-lg font-light">
                        Lebih dari sekadar tempat menginap. Kami menyediakan fasilitas premium untuk menunjang gaya hidup Anda.
                    </p>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Main Facilities Sections */}
                {MAIN_FACILITIES.map((facility, index) => (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0, x: facility.reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className={`flex flex-col ${facility.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24`}
                    >
                        <div className="w-full md:w-1/2 relative group">
                            <div className={`absolute -inset-4 ${facility.color} rounded-2xl transform ${facility.reverse ? '-rotate-3' : 'rotate-3'} group-hover:rotate-0 transition duration-500`} />
                            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </div>
                        <div className={`w-full md:w-1/2 ${facility.reverse ? 'md:text-right' : ''}`}>
                            <div className={`flex items-center gap-2 mb-2 ${facility.reverse ? 'md:justify-end' : ''}`}>
                                {!facility.reverse && facility.icon}
                                <span className="text-sm font-bold text-secondary uppercase tracking-wider">{facility.category}</span>
                                {facility.reverse && facility.icon}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 brand-font">{facility.title}</h2>
                            <p className="text-secondary leading-relaxed mb-6">{facility.description}</p>
                            <ul className={`space-y-3 mb-8 flex flex-col ${facility.reverse ? 'md:items-end' : ''}`}>
                                {facility.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-3 text-secondary">
                                        {!facility.reverse && <span className="text-accent">{detail.icon}</span>}
                                        <span>{detail.text}</span>
                                        {facility.reverse && <span className="text-accent">{detail.icon}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>
                ))}

                {/* Additional Services Grid */}
                <section className="pt-10 border-t border-gray-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-3 brand-font">Other Premium Services</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {ADDITIONAL_SERVICES.map((service, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group transition-all hover:shadow-lg"
                            >
                                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                                    <div className="text-2xl text-primary group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-primary mb-1">{service.title}</h3>
                                <p className="text-xs text-secondary">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}