"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Waves, ForkKnife, Barbell, WifiHigh,
    Car, TShirt, Briefcase, Clock, Martini, Door
} from "@phosphor-icons/react";

const MAIN_FACILITIES = [
    {
        title: "Sky Infinity Pool",
        category: "Outdoors",
        description: "Berenang di atas awan dengan pemandangan cakrawala kota yang menakjubkan. Kolam renang kami dilengkapi dengan pengatur suhu otomatis.",
        image: "/images/pool.webp",
        icon: <Waves className="text-accent text-2xl" />,
        details: [
            { icon: <Clock size={18} />, text: "Open: 06:00 AM - 10:00 PM" },
            { icon: <Martini size={18} />, text: "Poolside Bar Available" }
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
            { icon: <Clock size={18} />, text: "Breakfast, Lunch & Dinner" },
            { icon: <Door size={18} />, text: "Private Room Available" }
        ],
        reverse: true,
        color: "bg-primary/10"
    },
    {
        title: "Fitness Center",
        category: "Wellness",
        description: "Tetap bugar selama menginap dengan peralatan fitness terbaru, area yoga, dan pelatih pribadi yang siap membantu Anda mencapai tujuan kebugaran.",
        image: "/images/gym.webp",
        icon: <Barbell className="text-accent text-2xl" />,
        details: [
            { icon: <Clock size={18} />, text: "Open 24/7" },
            { icon: <WifiHigh size={18} />, text: "Free Wifi Access" }
        ],
        reverse: false,
        color: "bg-accent/20"
    }
];

const ADDITIONAL_SERVICES = [
    { icon: <WifiHigh size={24} />, title: "High-Speed Wifi", desc: "Up to 100 Mbps" },
    { icon: <Car size={24} />, title: "Valet Parking", desc: "24/7 Secure" },
    { icon: <TShirt size={24} />, title: "Express Laundry", desc: "Same day service" },
    { icon: <Briefcase size={24} />, title: "Meeting Rooms", desc: "Professional spaces" },
];

export default function FacilitiesPage() {
    return (
        <main className="bg-light text-primary min-h-screen">
            {/* Header Section - Disesuaikan dengan gaya Home */}
            <header className="relative h-[70vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="images/amenities.webp"
                        alt="Amenities Background"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    {/* Gradient Overlay konsisten dengan Home */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block"
                    >
                        World Class Amenities
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight brand-font"
                    >
                        Relax & <span className="italic text-accent">Rejuvenate</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-200 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed"
                    >
                        Lebih dari sekadar tempat menginap. Kami menyediakan fasilitas premium untuk menunjang gaya hidup Anda.
                    </motion.p>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Main Facilities */}
                <div className="space-y-24">
                    {MAIN_FACILITIES.map((facility, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${facility.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
                        >
                            {/* Image Container with Decorative Background */}
                            <div className="w-full md:w-1/2 relative">
                                <div className={`absolute -inset-2 md:-inset-4 ${facility.color} rounded-2xl transform ${facility.reverse ? '-rotate-2' : 'rotate-2'} hidden md:block`} />
                                <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={facility.image}
                                        alt={facility.title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className={`w-full md:w-1/2 flex flex-col ${facility.reverse ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="p-2 bg-accent/10 rounded-lg text-accent">
                                        {facility.icon}
                                    </span>
                                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">{facility.category}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 brand-font">{facility.title}</h2>
                                <p className="text-secondary leading-relaxed mb-6 text-sm md:text-base">
                                    {facility.description}
                                </p>

                                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ${facility.reverse ? 'justify-items-end' : ''}`}>
                                    {facility.details.map((detail, i) => (
                                        <div key={i} className="flex w-full md:w-3/4 items-center gap-3 text-secondary text-sm">
                                            <div className="text-accent">{detail.icon}</div>
                                            <span>{detail.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4 brand-font">Our Services</h2>
                        <div className="w-16 h-1 bg-accent mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
                        {ADDITIONAL_SERVICES.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center hover:shadow-md transition-shadow group"
                            >
                                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="font-bold text-primary mb-2">{service.title}</h3>
                                <p className="text-xs text-secondary leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}