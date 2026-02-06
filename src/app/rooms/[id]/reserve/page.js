"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
    Spinner,
    ArrowRight,
    ShieldCheck
} from "@phosphor-icons/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatIDR } from "@/helper/helper";
import { getRoomById } from "@/app/api/room";
import { useUser } from "@/app/context/userContext";
import { getPaymentStatus } from "@/app/api/payment";
import { createBooking } from "@/app/api/booking";
import SuccessModal from "@/components/SuccessModal";
import OrderSummary from "@/components/OrderSummary";
import ContactForm from "@/components/ContactForm";

export default function BookingFormPage() {
    const { user, loading } = useUser();
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const [room, setRoom] = useState(null);
    const [breakdown, setBreakdown] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [qrisUrl, setQrisUrl] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    // State untuk data form
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        requests: '',
    });

    // State untuk pesan error validasi
    const [errors, setErrors] = useState({});

    const id = params?.id;
    const checkin = useMemo(() => (searchParams.get('checkin') || '').replace(/[^0-9-]/g, ''), [searchParams]);
    const checkout = useMemo(() => (searchParams.get('checkout') || '').replace(/[^0-9-]/g, ''), [searchParams]);
    const guests = Number(searchParams.get('guest') || 1);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const imagePath = room?.images?.[0];
    const imageUrl = imagePath ? `${baseUrl}${imagePath}` : "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=150";

    // Fungsi Validasi Utama
    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Nama depan wajib diisi";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Format email tidak valid";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Nomor telepon wajib diisi";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Gunakan nomor telepon valid (10-15 digit)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (!loading && !user) {
            const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
            router.replace(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchRoom = async () => {
            if (!id) return;
            try {
                const data = await getRoomById(id);
                if (!data) {
                    router.replace('/rooms');
                } else {
                    setRoom(data);
                }
            } catch (error) {
                console.error("Fetch room error:", error);
            }
        };
        fetchRoom();
    }, [id, router]);

    useEffect(() => {
        if (room?.price && checkin && checkout) {
            const start = new Date(checkin);
            const end = new Date(checkout);
            if (end > start && !isNaN(start) && !isNaN(end)) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const totalBase = room.price * diffDays;

                setBreakdown({
                    nights: diffDays,
                    basePrice: room.price,
                    totalBase: totalBase,
                    grandTotal: totalBase
                });
            }
        }
    }, [room, checkin, checkout]);

    useEffect(() => {
        let intervalId;
        if (qrisUrl && currentOrderId && !showSuccessModal) {
            intervalId = setInterval(async () => {
                try {
                    const data = await getPaymentStatus(currentOrderId, user?.token);
                    if (data && (data.status === "PAID" || data.paymentStatus === "SUCCESS")) {
                        setShowSuccessModal(true);
                        setQrisUrl(null);
                        clearInterval(intervalId);
                    }
                } catch (err) {
                    console.error("Status check failed:", err);
                }
            }, 5000);
        }
        return () => { if (intervalId) clearInterval(intervalId); };
    }, [qrisUrl, showSuccessModal, currentOrderId, user?.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Hapus error saat user mulai mengetik kembali
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const processPayment = async () => {
        // Jalankan validasi sebelum memproses
        if (!validateForm()) {
            return; 
        }

        setIsProcessing(true);
        try {
            const bookingPayload = {
                roomId: id,
                userId: user?._id || user?.id,
                ...formData,
                specialRequests: formData.requests,
                checkIn: checkin,
                checkOut: checkout,
                guests: guests,
                totalPrice: breakdown?.grandTotal,
                nights: breakdown?.nights || 1
            };

            const response = await createBooking(bookingPayload);
            const { booking, payment } = response;

            setCurrentOrderId(booking.orderId);

            if (payment?.actions) {
                const qrAction = payment.actions.find(a => a.name === 'generate-qr-code');
                if (qrAction) setQrisUrl(qrAction.url);
            }
        } catch (err) {
            console.error("Payment Process Error:", err);
            alert(err.response?.data?.error || "Gagal memproses pesanan.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <Spinner className="animate-spin text-accent" size={48} />
        </div>
    );

    if (!user) return null;

    return (
        <div className="bg-gray-50 text-primary antialiased min-h-screen pb-20">
            <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold brand-font text-primary">JY RESIDENCE</Link>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <ShieldCheck weight="fill" /> Secure Checkout
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">

                        {/* Mengirim formData, handleInputChange, dan errors ke ContactForm */}
                        <ContactForm 
                            formData={formData} 
                            onChange={handleInputChange} 
                            errors={errors} 
                        />

                        {qrisUrl && (
                            <div className="bg-white p-8 border-2 border-dashed border-accent rounded-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                <h3 className="font-bold text-lg mb-4">Scan QRIS to Confirm</h3>
                                <div className="bg-white p-4 border rounded-lg shadow-md">
                                    <img src={qrisUrl} alt="QRIS" className="w-64 h-64 object-contain" />
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center italic">Pesanan Anda tersimpan dengan status PENDING sampai pembayaran selesai.</p>
                            </div>
                        )}

                        <button
                            onClick={processPayment}
                            disabled={isProcessing || !breakdown}
                            className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <Spinner className="animate-spin" size={24} /> : `Pay ${formatIDR(breakdown?.grandTotal || 0)}`}
                            {!isProcessing && <ArrowRight size={24} />}
                        </button>
                        
                        {/* Menampilkan pesan error global jika form tidak valid saat klik */}
                        {Object.keys(errors).length > 0 && (
                            <p className="text-red-500 text-sm text-center font-medium">
                                Mohon lengkapi formulir dengan benar sebelum melanjutkan.
                            </p>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <OrderSummary
                            room={room}
                            guests={guests}
                            checkin={checkin}
                            checkout={checkout}
                            breakdown={breakdown}
                            imageUrl={imageUrl}
                        />
                    </div>
                </div>
            </main>

            {showSuccessModal && <SuccessModal orderId={currentOrderId} />}
        </div>
    );
}