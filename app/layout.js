import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "SwiftScan: AI-Powered Resume Analysis",
    description:
        "SwiftScanner intelligently matches resumes to job descriptions, providing deep insights into candidate strengths, skills, and fit. Streamline your hiring with efficient, unbiased, and comprehensive AI-driven insights.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased box-border flex flex-col `}>
                <nav className="bg-blue-600 px-2 py-3 w-full text-white flex gap-x-2 md:gap-x-4 justify-center items-center md:justify-start font-bold text-2xl md:text-3xl md:py-4 md:px-5 md:">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <span>SwiftScan</span>
                </nav>
                {children}
            </body>
        </html>
    );
}
