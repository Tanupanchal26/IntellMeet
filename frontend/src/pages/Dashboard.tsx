import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, CheckSquare, Brain, Users, ArrowRight,
  Plus, Clock, Calendar, BarChart2, ChevronRight,
  Sparkles, Bell, TrendingUp, TrendingDown,
} from 'lucide-react';
import { useAppSelector } from '../hooks/useAppDispatch';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { ROUTES, MEETING_ROUTE } from '../utils/constants';

/* ── helpers ── */
const timeAgo = (iso: string) => {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

/* ── static data ── */
const METRICS = [
  { label: 'Meetings this month', value: '28', delta: '+4', trend: 'up',   icon: Video,       color: 'text-indigo-400',  bg: 'bg-indigo-500/7',  border: 'border-indigo-500/12' },
  { label: 'Hours saved by AI',   value: '14h', delta: '+2h', trend: 'up', icon: Brain,       color: 'text-violet-400',  bg: 'bg-violet-500/7',  border: 'border-violet-500/12' },
  { label: 'Tasks completed',     value: '47', delta: '+8',   trend: 'up', icon: CheckSquare, color: 'text-emerald-400', bg: 'bg-emerald-500/7', border: 'border-emerald-500/12' },
  { label: 'Team members online', value: '12', delta: 'Live', trend: 'live',icon: Users,      color: 'text-blue-400',    bg: 'bg-blue-500/7',    border: 'border-blue-500/12' },
];

const MEETINGS = [
  { _id: 'm1', title: 'Q4 Product Roadmap Review',  isActive: true,  participants: 8, startedAt: new Date().toISOString() },
  { _id: 'm2', title: 'Sprint Planning — Week 43',   isActive: false, participants: 5, startedAt: new Date(Date.now()-3600000).toISOString() },
  { _id: 'm3', title: 'Design System Sync',          isActive: false, participants: 3, startedAt: new Date(Date.now()-86400000).toISOString() },
  { _id: 'm4', title: 'Infra Capacity Planning',     isActive: false, participants: 4, startedAt: new Date(Date.now()-172800000).toISOString() },
];

const UPCOMING = [
  { title: 'AI Feature Demo',       time: 'Today, 2:00 PM',    attendees: 6,  accent: 'bg-indigo-500/40' },
  { title: 'Quarterly OKR Review',  time: 'Tomorrow, 10:00 AM', attendees: 12, accent: 'bg-violet-500/40' },
  { title: 'Engineering All-Hands', time: 'Thu, 3:00 PM',      attendees: 28, accent: 'bg-blue-500/40' },
];

const TASKS = [
  { title: 'Scale infra for launch',    priority: 'high',   done: false },
  { title: 'Finalise onboarding copy',  priority: 'medium', done: false },
  { title: 'Send Figma file to team',   priority: 'low',    done: true  },
  { title: 'Review PR #47',            priority: 'high',   done: false },
];

const ACTIVITY = [
  { icon: Brain,       text: 'AI summary generated for Q4 Review',  time: '5m ago',  color: 'text-violet-400', bg: 'bg-violet-500/8' },
  { icon: CheckSquare, text: 'Task "Scale infra" assigned to Alex',  time: '12m ago', color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
  { icon: Users,       text: 'Sarah K. joined Engineering team',     time: '1h ago',  color: 'text-blue-400', bg: 'bg-blue-500/8' },
  { icon: Video,       text: 'Meeting "Design Sync" ended',          time: '2h ago',  color: 'text-indigo-400', bg: 'bg-indigo-500/8' },
  { icon: Bell,        text: '3 new mentions in #engineering',       time: '3h ago',  color: 'text-amber-400', bg: 'bg-amber-500/8' },
];

const QUICK_ACTIONS = [
  { label: 'New Meeting',  icon: Video,       to: ROUTES.LOBBY,      color: 'text-indigo-400',  bg: 'bg-indigo-500/7',  border: 'border-indigo-500/12' },
  { label: 'Create Task',  icon: CheckSquare, to: ROUTES.TASKS,      color: 'text-emerald-400', bg: 'bg-emerald-500/7', border: 'border-emerald-500/12' },
  { label: 'AI Summary',   icon: Brain,       to: ROUTES.AI_SUMMARY, color: 'text-violet-400',  bg: 'bg-violet-500/7',  border: 'border-violet-500/12' },
  { label: 'Analytics',    icon: BarChart2,   to: ROUTES.ANALYTICS,  color: 'text-amber-400',   bg: 'bg-amber-500/7',   border: 'border-amber-500/12' },
];

const PRIORITY_COLOR: Record<string, string> = {
  high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-emerald-400',
};

/* ── component ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1], delay },
});

const Dashboard = () => {
  const navigate  = useNavigate();
  const authUser  = useAppSelector((s) => s.auth.user);

  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = authUser?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="flex flex-col gap-5 max-w-[1200px]">

      {/* ── Header ── */}
      <motion.div className="flex items-start justify-between gap-4 flex-wrap" {...fadeUp(0)}>
        <div>
          <p className="text-xs text-[#3F4D5C] font-medium mb-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-h3 text-[#F1F5F9]">
            {greeting}, <span className="text-[#CBD5E1]">{firstName}</span> 👋
          </h1>
        </div>
        <Button
          size="md"
          leftIcon={<Plus size={13} />}
          onClick={() => navigate(ROUTES.LOBBY)}
          aria-label="Start a new meeting"
        >
          New Meeting
        </Button>
      </motion.div>

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {METRICS.map(({ label, value, delta, trend, icon: Icon, color, bg, border }, i) => (
          <motion.div key={label} {...fadeUp(i * 0.05)}>
            <Card
              variant="default"
              noPadding
              padding="p-4"
              className={`border ${border} ${bg}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
                  <Icon size={14} className={color} aria-hidden="true" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-1.5 py-0.5 ${
                  trend === 'up'   ? 'text-emerald-400 bg-emerald-500/8' :
                  trend === 'down' ? 'text-red-400 bg-red-500/8' :
                  'text-[#64748B] bg-white/[0.04]'
                }`}>
                  {trend === 'up' && <TrendingUp size={9} aria-hidden="true" />}
                  {trend === 'down' && <TrendingDown size={9} aria-hidden="true" />}
                  {delta}
                </div>
              </div>
              <p className="text-[1.625rem] font-bold text-[#F1F5F9] tracking-tight leading-none">{value}</p>
              <p className="text-xs text-[#3F4D5C] mt-1 leading-snug">{label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left — meetings + upcoming */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Recent meetings */}
          <motion.div {...fadeUp(0.1)}>
            <Card noPadding>
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-[#3F4D5C]" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-[#CBD5E1] tracking-tight">Recent Meetings</h2>
                </div>
                <Link
                  to={ROUTES.LOBBY}
                  className="flex items-center gap-1 text-xs text-[#3F4D5C] hover:text-indigo-400 transition-colors font-medium"
                >
                  View all <ChevronRight size={12} aria-hidden="true" />
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.04)]">
                {MEETINGS.map((m, i) => (
                  <button
                    key={m._id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group text-left w-full"
                    style={{ animationDelay: `${i * 50}ms` }}
                    onClick={() => navigate(MEETING_ROUTE(m._id))}
                    aria-label={`Open meeting: ${m.title}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.isActive ? 'bg-emerald-500/10' : 'bg-white/[0.035]'}`}>
                      <Video size={13} className={m.isActive ? 'text-emerald-400' : 'text-[#3F4D5C]'} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#CBD5E1] truncate group-hover:text-[#F1F5F9] transition-colors tracking-tight">
                        {m.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={10} className="text-[#2D3A4A]" aria-hidden="true" />
                        <span className="text-[10px] text-[#3F4D5C]">{timeAgo(m.startedAt)}</span>
                        <span className="text-[10px] text-[#2D3A4A]">·</span>
                        <Users size={10} className="text-[#2D3A4A]" aria-hidden="true" />
                        <span className="text-[10px] text-[#3F4D5C]">{m.participants}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {m.isActive ? (
                        <Badge variant="live" dot pulse>Live</Badge>
                      ) : (
                        <Badge variant="default">Ended</Badge>
                      )}
                      <ArrowRight size={12} className="text-[#2D3A4A] group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming */}
          <motion.div {...fadeUp(0.15)}>
            <Card noPadding>
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                <Calendar size={14} className="text-[#3F4D5C]" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-[#CBD5E1] tracking-tight">Upcoming</h2>
              </div>
              <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.04)]">
                {UPCOMING.map(({ title, time, attendees, accent }) => (
                  <div key={title} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className={`w-1 h-8 rounded-full shrink-0 ${accent}`} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#CBD5E1] truncate tracking-tight">{title}</p>
                      <p className="text-[10px] text-[#3F4D5C] mt-0.5">{time}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#3F4D5C] shrink-0 font-medium">
                      <Users size={10} aria-hidden="true" />
                      {attendees}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">

          {/* Quick actions */}
          <motion.div {...fadeUp(0.12)}>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={13} className="text-[#3F4D5C]" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-[#CBD5E1] tracking-tight">Quick actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-2" role="list">
                {QUICK_ACTIONS.map(({ label, icon: Icon, to, color, bg, border }) => (
                  <Link
                    key={label}
                    to={to}
                    role="listitem"
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${border} ${bg} hover:opacity-80 transition-all text-center group`}
                    aria-label={label}
                  >
                    <Icon size={15} className={color} aria-hidden="true" />
                    <span className="text-[10px] font-semibold text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors leading-tight tracking-tight">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Tasks preview */}
          <motion.div {...fadeUp(0.17)}>
            <Card noPadding>
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2">
                  <CheckSquare size={14} className="text-[#3F4D5C]" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-[#CBD5E1] tracking-tight">My tasks</h2>
                </div>
                <Link to={ROUTES.TASKS} className="text-[10px] text-[#3F4D5C] hover:text-indigo-400 transition-colors font-medium">
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.04)]" role="list">
                {TASKS.map(({ title, priority, done }) => (
                  <div key={title} className="flex items-center gap-2.5 px-4 py-2.5" role="listitem">
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        done ? 'bg-emerald-500/14 border-emerald-500/35' : 'border-[rgba(255,255,255,0.1)]'
                      }`}
                      aria-label={done ? 'Completed' : 'Pending'}
                    >
                      {done && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </div>
                    <p className={`text-xs flex-1 truncate tracking-tight ${done ? 'text-[#2D3A4A] line-through' : 'text-[#94A3B8]'}`}>
                      {title}
                    </p>
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${PRIORITY_COLOR[priority]}`}
                      aria-label={`${priority} priority`}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Activity feed */}
          <motion.div {...fadeUp(0.2)}>
            <Card noPadding>
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-[#CBD5E1] tracking-tight">Activity</h2>
              </div>
              <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.04)]" role="list" aria-label="Recent activity">
                {ACTIVITY.map(({ icon: Icon, text, time, color, bg }) => (
                  <div key={text} className="flex items-start gap-2.5 px-4 py-2.5 hover:bg-white/[0.02] transition-colors" role="listitem">
                    <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`} aria-hidden="true">
                      <Icon size={11} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-[#94A3B8] leading-snug tracking-tight truncate">{text}</p>
                      <p className="text-[10px] text-[#2D3A4A] mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ── AI Banner ── */}
      <motion.div {...fadeUp(0.25)}>
        <div className="rounded-2xl border border-violet-500/14 bg-[rgba(124,58,237,0.04)] p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/16 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-violet-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#CBD5E1] tracking-tight">AI Intelligence ready</p>
              <p className="text-xs text-[#3F4D5C] mt-0.5">
                2 meetings need AI summaries · 5 action items pending review
              </p>
            </div>
          </div>
          <Button
            variant="soft"
            size="sm"
            rightIcon={<ArrowRight size={12} />}
            onClick={() => navigate(ROUTES.AI_SUMMARY)}
          >
            Review
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
