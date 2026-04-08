"use client";

import React from 'react';
import {
    ArrowRight,
    Search,
    TrendingUp,
    Zap,
    Users,
    ChevronDown,
    Mail,
    Shield,
    CircleCheckBig,
    Star,
    ArrowUpRight,
    BarChart3,
    Clock,
    DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

export default function LandingPage() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-[#F9F9F7] selection:bg-[#C5A059]/30">
            {/* --- Navigation --- */}
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#D80000] rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                            <Zap className="text-white w-6 h-6 fill-current" />
                        </div>
                        <span className="text-xl font-bold font-playfair tracking-tight text-[#1A1A1A]">AI<span className="text-[#C5A059]">Audit</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-[#C5A059] transition-colors">How it works</Link>
                        <Link href="#roi" className="text-sm font-medium text-gray-600 hover:text-[#C5A059] transition-colors">ROI Calculator</Link>
                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="text-sm font-medium text-gray-600 hover:text-[#C5A059] transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-[#C5A059] transition-colors">Sign In</Link>
                        )}
                        <Link href="/audit" className="btn-primary py-2.5 px-6 text-sm">
                            Run Free Audit
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                {/* --- Hero Section --- */}
                <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,white,rgba(197,160,89,0.05),#F9F9F7)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/20 bg-white/50 text-[#C5A059] text-sm font-medium animate-fadeIn shadow-sm backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
                                </span>
                                Master Your Business ROI with AI
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] font-playfair leading-[1.1] tracking-tight animate-slideUp">
                                How <span className="gold-gradient-text italic">AI-Ready</span><br />
                                is Your Business?
                            </h1>

                            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 font-light leading-relaxed animate-slideUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                                Uncover the hidden potential in your workflows. Use our specialized AI Audit to find exactly where to automate, scale, and maximize your profits.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slideUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                                <Link href="/audit" className="btn-primary w-full sm:w-auto">
                                    Start My Free AI Audit
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="#features" className="btn-outline w-full sm:w-auto">
                                    See How It Works
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="pt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                {['Savvy Entrepreneur', 'TechInBusiness', 'AI Weekly', 'ProfitPulse'].map((brand, i) => (
                                    <div key={i} className="flex items-center justify-center font-playfair font-black text-xl italic tracking-tighter">
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Business Benefits (Value Prop) --- */}
                <section id="roi" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12 text-center">
                            <div className="premium-card p-10 space-y-4">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <DollarSign className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-playfair text-[#1A1A1A]">Make More Money</h3>
                                <p className="text-gray-600 font-light leading-relaxed">Identify revenue leakage and deploy AI agents that convert leads 24/7 without increasing headcount.</p>
                            </div>
                            <div className="premium-card p-10 space-y-4">
                                <div className="w-16 h-16 bg-[#D80000]/5 text-[#D80000] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-playfair text-[#1A1A1A]">Save More Money</h3>
                                <p className="text-gray-600 font-light leading-relaxed">Cut operational costs by up to 60% by automating repetitive manual tasks and eliminating human error.</p>
                            </div>
                            <div className="premium-card p-10 space-y-4">
                                <div className="w-16 h-16 bg-[#C5A059]/10 text-[#C5A059] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-playfair text-[#1A1A1A]">Save More Time</h3>
                                <p className="text-gray-600 font-light leading-relaxed">Reclaim 15+ hours per week per employee. Focus on high-level strategy while AI handles the grunt work.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- The Audit Solution --- */}
                <section id="features" className="py-24 bg-[#F9F9F7] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2 space-y-8">
                                <div className="inline-block px-4 py-1 rounded-full bg-[#C5A059]/10 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                                    The Solution
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#1A1A1A]">
                                    A Complete <span className="italic text-[#C5A059]">Diagnostic System</span> for Business Growth
                                </h2>
                                <p className="text-lg text-gray-600 font-light">
                                    Don&apos;t just &ldquo;use AI&rdquo;. Deploy it strategically. Our audit tool maps your entire business infrastructure to identify the highest ROI opportunities.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Interactive Wizard', desc: 'A 7-step guided process to catalog your systems and workflows.', icon: Search },
                                        { title: 'Opportunity Matrix', desc: 'Instantly score every AI opportunity by Impact vs. Effort.', icon: BarChart3 },
                                        { title: 'Automated ROI Report', desc: 'Get a professional PDF report with estimated monthly savings.', icon: DollarSign }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#D80000] group-hover:bg-[#D80000] group-hover:text-white transition-all duration-300">
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1A1A1A] mb-1">{item.title}</h4>
                                                <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="relative z-10 premium-card p-6 scale-105 border-2 border-[#C5A059]/20 shadow-2xl">
                                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-[#C5A059]">
                                        <Search size={20} />
                                        <span className="font-bold font-playfair">Sample Audit Report</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 bg-slate-100 rounded w-3/4 mb-4"></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 bg-[#C5A059]/5 rounded-xl border border-[#C5A059]/10 flex items-center justify-center font-bold text-[#C5A059]">+$4.2k/mo</div>
                                            <div className="h-20 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-400">Low Effort</div>
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                                            <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#D80000]/5 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Social Proof --- */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl font-bold font-playfair text-[#1A1A1A]">Trusted by <span className="italic text-[#C5A059]">100+ Businesses</span></h2>
                            <p className="text-gray-500 font-light">Join the ranks of modern entrepreneurs scaling with intelligence.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { quote: "We saved $8k in our first month after implementing just three of the recommended AI workflows.", author: "James Chen, Founder of Apex", rating: 5 },
                                { quote: "The audit was eye-opening. We realized our sales team was wasting 20 hours a week on manual data entry.", author: "Sarah Jenkins, Ops Director", rating: 5 },
                                { quote: "Most professional AI tool I've used. The printable reports helped us get board approval for our AI budget.", author: "Michael Roe, CTO", rating: 5 }
                            ].map((test, i) => (
                                <div key={i} className="premium-card p-8 bg-slate-50 border-0">
                                    <div className="flex gap-1 mb-6 text-[#C5A059]">
                                        {[...Array(test.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-[#1A1A1A] font-light leading-relaxed italic mb-8">&ldquo;{test.quote}&rdquo;</p>
                                    <p className="text-sm font-bold text-[#C5A059]">&mdash; {test.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA Section --- */}
                <section className="py-24 bg-[#050505] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A059]/10 to-transparent"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
                        <h2 className="text-4xl md:text-6xl font-bold font-playfair text-white leading-tight">
                            Ready to see how <br /><span className="text-[#C5A059]">AI-Ready</span> you are?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                            Take the free 10-minute audit today. Get your personalized roadmap to making more money and saving more time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/audit" className="btn-primary w-full sm:w-auto h-16 text-lg">
                                Start Your Audit Now
                            </Link>
                            <Link href="/auth/signup" className="text-white font-medium hover:text-[#C5A059] transition-colors flex items-center gap-2">
                                Create an Account <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-20 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1 space-y-6 text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <Zap className="text-[#D80000] w-6 h-6 fill-current" />
                                <span className="text-xl font-bold font-playfair tracking-tight text-white focus:outline-none">AI<span className="text-[#C5A059]">Audit</span></span>
                            </div>
                            <p className="text-gray-500 text-sm font-light">The premium diagnostic tool for modern entrepreneurs to find ROI in AI.</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Solutions</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><Link href="/audit" className="hover:text-white transition-colors">Start Audit</Link></li>
                                <li><Link href="#roi" className="hover:text-white transition-colors">ROI Insights</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Enterprise Features</Link></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
                            <form className="space-y-4">
                                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059] transition-colors" />
                                <button className="w-full btn-primary py-3">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-600 text-xs">© 2026 AI Audit Tool. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
