import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const WEEKLY = [
  { day: 'Mon', meetings: 4, tasks: 8 },
  { day: 'Tue', meetings: 6, tasks: 12 },
  { day: 'Wed', meetings: 3, tasks: 6 },
  { day: 'Thu', meetings: 8, tasks: 15 },
  { day: 'Fri', meetings: 5, tasks: 10 },
  { day: 'Sat', meetings: 2, tasks: 3 },
  { day: 'Sun', meetings: 1, tasks: 2 },
];

const TASK_DATA = [
  { name: 'Done',        value: 47, color: '#22C55E' },
  { name: 'In Progress', value: 18, color: '#6366F1' },
  { name: 'To Do',       value: 12, color: '#64748B' },
];

const PRODUCTIVITY = [
  { week: 'W1', score: 72 }, { week: 'W2', score: 78 }, { week: 'W3', score: 83 },
  { week: 'W4', score: 80 }, { week: 'W5', score: 87 }, { week: 'W6', score: 91 },
];

const ENGAGEMENT = [
  { label: 'Avg Meeting Duration', value: '47 min', trend: '+5 min', up: true },
  { label: 'Participation Rate', value: '94%', trend: '+2%', up: true },
  { label: 'AI Summary Usage', value: '78%', trend: '+12%', up: true },
  { label: 'Action Item Completion', value: '61%', trend: '-4%', up: false },
];

const TP = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-xl text-xs">
    <p className="font-semibold text-[var(--color-text)] mb-1">{label}</p>
    {payload.map((p: any) => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
  </div>
) : null;

const Analytics = () => (
  <div className="flex flex-col gap-5 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)]">Analytics</h1>
      <p className="text-sm text-[var(--color-text-muted)]">Team performance and engagement insights</p>
    </div>

    {/* Engagement metrics */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {ENGAGEMENT.map(({ label, value, trend, up }) => (
        <Card key={label} hover>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">{label}</p>
          <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
          <Badge variant={up ? 'success' : 'danger'} className="mt-2">{trend}</Badge>
        </Card>
      ))}
    </div>

    {/* Charts row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--color-text)]">Meetings & Tasks per Week</h2>
          <Badge variant="default">Last 7 days</Badge>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={WEEKLY} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="gM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<TP />} />
            <Area type="monotone" dataKey="meetings" stroke="#6366F1" fill="url(#gM)" strokeWidth={2} name="Meetings" />
            <Area type="monotone" dataKey="tasks" stroke="#22C55E" fill="url(#gT)" strokeWidth={2} name="Tasks" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="font-semibold text-[var(--color-text)] mb-4">Task Completion</h2>
        <div className="flex items-center justify-center mb-4">
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={TASK_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {TASK_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<TP />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {TASK_DATA.map(d => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-[var(--color-text-muted)]">{d.name}</span>
              </div>
              <span className="font-semibold text-[var(--color-text)]">{d.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Productivity chart */}
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[var(--color-text)]">Productivity Score Trend</h2>
        <span className="text-2xl font-bold gradient-text">87%</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={PRODUCTIVITY} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[60, 100]} tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<TP />} />
          <Bar dataKey="score" name="Score" fill="#6366F1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

export default Analytics;
