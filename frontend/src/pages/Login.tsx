import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight, Sparkles, Brain, Video, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ROUTES } from '../constants';
import { setCredentials } from '../store/slices/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import axiosClient from '../api/axiosClient';
import Button from '../components/common/Button';

/* ── Brand panel ── */
const BrandPanel = () => (
  <div className="hidden lg:flex flex-col justify-between p-10 h-full relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0B16 0%, #0F0A1E 50%, #0A0D1C 100%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

    {/* Dot grid */}
    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #6366F1 1px, transparent 1px)', backgroundSize: '32px 32px' }} aria-hidden="true" />

    <div className="relative z-10">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_4px_16px_rgba(99,102,241,0.3)]">
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-[#F1F5F9] text-base tracking-tight">IntellMeet</span>
      </div>
    </div>

    <div className="relative z-10 flex flex-col gap-5">
      <h2 className="text-h3 text-[#F1F5F9]">
        Your meetings,<br />
        <span className="gradient-text">intelligently captured</span>
      </h2>
      <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
        HD video, live AI transcription, smart summaries, and team channels — all in one enterprise workspace.
      </p>

      <div className="flex flex-col gap-3">
        {[
          { icon: Video,       label: 'HD video conferencing',    desc: 'WebRTC-powered, < 100ms latency' },
          { icon: Brain,       label: 'AI meeting intelligence',  desc: 'Live transcription & summaries' },
          { icon: CheckSquare, label: 'Auto task extraction',     desc: 'Action items from AI analysis' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0">
              <Icon size={13} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CBD5E1]">{label}</p>
              <p className="text-[10px] text-[#3F4D5C]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonial */}
    <div className="relative z-10">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] p-4">
        <div className="flex gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ))}
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed mb-2.5">
          "IntellMeet replaced our Zoom + Notion + Asana stack. The AI summaries alone save us 3 hours a week."
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}>SC</div>
          <div>
            <p className="text-[10px] font-semibold text-[#CBD5E1]">Sarah Chen</p>
            <p className="text-[9px] text-[#2D3A4A]">Head of Product, Acme Corp</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── Google SVG ── */
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37 37.1 44 32 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

/* ── Login ── */
const Login = () => {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res = await axiosClient.post('/auth/login', { email, password }) as any;
      dispatch(setCredentials({ user: res.user, accessToken: res.accessToken ?? res.token, refreshToken: res.refreshToken }));
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#07070C]">
      <BrandPanel />

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-10 relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
        </div>

        <motion.div
          className="w-full max-w-[400px] relative z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-[#F1F5F9]">IntellMeet</span>
          </div>

          <div className="mb-7">
            <h1 className="text-[1.625rem] font-bold text-[#F1F5F9] tracking-tight mb-1">Welcome back</h1>
            <p className="text-sm text-[#64748B]">Sign in to your workspace</p>
          </div>

          {/* OAuth */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[0.8125rem] font-medium text-[#CBD5E1] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all mb-5"
            aria-label="Continue with Google"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs text-[#2D3A4A] font-medium">or</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="login-email" className="form-label">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input-dark pl-9"
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="form-label mb-0">Password</label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-dark pl-9 pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] hover:text-[#64748B] transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2 text-xs text-[#F87171] bg-red-500/8 border border-red-500/16 px-3 py-2.5 rounded-lg">
                <span className="mt-0.5 shrink-0">⚠</span>
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-1 h-10 text-sm" rightIcon={<ArrowRight size={14} />}>
              Sign in
            </Button>
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
