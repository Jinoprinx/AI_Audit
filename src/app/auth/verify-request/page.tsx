"use client";

import Link from 'next/link';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';

export default function VerifyRequestPage() {
    return (
        <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center relative overflow-hidden selection:bg-[#C5A059]/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 blur-3xl rounded-full -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-[#D80000]/5 blur-3xl rounded-full -ml-20"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-[#C5A059]/10 text-[#C5A059] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#C5A059]/5">
                        <Mail size={40} />
                    </div>
                    <h2 className="text-4xl font-bold font-playfair text-[#1A1A1A] mb-4">Check Your <span className="text-[#C5A059] italic">Inbox</span></h2>
                    <p className="text-slate-500 font-light leading-relaxed">
                        Access to the AI Audit tools requires a verified email address. We&apos;ve sent a secure link to your registered email.
                    </p>
                </div>

                <div className="premium-card p-8 border-t-4 border-t-[#C5A059]">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="min-w-5 pt-1 text-[#C5A059]">1.</div>
                            <p className="text-sm text-slate-600">Locate the email from <strong>noreply@aiaudit.com</strong></p>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="min-w-5 pt-1 text-[#C5A059]">2.</div>
                            <p className="text-sm text-slate-600">Click the <strong>Verify Account</strong> button</p>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="min-w-5 pt-1 text-[#C5A059]">3.</div>
                            <p className="text-sm text-slate-600">Return here to access your dashboard</p>
                        </div>

                        <div className="pt-4 space-y-3">
                            <Link href="/auth/login" className="btn-primary w-full shadow-lg group">
                                Sign In
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="text-center">
                                <Link href="/" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
