import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { generateMeetingCode } from '../utils/helpers';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const FEATURES = [
  { icon: '🎥', title: 'HD Video Meetings', desc: 'Crystal-clear video and audio with adaptive quality for any network condition.' },
  { icon: '⚡', title: 'Real-Time Collaboration', desc: 'Share screens, annotate, and collaborate live with your entire team instantly.' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'End-to-end encryption and role-based access controls keep your meetings safe.' },
  { icon: '🤖', title: 'AI Meeting Notes', desc: 'Auto-generated summaries and action items powered by AI after every call.' },
  { icon: '🌐', title: 'Works Everywhere', desc: 'Join from any browser or device — no downloads required.' },
  { icon: '📊', title: 'Meeting Analytics', desc: 'Track engagement, attendance, and participation trends across your team.' },
];

const STATS = [
  { value: '10M+', label: 'Meetings Hosted' },
  { value: '150+', label: 'Countries Reached' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const AVATARS = ['T', 'A', 'R', 'S'];

const Home = () => {
  const handleCreate = () => {
    const code = generateMeetingCode();
    toast.success(`Meeting created! Code: ${code}`, { icon: '🎉' });
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__inner">
          <motion.div className="hero__badge" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <Badge variant="purple">✨ Now with AI-powered meeting notes</Badge>
          </motion.div>

          <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            Meetings that <span>work smarter</span>, not harder
          </motion.h1>

          <motion.p className="hero__subtitle" variants={fadeUp} initial="hidden" animate="show" custom={2}>
            IntelMeet brings HD video, real-time collaboration, and AI insights together — so your team can focus on what matters.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Button variant="primary" size="lg" onClick={handleCreate}>
              🚀 Start a Meeting
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div className="hero__social-proof" variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <div className="hero__avatars">
              {AVATARS.map((a) => (
                <div key={a} className="hero__avatar">{a}</div>
              ))}
            </div>
            <span>Trusted by <strong>10,000+</strong> teams worldwide</span>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats">
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stats__item"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            >
              <div className="stats__item-value">{s.value}</div>
              <div className="stats__item-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features" id="features">
        <div className="section-header">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Badge variant="purple" className="section-badge">Features</Badge>
          </motion.div>
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
            Everything your team needs
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}>
            Powerful features designed for modern remote and hybrid teams.
          </motion.p>
        </div>
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 3}>
              <Card className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <motion.div className="cta-section__inner" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="cta-section__title">Ready to transform your meetings?</h2>
          <p className="cta-section__sub">
            Join thousands of teams already using IntelMeet. Free to start, no credit card required.
          </p>
          <div className="hero__actions">
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
