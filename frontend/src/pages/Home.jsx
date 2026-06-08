import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { generateMeetingCode } from '../utils/helpers';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const STATS = [
  { value: '10M+',  label: 'Meetings Hosted' },
  { value: '150+',  label: 'Countries' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9★',  label: 'Avg Rating' },
];

const AVATARS = ['T', 'A', 'R', 'S', 'M'];

/* ─── Section data ─────────────────────────────── */
const VIDEO_FEATURES = [
  { icon: '🎥', title: 'HD Video Calls', desc: 'Crystal-clear 1080p video with adaptive quality for any bandwidth.', items: ['Up to 500 participants', 'Virtual backgrounds', 'Noise cancellation'] },
  { icon: '🖥️', title: 'Screen Sharing', desc: 'Share your entire screen, a window, or a single browser tab instantly.', items: ['Multi-screen support', 'Annotation tools', 'Remote control'] },
  { icon: '⏺️', title: 'Recording', desc: 'Record meetings to the cloud or locally with automatic transcription.', items: ['Cloud storage', 'Auto transcription', 'Shareable links'] },
  { icon: '👥', title: 'Participant Mgmt', desc: 'Full host controls — mute, remove, spotlight, and manage roles live.', items: ['Waiting rooms', 'Breakout rooms', 'Co-host controls'] },
];

const AI_FEATURES = [
  { icon: '📝', title: 'Live Transcription', desc: 'Real-time speech-to-text in 30+ languages with speaker identification.' },
  { icon: '🤖', title: 'AI Summaries', desc: 'Auto-generated meeting summaries delivered to your inbox immediately after calls.' },
  { icon: '✅', title: 'Action Items', desc: 'AI automatically extracts tasks, owners, and deadlines from conversations.' },
  { icon: '📊', title: 'Meeting Insights', desc: 'Sentiment analysis, talk-time distribution, and engagement scores per session.' },
];

const COLLAB_FEATURES = [
  { icon: '💬', title: 'Team Chat', desc: 'Persistent channels and direct messages — integrated right inside your meeting space.' },
  { icon: '📋', title: 'Shared Notes', desc: 'Collaborative real-time notes that sync across all participants automatically.' },
  { icon: '📎', title: 'File Sharing', desc: 'Drag-and-drop file sharing with version history and inline previews.' },
  { icon: '🔔', title: 'Smart Notifications', desc: 'Context-aware alerts that only interrupt when it truly matters.' },
];

const TASK_FEATURES = [
  { icon: '📌', title: 'Kanban Boards', desc: 'Visual task boards to plan sprints, track progress, and ship faster as a team.', items: ['Drag-and-drop cards', 'Custom columns', 'Labels & priorities'] },
  { icon: '👤', title: 'Task Assignment', desc: 'Assign tasks directly from meeting action items with one click.', items: ['Due dates', 'Assignees', 'Dependencies'] },
  { icon: '📈', title: 'Progress Tracking', desc: 'Real-time burndown charts and milestone tracking for every project.', items: ['Burndown charts', 'Milestone alerts', 'Time logging'] },
];

const ANALYTICS_FEATURES = [
  { icon: '📉', title: 'Productivity Reports', desc: 'Weekly and monthly reports on meeting frequency, length, and outcomes.' },
  { icon: '🎯', title: 'Meeting Analytics', desc: 'Deep-dive metrics: who joins late, who speaks most, and where time is lost.' },
  { icon: '🏆', title: 'Team Insights', desc: 'Compare team performance trends and identify coaching opportunities.' },
];

const SECURITY_FEATURES = [
  { icon: '🔑', title: 'JWT Authentication', desc: 'Stateless, secure token-based auth with refresh token rotation.' },
  { icon: '🛡️', title: 'Role-Based Access', desc: 'Granular permissions — admin, host, co-host, and guest roles out of the box.' },
  { icon: '🔒', title: 'End-to-End Encryption', desc: 'AES-256 encryption for all media streams and stored data at rest.' },
  { icon: '📋', title: 'Compliance Ready', desc: 'SOC 2 Type II, GDPR, and HIPAA compliant infrastructure.' },
];

const TESTIMONIALS = [
  { quote: 'IntelMeet completely replaced Zoom for our 200-person company. The AI summaries alone save us hours every week.', name: 'Sarah Chen', role: 'VP Engineering, NovaTech', avatar: 'S' },
  { quote: 'The task management integration is a game changer. We go from meeting to action items in seconds — no more lost follow-ups.', name: 'Marcus Williams', role: 'Product Lead, Streamline', avatar: 'M' },
  { quote: 'Best-in-class security without sacrificing UX. Our compliance team signed off in days, not months.', name: 'Priya Sharma', role: 'CTO, FinFlow', avatar: 'P' },
];

const PLANS = [
  {
    name: 'Starter', price: 'Free', desc: 'Perfect for small teams getting started.',
    features: ['Up to 5 users', '40-min meeting limit', 'HD video & audio', 'Team chat', '5 GB storage'],
    cta: 'Get Started Free', variant: 'outline',
  },
  {
    name: 'Pro', price: '$12', period: '/user/mo', desc: 'For growing teams that need more power.',
    features: ['Unlimited users', 'Unlimited meetings', 'AI summaries & transcription', 'Task management', '100 GB storage', 'Priority support'],
    cta: 'Start Free Trial', variant: 'white', featured: true,
  },
  {
    name: 'Enterprise', price: 'Custom', desc: 'For large orgs with advanced needs.',
    features: ['Everything in Pro', 'SSO & SAML', 'Custom roles & permissions', 'Dedicated CSM', 'SLA guarantee', 'On-premise option'],
    cta: 'Contact Sales', variant: 'outline',
  },
];

/* ─── Reusable animated wrapper ────────────────── */
const FadeUp = ({ children, i = 0, className = '' }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    custom={i}
  >
    {children}
  </motion.div>
);

/* ─── Section Header ───────────────────────────── */
const SectionHeader = ({ badge, title, subtitle, light = false }) => (
  <div className="section-header">
    <FadeUp><Badge variant={light ? 'blue' : 'purple'}>{badge}</Badge></FadeUp>
    <FadeUp i={1}><h2 className="section-title">{title}</h2></FadeUp>
    <FadeUp i={2}><p className="section-subtitle">{subtitle}</p></FadeUp>
  </div>
);

/* ─── Home Page ────────────────────────────────── */
const Home = () => {
  const handleCreate = () => {
    const code = generateMeetingCode();
    toast.success(`Meeting created! Code: ${code}`, { icon: '🚀' });
  };

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero__inner">
          <motion.div className="hero__badge" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <Badge variant="purple">✨ Now with AI-powered meeting intelligence</Badge>
          </motion.div>
          <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            The meeting platform that <span>thinks ahead</span>
          </motion.h1>
          <motion.p className="hero__subtitle" variants={fadeUp} initial="hidden" animate="show" custom={2}>
            IntelMeet combines HD video, AI intelligence, team collaboration, and project management — all in one premium workspace.
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Button variant="primary" size="lg" onClick={handleCreate}>🚀 Start a Meeting</Button>
            <Button variant="outline" size="lg">Watch Demo</Button>
          </motion.div>
          <motion.div className="hero__social-proof" variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <div className="hero__avatars">
              {AVATARS.map((a) => <div key={a} className="hero__avatar">{a}</div>)}
            </div>
            <span>Trusted by <strong>10,000+</strong> teams worldwide</span>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats">
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} i={i}>
              <div className="stats__item-value">{s.value}</div>
              <div className="stats__item-label">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ 1. AI-POWERED VIDEO MEETINGS ══ */}
      <section className="product-section" id="features">
        <SectionHeader
          badge="🎥 Video Meetings"
          title="HD video meetings built for teams"
          subtitle="Everything you need for productive, professional meetings — from 1:1s to all-hands calls."
        />
        <div className="product-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {VIDEO_FEATURES.map((f, i) => (
            <FadeUp key={f.title} i={i % 4}>
              <Card className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
                <ul className="feature-card__items">
                  {f.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ 2. AI MEETING INTELLIGENCE — showcase split ══ */}
      <section className="showcase showcase--alt" id="ai">
        <div className="showcase__inner">
          <div className="showcase__content">
            <FadeUp><span className="showcase__label">🤖 AI Intelligence</span></FadeUp>
            <FadeUp i={1}><h2 className="showcase__title">Your AI assistant for every meeting</h2></FadeUp>
            <FadeUp i={2}><p className="showcase__desc">Stop taking notes. Let IntelMeet's AI capture every word, extract every action item, and deliver a clean summary — so you can stay fully present.</p></FadeUp>
            <FadeUp i={3}>
              <ul className="showcase__list">
                {AI_FEATURES.map((f) => (
                  <li key={f.title}>
                    <span className="showcase__list-icon">✓</span>
                    <div>
                      <strong style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{f.title}</strong>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp i={4}><Button variant="primary" size="md" style={{ marginTop: '0.5rem' }}>Try AI Features →</Button></FadeUp>
          </div>
          <FadeUp i={2}>
            <div className="showcase__visual">
              <div className="mock-card-inner">
                <div className="mock-tag">🤖 AI Summary</div>
                <div className="mock-bar mock-bar--full" style={{ marginTop: '0.5rem' }} />
                <div className="mock-bar mock-bar--med" />
                <div className="mock-bar mock-bar--short" />
              </div>
              <div className="mock-card-inner">
                <div className="mock-tag mock-tag--green">✅ Action Items (3)</div>
                {['Design review by Friday', 'Send proposal to client', 'Schedule follow-up'].map((t) => (
                  <div key={t} className="mock-row" style={{ marginTop: '0.35rem' }}>
                    <div className="mock-dot" style={{ width: 16, height: 16 }} />
                    <div className="mock-bar mock-bar--full" style={{ height: 8 }} />
                  </div>
                ))}
              </div>
              <div className="mock-grid">
                <div className="mock-stat"><div className="mock-stat-val">98%</div><div className="mock-stat-lbl">Accuracy</div></div>
                <div className="mock-stat"><div className="mock-stat-val">30+</div><div className="mock-stat-lbl">Languages</div></div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 3. TEAM COLLABORATION ══ */}
      <section className="product-section product-section--dark" id="collaboration">
        <SectionHeader
          badge="💬 Collaboration"
          title="Work together, not just meet together"
          subtitle="Persistent chat, shared notes, and file sharing keep your team aligned between meetings."
          light
        />
        <div className="product-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {COLLAB_FEATURES.map((f, i) => (
            <FadeUp key={f.title} i={i % 4}>
              <Card className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ 4. PROJECT & TASK MANAGEMENT — showcase split ══ */}
      <section className="showcase" id="tasks">
        <div className="showcase__inner showcase__inner--reverse">
          <FadeUp i={2}>
            <div className="showcase__visual">
              <div className="mock-card-inner">
                <div className="mock-tag mock-tag--blue">📌 Sprint Board</div>
                {[['To Do', '40%'], ['In Progress', '65%'], ['Done', '90%']].map(([label, pct]) => (
                  <div key={label} style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>{label}</span><span>{pct}</span>
                    </div>
                    <div className="mock-progress">
                      <div className="mock-progress-fill" style={{ width: pct }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mock-grid">
                <div className="mock-stat"><div className="mock-stat-val">24</div><div className="mock-stat-lbl">Open Tasks</div></div>
                <div className="mock-stat"><div className="mock-stat-val">8</div><div className="mock-stat-lbl">Completed</div></div>
              </div>
              <div className="mock-card-inner">
                {[{ tag: '🔴 High', bar: '80%' }, { tag: '🟡 Medium', bar: '55%' }, { tag: '🟢 Low', bar: '30%' }].map((r) => (
                  <div key={r.tag} className="mock-row" style={{ marginBottom: '0.4rem' }}>
                    <div className="mock-dot" style={{ width: 20, height: 20 }} />
                    <div className="mock-lines">
                      <div className="mock-bar mock-bar--full mock-bar--accent" style={{ height: 7, width: r.bar }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <div className="showcase__content">
            <FadeUp><span className="showcase__label">📌 Task Management</span></FadeUp>
            <FadeUp i={1}><h2 className="showcase__title">From meeting to action — instantly</h2></FadeUp>
            <FadeUp i={2}><p className="showcase__desc">IntelMeet connects your conversations directly to your workflow. AI extracts action items and drops them straight into your Kanban board.</p></FadeUp>
            <FadeUp i={3}>
              <div className="product-grid--3" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '0.5rem' }}>
                {TASK_FEATURES.map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{f.title}</div>
                      <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 5. ANALYTICS DASHBOARD ══ */}
      <section className="product-section product-section--alt" id="analytics">
        <SectionHeader
          badge="📊 Analytics"
          title="Data-driven meeting culture"
          subtitle="Understand how your team meets, where time goes, and how to improve — with beautiful, actionable reports."
        />
        <div className="product-grid--3" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {ANALYTICS_FEATURES.map((f, i) => (
            <FadeUp key={f.title} i={i}>
              <Card className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ 6. ENTERPRISE SECURITY ══ */}
      <section className="product-section" id="security">
        <SectionHeader
          badge="🔒 Security"
          title="Enterprise-grade security, built-in"
          subtitle="IntelMeet is designed from the ground up with security and compliance as first-class citizens."
        />
        <div className="product-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {SECURITY_FEATURES.map((f, i) => (
            <FadeUp key={f.title} i={i % 4}>
              <Card className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testimonials">
        <SectionHeader
          badge="❤️ Loved by teams"
          title="What our customers say"
          subtitle="Thousands of teams have already transformed how they meet with IntelMeet."
        />
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} i={i}>
              <Card className="testimonial-card">
                <div className="testimonial-card__stars">★★★★★</div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className="pricing" id="pricing">
        <SectionHeader
          badge="💳 Pricing"
          title="Simple, transparent pricing"
          subtitle="Start free. Upgrade when you need to. No hidden fees, ever."
        />
        <div className="pricing__grid">
          {PLANS.map((plan, i) => (
            <FadeUp key={plan.name} i={i}>
              <Card className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                <div className="pricing-card__name">{plan.name}</div>
                <div className="pricing-card__price">
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </div>
                <p className="pricing-card__desc">{plan.desc}</p>
                <div className="pricing-card__divider" />
                <ul className="pricing-card__features">
                  {plan.features.map((f) => <li key={f} className="pricing-card__feature">{f}</li>)}
                </ul>
                <Button
                  variant={plan.featured ? 'white' : 'primary'}
                  size="md"
                  className={plan.featured ? 'btn--white' : ''}
                  onClick={handleCreate}
                  style={{ marginTop: 'auto' }}
                >
                  {plan.cta}
                </Button>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <motion.div
          className="cta-section__inner"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <h2 className="cta-section__title">Ready to transform how your team meets?</h2>
          <p className="cta-section__sub">
            Join 10,000+ teams already using IntelMeet. Free to start — no credit card required.
          </p>
          <div className="cta-section__actions">
            <Button variant="white" size="lg" className="btn--white" onClick={handleCreate}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="btn--outline-white">
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
