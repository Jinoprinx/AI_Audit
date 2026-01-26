import React from 'react';
import { Zap } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 bg-[#D80000] rounded-2xl flex items-center justify-center animate-pulse shadow-xl shadow-red-100">
                    <Zap className="text-white w-8 h-8 fill-current" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-[#D80000] animate-ping opacity-20"></div>
            </div>
            <p className="mt-8 text-slate-400 font-bold tracking-widest uppercase text-xs animate-fadeIn">
                Initializing Intelligence...
            </p>
        </div>
    );
}
