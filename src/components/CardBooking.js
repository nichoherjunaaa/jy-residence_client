"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DownloadSimple, Calendar, Moon } from "@phosphor-icons/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyVoucherPDF from "./MyVoucherPDF";

export default function CardBooking({ item, activeTab, onPayment }) {
    const [isPaying, setIsPaying] = useState(false);
    const roomInfo = item.roomId;

    const handlePaymentInternal = async () => {
        setIsPaying(true);
        try {
            await onPayment(item);
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition duration-300">
            <div className="w-full md:w-48 h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={roomInfo?.images?.[0] ? `${process.env.NEXT_PUBLIC_SERVER_URL}${roomInfo.images[0]}` : "/placeholder-room.jpg"}
                    alt={roomInfo?.name || "Room"}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                />
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-secondary mb-1">
                            Order ID: <span className="font-mono text-primary font-bold">{item.orderId}</span>
                        </p>
                        <h3 className="text-xl font-bold text-primary brand-font">
                            {roomInfo?.name || "Nama Kamar Tidak Tersedia"}
                        </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>
                        {item.paymentStatus}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-secondary mb-4">
                    <span className="flex items-center gap-1">
                        <Calendar size={18} className="text-blue-500" />
                        {new Date(item.checkIn).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                        <Moon size={18} className="text-blue-500" />
                        {item.nights} Malam
                    </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-4 mt-2">
                    <div className="mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs text-secondary block">Total Pembayaran</span>
                        <span className="text-lg font-bold text-primary">
                            Rp {item.totalPrice?.toLocaleString('id-ID')}
                        </span>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        {activeTab === 'upcoming' && (
                            <>
                                {item.paymentStatus === "PAID" ? (
                                    <PDFDownloadLink
                                        document={<MyVoucherPDF item={item} />}
                                        fileName={`Voucher-JYRES-${item.orderId}.pdf`}
                                        className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                    >
                                        {({ loading }) => (
                                            <>
                                                <DownloadSimple size={20} />
                                                {loading ? "Memproses..." : "E-Voucher"}
                                            </>
                                        )}
                                    </PDFDownloadLink>
                                ) : (
                                    <button
                                        onClick={handlePaymentInternal}
                                        disabled={isPaying}
                                        className="flex-1 md:flex-none px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-orange-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isPaying ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Memproses...
                                            </div>
                                        ) : "Bayar Sekarang"}
                                    </button>
                                )}
                                <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 text-secondary text-sm font-medium rounded-lg hover:border-red-500 hover:text-red-500 transition">
                                    Batal
                                </button>
                            </>
                        )}
                        {activeTab === 'completed' && (
                            <button className="w-full md:w-auto px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition">
                                Pesan Lagi
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}