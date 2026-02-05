"use client"
import React from "react";
import { CircleNotch } from "@phosphor-icons/react";

export default function Loader({ fullScreen = true }) {
    return (
        <div className={`${fullScreen ? "fixed inset-0 h-screen w-screen bg-white/80 backdrop-blur-sm z-50" : "w-full h-full min-h-[200px]"} flex flex-col items-center justify-center`}>
            <div className="relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>

                {/* Spinner */}
                <CircleNotch weight="bold" className="text-6xl text-accent animate-spin relative z-10" />

                {/* Brand Text */}
            </div>
            <div className="mt-4 text-center">
                <h3 className="brand-font text-xl font-bold text-primary">JY <span className="text-accent">Residence</span></h3>
                <p className="text-xs text-secondary animate-pulse mt-1">Hospitality & Comfort</p>
            </div>
        </div>
    );
}
