"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Mail, User, Zap } from 'lucide-react';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center relative overflow-hidden">
                <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
                        <Mail size={40} />
                    </div>
                    <h2 className="text-4xl font-bold font-playfair text-[#1A1A1A] mb-4">Check Your <span className="text-[#C5A059] italic">Email</span></h2>
                    <p className="text-slate-500 font-light mb-10 leading-relaxed">
                        We&apos;ve sent a verification link to <span className="font-bold text-slate-800">{email}</span>. Please confirm your email to activate your account and access the AI Audit tool.
                    </p>
                    <div className="space-y-4">
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Didn&apos;t receive it?</p>
                        <button onClick={() => setSuccess(false)} className="text-[#D80000] font-bold hover:underline">Try another email</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center relative overflow-hidden selection:bg-[#C5A059]/30">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-[#C5A059]/5 blur-3xl rounded-full -ml-20"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-3/4 bg-[#D80000]/5 blur-3xl rounded-full -mr-20"></div>

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

                <h2 className="text-4xl sm:text-5xl font-bold font-playfair text-[#1A1A1A] tracking-tight mb-2">Start Your <span className="gold-gradient-text italic">Audit.</span></h2>
                <p className="text-slate-500 font-light mb-10">Create your account to unlock professional business AI reporting and what ROI insights AI can provide your business.</p>

                <div className="premium-card p-8 sm:p-10">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2 group">
                            <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-[#C5A059] transition-colors">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl h-14 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 focus:bg-white transition-all outline-none font-sans text-slate-800"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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
                                className="btn-primary w-full h-14 text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {loading ? 'Processing...' : 'Create My Account'}
                                {!loading && <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500 font-light">
                    Already have an account? <Link href="/auth/login" className="font-bold text-[#D80000] hover:text-[#b30000] transition-colors underline decoration-red-100 underline-offset-4">Sign in instead</Link>
                </p>
            </div>
        </div>
    );
}
