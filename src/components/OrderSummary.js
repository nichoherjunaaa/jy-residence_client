import Image from "next/image";
import { formatDate, formatIDR } from "@/helper/helper";

export default function OrderSummary({ room, guests, checkin, checkout, breakdown, imageUrl }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border sticky top-24">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Order Summary</h3>
            <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 border">
                    <Image
                        src={imageUrl}
                        alt="Room"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="64px"
                    />
                </div>
                <div>
                    <p className="font-bold text-sm leading-tight">{room?.name || "Loading..."}</p>
                    <p className="text-xs text-gray-500 mt-1">{guests} Guest(s)</p>
                </div>
            </div>
            <div className="space-y-4 text-sm mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between"><span>Check-in</span><span className="font-bold">{checkin ? formatDate(checkin) : "-"}</span></div>
                <div className="flex justify-between"><span>Check-out</span><span className="font-bold">{checkout ? formatDate(checkout) : "-"}</span></div>
                <div className="flex justify-between"><span>Duration</span><span className="font-bold">{breakdown?.nights || 0} Night(s)</span></div>
            </div>
            <div className="border-t-2 border-dashed pt-4 flex justify-between items-end">
                <span className="font-bold text-primary">Total Amount</span>
                <span className="text-2xl font-bold text-accent">{formatIDR(breakdown?.grandTotal || 0)}</span>
            </div>
        </div>
    );
}