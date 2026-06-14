import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Video, Brain, CheckSquare, BarChart2, Shield,
  ArrowRight, Mic, Sparkles, Star, MessageSquare, Check,
  Lock, Globe, Cpu, Users, TrendingUp, Clock, Play,
  ChevronRight, Layers, Monitor, Phone, Maximize,
  MoreHorizontal, Settings, Share2, Hand, Layout,
  Smile, FileText, Search, Database, Command, ExternalLink
} from 'lucide-react';
import { ROUTES, STORAGE_KEYS } from '../constants';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import { clearAuth } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

/* ── Layout & Visual ── */
const GRID_CONTAINER = "max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20";
const SECTION_SPACING = "py-24 md:py-32 lg:py-44";
const BORDER_LIGHT = "border-white/[0.06]";
const SURFACE_DARK = "bg-[#0A0A0C]";

const LOGOS = [
  'Stripe', 'Linear', 'Vercel', 'Notion', 'Slack', 'Zoom',
  'Apple', 'NVIDIA', 'Google', 'Github', 'Adobe', 'Figma'
];

/* ── Brand Colors ── */
const PRIMARY = "#6366F1";
const ACCENT = "#A78BFA";

/* ── Animation Variants ── */
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
});

/* ── UI Components ── */
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[11px] font-bold tracking-[0.05em] uppercase text-indigo-400 ${className}`}>
    <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
    {children}
  </div>
);

const Heading = ({ children, level = 2, className = "" }: { children: React.ReactNode, level?: 1 | 2 | 3, className?: string }) => {
  const Tag = `h${level}` as any;
  const sizes = {
    1: "text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]",
    2: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
    3: "text-2xl md:text-3xl font-bold tracking-tight"
  };
  return <Tag className={`${sizes[level]} text-white ${className}`}>{children}</Tag>;
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    // 1. Clear Redux State
    dispatch(clearAuth());
    // 2. Clear Persistence
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem('im_user');
    sessionStorage.clear();
    // 3. Notify User
    toast.success('Successfully logged out');
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Zap size={18} className="text-white fill-current" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase">IntellMeet</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          {['Features', 'Intelligence', 'Security'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[12px] font-bold text-white/40 hover:text-white transition-colors tracking-widest uppercase">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to={ROUTES.DASHBOARD} className="hidden sm:block text-[13px] font-bold text-white/70 hover:text-white uppercase tracking-widest">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-full border border-white/10 text-white/70 text-[13px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="hidden sm:block text-[13px] font-bold text-white/70 hover:text-white uppercase tracking-widest">Login</Link>
              <Link to={ROUTES.SIGNUP} className="px-6 py-2.5 rounded-full bg-white text-black text-[13px] font-black uppercase tracking-widest hover:bg-white/90 transition-all">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

/* ── Product Preview Component (The Stage) ── */
const MeetingRoomMockup = () => (
  <div className="relative w-full aspect-[16/10] bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
    {/* Video Grid */}
    <div className="grid grid-cols-2 gap-3 p-4 h-[85%]">
      {[
        { name: "Sarah Mitchell", speaking: true, color: "bg-indigo-500" },
        { name: "James Wilson", speaking: false, color: "bg-rose-500" },
        { name: "Priya Rao", speaking: false, color: "bg-emerald-500" },
        { name: "Alex Chen", speaking: false, color: "bg-amber-500" }
      ].map((p, i) => (
        <div key={i} className={`relative rounded-2xl overflow-hidden ${p.speaking ? 'ring-2 ring-indigo-500' : 'border border-white/5'} bg-zinc-900`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className={`w-24 h-24 rounded-full ${p.color} blur-3xl`} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full ${p.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
              {p.name.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{p.name}</span>
            {p.speaking && <div className="flex gap-0.5"><div className="w-0.5 h-3 bg-indigo-500 animate-bounce" /><div className="w-0.5 h-3 bg-indigo-500 animate-bounce delay-75" /><div className="w-0.5 h-3 bg-indigo-500 animate-bounce delay-150" /></div>}
          </div>
        </div>
      ))}
    </div>

    {/* AI Floating Card */}
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute top-8 right-8 w-64 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <Sparkles size={16} className="text-indigo-400" />
        </div>
        <span className="text-[11px] font-black text-white uppercase tracking-widest">Live Analysis</span>
      </div>
      <div className="space-y-3">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-indigo-500" />
        </div>
        <p className="text-[10px] text-white/50 leading-relaxed">AI detecting key decision: <span className="text-white">Q3 Roadmap Approval</span></p>
        <div className="flex flex-col gap-1.5">
          {['Summarizing points...', 'Detecting sentiment: Positive', '3 action items extracted'].map(text => (
            <div key={text} className="flex items-center gap-2">
              <Check size={10} className="text-indigo-400" />
              <span className="text-[9px] text-white/70 font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Controls Bar */}
    <div className="absolute bottom-0 inset-x-0 h-[15%] bg-black/80 backdrop-blur-md border-t border-white/5 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-lg bg-white/5 text-[11px] font-bold text-white tracking-widest">00:42:15</div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-1 text-rose-500 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">Recording</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {[Mic, Video, Share2, Smile, Settings].map((Icon, i) => (
          <button key={i} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Icon size={18} className="text-white" />
          </button>
        ))}
        <button className="px-5 h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-[11px] font-black text-white uppercase tracking-widest transition-colors">Leave</button>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center"><Brain size={18} className="text-white" /></button>
        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Users size={18} className="text-white" /></button>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const stats = useMemo(() => [
    { label: "Active Users", value: "250K+" },
    { label: "AI Insights", value: "10M+" },
    { label: "Trust Score", value: "4.9/5" }
  ], []);

  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Atmospheric Background Components */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12)_0,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className={GRID_CONTAINER}>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Content Left */}
          <motion.div {...fadeInUp()} className="flex-1 text-center lg:text-left">
            <Badge className="mb-8">Next-Gen Enterprise Video</Badge>
            <Heading level={1} className="mb-8">
              Where meetings <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-400">become intelligence.</span>
            </Heading>
            <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-12">
              HD conferencing meets contextual AI. IntellMeet automates your workflow by transcribing, summarizing, and assigning tasks in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link to={ROUTES.SIGNUP} className="w-full sm:w-auto px-10 py-5 rounded-full bg-indigo-600 text-white font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/40 hover:scale-[1.02] transition-all">Start Free Trial</Link>
              <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Play size={16} className="fill-current" />
                Watch Demo
              </button>
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-3 gap-8">
               {stats.map(s => (
                 <div key={s.label}>
                    <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">{s.label}</div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Product Right */}
          <motion.div {...fadeInUp(0.2)} className="flex-[1.1] w-full relative lg:mt-0 mt-12">
             <div className="absolute -inset-4 bg-indigo-500/20 blur-[100px] rounded-full opacity-30" />
             <MeetingRoomMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const features = useMemo(() => [
    {
      icon: Video,
      title: "Built for Massively Parallel Syncs",
      desc: "WebRTC architecture supporting 10k+ participants with sub-100ms latency globally.",
      size: "lg"
    },
    {
      icon: Brain,
      title: "Contextual Awareness",
      desc: "Proprietary AI that understands team sentiment and cross-project technical context.",
      size: "md"
    },
    {
      icon: CheckSquare,
      title: "Auto-Assigned Tasks",
      desc: "Tasks extracted from speech and synced directly to Jira, Linear, or Asana.",
      size: "md"
    },
    {
      icon: MessageSquare,
      title: "Slack-Native Channels",
      desc: "Async team communication built into the conferencing layer. Persistent threads.",
      size: "md"
    },
    {
      icon: Shield,
      title: "Sovereign Encryption",
      desc: "End-to-end AES-256 encryption with on-premise key management options.",
      size: "md"
    }
  ], []);

  return (
    <section id="features" className={SECTION_SPACING}>
      <div className={GRID_CONTAINER}>
        <motion.div {...fadeInUp()} className="text-center mb-24">
          <Badge className="mb-6">Enterprise Platform</Badge>
          <Heading className="mb-6">Built for high-velocity teams.</Heading>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">One unified workspace for the entire lifecycle of a meeting—from agenda to execution.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp(i * 0.1)} 
              className={`${f.size === 'lg' ? 'md:col-span-4' : 'md:col-span-2'} relative group p-10 rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.05] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                <f.icon size={120} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-colors">
                  <f.icon size={24} className="text-white" />
                </div>
                <div>
                  <Heading level={3} className="mb-4">{f.title}</Heading>
                  <p className="text-white/50 leading-relaxed text-lg">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIIntelligenceSection = () => (
  <section id="intelligence" className={`relative ${SECTION_SPACING} bg-[#08080A]`}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full" />
    </div>
    
    <div className={GRID_CONTAINER}>
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        <motion.div {...fadeInUp()} className="flex-1 text-center lg:text-left">
          <Badge className="mb-6">AI Intelligence</Badge>
          <Heading className="mb-8">Meetings that <br /> document themselves.</Heading>
          <div className="space-y-10">
            {[
              { icon: Mic, title: "Neural Transcription", desc: "99% accurate speech-to-text with multi-speaker diarization." },
              { icon: Sparkles, title: "Abstractive Summarization", desc: "Interprets context to generate a narrative instead of just a bulleted list." },
              { icon: Layout, title: "Instant Board Sync", desc: "Action items are instantly synced with your preferred task management tool." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 text-left">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <item.icon size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInUp(0.2)} className="flex-1 w-full max-w-2xl">
          <div className="relative p-1 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-[2.5rem]">
            <div className="bg-[#0A0A0C] rounded-[2.4rem] p-8 lg:p-12 border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-3">
                         <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30"><Sparkles size={20} className="text-white" /></div>
                         <div>
                            <div className="text-sm font-black text-white uppercase tracking-widest">AI Recap Engine</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest">Processing complete</div>
                         </div>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">v4.0 (Latest)</div>
                   </div>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">The Narrative</div>
                  <p className="text-white/70 leading-relaxed italic">"The team converged on a modular strategy for the Q4 rollout. Alex noted the infra limit but Marcus committed to a 20% scale-up by Friday. Onboarding redesign was greenlit."</p>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Actionable Items</div>
                  {[
                    { task: "Update infra scaling group", owner: "Alex", priority: "High" },
                    { task: "Ship onboarding V2 to staging", owner: "Sarah", priority: "High" },
                    { task: "Review legal compliance for CCPA", owner: "Legal", priority: "Med" }
                  ].map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${t.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        <span className="text-[13px] font-medium text-white">{t.task}</span>
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">@{t.owner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
       </div>
    </div>
  </section>
);

const SecuritySection = () => (
  <section id="security" className={SECTION_SPACING}>
    <div className={GRID_CONTAINER}>
       <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <motion.div {...fadeInUp()} className="relative z-10 max-w-4xl">
             <Badge className="mb-8 border-white/30 bg-white/10 text-white">Security First</Badge>
             <Heading className="mb-10 !text-white">Your data is yours. <br /> Period.</Heading>
             <p className="text-xl text-indigo-100/80 mb-16 leading-relaxed">
               IntellMeet is built on a foundation of zero-trust architecture. We employ end-to-end encryption for all sessions, multi-region data residency, and full SOC 2 Type II compliance.
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Lock, title: "E2E Encryption", desc: "AES-256 Bit" },
                  { icon: Shield, title: "Compliance", desc: "SOC2 Type II" },
                  { icon: Globe, title: "Data Residency", desc: "EU / US / APAC" },
                  { icon: Settings, title: "IAM Controls", desc: "SSO / SAML" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4"><item.icon size={24} className="text-white" /></div>
                    <div className="text-sm font-black text-white uppercase tracking-widest mb-1">{item.title}</div>
                    <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{item.desc}</div>
                  </div>
                ))}
             </div>
          </motion.div>
       </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className={SECTION_SPACING}>
    <div className={GRID_CONTAINER}>
       <motion.div {...fadeInUp()} className="text-center mb-24">
          <Badge className="mb-6">Testimonials</Badge>
          <Heading>Trusted by the industry's finest.</Heading>
       </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alex Rivera", role: "CTO", company: "TechFlow", text: "The AI summaries alone save our engineering leads 5+ hours of documentation every week. It's transformed how we sync.", avatar: "AR", color: "from-indigo-500 to-indigo-700" },
            { name: "Sarah Chen", role: "Product VP", company: "Nexus", text: "Finally, a video tool that doesn't just host meetings but actively helps us ship work. The Jira integration is flawless.", avatar: "SC", color: "from-rose-500 to-rose-700" },
            { name: "Marcus Thorne", role: "Head of Ops", company: "ScaleUp", text: "Enterprise security that doesn't slow us down. The SSO integration took 10 minutes, and the E2E encryption is a must-have.", avatar: "MT", color: "from-emerald-500 to-emerald-700" }
          ].map((t, i) => (
            <motion.div key={i} {...fadeInUp(i * 0.1)} className="p-10 rounded-[2.5rem] bg-[#0A0A0C] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
               <p className="text-xl text-white/70 leading-relaxed mb-12">"{t.text}"</p>
               <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white`}>{t.avatar}</div>
                  <div>
                     <div className="text-sm font-black text-white uppercase tracking-widest">{t.name}</div>
                     <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{t.role} · {t.company}</div>
                  </div>
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-32 pb-16 border-t border-white/5">
    <div className={GRID_CONTAINER}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2">
             <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                   <Zap size={20} className="text-white fill-current" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">INTELLMEET</span>
             </Link>
             <p className="text-white/40 text-lg leading-relaxed max-w-xs mb-10">Intelligence layer for the modern enterprise conferencing. Built on WebRTC v4.</p>
             <div className="flex gap-3">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" />)}
             </div>
          </div>
          <div>
             <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">Product</div>
             <ul className="space-y-4">
                {['Features', 'AI Core', 'Security', 'Integrations'].map(l => <li key={l}><a href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">{l}</a></li>)}
             </ul>
          </div>
          <div>
             <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">Company</div>
             <ul className="space-y-4">
                {['About', 'Careers', 'Blog', 'Press'].map(l => <li key={l}><a href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">{l}</a></li>)}
             </ul>
          </div>
          <div>
             <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">Legal</div>
             <ul className="space-y-4">
                {['Privacy', 'Terms', 'Security', 'CCPA'].map(l => <li key={l}><a href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">{l}</a></li>)}
             </ul>
          </div>
       </div>
       <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
          <div className="text-[11px] font-bold text-white/20 uppercase tracking-widest">© 2025 IntellMeet Inc. All Rights Reserved.</div>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
             <div className="flex items-center gap-2 text-indigo-400">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">System Operational</span>
             </div>
             <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">SOC 2 Type II Compliant</div>
          </div>
       </div>
    </div>
  </footer>
);

const Home = () => (
  <div className="bg-black text-white selection:bg-indigo-500 selection:text-white font-sans antialiased">
    <Navbar />
    <main>
      <Hero />
      <section className="py-24 border-y border-white/5 overflow-hidden whitespace-nowrap bg-white/[0.02]">
        <div className="flex items-center gap-20 animate-marquee">
          {LOGOS.map(logo => (
            <span key={logo} className="text-2xl md:text-3xl font-black text-white/10 uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}
          {LOGOS.map(logo => (
            <span key={`${logo}-duplicate`} className="text-2xl md:text-3xl font-black text-white/10 uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}
        </div>
      </section>
      <FeaturesGrid />
      <AIIntelligenceSection />
      <SecuritySection />
      <Testimonials />
    </main>
    <Footer />
       
       {/* Global Marquee CSS */}
       <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 40s linear infinite;
          }
       `}</style>
  </div>
);

export default Home;
