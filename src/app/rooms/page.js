"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MagnifyingGlass, Windmill } from "@phosphor-icons/react";
import CardRoom from "@/components/CardRoom";
import { getRooms } from "../api/room";
import { CardRoomSkeleton } from "@/components/CardRoomSkeleton";

export default function RoomsPage() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['all', 'suite', 'deluxe', 'family'];

    // 1. Fetch Data
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setIsLoading(true);
                const data = await getRooms();
                setRooms(data || []);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                // Memberikan sedikit delay agar transisi skeleton ke konten lebih halus
                setTimeout(() => setIsLoading(false), 400);
            }
        };
        fetchRooms();
    }, []);

    // 2. Logic: Filter + Priority Sorting
    const filteredRooms = useMemo(() => {
        // Pemetaan Prioritas (Skor kecil = Posisi atas)
        const priorityOrder = {
            "best seller": 1,
            "promo": 2,
            "vip": 3,
            "default": 4
        };

        const query = searchQuery.toLowerCase();

        // Langkah A: Filter berdasarkan kategori dan pencarian
        const filtered = rooms.filter(room => {
            const matchesCategory = filter === "all" || room.type?.toLowerCase() === filter;
            const matchesSearch =
                room.name?.toLowerCase().includes(query) ||
                room.amenities?.some(am => am.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });

        // Langkah B: Sort berdasarkan tag prioritas
        return filtered.sort((a, b) => {
            const tagA = a.tag?.toLowerCase() || "default";
            const tagB = b.tag?.toLowerCase() || "default";

            const weightA = priorityOrder[tagA] || priorityOrder["default"];
            const weightB = priorityOrder[tagB] || priorityOrder["default"];

            // Jika berat prioritas berbeda, urutkan berdasarkan berat
            if (weightA !== weightB) {
                return weightA - weightB;
            }

            // Jika tag sama, urutkan berdasarkan nama (A-Z) agar konsisten
            return a.name.localeCompare(b.name);
        });
    }, [rooms, filter, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <header className="relative bg-primary pt-40 pb-24 px-4 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
                    alt="Luxury Interior"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 brand-font tracking-tight">
                        Our Accommodations
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Temukan ketenangan di setiap sudut kamar kami yang dirancang dengan detail kemewahan dan kenyamanan maksimal.
                    </p>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 capitalize whitespace-nowrap
                                    ${filter === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                        : "bg-gray-50 text-secondary hover:bg-gray-100"
                                    }`}
                            >
                                {cat === 'all' ? 'All Rooms' : cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96">
                        <MagnifyingGlass
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Cari kamar atau fasilitas (misal: AC, Wifi)..."
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => <CardRoomSkeleton key={i} />)
                    ) : filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <CardRoom key={room._id} room={room} />
                        ))
                    ) : (
                        /* Empty State */
                        <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Windmill size={40} className="text-gray-300 animate-spin-slow" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2">Kamar tidak ditemukan</h3>
                            <p className="text-secondary mb-8">Maaf, kami tidak menemukan kamar yang sesuai dengan kriteria Anda.</p>
                            <button
                                onClick={() => { setFilter('all'); setSearchQuery('') }}
                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}