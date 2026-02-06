import { PaperPlaneRight } from "@phosphor-icons/react";
import { formatIDR } from "@/helper/helper";

export default function BookingForm({
    price,
    checkin,
    checkout,
    guests,
    onCheckinChange,
    onCheckoutChange,
    onGuestsChange,
    breakdown,
    onReserve
}) {

    const today = new Date().toISOString().split('T')[0];

    const isCheckinInvalid = checkin < today;
    const isCheckoutInvalid = checkout <= checkin;
    const isDateInvalid = isCheckinInvalid || isCheckoutInvalid;

    return (
        <div className="sticky top-24 bg-white border border-gray-200 shadow-xl rounded-2xl p-6">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-2xl font-bold text-primary">{formatIDR(price)}</span>
                    <span className="text-secondary text-sm"> / malam</span>
                </div>
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-gray-300">
                    <div className={`p-3 border-r border-gray-300 ${isCheckinInvalid ? 'bg-red-50' : 'bg-white'}`}>
                        <label className="block text-[10px] uppercase font-bold text-primary">Check-in</label>
                        <input
                            type="date"
                            min={today}
                            className="w-full bg-transparent text-sm focus:outline-none text-secondary cursor-pointer"
                            value={checkin}
                            onChange={(e) => onCheckinChange(e.target.value)}
                        />
                    </div>
                    <div className={`p-3 ${isCheckoutInvalid ? 'bg-red-50' : 'bg-white'}`}>
                        <label className="block text-[10px] uppercase font-bold text-primary">Check-out</label>
                        <input
                            type="date"
                            min={checkin}
                            className="w-full bg-transparent text-sm focus:outline-none text-secondary cursor-pointer"
                            value={checkout}
                            onChange={(e) => onCheckoutChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="p-3 bg-white">
                    <label className="block text-[10px] uppercase font-bold text-primary">Guests</label>
                    <select
                        className="w-full bg-transparent text-sm focus:outline-none text-secondary cursor-pointer"
                        value={guests}
                        onChange={(e) => onGuestsChange(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>
            </div>

            {isDateInvalid && (
                <p className="text-red-500 text-[10px] mb-4 italic">
                    * {isCheckinInvalid ? "Tanggal check-in sudah lewat." : "Check-out harus setelah Check-in."}
                </p>
            )}

            {breakdown && !isDateInvalid && (
                <div className="space-y-3 mb-6 text-sm text-secondary pt-2">
                    <div className="flex justify-between">
                        <span>{formatIDR(breakdown.basePrice)} x {breakdown.nights} malam</span>
                        <span className="text-primary font-medium">{formatIDR(breakdown.totalBase)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-3 flex justify-between text-base font-bold text-primary">
                        <span>Total</span>
                        <span>{formatIDR(breakdown.grandTotal)}</span>
                    </div>
                </div>
            )}

            <button
                onClick={onReserve}
                disabled={isDateInvalid || !breakdown}
                className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-lg flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent"
            >
                <span>Reserve</span>
                <PaperPlaneRight className="group-hover:translate-x-1 transition" />
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">You won't be charged yet</p>
        </div>
    );
}