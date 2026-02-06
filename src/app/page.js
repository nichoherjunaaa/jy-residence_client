"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  CalendarX,
  Users,
  ArrowRight,
  CheckCircle,
  WarningCircle,
  WifiHigh,
  Coffee,
  Briefcase,
  Martini,
  Television,
  ForkKnife
} from "@phosphor-icons/react";
import { getRooms } from "./api/room";
import CardRoom from "@/components/CardRoom";
import { useUser } from "./context/userContext";
import Loader from "@/components/Loader";

export default function Home() {
  const [notification, setNotification] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomLoading, setRoomLoading] = useState(true);
  const { loading } = useUser();
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomLoading(true);
        const data = await getRooms(3);
        setRooms(data);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      } finally {
        setRoomLoading(false);
      }
    };
    fetchRooms()

  }, []);

  if (roomLoading) {
    return <Loader fullScreen={true} />
  }

  const checkAvailability = () => {
    // Simulation logic
    const isAvailable = Math.random() > 0.5;

    if (isAvailable) {
      setNotification({
        type: 'success',
        title: 'Available!',
        message: 'Room is ready for bookinhg.'
      });
    } else {
      setNotification({
        type: 'failed',
        title: 'Unavailable',
        message: 'Maaf, kamar penuh pada tanggal tersebut.'
      });
    }
  };

  return (
    <main className="bg-light text-primary">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.webp"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block animate-fade-in-up">Welcome to Paradise</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg brand-font">
            Experience Luxury <br /> at <span className="italic text-accent">JY Residence</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Temukan kenyamanan istirahat terbaik dengan pemandangan kota yang menakjubkan dan pelayanan kelas dunia.
          </p>
        </div>
      </section>

      {/* Notification Area */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 space-y-2">
          <div className={`bg-white border-l-4 ${notification.type === 'success' ? 'border-success' : 'border-failed'} shadow-lg rounded-md p-4 flex items-center pr-10 relative animate-slide-in`}>
            {notification.type === 'success' ? (
              <CheckCircle className="text-success text-2xl mr-3" />
            ) : (
              <WarningCircle className="text-failed text-2xl mr-3" />
            )}
            <div>
              <h4 className="font-bold text-primary text-sm">{notification.title}</h4>
              <p className="text-secondary text-xs">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <WarningCircle className="text-xl transform rotate-45" />
            </button>
          </div>
        </div>
      )}

      {/* Rooms Section */}
      <section id="rooms" className="pt-32 pb-20 px-4 bg-white max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 brand-font">Our Luxurious Rooms</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="text-secondary mt-4 max-w-2xl mx-auto">Pilih akomodasi yang sesuai dengan gaya liburan Anda.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {rooms.length > 0 ? (
              rooms.map((room) => <CardRoom key={room._id} room={room} />)
            ) : (
              <p>No rooms available.</p>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
