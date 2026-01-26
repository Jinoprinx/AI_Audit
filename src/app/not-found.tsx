import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center justify-center p-4">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mb-8">
                <Search size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-slate-900 mb-4 text-center">
                Path <span className="text-[#C5A059] italic">Not Found</span>
            </h1>
            <p className="text-slate-500 font-light max-w-md text-center mb-10 leading-relaxed">
                The strategic resource you are looking for has moved or does not exist in our current matrix.
            </p>
            <Link href="/" className="btn-primary group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Return to Headquarters
            </Link>
        </div>
    );
}
