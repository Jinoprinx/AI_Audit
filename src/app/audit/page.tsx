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
    const totalSteps = 7;

    // --- State Management (ALL hooks BEFORE any conditional returns) ---
    const [formData, setFormData] = useState({
        // 1. Client Info
        clientName: '',
        auditorName: '',
        date: new Date().toISOString().split('T')[0],

        // 2. Strategy
        kpis: '',
        painPoints: '',
        bottlenecks: '',
        riskTolerance: 'Moderate', // Low, Moderate, High

        // 3. Infrastructure
        dataSources: {
            crm: false,
            erp: false,
            pm: false,
            comms: false,
            storage: false,
        },
        systems: [
            { name: '', api: false, webhooks: false, cleanliness: 5 }
        ],

        // 4. Workflows
        salesNotes: '',
        supportNotes: '',
        opsNotes: '',

        // 5. Opportunities
        opportunities: [
            { title: 'Example: Invoice Processing', dept: 'Finance', hours: 20, impact: 4, effort: 4 }
        ],

        // 6. Risk
        hasPII: false,
        needsHumanLoop: false,
        vendorLockIn: false,

        // 7. ROI
        hourlyRate: 50,
        employeesCount: 1,
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

    const addSystem = () => {
        setFormData(prev => ({
            ...prev,
            systems: [...prev.systems, { name: '', api: false, webhooks: false, cleanliness: 5 }]
        }));
    };

    const updateSystem = (index: number, field: string, value: any) => {
        const newSystems = [...formData.systems];
        (newSystems[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, systems: newSystems }));
    };

    const removeSystem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            systems: prev.systems.filter((_, i) => i !== index)
        }));
    };

    const addOpportunity = () => {
        setFormData(prev => ({
            ...prev,
            opportunities: [...prev.opportunities, { title: '', dept: '', hours: 0, impact: 3, effort: 3 }]
        }));
    };

    const updateOpportunity = (index: number, field: string, value: any) => {
        const newOps = [...formData.opportunities];
        (newOps[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, opportunities: newOps }));
    };

    const removeOpportunity = (index: number) => {
        setFormData(prev => ({
            ...prev,
            opportunities: prev.opportunities.filter((_, i) => i !== index)
        }));
    };

    // --- Step Content Renders ---

    const renderStep1_Info = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Audit Initialization"
                description="Start by defining the business and the scope of this audit. This ensures all ROI calculations are contextually accurate for the specific business."
                icon={ClipboardCheck}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Business Name">
                    <TextInput
                        value={formData.clientName}
                        onChange={(e: any) => handleInputChange('clientName', e.target.value)}
                        placeholder="e.g. Acme Corp"
                    />
                </InputGroup>
                <InputGroup label="Auditor Name">
                    <TextInput
                        value={formData.auditorName}
                        onChange={(e: any) => handleInputChange('auditorName', e.target.value)}
                        placeholder="Your Name or Agency"
                    />
                </InputGroup>
                <div className="md:col-span-2">
                    <InputGroup label="Audit Date">
                        <TextInput
                            type="date"
                            value={formData.date}
                            onChange={(e: any) => handleInputChange('date', e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );

    const renderStep2_Strategy = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Strategic Alignment"
                description="Identify business goals to ensure AI efforts drive real ROI. We focus on areas that make more money, save more money, and save more time."
                icon={TrendingUp}
            />
            <div className="space-y-8">
                <InputGroup label="Top 3 KPIs" subLabel="What metrics are they trying to move this quarter? (e.g. CAC, LTV, Monthly Revenue)">
                    <TextArea
                        value={formData.kpis}
                        onChange={(e: any) => handleInputChange('kpis', e.target.value)}
                        placeholder="1. Reduce customer support response time by 50%..."
                    />
                </InputGroup>
                <InputGroup label="Primary Pain Points" subLabel="What are the biggest drains on resources? What keeps the business owner up at night?">
                    <TextArea
                        value={formData.painPoints}
                        onChange={(e: any) => handleInputChange('painPoints', e.target.value)}
                        placeholder="Manual data entry between CRM and Accounting is causing 10% error rates..."
                    />
                </InputGroup>
                <InputGroup label="Bottlenecks" subLabel="Where exactly does the workflow stall?">
                    <TextArea
                        value={formData.bottlenecks}
                        onChange={(e: any) => handleInputChange('bottlenecks', e.target.value)}
                        placeholder="Waiting for manager approval on invoices takes 3 days on average..."
                    />
                </InputGroup>
                <InputGroup label="AI Risk Tolerance">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Low', 'Moderate', 'High'].map((level) => (
                            <button
                                key={level}
                                onClick={() => handleInputChange('riskTolerance', level)}
                                className={`px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-left ${formData.riskTolerance === level
                                    ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059] shadow-inner'
                                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                    }`}
                            >
                                <div className="font-bold mb-1">{level}</div>
                                <div className="text-xs opacity-70">
                                    {level === 'Low' && 'Proven enterprise solutions.'}
                                    {level === 'Moderate' && 'Balanced innovation.'}
                                    {level === 'High' && 'Cutting-edge AI tech.'}
                                </div>
                            </button>
                        ))}
                    </div>
                </InputGroup>
            </div>
        </div>
    );

    const renderStep3_Infrastructure = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Data Infrastructure"
                description="Assess technical feasibility. AI needs accessible, clean data to be effective and secure."
                icon={Database}
            />

            <div className="premium-card p-8 bg-slate-50/50 border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6 font-playfair flex items-center gap-2">
                    <Zap className="text-[#D80000] w-5 h-5" />
                    Data Sources Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { key: 'crm', label: 'CRM (Salesforce, HubSpot)', icon: Users },
                        { key: 'erp', label: 'Finance (Xero, QuickBooks)', icon: DollarSign },
                        { key: 'pm', label: 'Projects (Jira, ClickUp)', icon: Clock },
                        { key: 'comms', label: 'Comms (Slack, Teams)', icon: Mail },
                        { key: 'storage', label: 'Files (Drive, Dropbox)', icon: Database },
                    ].map((item) => (
                        <label key={item.key} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${(formData.dataSources as any)[item.key]
                            ? 'bg-white border-[#C5A059] shadow-sm'
                            : 'bg-transparent border-slate-200 opacity-60 hover:opacity-100'
                            }`}>
                            <input
                                type="checkbox"
                                checked={(formData.dataSources as any)[item.key]}
                                onChange={(e) => handleNestedChange('dataSources', item.key, e.target.checked)}
                                className="w-5 h-5 text-[#C5A059] border-slate-300 rounded focus:ring-[#C5A059]"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800">{item.label}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 font-playfair">System Connectivity Audit</h3>
                    <button
                        onClick={addSystem}
                        className="flex items-center gap-2 py-2 px-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-bold text-sm shadow-sm"
                    >
                        <Plus size={18} /> Add System
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.systems.map((sys, idx) => (
                        <div key={idx} className="group relative flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="flex-1 w-full space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Name</label>
                                <input
                                    type="text"
                                    value={sys.name}
                                    onChange={(e) => updateSystem(idx, 'name', e.target.value)}
                                    placeholder="e.g. Legacy ERP"
                                    className="w-full bg-transparent border-b-2 border-slate-100 focus:border-[#C5A059] py-1 transition-all outline-none font-sans text-slate-800"
                                />
                            </div>
                            <div className="flex items-center gap-8">
                                <label className="flex items-center gap-3 cursor-pointer group/check">
                                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${sys.api ? 'border-[#C5A059] bg-[#C5A059] text-white' : 'border-slate-200'}`}>
                                        {sys.api && <CheckCircle size={14} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={sys.api}
                                        className="hidden"
                                        onChange={(e) => updateSystem(idx, 'api', e.target.checked)}
                                    />
                                    <span className="text-sm font-bold text-slate-600">API</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group/check">
                                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${sys.webhooks ? 'border-[#C5A059] bg-[#C5A059] text-white' : 'border-slate-200'}`}>
                                        {sys.webhooks && <CheckCircle size={14} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={sys.webhooks}
                                        className="hidden"
                                        onChange={(e) => updateSystem(idx, 'webhooks', e.target.checked)}
                                    />
                                    <span className="text-sm font-bold text-slate-600">Webhooks</span>
                                </label>
                            </div>
                            <div className="w-full md:w-32 space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Cleanliness</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="1" max="10"
                                        value={sys.cleanliness}
                                        onChange={(e) => updateSystem(idx, 'cleanliness', parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-[#C5A059] cursor-pointer"
                                    />
                                    <span className="text-sm font-black text-[#C5A059] min-w-[1.5rem]">{sys.cleanliness}</span>
                                </div>
                            </div>
                            <button onClick={() => removeSystem(idx)} className="absolute -top-3 -right-3 md:relative md:top-0 md:right-0 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep4_Workflows = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Workflow Analysis"
                description="Deep dive into departmental processes to find high-impact automation triggers. Look for the 'Three Ms': Manual, Monotonous, and Messy."
                icon={FileText}
            />

            <div className="space-y-10">
                <div className="premium-card p-8 bg-white border-slate-100 hover:border-[#C5A059]/30 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-10 bg-blue-500 rounded-full"></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 font-playfair">Sales & Marketing</h3>
                            <p className="text-sm text-slate-400 font-sans italic">Hacks: Manual data entry, copy-pasting, generic lead follow-ups.</p>
                        </div>
                    </div>
                    <InputGroup label="Process Map: Interest to Close" subLabel="Describe the journey steps. Where do people spend the most time?">
                        <TextArea
                            value={formData.salesNotes}
                            onChange={(e: any) => handleInputChange('salesNotes', e.target.value)}
                            placeholder="e.g. 1. Lead comes in via Website Form. 2. Rep checks email every 2 hours. 3. Rep manually adds lead to CRM..."
                        />
                    </InputGroup>
                </div>

                <div className="premium-card p-8 bg-white border-slate-100 hover:border-[#C5A059]/30 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 font-playfair">Customer Support</h3>
                            <p className="text-sm text-slate-400 font-sans italic">Hacks: Repetitive FAQs, manual ticket routing, sentiment analysis.</p>
                        </div>
                    </div>
                    <InputGroup label="Top Inquiries & Bottlenecks" subLabel="What are the most common questions? What takes longest to resolve?">
                        <TextArea
                            value={formData.supportNotes}
                            onChange={(e: any) => handleInputChange('supportNotes', e.target.value)}
                            placeholder="e.g. 60% of tickets are order status checks. Agents spend 5 mins per ticket looking up data across systems..."
                        />
                    </InputGroup>
                </div>

                <div className="premium-card p-8 bg-white border-slate-100 hover:border-[#C5A059]/30 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-10 bg-purple-500 rounded-full"></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 font-playfair">Operations & HR</h3>
                            <p className="text-sm text-slate-400 font-sans italic">Hacks: Scheduling, document processing, onboarding checklists.</p>
                        </div>
                    </div>
                    <InputGroup label="Admin-Heavy Processes" subLabel="What back-office tasks require the most manual coordination?">
                        <TextArea
                            value={formData.opsNotes}
                            onChange={(e: any) => handleInputChange('opsNotes', e.target.value)}
                            placeholder="e.g. Invoices are received via PDF, printed, manually approved, then scanned back for filing. Takes approx 4h/week."
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );

    const renderStep5_Opportunities = () => (
        <div className="space-y-8 animate-slideUp">
            <SectionHeader
                title="Opportunity Matrix"
                description="Prioritize your findings. Focus on 'Quick Wins'—High Impact tasks with relatively Low Effort to implement."
                icon={BarChart3}
            />

            <div className="premium-card overflow-hidden bg-white border-slate-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Opportunity</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Dept</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans text-center">Hrs Saved</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans text-center">Impact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans text-center">Effort</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest font-sans text-center">ROI Score</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {formData.opportunities.map((opp: any, idx) => {
                                const score = Number(opp.impact) + Number(opp.effort);
                                return (
                                    <tr key={idx} className="group hover:bg-[#F9F9F7] transition-colors">
                                        <td className="px-6 py-5">
                                            <input
                                                className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-bold p-0 font-sans placeholder:text-slate-300"
                                                value={opp.title}
                                                onChange={(e) => updateOpportunity(idx, 'title', e.target.value)}
                                                placeholder="e.g. Automate Ticket Triage"
                                            />
                                        </td>
                                        <td className="px-6 py-5">
                                            <input
                                                className="w-24 bg-transparent border-none focus:ring-0 text-slate-500 text-sm p-0 font-sans"
                                                value={opp.dept}
                                                onChange={(e) => updateOpportunity(idx, 'dept', e.target.value)}
                                                placeholder="Dept..."
                                            />
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <input
                                                    type="number"
                                                    className="w-16 bg-transparent border-none focus:ring-0 text-slate-800 font-bold p-0 font-sans text-center"
                                                    value={opp.hours}
                                                    onChange={(e) => updateOpportunity(idx, 'hours', e.target.value)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <select
                                                    className="bg-transparent border-none focus:ring-0 text-[#C5A059] font-black p-0 font-sans cursor-pointer text-center"
                                                    value={opp.impact}
                                                    onChange={(e) => updateOpportunity(idx, 'impact', e.target.value)}
                                                >
                                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <select
                                                    className="bg-transparent border-none focus:ring-0 text-[#C5A059] font-black p-0 font-sans cursor-pointer text-center"
                                                    value={opp.effort}
                                                    onChange={(e) => updateOpportunity(idx, 'effort', e.target.value)}
                                                >
                                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <span className={`text-xl font-black font-playfair ${score >= 8 ? 'text-emerald-500' : score >= 6 ? 'text-[#C5A059]' : 'text-slate-300'}`}>
                                                    {score}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button onClick={() => removeOpportunity(idx)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                onClick={addOpportunity}
                className="flex items-center gap-2 py-3 px-6 bg-white border border-slate-100 text-[#D80000] rounded-2xl hover:bg-[#D80000] hover:text-white transition-all font-bold shadow-sm"
            >
                <Plus size={20} /> Add New Opportunity
            </button>

            <div className="bg-[#C5A059]/5 p-6 rounded-3xl border border-[#C5A059]/10 text-sm text-slate-600 font-sans flex gap-4">
                <div className="w-10 h-10 bg-[#C5A059] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">How Scoring Works:</h4>
                    <p className="font-light leading-relaxed">Impact (Potential Revenue/Time Gain) + Effort (Ease of Implementation). <strong>Score 8-10</strong> are your high-priority Quick Wins. <strong>Score 6-7</strong> are significant Strategic Projects.</p>
                </div>
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
        // Calculate totals
        const totalHoursSaved = formData.opportunities.reduce((acc, curr) => acc + Number(curr.hours), 0);
        const estimatedMonthlySavings = totalHoursSaved * formData.hourlyRate;
        const sortedOpportunities = [...formData.opportunities].sort((a: any, b: any) => (Number(b.impact) + Number(b.effort)) - (Number(a.impact) + Number(a.effort)));

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
                                <h1 className="text-5xl font-bold text-slate-900 font-playfair tracking-tight">AI Readiness Audit</h1>
                                <p className="text-slate-500 text-xl font-light">Strategic Roadmap for <span className="font-bold text-slate-900">{formData.clientName || 'Valued Client'}</span></p>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Report Insight</p>
                            <p className="text-lg font-bold text-slate-800">{formData.auditorName}</p>
                            <p className="text-slate-500 font-light">{formData.date}</p>
                        </div>
                    </div>

                    {/* Executive Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-[#F9F9F7] p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-slate-400 font-bold mb-2 text-xs uppercase tracking-widest">Est. Monthly Savings</h3>
                            <p className="text-4xl font-black text-slate-900 font-playfair italic">
                                ${estimatedMonthlySavings.toLocaleString()}
                            </p>
                            <p className="text-sm text-slate-500 mt-2 font-light">Based on {totalHoursSaved}h saved @ ${formData.hourlyRate}/hr</p>
                        </div>

                        <div className="bg-[#F9F9F7] p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-[#C5A059]/10 text-[#C5A059] rounded-2xl flex items-center justify-center mb-6">
                                <Target size={24} />
                            </div>
                            <h3 className="text-slate-400 font-bold mb-2 text-xs uppercase tracking-widest">Priority Focus</h3>
                            <p className="text-2xl font-black text-slate-900 font-playfair line-clamp-2 italic">
                                {sortedOpportunities[0]?.title || "N/A"}
                            </p>
                            <p className="text-sm text-slate-500 mt-2 font-light">Highest ROI Score: {(Number(sortedOpportunities[0]?.impact) || 0) + (Number(sortedOpportunities[0]?.effort) || 0)}/10</p>
                        </div>

                        <div className="bg-[#050505] p-8 rounded-3xl shadow-xl shadow-red-100/20 text-white">
                            <div className="w-12 h-12 bg-[#D80000] text-white rounded-2xl flex items-center justify-center mb-6">
                                <BarChart3 size={24} />
                            </div>
                            <h3 className="text-slate-500 font-bold mb-2 text-xs uppercase tracking-widest">Readiness Score</h3>
                            <p className="text-4xl font-black text-[#C5A059] font-playfair italic">
                                {Math.round((formData.systems.filter(s => s.api).length / (formData.systems.length || 1)) * 100)}%
                            </p>
                            <p className="text-sm text-slate-500 mt-2 font-light">Infrastructure Connectivity</p>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-[#C5A059] pl-4 font-playfair">Strategic Context</h2>
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2">Key Value Drivers</h4>
                                    <p className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">{formData.kpis || "No KPIs specified."}</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2">Primary Inefficiencies</h4>
                                    <p className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">{formData.painPoints || "No pain points specified."}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-[#D80000] pl-4 font-playfair">Infrastructure Readiness</h2>
                            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-slate-50 font-bold text-slate-400 font-sans">
                                        <tr>
                                            <th className="px-6 py-4 uppercase tracking-widest text-xs">System</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-xs text-center">API</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-xs text-right">Data Health</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-sans">
                                        {formData.systems.map((s, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 font-bold text-slate-800">{s.name || "Untitled System"}</td>
                                                <td className="px-6 py-4 text-center">
                                                    {s.api ? (
                                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Ready</span>
                                                    ) : (
                                                        <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">None</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${s.cleanliness >= 7 ? 'bg-emerald-500' : s.cleanliness >= 4 ? 'bg-[#C5A059]' : 'bg-red-500'}`}
                                                                style={{ width: `${s.cleanliness * 10}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-500">{s.cleanliness}/10</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Automation Roadmap */}
                    <div className="mb-16 break-inside-avoid">
                        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 font-playfair mb-8">ROI-Driven Automation Roadmap</h2>
                        <div className="space-y-4">
                            {sortedOpportunities.map((opp: any, idx: number) => {
                                const score = Number(opp.impact) + Number(opp.effort);
                                return (
                                    <div key={idx} className="flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-900 text-[#C5A059] rounded-2xl font-black font-playfair shadow-lg">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-800 font-playfair mb-1">{opp.title}</h4>
                                                <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                    <span className="bg-slate-50 px-3 py-1 rounded-full text-slate-500">{opp.dept}</span>
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {opp.hours} hrs/mo recovered</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">ROI score</div>
                                            <div className={`text-4xl font-black font-playfair italic ${score >= 8 ? 'text-emerald-500' : score >= 6 ? 'text-[#C5A059]' : 'text-slate-300'}`}>
                                                {score}<span className="text-sm text-slate-200 not-italic font-sans">/10</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Final CTA/Footer */}
                    <div className="bg-[#F9F9F7] p-12 rounded-[3rem] border border-slate-100 text-center space-y-6">
                        <h3 className="text-3xl font-bold text-slate-900 font-playfair">Ready to Implement?</h3>
                        <p className="max-w-2xl mx-auto text-slate-500 font-light leading-relaxed">
                            This report identified a potential <span className="font-bold text-slate-900">${estimatedMonthlySavings.toLocaleString()} in monthly reclaimed value</span>.
                            The next step is to begin implementation on your Priority #1 opportunity.
                        </p>
                        <div className="pt-4 text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">
                            Generated by AI Audit Tool • Professional Business Assessment
                        </div>
                    </div>
                </div>

                {/* Fixed Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-6 glass-panel border-t border-slate-200/50 flex justify-center gap-6 no-print z-[100]">
                    <button
                        onClick={() => setStep(step - 1)}
                        className="btn-outline"
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
                        Return to Homepage
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
                                <h3 className="text-sm font-black text-[#C5A059] uppercase tracking-[0.2em] mb-1">Step {step} of 6</h3>
                                <p className="text-2xl font-bold text-slate-800 font-playfair">
                                    {step === 1 && "Basic Information"}
                                    {step === 2 && "Strategic Goals"}
                                    {step === 3 && "Infrastructure Assessment"}
                                    {step === 4 && "Workflows & Pain Points"}
                                    {step === 5 && "ROI Opportunities"}
                                    {step === 6 && "Risk & Compliance"}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black font-playfair italic text-slate-100 leading-none">
                                    {Math.round((step / 6) * 100)}%
                                </div>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#C5A059] to-[#D80000] transition-all duration-700 ease-in-out"
                                style={{ width: `${(step / 6) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="premium-card p-10 md:p-16 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            {step === 1 && renderStep1_Info()}
                            {step === 2 && renderStep2_Strategy()}
                            {step === 3 && renderStep3_Infrastructure()}
                            {step === 4 && renderStep4_Workflows()}
                            {step === 5 && renderStep5_Opportunities()}
                            {step === 6 && renderStep6_Governance()}
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
                            onClick={() => setStep(step + 1)}
                            className="btn-primary shadow-2xl scale-110"
                        >
                            {step === 6 ? 'Generate Master Report' : 'Continue to Next Step'}
                            {step !== 6 ? <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /> : <Zap size={20} className="fill-current animate-pulse" />}
                        </button>
                    </div>
                </div>
            )}

            {/* Report View */}
            {step === 7 && renderReport()}

        </div>
    );
}
