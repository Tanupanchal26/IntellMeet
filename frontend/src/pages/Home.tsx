import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Video, Brain, CheckSquare, BarChart2, Shield,
  ArrowRight, Mic, Sparkles, Star, MessageSquare,
  ChevronRight, Check, Globe, Lock, Cpu, Users,
} from 'lucide-react';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';

/* ── data ─────────────────────────────────────────────────────────── */
const LOGOS = ['Stripe', 'Notion', 'Vercel', 'Linear', 'Figma', 'Loom', 'Intercom', 'Atlassian'];

const FEATURES = [
  { icon: Video,        label: 'HD Video Conferencing',    desc: 'WebRTC-powered multi-party video with adaptive bitrate, noise suppression, and <100ms latency.', color: 'text-indigo-400', bg: 'bg-indigo-500/7', border: 'border-indigo-500/14' },
  { icon: Brain,        label: 'AI Meeting Intelligence',  desc: 'Live transcription, GPT-4o summaries, action item extraction, and semantic search across your history.', color: 'text-violet-400', bg: 'bg-violet-500/7', border: 'border-violet-500/14' },
  { icon: CheckSquare,  label: 'AI-Generated Task Board',  desc: 'Kanban board with drag-and-drop. Tasks auto-extracted from meeting transcripts.', color: 'text-emerald-400', bg: 'bg-emerald-500/7', border: 'border-emerald-500/14' },
  { icon: MessageSquare,label: 'Team Channels',            desc: 'Slack-style channels with threads, reactions, file sharing, and pinned messages.', color: 'text-blue-400', bg: 'bg-blue-500/7', border: 'border-blue-500/14' },
  { icon: BarChart2,    label: 'Analytics & Insights',     desc: 'Meeting frequency, participation rates, AI usage metrics, and productivity trends.', color: 'text-amber-400', bg: 'bg-amber-500/7', border: 'border-amber-500/14' },
  { icon: Shield,       label: 'Enterprise Security',      desc: 'SOC 2 Type II, E2E encryption, SSO/SAML, audit logs, role-based access control.', color: 'text-red-400', bg: 'bg-red-500/7', border: 'border-red-500/14' },
];

const AI_FEATURES = [
  { icon: Mic,          label: 'Live Transcription',  desc: 'Real-time speech-to-text powered by Whisper' },
  { icon: Sparkles,     label: 'Smart Summaries',     desc: 'Concise structured summaries generated instantly' },
  { icon: CheckSquare,  label: 'Action Items',        desc: 'Auto-extracted tasks with assignees and due dates' },
  { icon: Brain,        label: 'AI Assistant',        desc: 'Ask anything about any meeting, ever' },
];

const TESTIMONIALS = [
  { quote: 'IntellMeet replaced our Zoom + Notion + Asana stack. The AI summaries alone save us 3 hours a week.', name: 'Sarah Chen', role: 'Head of Product, Acme Corp', initials: 'SC', stars: 5 },
  { quote: 'The quality of transcription and action item extraction is honestly better than anything I\'ve seen.', name: 'Marcus Rodriguez', role: 'Engineering Director, TechFlow', initials: 'MR', stars: 5 },
  { quote: 'Our team adopted it in 2 days. The meeting room UI feels as polished as Google Meet.', name: 'Priya Nair', role: 'VP Operations, ScaleUp Inc', initials: 'PN', stars: 5 },
];

const PLANS = [
  {
    name: 'Free', price: '$0', period: '/month',
    desc: 'For individuals and small teams.',
    features: ['5 meetings/month', '1 workspace', 'AI summaries (3/month)', '720p video', 'Basic chat'],
    cta: 'Get started', variant: 'secondary' as const,
  },
  {
    name: 'Pro', price: '$15', period: '/user/month',
    desc: 'For growing teams that need more.',
    features: ['Unlimited meetings', '5 workspaces', 'Unlimited AI', '1080p HD video', 'Advanced analytics', 'Priority support'],
    cta: 'Start free trial', variant: 'primary' as const, highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'For organisations at scale.',
    features: ['Everything in Pro', 'SSO / SAML', 'SOC 2 compliance', 'Dedicated SLA', 'Custom integrations', 'Audit logs'],
    cta: 'Contact sales', variant: 'secondary' as const,
  },
];

const STATS = [
  { value: '10K+', label: 'Teams' },
  { value: '2M+',  label: 'Meetings hosted' },
  { value: '99.9%',label: 'Uptime SLA' },
  { value: '4.9',  label: 'Star rating' },
];

