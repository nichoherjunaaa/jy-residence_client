export const CardRoomSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col animate-pulse">
            {/* Image Placeholder - Tinggi h-64 sesuai aslinya */}
            <div className="bg-gray-200 h-64 w-full" />

            <div className="p-6 flex flex-col flex-grow">
                {/* Title Placeholder */}
                <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-4" />

                {/* Description Placeholder - 2 baris (line-clamp-2) */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>

                {/* Amenities Placeholder - 3 kotak kecil */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <div className="h-6 bg-gray-200 rounded-lg w-20" />
                    <div className="h-6 bg-gray-200 rounded-lg w-24" />
                    <div className="h-6 bg-gray-200 rounded-lg w-16" />
                </div>

                {/* Footer Placeholder (Price & Button) */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-12" />
                        <div className="h-6 bg-gray-200 rounded w-28" />
                    </div>
                    {/* Button Placeholder */}
                    <div className="h-10 bg-gray-200 rounded-lg w-28" />
                </div>
            </div>
        </div>
    );
};