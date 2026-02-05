"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
    ArrowLeft, 
    ShieldCheck, 
    CheckCircle, 
    Info, 
    DeviceMobile 
} from "@phosphor-icons/react";
import { formatIDR } from "@/helper/helper";
import { getPaymentStatus } from "@/app/api/payment";
import { useUser } from "@/app/context/userContext";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUser();
    
    // Ambil data dari URL
    const qrisUrl = searchParams.get("qrisUrl");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    const [isPaid, setIsPaid] = useState(false);

    // 1. Polling Status: Cek otomatis apakah user sudah bayar
    useEffect(() => {
        let intervalId;
        if (orderId && !isPaid) {
            intervalId = setInterval(async () => {
                try {
                    const data = await getPaymentStatus(orderId, user?.token);
                    if (data && (data.status === "PAID" || data.paymentStatus === "SUCCESS")) {
                        setIsPaid(true);
                        clearInterval(intervalId);
                    }
                } catch (err) {
                    console.error("Gagal cek status:", err);
                }
            }, 5000); // Cek setiap 5 detik
        }
        return () => { if (intervalId) clearInterval(intervalId); };
    }, [orderId, isPaid, user]);

    if (!qrisUrl) return (
        <div className="pt-40 pb-20 text-center">
            <Info size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-secondary">Data pembayaran tidak ditemukan.</p>
        </div>
    );

    return (
        <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col items-center">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all">
                
                {/* Bagian Atas / Header Kartu */}
                <div className="bg-primary p-6 text-white text-center">
                    {!isPaid ? (
                        <>
                            <h1 className="text-xl font-bold brand-font tracking-wide">QRIS PAYMENT</h1>
                            <p className="text-[10px] opacity-70 uppercase tracking-widest mt-1">Order ID: {orderId}</p>
                        </>
                    ) : (
                        <h1 className="text-xl font-bold brand-font tracking-wide">PAYMENT SUCCESS</h1>
                    )}
                </div>

                <div className="p-8 flex flex-col items-center">
                    {!isPaid ? (
                        <>
                            {/* State: Belum Bayar */}
                            <p className="text-secondary text-sm mb-1">Total Tagihan</p>
                            <p className="text-3xl font-bold text-primary mb-8">{formatIDR(amount)}</p>
                            
                            <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-2xl shadow-inner relative group">
                                <img 
                                    src={qrisUrl} 
                                    alt="QRIS Code" 
                                    className="w-64 h-64 object-contain transition-transform group-hover:scale-105" 
                                />
                            </div>

                            <div className="mt-8 space-y-4 w-full">
                                <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
                                    <ShieldCheck weight="fill" size={18} /> 
                                    Verified Secure by Midtrans
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* State: Sudah Bayar (Tampilan Berubah) */}
                            <div className="py-10 text-center animate-in zoom-in duration-500">
                                <CheckCircle size={80} weight="fill" className="text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-primary mb-2">Terima Kasih!</h2>
                                <p className="text-secondary text-sm">Pembayaran untuk <span className="font-bold">#{orderId}</span> telah kami terima.</p>
                                <button 
                                    onClick={() => router.push('/bookings')}
                                    className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-primary/20"
                                >
                                    Lihat E-Voucher
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {!isPaid && (
                    <button 
                        onClick={() => router.back()}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-secondary text-sm font-bold py-4 transition flex items-center justify-center gap-2 border-t"
                    >
                        <ArrowLeft size={18} /> Kembali ke Pesanan
                    </button>
                )}
            </div>

            <p className="mt-8 text-xs text-secondary text-center max-w-xs leading-loose">
                Jangan tutup halaman ini sampai pembayaran selesai diverifikasi secara otomatis.
            </p>
        </main>
    );
}