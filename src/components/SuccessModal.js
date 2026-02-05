import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";

export default function SuccessModal({ orderId }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
                <CheckCircle size={80} weight="fill" className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-2">Payment Verified!</h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Booking ID: <span className="font-mono font-bold text-primary">{orderId}</span>
                </p>
                <Link href="/" className="block w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}