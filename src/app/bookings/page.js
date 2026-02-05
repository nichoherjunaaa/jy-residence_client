"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarX } from "@phosphor-icons/react";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { getBookings } from "../api/booking";
import { snapQris } from "../api/payment";
import CardBooking from "@/components/CardBooking";

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookingsData, setBookingsData] = useState([]);
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await getBookings();
                setBookingsData(res);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (user) fetchBookings();
    }, [user, loading, router]);

    const handlePayment = async (item) => {
        try {
            const userToken = localStorage.getItem("token");
            const newOrderId = `${item.orderId}-${Date.now().toString().slice(-4)}`;

            const payload = {
                orderId: newOrderId,
                amount: Math.round(item.totalPrice),
                firstName: item.guestName,
                email: item.guestEmail,
                token: userToken
            };

            const response = await snapQris(payload);
            let qrUrl = "";
            
            if (response.actions) {
                const qrAction = response.actions.find(a => a.name === 'generate-qr-code');
                qrUrl = qrAction?.url;
            } else if (response.qr_url) {
                qrUrl = response.qr_url;
            }

            if (qrUrl) {
                router.push(`/payment?qrisUrl=${encodeURIComponent(qrUrl)}&orderId=${item.orderId}&amount=${item.totalPrice}`);
            }
        } catch (error) {
            alert("Gagal: " + (error.response?.data?.message || "Internal Server Error"));
        }
    };

    const filteredBookings = bookingsData.filter(b => {
        const status = b.status?.toLowerCase();
        if (activeTab === 'upcoming') return status === 'pending' || status === 'confirmed';
        if (activeTab === 'completed') return status === 'completed';
        if (activeTab === 'cancelled') return status === 'cancelled';
        return false;
    });

    if (loading) return <Loader fullScreen={true} />;
    if (!user) return null;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary brand-font mb-2">My Bookings</h1>
                    <p className="text-secondary text-sm">Kelola riwayat pesanan dan download e-voucher Anda.</p>
                </div>

                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm mt-4 md:mt-0 h-fit">
                    {['upcoming', 'completed', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition capitalize ${
                                activeTab === tab ? "bg-primary text-white shadow-sm" : "text-secondary hover:bg-gray-50"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <CalendarX className="text-4xl text-gray-300 mb-2 mx-auto" size={48} />
                        <p className="text-secondary font-medium">Tidak ada pesanan {activeTab}.</p>
                        <Link href="/rooms" className="text-blue-600 text-sm font-bold hover:underline mt-2 inline-block">
                            Cari kamar sekarang
                        </Link>
                    </div>
                ) : (
                    filteredBookings.map((item) => (
                        <CardBooking
                            key={item._id} 
                            item={item} 
                            activeTab={activeTab} 
                            onPayment={handlePayment} 
                        />
                    ))
                )}
            </div>
        </main>
    );
}