import Image from "next/image";
import { SquaresFour } from "@phosphor-icons/react";

export default function RoomGallery({ images = [], roomName }) {
    
    const placeholder = "https://images.unsplash.com/photo-1590490360182-c33d57733427";

    const getImageUrl = (index) => {
        if (!images || !images[index]) return placeholder;
        return images[index];
    };

    const altText = roomName || "Room Detail";

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-64 md:h-[500px] rounded-2xl overflow-hidden mb-10 relative group">
            <div className="col-span-1 md:col-span-2 row-span-2 relative">
                <Image 
                    src={getImageUrl(0)} 
                    alt={altText} 
                    fill 
                    className="object-cover hover:scale-105 transition duration-700 cursor-pointer" 
                    unoptimized 
                />
            </div>

            {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="hidden md:block col-span-1 row-span-1 relative bg-gray-200 overflow-hidden">
                    <Image 
                        src={getImageUrl(idx)} 
                        alt={`${altText} ${idx}`} 
                        fill 
                        className="object-cover hover:scale-105 transition duration-700"
                        unoptimized
                    />
                </div>
            ))}
        </div>
    );
}