"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CaretRight, WifiHigh, TelevisionSimple, Bathtub, Wind } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { getRoomById } from "@/app/api/room";
import RoomGallery from "@/components/RoomGallery";
import BookingForm from "@/components/BookingForm";
import Loader from "@/components/Loader";
import { useUser } from "@/app/context/userContext";

export default function RoomDetailPage() {
    const [room, setRoom] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [breakdown, setBreakdown] = useState(null);
    const [guests, setGuests] = useState(1);

    const { loading: userLoading } = useUser();
    const params = useParams();
    const { id } = params;
    const router = useRouter();

    useEffect(() => {
        const fetchDataRoom = async () => {
            if (!id) return;
            setDataLoading(true);
            try {
                const data = await getRoomById(id);
                setRoom(data);
            } catch (error) {
                console.error("Error fetching room:", error);
            } finally {
                setDataLoading(false);
            }
        };
        fetchDataRoom();

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setCheckin(today.toISOString().split('T')[0]);
        setCheckout(tomorrow.toISOString().split('T')[0]);
    }, [id]);

    useEffect(() => {
        if (room && checkin && checkout && room.price) {
            const start = new Date(checkin);
            const end = new Date(checkout);

            if (end > start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setBreakdown({
                    nights: diffDays,
                    basePrice: room.price,
                    totalBase: room.price * diffDays,
                    grandTotal: room.price * diffDays
                });
            } else {
                setBreakdown(null);
            }
        }
    }, [checkin, checkout, room]);

    if (userLoading || dataLoading || !room) {
        return <Loader />;
    }

    const handleReserve = () => {
        router.push(`/rooms/${id}/reserve?checkin=${checkin}&checkout=${checkout}&guest=${guests}`);
    };

    return (
        <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center text-sm text-secondary mb-6">
                <Link href="/" className="hover:text-accent">Home</Link>
                <CaretRight className="mx-2" />
                <Link href="/rooms" className="hover:text-accent">Rooms</Link>
                <CaretRight className="mx-2" />
                <span className="text-primary font-medium">{room.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{room.name}</h1>

            <RoomGallery images={room.images || []} roomName={room.name} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4 brand-font">About this suite</h3>
                        <p className="text-secondary leading-relaxed">{room.description}</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-6 brand-font">What this room offers</h3>
                        <div className="grid grid-cols-2 gap-4 text-secondary">
                            {room.amenities?.includes("Wifi") && (
                                <div className="flex items-center gap-3"><WifiHigh size={24} /> High-speed Wifi</div>
                            )}
                            {room.amenities?.includes("Smart TV") && (
                                <div className="flex items-center gap-3"><TelevisionSimple size={24} /> Smart TV</div>
                            )}
                            {room.amenities?.includes("Bathub") && (
                                <div className="flex items-center gap-3"><Bathtub size={24} /> Bathtub</div>
                            )}
                            {room.amenities?.includes("Air Conditioning") && (
                                <div className="flex items-center gap-3"><Wind size={24} /> Air Conditioning</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-28">
                        <BookingForm
                            price={room.price}
                            checkin={checkin}
                            checkout={checkout}
                            guests={guests}
                            onCheckinChange={setCheckin}
                            onCheckoutChange={setCheckout}
                            onGuestsChange={setGuests}
                            breakdown={breakdown}
                            onReserve={handleReserve}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}