import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    preload: false
});

export const metadata: Metadata = {
    title: "AI Business Audit | Discover Your AI-Readiness & Maximize ROI",
    description: "Find out how AI-ready your business is. Identify key areas to apply AI to make more money, save more money, and save more time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
