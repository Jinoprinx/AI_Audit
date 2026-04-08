"use client";

import { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Zap,
    Search,
    BarChart3,
    DollarSign,
    Shield,
    Target,
    Users,
    Mail,
    Globe,
    Lock,
    Cpu,
    Webhook,
    Database,
    LineChart,
    PieChart,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Printer,
    Download,
    Share2,
    ClipboardCheck,
    TrendingUp,
    ShieldAlert,
    Clock,
    Plus,
    CheckCircle,
    Trash2,
    FileText
} from 'lucide-react';
import Link from 'next/link';

// --- Components ---

const SectionHeader = ({ title, description, icon: Icon }: any) => (
    <div className="mb-10 animate-fadeIn">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#D80000]/10 text-[#D80000] rounded-2xl flex items-center justify-center">
                <Icon size={26} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 font-playfair tracking-tight">{title}</h2>
        </div>
        <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl">{description}</p>
    </div>
);

const InputGroup = ({ label, subLabel, children }: any) => (
    <div className="mb-8 group">
        <label className="block text-sm font-bold text-slate-700 mb-2 font-sans tracking-wide uppercase transition-colors group-focus-within:text-[#C5A059]">{label}</label>
        {subLabel && <p className="text-sm text-slate-500 mb-3 font-sans font-light leading-relaxed">{subLabel}</p>}
        {children}
    </div>
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }: any) => (
    <textarea
        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 placeholder:text-slate-400 font-sans outline-none resize-none shadow-sm"
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

const TextInput = ({ value, onChange, placeholder, type = "text" }: any) => (
    <input
        type={type}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 placeholder:text-slate-400 font-sans outline-none shadow-sm"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

// --- Main Application ---

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AIAuditTool() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    // --- State Management (ALL hooks BEFORE any conditional returns) ---
    const [formData, setFormData] = useState({
        // 1. Business Profile
        businessName: '',
        businessType: '', // Salon, Restaurant, Agency, School, etc.
        businessModel: '', // How do they make money?
        
        // 2. Operations
        dailyActivities: '', // What does a typical day look like?
        customerProcess: '', // How do customers find and interact with you?
        
        // 3. Current Status
        revenueRange: '3-figures', // 3, 4, 5, 6, 7-9 figures
        employeeCount: '1-5',
        painPoints: '', // Where is the money/time leaking?
        
        // 4. Tools & Tech
        toolsUsed: {
            socialMedia: false,
            bookingApp: false,
            accountingSoftware: false,
            messagingApps: false,
            paperRecords: false,
        },
        otherTools: '',

        // 5. Growth & Goals
        growthTarget: '4-figures', // Next tier
        roadblocks: '', // What's stopping you?
        
        // Internal settings
        date: new Date().toISOString().split('T')[0],
        isAnalyzing: false,
        reportData: null as any
    });

    // Auth Guard
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/audit');
        }
    }, [status, router]);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- Conditional Returns (AFTER all hooks) ---
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center">
                <Zap className="animate-spin text-[#C5A059]" size={40} />
            </div>
        );
    }

    if (!session) return null;

    // Verification Guard
    if (!(session.user as any).emailVerified) {
        return (
            <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-4">
                <div className="premium-card p-12 max-w-lg text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="w-20 h-20 bg-amber-50 text-[#C5A059] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-amber-50">
                        <Shield size={40} />
                    </div>
                    <h2 className="text-4xl font-bold font-playfair text-slate-900 leading-tight">Verification <span className="text-[#C5A059] italic">Required</span></h2>
                    <p className="text-slate-500 font-light leading-relaxed">
                        To maintain project integrity and security, please verify your email address. We&apos;ve sent a link to <span className="font-bold text-slate-800">{session.user?.email}</span>.
                    </p>
                    <div className="pt-4 space-y-4">
                        <button onClick={() => window.location.reload()} className="btn-primary w-full shadow-2xl">
                            I&apos;ve Verified My Email
                        </button>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Haven&apos;t received the link?</p>
                        <button className="text-[#D80000] font-bold hover:underline">Resend Verification</button>
                    </div>
                </div>
            </div>
        );
    }

    const handleNestedChange = (parent: string, key: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [parent]: { ...prev[parent], [key]: value }
        }));
    };

    const generateReport = async () => {
        setStep(6);
        setFormData(prev => ({ ...prev, isAnalyzing: true }));
        try {
            const response = await fetch('/api/audit/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setFormData(prev => ({ 
                ...prev, 
                reportData: data,
                isAnalyzing: false 
            }));
        } catch (error) {
            console.error('Failed to generate report:', error);
            setFormData(prev => ({ ...prev, isAnalyzing: false }));
            alert('Something went wrong while analyzing your business. Please try again.');
            setStep(5);
        }
    };

    // Removed legacy technical audit functions

    // --- Step Content Renders ---

    const renderStep1_Profile = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Business Profile"
                description="Tell us about your business so we can tailor the audit to your specific industry and model."
                icon={Users}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Business Name">
                    <TextInput
                        value={formData.businessName}
                        onChange={(e: any) => handleInputChange('businessName', e.target.value)}
                        placeholder="e.g. Sunny Hair Salon"
                    />
                </InputGroup>
                <InputGroup label="Business Type">
                    <select
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 font-sans outline-none shadow-sm"
                        value={formData.businessType}
                        onChange={(e: any) => handleInputChange('businessType', e.target.value)}
                    >
                        <option value="">Select industry...</option>
                        <option value="Hair Salon / Barber Shop">Hair Salon / Barber Shop</option>
                        <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                        <option value="AI Agency / Tech Service">AI Agency / Tech Service</option>
                        <option value="School / Church">School / Church</option>
                        <option value="Real Estate Agency">Real Estate Agency</option>
                        <option value="Retail Store">Retail Store</option>
                        <option value="Other">Other</option>
                    </select>
                </InputGroup>
                <div className="md:col-span-2">
                    <InputGroup label="How do you make money?" subLabel="Briefly describe your products or services and how customers pay you.">
                        <TextArea
                            value={formData.businessModel}
                            onChange={(e: any) => handleInputChange('businessModel', e.target.value)}
                            placeholder="e.g. We sell hair products and charge for haircuts and styling services..."
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );

    const renderStep2_Operations = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Operations & Activities"
                description="Describe how your business runs day-to-day. This helps us find bottlenecks and time-wasters."
                icon={TrendingUp}
            />
            <div className="space-y-8">
                <InputGroup label="Daily Activities" subLabel="What does a typical busy day look like for you and your team?">
                    <TextArea
                        value={formData.dailyActivities}
                        onChange={(e: any) => handleInputChange('dailyActivities', e.target.value)}
                        placeholder="e.g. Opening the shop, attending to walk-in customers, managing bookings on the phone..."
                    />
                </InputGroup>
                <InputGroup label="Customer Journey" subLabel="How do customers find you and what happens when they want your service/product?">
                    <TextArea
                        value={formData.customerProcess}
                        onChange={(e: any) => handleInputChange('customerProcess', e.target.value)}
                        placeholder="e.g. They find us on Instagram, send a DM or call to book, then show up at the shop..."
                    />
                </InputGroup>
            </div>
        </div>
    );

    const renderStep3_Status = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Current Status"
                description="Help us understand the scale of your business and where the leaks are."
                icon={Database}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Current Monthly Revenue">
                    <select
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 font-sans outline-none shadow-sm"
                        value={formData.revenueRange}
                        onChange={(e: any) => handleInputChange('revenueRange', e.target.value)}
                    >
                        <option value="3-figures">3-figures (e.g. $100 - $999)</option>
                        <option value="4-figures">4-figures (e.g. $1,000 - $9,999)</option>
                        <option value="5-figures">5-figures (e.g. $10,000 - $99,999)</option>
                        <option value="6-figures">6-figures (e.g. $100,000+)</option>
                        <option value="7-9 figures">7-9 figures ($1M+)</option>
                    </select>
                </InputGroup>
                <InputGroup label="Team Size">
                    <select
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 font-sans outline-none shadow-sm"
                        value={formData.employeeCount}
                        onChange={(e: any) => handleInputChange('employeeCount', e.target.value)}
                    >
                        <option value="1 (Solopreneur)">Just me</option>
                        <option value="2-5">2-5 people</option>
                        <option value="6-15">6-15 people</option>
                        <option value="16-50">16-50 people</option>
                        <option value="50+">50+ people</option>
                    </select>
                </InputGroup>
                <div className="md:col-span-2">
                    <InputGroup label="Biggest Time/Money Wastes" subLabel="What are the 'resource leakages' or activities that waste the most time or money?">
                        <TextArea
                            value={formData.painPoints}
                            onChange={(e: any) => handleInputChange('painPoints', e.target.value)}
                            placeholder="e.g. Manually sending reminders to customers, dealing with cancellations, wastage of raw materials..."
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );

    const renderStep4_Tools = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Tools & Technology"
                description="What tools do you currently use to run your business?"
                icon={FileText}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { key: 'socialMedia', label: 'Social Media (Instagram/FB)', icon: Globe },
                    { key: 'bookingApp', label: 'Booking/Scheduling App', icon: Clock },
                    { key: 'accountingSoftware', label: 'Accounting (Quickbooks/Excel)', icon: DollarSign },
                    { key: 'messagingApps', label: 'Messaging (WhatsApp/DMs)', icon: Mail },
                    { key: 'paperRecords', label: 'Paper Records / Manual Filing', icon: FileText },
                ].map((item) => (
                    <label key={item.key} className={`flex items-center gap-4 p-5 rounded-3xl border transition-all cursor-pointer ${(formData.toolsUsed as any)[item.key]
                        ? 'bg-white border-[#C5A059] shadow-md'
                        : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100'
                        }`}>
                        <input
                            type="checkbox"
                            checked={(formData.toolsUsed as any)[item.key]}
                            onChange={(e) => handleNestedChange('toolsUsed', item.key, e.target.checked)}
                            className="w-6 h-6 text-[#C5A059] border-slate-300 rounded-lg focus:ring-[#C5A059]"
                        />
                        <div className="flex items-center gap-3">
                            <item.icon size={20} className={(formData.toolsUsed as any)[item.key] ? 'text-[#C5A059]' : 'text-slate-400'} />
                            <span className="font-bold text-slate-800">{item.label}</span>
                        </div>
                    </label>
                ))}
            </div>

            <InputGroup label="Other Tools" subLabel="Any other software or methods you use?">
                <TextInput
                    value={formData.otherTools}
                    onChange={(e: any) => handleInputChange('otherTools', e.target.value)}
                    placeholder="e.g. Canva for designs, specialized POS..."
                />
            </InputGroup>
        </div>
    );

    const renderStep5_Goals = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Growth & Goals"
                description="Where do you want to take your business next?"
                icon={BarChart3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Target Revenue Tier" subLabel="What is your next big milestone?">
                    <select
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] focus:bg-white transition-all duration-300 text-slate-800 font-sans outline-none shadow-sm"
                        value={formData.growthTarget}
                        onChange={(e: any) => handleInputChange('growthTarget', e.target.value)}
                    >
                        <option value="4-figures">4-figures ($1,000+)</option>
                        <option value="5-figures">5-figures ($10,000+)</option>
                        <option value="6-figures">6-figures ($100,000+)</option>
                        <option value="7-9 figures">7-9 figures ($1M+)</option>
                    </select>
                </InputGroup>
                <div className="md:col-span-2">
                    <InputGroup label="Current Roadblocks" subLabel="What's stopping you from reaching that next level?">
                        <TextArea
                            value={formData.roadblocks}
                            onChange={(e: any) => handleInputChange('roadblocks', e.target.value)}
                            placeholder="e.g. Not enough staff, can't reach new customers, manual processes take up all my time..."
                        />
                    </InputGroup>
                </div>
            </div>

            <div className="premium-card p-10 bg-[#050505] text-white space-y-4 shadow-2xl shadow-red-100/20">
                <div className="w-12 h-12 bg-[#D80000] rounded-xl flex items-center justify-center">
                    <Zap className="fill-current" />
                </div>
                <h3 className="text-2xl font-bold font-playfair">Reveal Your Growth Roadmap</h3>
                <p className="text-slate-400 font-light leading-relaxed">We will now analyze your inputs using AI to provide a custom strategy to supercharge your business.</p>
            </div>
        </div>
    );


    const renderStep6_Governance = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Risk & Governance"
                description="Ensure long-term viability, ethical AI use, and data compliance. These are critical for businesses scaling with AI."
                icon={ShieldAlert}
            />

            <div className="grid grid-cols-1 gap-4">
                {[
                    { key: 'hasPII', title: 'Sensitive Data (PII)', desc: 'Does the business handle HIPAA, GDPR, or financial data?', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
                    { key: 'needsHumanLoop', title: 'Human-in-the-Loop', desc: 'Is human verification required for automated outputs?', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { key: 'vendorLockIn', title: 'Proprietary Constraints', desc: 'Are we locking the business into a single ecosystem (e.g. only OpenAI)?', icon: Database, color: 'text-[#C5A059]', bg: 'bg-[#C5A059]/10' }
                ].map((item) => (
                    <label key={item.key} className={`group flex items-center justify-between p-6 border-2 rounded-3xl cursor-pointer transition-all duration-300 ${(formData as any)[item.key]
                        ? `border-slate-800 bg-slate-900 text-white shadow-xl`
                        : 'border-slate-100 bg-white text-slate-800 hover:border-slate-200 shadow-sm'
                        }`}>
                        <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${(formData as any)[item.key] ? 'bg-white/10 text-white' : `${item.bg} ${item.color}`
                                }`}>
                                <item.icon size={26} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-playfair">{item.title}</h3>
                                <p className={`text-sm font-sans font-light max-w-sm ${(formData as any)[item.key] ? 'text-slate-400' : 'text-slate-500'
                                    }`}>{item.desc}</p>
                            </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${(formData as any)[item.key] ? 'border-[#C5A059] bg-[#C5A059] text-white' : 'border-slate-200'
                            }`}>
                            {(formData as any)[item.key] && <CheckCircle size={18} />}
                        </div>
                        <input
                            type="checkbox"
                            checked={(formData as any)[item.key]}
                            onChange={(e) => handleInputChange(item.key, e.target.checked)}
                            className="hidden"
                        />
                    </label>
                ))}
            </div>

            <div className="premium-card p-10 bg-[#050505] text-white space-y-4 shadow-2xl shadow-red-100/20">
                <div className="w-12 h-12 bg-[#D80000] rounded-xl flex items-center justify-center">
                    <Zap className="fill-current" />
                </div>
                <h3 className="text-2xl font-bold font-playfair">Ready for Your Report?</h3>
                <p className="text-slate-400 font-light leading-relaxed">By proceeding, we&apos;ll calculate your total ROI based on your inputs and generate a professional roadmap for your business.</p>
            </div>
        </div>
    );

    const renderReport = () => {
        const report = formData.reportData;

        if (formData.isAnalyzing) {
            return (
                <div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center justify-center space-y-8 animate-fadeIn">
                    <div className="relative">
                        <div className="w-32 h-32 border-4 border-[#C5A059]/10 rounded-full animate-spin border-t-[#C5A059]"></div>
                        <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D80000] fill-current animate-pulse" size={40} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold font-playfair text-slate-800">Analyzing Your Business...</h2>
                        <p className="text-slate-500 font-light max-w-sm">Our AI is crunching the numbers and finding growth opportunities for {formData.businessName}.</p>
                    </div>
                </div>
            );
        }

        if (!report) return null;

        return (
            <div className="animate-fadeIn bg-white min-h-screen">
                <div className="print-content max-w-5xl mx-auto p-12 bg-white" id="printable-report">

                    {/* Header */}
                    <div className="flex justify-between items-start border-b-4 border-slate-900 pb-10 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#D80000] rounded-xl flex items-center justify-center text-white">
                                    <Zap className="fill-current w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold font-playfair tracking-tighter">AI<span className="text-[#C5A059]">AUDIT</span></span>
                            </div>
                            <div>
                                <h1 className="text-5xl font-bold text-slate-900 font-playfair tracking-tight">Growth Roadmap</h1>
                                <p className="text-slate-500 text-xl font-light">Custom Strategy for <span className="font-bold text-slate-900">{formData.businessName}</span></p>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Date Generated</p>
                            <p className="text-slate-500 font-light">{formData.date}</p>
                        </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="premium-card p-10 bg-[#F9F9F7] border-slate-200 mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 font-playfair">Executive Summary</h2>
                        <p className="text-lg text-slate-600 font-light leading-relaxed italic border-l-4 border-[#C5A059] pl-6 transition-all">
                            "{report.executiveSummary}"
                        </p>
                    </div>

                    {/* Recommendations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <DollarSign className="text-emerald-500" />
                                Profit & Savings
                            </h3>
                            {report.profitRecommendations.map((rec: any, i: number) => (
                                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                                    <h4 className="font-bold text-slate-800 mb-2">{rec.title}</h4>
                                    <p className="text-sm text-slate-500 font-light mb-3">{rec.description}</p>
                                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">
                                        Potential: {rec.benefit}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Clock className="text-[#C5A059]" />
                                Time & Operations
                            </h3>
                            {report.operationFixes.map((rec: any, i: number) => (
                                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                                    <h4 className="font-bold text-slate-800 mb-2">{rec.title}</h4>
                                    <p className="text-sm text-slate-500 font-light mb-3">{rec.description}</p>
                                    <div className="text-xs font-bold text-[#C5A059] uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1 rounded-full inline-block">
                                        Value: {rec.benefit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Supercharge Section */}
                    <div className="bg-[#050505] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden mb-16">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D80000]/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#D80000] rounded-2xl flex items-center justify-center">
                                    <Zap className="fill-current w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-bold font-playfair tracking-tight">AI Supercharge Strategy</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-xl text-slate-300 font-light leading-relaxed">
                                    {report.aiSupercharge.strategy}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {report.aiSupercharge.implentationSteps.map((step: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-bold text-[#C5A059]">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm text-slate-400">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <div className="bg-[#C5A059]/10 p-8 rounded-3xl border border-[#C5A059]/30">
                                    <h4 className="text-[#C5A059] font-black uppercase tracking-[0.2em] mb-4 text-sm">Professional Assistance</h4>
                                    <p className="text-slate-200 font-light leading-relaxed mb-6">
                                        {report.aiSupercharge.marketingCTA}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <a href="mailto:hello@jinonet.ai" className="px-6 py-3 bg-[#D80000] text-white rounded-full font-bold hover:bg-white hover:text-black transition-all text-sm">Email Us Now</a>
                                        <a href="https://wa.me/2349116585600" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-white hover:text-black transition-all text-sm">Chat on WhatsApp</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Footer */}
                    <div className="text-center space-y-4">
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">
                            Generated by Jinonet AI Solutions • Custom Growth Audit
                        </div>
                    </div>
                </div>

                {/* Fixed Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-6 glass-panel border-t border-slate-200/50 flex justify-center gap-6 no-print z-[100]">
                    <button
                        onClick={() => setStep(5)}
                        className="btn-outline border-slate-200 text-slate-500 hover:text-slate-800"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Edit
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="btn-primary shadow-2xl"
                    >
                        <Printer size={20} />
                        Download PDF Report
                    </button>
                    <Link href="/" className="btn-outline border-slate-800 text-slate-800 hover:bg-slate-900 hover:text-white">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    };


    // --- Main Layout ---

    return (
        <div className="min-h-screen bg-[#F9F9F7] font-sans text-slate-900 pb-32">
            {step < 7 && (
                <div className="max-w-4xl mx-auto pt-24 px-4">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-[#D80000] group-hover:text-white transition-all">
                                <ChevronLeft size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">Exit Audit</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Zap className="text-[#D80000] w-5 h-5 fill-current" />
                            <span className="text-xl font-bold font-playfair tracking-tighter">AI<span className="text-[#C5A059]">AUDIT</span></span>
                        </div>
                    </div>
                    {/* Progress Slider */}
                    <div className="mb-16">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-sm font-black text-[#C5A059] uppercase tracking-[0.2em] mb-1">Step {step} of 5</h3>
                                <p className="text-2xl font-bold text-slate-800 font-playfair">
                                    {step === 1 && "Business Profile"}
                                    {step === 2 && "Operations & Activities"}
                                    {step === 3 && "Current Status"}
                                    {step === 4 && "Tools & Technology"}
                                    {step === 5 && "Growth & Goals"}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black font-playfair italic text-slate-100 leading-none">
                                    {Math.round((step / 5) * 100)}%
                                </div>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#C5A059] to-[#D80000] transition-all duration-700 ease-in-out"
                                style={{ width: `${(step / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="premium-card p-10 md:p-16 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            {step === 1 && renderStep1_Profile()}
                            {step === 2 && renderStep2_Operations()}
                            {step === 3 && renderStep3_Status()}
                            {step === 4 && renderStep4_Tools()}
                            {step === 5 && renderStep5_Goals()}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center bg-white/50 p-4 rounded-full border border-white/50 shadow-xl backdrop-blur-md sticky bottom-10">
                        <button
                            onClick={() => step > 1 ? setStep(step - 1) : null}
                            disabled={step === 1}
                            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${step === 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-600 hover:bg-white hover:shadow-sm'
                                }`}
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Previous
                        </button>
                        <button
                            onClick={async () => {
                                if (step < 5) {
                                    setStep(step + 1);
                                } else {
                                    generateReport();
                                }
                            }}
                            className="btn-primary shadow-2xl scale-110"
                        >
                            {step === 5 ? 'Generate Growth Roadmap' : 'Continue to Next Step'}
                            {step !== 5 ? <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /> : <Zap size={20} className="fill-current animate-pulse" />}
                        </button>
                    </div>

                </div>
            )}

            {/* Report View */}
            {step === 6 && renderReport()}

        </div>
    );
}
