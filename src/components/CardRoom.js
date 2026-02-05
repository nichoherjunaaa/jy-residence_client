"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle } from "@phosphor-icons/react";

export default function CardRoom({ room }) {


    const displayImage = room.images && room.images.length > 0
        ? room.images[0]
        : "https://images.unsplash.com/photo-1590490360182-c33d57733427";

    const getTagColor = (tag) => {
        if (tag === 'Promo') return 'bg-success';
        if (tag === 'Limited') return 'bg-warning';
        return 'bg-accent'; // Warna emas/oranye kamu
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition duration-300 flex flex-col animate-fade-in-up">
            <div className="relative overflow-hidden h-64">
                {room.tag && (
                    <div className={`absolute top-4 left-4 ${getTagColor(room.tag)} text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-md z-10`}>
                        {room.tag}
                    </div>
                )}
                <Image
                    src={displayImage}
                    alt={room.name}
                    fill
                    unoptimized // Tambahkan ini!
                    className="object-cover transform group-hover:scale-110 transition duration-700"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition brand-font">
                        {room.name}
                    </h3>
                </div>

                <p className="text-start text-secondary text-sm mb-4 line-clamp-2">
                    {room.description}
                </p>

                {/* Cari bagian ini di kode Anda */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities?.slice(0, 3).map((am, idx) => ( // Tambahkan .slice(0, 3)
                        <span key={idx} className="text-xs bg-gray-50 text-secondary px-2 py-1 rounded border border-gray-100 flex items-center gap-1">
                            <CheckCircle className="text-accent" weight="fill" /> {am}
                        </span>
                    ))}

                    {/* Opsional: Tambahkan indikator jika ada lebih dari 3 amenities */}
                    {room.amenities?.length > 3 && (
                        <span className="text-xs text-gray-400 py-1">
                            +{room.amenities.length - 3} lainnya
                        </span>
                    )}
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-xs text-secondary block text-start">Mulai dari</span>
                        <span className="text-xl font-bold text-primary">
                            Rp {room.price?.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-secondary">/malam</span>
                    </div>
                    <Link
                        href={`/rooms/${room._id}`}
                        className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:shadow-lg transition duration-300"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}