const SECURITY = [
  { icon: Lock,        title: 'End-to-End Encryption',  desc: 'All video and data encrypted in transit and at rest using AES-256.' },
  { icon: Shield,      title: 'SOC 2 Type II',           desc: 'Independently audited security controls, available on Enterprise.' },
  { icon: Globe,       title: 'GDPR Compliant',          desc: 'Data residency in US, EU, and APAC. Full DPA available.' },
  { icon: Cpu,         title: 'SSO / SAML 2.0',          desc: 'Integrate with Okta, Azure AD, Google Workspace, and more.' },
  { icon: CheckSquare, title: 'Audit Logs',               desc: 'Complete activity trail for compliance reviews and investigations.' },
  { icon: Users,       title: 'RBAC',                    desc: 'Fine-grained role-based access control across workspaces.' },
];

/* ── animation helpers ─────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

/* ── component ─────────────────────────────────────────────────────── */
const Home = () => (
  <div className="min-h-screen bg-[#07070C] text-[#F1F5F9] overflow-x-hidden">

    {/* ════════════════════════════ NAV ════════════════════════════ */}
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.045)]" style={{ background: 'rgba(7,7,12,0.88)', backdropFilter: 'blur(20px) saturate(1.8)' }}>
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-6 h-[56px]">
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group" aria-label="IntellMeet home">
          <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_4px_12px_rgba(99,102,241,0.3)]">
            <Zap size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm tracking-tight">IntellMeet</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {[['Features', '#features'], ['Pricing', '#pricing'], ['Security', '#security'], ['Changelog', '#']].map(([label, href]) => (
            <a key={label} href={href} className="px-3 py-1.5 text-[0.8125rem] text-[#64748B] hover:text-[#CBD5E1] rounded-lg hover:bg-white/[0.04] transition-all font-medium">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#CBD5E1]">Sign in</Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button size="sm" rightIcon={<ChevronRight size={12} />}>Get started</Button>
          </Link>
        </div>
      </div>
    </header>

    {/* ════════════════════════════ HERO ════════════════════════════ */}
    <section className="relative overflow-hidden pt-24 pb-20 px-6">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full opacity-[0.035]" style={{ background: 'radial-gradient(ellipse, #6366F1 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full opacity-[0.025]" style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-[0.025]" style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, transparent 70%)' }} />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: 'radial-gradient(circle, #6366F1 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div className="flex flex-col gap-6" {...fadeUp(0)}>
            {/* Pill badge */}
            <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/18 bg-indigo-500/6 text-indigo-300 text-[0.6875rem] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-dot" aria-hidden="true" />
              AI-Powered Enterprise Collaboration
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-[10px] font-bold tracking-wide">NEW</span>
            </div>

            {/* Headline */}
            <h1 className="text-display text-[#F1F5F9]">
              The meeting platform<br />
              that{' '}
              <span className="gradient-text-animated">thinks with you</span>
            </h1>

            {/* Subhead */}
            <p className="text-[#64748B] text-[1rem] leading-[1.7] max-w-md">
              HD video, live AI transcription, smart summaries, action item extraction, and team channels — unified in one enterprise workspace.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" rightIcon={<ArrowRight size={14} />}>
                  Start free — no card needed
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" size="lg" className="text-[#64748B]">
                  See how it works
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2" aria-label="Trusted by 10,000+ teams">
                {['SC', 'MR', 'PN', 'JL', 'AK'].map((init, i) => (
                  <div
                    key={init}
                    className="w-7 h-7 rounded-full border-2 border-[#07070C] flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ background: `linear-gradient(135deg, hsl(${220 + i * 30},70%,55%), hsl(${250 + i * 20},65%,50%))`, zIndex: 5 - i }}
                    aria-hidden="true"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#3F4D5C]">
                <div className="flex gap-0.5" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <span><span className="text-[#CBD5E1] font-semibold">4.9</span> · Trusted by 10,000+ teams</span>
              </div>
            </div>
          </motion.div>

          {/* Right — product preview */}
          <motion.div className="relative" {...fadeUp(0.12)}>
            {/* Browser frame */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.85),0_0_0_1px_rgba(99,102,241,0.06)]">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0B0B12] border-b border-[rgba(255,255,255,0.05)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/55" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/55" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/55" />
                <div className="flex-1 mx-4 h-5 rounded-md bg-white/[0.025] flex items-center justify-center">
                  <span className="text-[9px] text-[#2D3A4A] font-mono">app.intellmeet.io/room/q4-review</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/22 bg-emerald-500/7 text-emerald-400 text-[9px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  LIVE
                </div>
              </div>

              {/* Video grid */}
              <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-[#050810]">
                {[
                  { name: 'Sarah K.',   active: true,  init: 'S', from: '#6366F1', to: '#7C3AED' },
                  { name: 'Marcus R.',  active: false, init: 'M', from: '#10B981', to: '#059669' },
                  { name: 'Priya N.',   active: false, init: 'P', from: '#F59E0B', to: '#D97706' },
                  { name: 'You',        active: false, init: 'Y', from: '#EF4444', to: '#DC2626' },
                ].map(({ name, active, init, from, to }) => (
                  <div
                    key={name}
                    className={`aspect-video rounded-xl relative overflow-hidden flex items-center justify-center border transition-all ${
                      active
                        ? 'border-indigo-500/55 shadow-[0_0_0_2px_rgba(99,102,241,0.22)]'
                        : 'border-white/[0.04]'
                    }`}
                    style={{ background: '#07101C' }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                      {init}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[9px] text-white/60 bg-black/50 rounded px-1.5 py-0.5">{name}</span>
                      {active && (
                        <div className="flex items-center gap-1 bg-black/55 rounded px-1.5 py-0.5">
                          <Mic size={7} className="text-emerald-400" />
                          <span className="text-[8px] text-emerald-400 font-medium">Speaking</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI ticker */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-t border-[rgba(255,255,255,0.04)] bg-[#0B0B12]">
                <div className="w-5 h-5 rounded-lg bg-violet-500/12 flex items-center justify-center shrink-0">
                  <Sparkles size={10} className="text-violet-400" />
                </div>
                <span className="text-[10px] text-[#475569] flex-1 truncate">
                  Approved Q4 roadmap · 3 action items extracted · Sprint by Monday
                </span>
                <span className="text-[9px] text-[#2D3A4A] shrink-0">just now</span>
              </div>
            </div>

            {/* Floating AI summary card */}
            <motion.div
              className="absolute -bottom-4 -left-5 hidden xl:block w-52 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0F0F18] shadow-2xl p-3.5"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Brain size={10} className="text-violet-400" />
                </div>
                <span className="text-[10px] font-semibold text-[#CBD5E1]">AI Summary</span>
                <span className="ml-auto text-[9px] text-emerald-400 font-semibold">Done</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {['Roadmap approved', 'Sprint dates confirmed', 'Alex owns infra rollout'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[9px] text-[#475569]">
                    <Check size={8} className="text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating participants count */}
            <motion.div
              className="absolute -top-3 -right-3 hidden xl:flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0F0F18] shadow-xl px-3 py-2"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex -space-x-1.5">
                {['S', 'M', 'P', 'Y'].map((l, i) => (
                  <div key={l} className="w-5 h-5 rounded-full bg-indigo-500 border border-[#07070C] flex items-center justify-center text-white text-[8px] font-bold" style={{ zIndex: 4 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-[#64748B] font-medium">4 participants</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════ LOGO MARQUEE ════════════════════════════ */}
    <section className="py-10 border-y border-[rgba(255,255,255,0.04)] overflow-hidden relative" aria-label="Trusted by teams at">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #07070C, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #07070C, transparent)' }} />
      <p className="text-center text-[0.625rem] text-[#2D3A4A] uppercase tracking-[0.15em] font-semibold mb-5">
        Trusted by teams at
      </p>
      <div className="flex animate-marquee whitespace-nowrap gap-16" aria-hidden="true">
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span key={i} className="text-[#2D3A4A] text-sm font-semibold tracking-tight shrink-0 hover:text-[#3F4D5C] transition-colors">
            {name}
          </span>
        ))}
      </div>
    </section>

    {/* ════════════════════════════ STATS ════════════════════════════ */}
    <section className="py-16 px-6" aria-label="Platform statistics">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.04)] rounded-2xl overflow-hidden">
          {STATS.map(({ value, label }, i) => (
            <motion.div key={label} className="flex flex-col items-center gap-1 py-8 px-6 bg-[#07070C] text-center" {...fadeUp(i * 0.06)}>
              <p className="text-[1.875rem] font-bold text-[#F1F5F9] tracking-tight leading-none">{value}</p>
              <p className="text-xs text-[#3F4D5C] font-medium mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════ FEATURES ════════════════════════════ */}
    <section id="features" className="py-20 px-6">
      <div className="max-w-[1120px] mx-auto">
        <motion.div className="mb-14" {...fadeUp()}>
          <span className="text-label block mb-3">Platform</span>
          <h2 className="text-h2 text-[#F1F5F9] max-w-lg">
            Everything your team needs to collaborate
          </h2>
          <p className="text-[#64748B] mt-3 max-w-md text-[0.9375rem] leading-relaxed">
            One workspace to run meetings, capture every insight, and ship faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 stagger">
          {FEATURES.map(({ icon: Icon, label, desc, color, bg, border }) => (
            <motion.div
              key={label}
              className={`group rounded-2xl border ${border} ${bg} p-5 hover:border-opacity-50 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in cursor-default`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                <Icon size={16} className={color} />
              </div>
              <h3 className="text-[0.875rem] font-semibold text-[#F1F5F9] mb-1.5 tracking-tight">{label}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════ AI SECTION ════════════════════════════ */}
    <section className="py-20 px-6 relative overflow-hidden border-t border-[rgba(255,255,255,0.035)]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <span className="text-label block mb-3">AI Intelligence</span>
            <h2 className="text-h2 text-[#F1F5F9] mb-4">
              Your meetings,<br />
              <span className="gradient-text">intelligently captured</span>
            </h2>
            <p className="text-[#64748B] text-[0.9375rem] leading-relaxed mb-8 max-w-sm">
              IntellMeet listens, understands, and synthesises every meeting in real time. Never lose a decision, action item, or insight again.
            </p>
            <div className="flex flex-col gap-3.5">
              {AI_FEATURES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/8 border border-violet-500/14 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#CBD5E1]">{label}</p>
                    <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Panel preview */}
          <motion.div {...fadeUp(0.1)}>
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0F0F18] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.75)]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[#0B0B12]">
                <div className="w-5 h-5 rounded-lg bg-violet-500/12 flex items-center justify-center">
                  <Brain size={10} className="text-violet-400" />
                </div>
                <span className="text-xs font-semibold text-[#CBD5E1]">AI Assistant</span>
                <span className="ml-auto badge-ai px-2 py-0.5 rounded-full text-[10px] font-semibold">GPT-4o</span>
              </div>

              <div className="p-4 flex flex-col gap-3.5 min-h-[260px]">
                <div className="rounded-xl bg-[rgba(124,58,237,0.055)] border border-violet-500/10 p-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={10} className="text-violet-400" />
                    <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wide">Summary</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    The team reviewed Q4 roadmap and approved the new onboarding flow. Three blockers identified around infrastructure capacity.
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-[#2D3A4A] uppercase tracking-[0.1em] mb-2">Action Items</p>
                  {[
                    { text: 'Scale infra for launch',  owner: 'Alex',   priority: 'high' },
                    { text: 'Finalise onboarding copy', owner: 'Sarah',  priority: 'medium' },
                    { text: 'Send Figma file to team',  owner: 'Marcus', priority: 'low' },
                  ].map(({ text, owner, priority }) => (
                    <div key={text} className="flex items-center gap-2 py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${priority === 'high' ? 'bg-red-400' : priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span className="text-xs text-[#94A3B8] flex-1 truncate">{text}</span>
                      <span className="text-[9px] text-[#3F4D5C] font-medium">{owner}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 rounded-xl bg-white/[0.025] border border-[rgba(255,255,255,0.055)] px-3 py-2.5">
                  <span className="text-xs text-[#2D3A4A] flex-1">Ask AI about this meeting…</span>
                  <ArrowRight size={12} className="text-[#3F4D5C]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ════════════════════════════ SECURITY ════════════════════════════ */}
    <section id="security" className="py-20 px-6 border-t border-[rgba(255,255,255,0.035)]">
      <div className="max-w-[1120px] mx-auto">
        <motion.div className="text-center mb-12" {...fadeUp()}>
          <span className="text-label block mb-3">Security & Compliance</span>
          <h2 className="text-h2 text-[#F1F5F9]">Enterprise-grade security, built in</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 stagger">
          {SECURITY.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className="rounded-2xl bg-[rgba(255,255,255,0.018)] border border-[rgba(255,255,255,0.06)] p-4.5 flex items-start gap-3.5 animate-fade-in hover:border-[rgba(255,255,255,0.1)] transition-colors group"
              style={{ padding: '18px' }}
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/7 border border-indigo-500/12 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#CBD5E1] mb-1 tracking-tight">{title}</p>
                <p className="text-xs text-[#475569] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
    <section className="py-20 px-6 border-t border-[rgba(255,255,255,0.035)]">
      <div className="max-w-[1120px] mx-auto">
        <motion.div className="text-center mb-12" {...fadeUp()}>
          <span className="text-label block mb-3">Testimonials</span>
          <h2 className="text-h2 text-[#F1F5F9]">Loved by modern teams</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
          {TESTIMONIALS.map(({ quote, name, role, initials, stars }) => (
            <motion.div
              key={name}
              className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0F0F18] p-5 flex flex-col gap-4 animate-fade-in hover:border-[rgba(255,255,255,0.1)] transition-colors"
            >
              <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed flex-1">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#CBD5E1]">{name}</p>
                  <p className="text-[10px] text-[#3F4D5C]">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════ PRICING ════════════════════════════ */}
    <section id="pricing" className="py-20 px-6 border-t border-[rgba(255,255,255,0.035)]">
      <div className="max-w-[1120px] mx-auto">
        <motion.div className="text-center mb-12" {...fadeUp()}>
          <span className="text-label block mb-3">Pricing</span>
          <h2 className="text-h2 text-[#F1F5F9]">Simple, transparent pricing</h2>
          <p className="text-[#64748B] text-sm mt-2">Start free. Upgrade when your team is ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto stagger">
          {PLANS.map(({ name, price, period, desc, features, cta, variant, highlight }) => (
            <motion.div
              key={name}
              className={`rounded-2xl border p-6 flex flex-col gap-5 transition-all animate-fade-in ${
                highlight
                  ? 'border-indigo-500/35 bg-[rgba(99,102,241,0.04)] shadow-[0_0_50px_rgba(99,102,241,0.1)]'
                  : 'border-[rgba(255,255,255,0.06)] bg-[#0F0F18]'
              }`}
            >
              {highlight && (
                <span className="self-start text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/18 px-2 py-0.5 rounded-full">
                  Most popular
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-[#F1F5F9]">{name}</p>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-2xl font-bold text-[#F1F5F9] tracking-tight">{price}</span>
                  {period && <span className="text-xs text-[#3F4D5C]">{period}</span>}
                </div>
                <p className="text-xs text-[#3F4D5C] mt-1 leading-relaxed">{desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <Check size={12} className="text-emerald-400 shrink-0" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
              <Link to={ROUTES.REGISTER} className="mt-auto">
                <Button variant={variant} size="md" className="w-full">{cta}</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════ CTA STRIP ════════════════════════════ */}
    <section className="py-20 px-6 relative overflow-hidden border-t border-[rgba(255,255,255,0.035)]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-xl mx-auto text-center relative">
        <motion.div {...fadeUp()}>
          <h2 className="text-h2 text-[#F1F5F9] mb-3">Start running smarter meetings</h2>
          <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
            Join 10,000+ teams already using IntellMeet to save hours every week.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" rightIcon={<ArrowRight size={14} />}>Get started for free</Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="lg" className="text-[#64748B]">Sign in →</Button>
            </Link>
          </div>
          <p className="text-xs text-[#2D3A4A] mt-4">No credit card · Free forever plan · Cancel anytime</p>
        </motion.div>
      </div>
    </section>

    {/* ════════════════════════════ FOOTER ════════════════════════════ */}
    <footer className="border-t border-[rgba(255,255,255,0.035)] py-12 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Zap size={12} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm text-[#F1F5F9]">IntellMeet</span>
            </div>
            <p className="text-xs text-[#2D3A4A] leading-relaxed">
              AI-powered meeting collaboration for modern enterprise teams.
            </p>
          </div>
          {[
            { label: 'Product',  links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
            { label: 'Company',  links: ['About', 'Blog', 'Careers', 'Press'] },
            { label: 'Legal',    links: ['Privacy', 'Terms', 'Security', 'Status'] },
          ].map(({ label, links }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold text-[#2D3A4A] uppercase tracking-[0.1em] mb-3">{label}</p>
              <div className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <a key={l} href="#" className="text-xs text-[#3F4D5C] hover:text-[#94A3B8] transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[rgba(255,255,255,0.035)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#2D3A4A]">© 2025 IntellMeet Inc. All rights reserved.</p>
          <p className="text-[10px] text-[#2D3A4A]">Built for the next generation of remote work.</p>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
