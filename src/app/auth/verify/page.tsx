"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, CheckCircle, XCircle, Loader2, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Missing verification token.');
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Verification failed');
                }

                setStatus('success');
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center relative overflow-hidden selection:bg-[#C5A059]/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 blur-3xl rounded-full -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-[#D80000]/5 blur-3xl rounded-full -ml-20"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="flex items-center gap-2 mb-12 justify-center">
                    <div className="w-10 h-10 bg-[#D80000] rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
                        <Zap className="text-white w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-bold font-playfair tracking-tighter italic text-[#1A1A1A]">AI<span className="text-[#C5A059]">AUDIT</span></span>
                </div>

                <div className="premium-card p-10 text-center">
                    {status === 'loading' && (
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-slate-100 text-[#C5A059] rounded-2xl flex items-center justify-center mx-auto animate-spin">
                                <Loader2 size={32} />
                            </div>
                            <h2 className="text-3xl font-bold font-playfair text-[#1A1A1A]">Verifying Account</h2>
                            <p className="text-slate-500 font-light">Securing your strategic portal. One moment...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-3xl font-bold font-playfair text-[#1A1A1A]">Account <span className="text-emerald-600">Verified</span></h2>
                            <p className="text-slate-500 font-light">Your professional AI Audit access is now fully active. Ready to maximize your ROI?</p>
                            <div className="pt-4">
                                <Link href="/auth/login" className="btn-primary w-full shadow-2xl">
                                    Sign In to Dashboard
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-100">
                                <XCircle size={32} />
                            </div>
                            <h2 className="text-3xl font-bold font-playfair text-[#1A1A1A]">Link <span className="text-red-600">Expired</span></h2>
                            <p className="text-slate-500 font-light">{message || "The verification link is invalid or has expired. Please try signing up again."}</p>
                            <div className="pt-4 space-y-4">
                                <Link href="/auth/signup" className="btn-primary w-full shadow-2xl">
                                    Get New Link
                                </Link>
                                <Link href="/" className="block text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#C5A059]" size={40} />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
