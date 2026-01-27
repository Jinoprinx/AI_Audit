"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Mail, Zap, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/audit';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                router.push(callbackUrl);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center relative overflow-hidden selection:bg-[#C5A059]/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 blur-3xl rounded-full -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-[#D80000]/5 blur-3xl rounded-full -ml-20"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors mb-8 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Home</span>
                </Link>

                <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
                    <div className="w-10 h-10 bg-[#D80000] rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
                        <Zap className="text-white w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-bold font-playfair tracking-tighter italic">AI<span className="text-[#C5A059]">AUDIT</span></span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold font-playfair text-[#1A1A1A] tracking-tight mb-2">Welcome <span className="gold-gradient-text italic">Back.</span></h2>
                <p className="text-slate-500 font-light mb-10">Enter your credentials to access your AI-Audit dashboard.</p>

                <div className="premium-card p-8 sm:p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
                                <Zap size={16} className="fill-current" />
                                {error}
                            </div>
                        )}
                        <div className="space-y-2 group">
                            <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-[#C5A059] transition-colors">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl h-14 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 focus:bg-white transition-all outline-none font-sans text-slate-800"
                                    placeholder="name@business.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label htmlFor="password" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-[#C5A059] transition-colors">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl h-14 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 focus:bg-white transition-all outline-none font-sans text-slate-800"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full h-14 text-lg shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="animate-spin" size={20} />}
                                {loading ? 'Signing in...' : 'Sign in to Dashboard'}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500 font-light">
                    Don&apos;t have an account? <Link href="/auth/signup" className="font-bold text-[#D80000] hover:text-[#b30000] transition-colors underline decoration-red-100 underline-offset-4">Start your free audit</Link>
                </p>
            </div>
        </div>
    );
}
