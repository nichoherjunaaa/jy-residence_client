import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserProvider } from "./context/userContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "JY Residence - Luxury Hotel Booking",
  description: "Experience Luxury at JY Residence",
};


export default function RootLayout({ children }) {
  return (
    // Tambahkan suppressHydrationWarning di sini
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-light text-primary antialiased"
        suppressHydrationWarning
      >
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
