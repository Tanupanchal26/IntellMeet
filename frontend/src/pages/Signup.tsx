import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight, Video, Brain, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ROUTES } from '../constants';
import { setCredentials } from '../store/slices/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import axiosClient from '../api/axiosClient';
import Button from '../components/common/Button';
import GoogleLoginButton from '../components/common/GoogleLoginButton';

/* ── Password strength ── */
const getStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, score);
};

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLOR = ['', 'text-red-400', 'text-amber-400', 'text-blue-400', 'text-emerald-400'];

/* ── Brand panel ── */
const BrandPanel = () => (
  <div className="hidden lg:flex flex-col justify-between p-10 h-full relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0B16 0%, #0F0A1E 50%, #0A0D1C 100%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />
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
        Everything your team<br />
        <span className="gradient-text">needs in one place</span>
      </h2>
      <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
        Set up your workspace in minutes. No credit card required.
      </p>

      <div className="flex flex-col gap-3">
        {[
          { icon: Video,       label: 'Start in minutes',         desc: 'No setup required, instant HD meetings' },
          { icon: Brain,       label: 'AI from day one',          desc: 'Transcription and summaries included' },
          { icon: CheckSquare, label: 'Free forever plan',        desc: '5 meetings/month, no card needed' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0">
              <Icon size={13} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CBD5E1]">{label}</p>
              <p className="text-[10px] text-[#3F4D5C]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="relative z-10">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] p-4">
        <p className="text-xs text-[#94A3B8] leading-relaxed mb-2.5">
          "Our team adopted it in 2 days. The meeting room UI feels as polished as Google Meet."
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}>PN</div>
          <div>
            <p className="text-[10px] font-semibold text-[#CBD5E1]">Priya Nair</p>
            <p className="text-[9px] text-[#2D3A4A]">VP Operations, ScaleUp Inc</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37 37.1 44 32 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

const Signup = () => {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const strength     = getStrength(form.password);
  const strengthLabel = form.password.length > 0 ? STRENGTH_LABEL[strength] : '';
  const strengthColor = form.password.length > 0 ? STRENGTH_COLOR[strength] : '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await axiosClient.post('/auth/signup', { name: form.name, email: form.email, password: form.password }) as any;
      dispatch(setCredentials({ user: res.user, accessToken: res.accessToken ?? res.token, refreshToken: res.refreshToken }));
      toast.success(`Welcome, ${res.user.name}!`);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#07070C]">
      <BrandPanel />

      <div className="flex items-center justify-center p-6 lg:p-10 relative overflow-y-auto">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
        </div>

        <motion.div
          className="w-full max-w-[400px] relative z-10 py-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex items-center gap-2.5 mb-7 lg:hidden">
            <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Zap size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-[#F1F5F9]">IntellMeet</span>
          </div>

          <div className="mb-7">
            <h1 className="text-[1.625rem] font-bold text-[#F1F5F9] tracking-tight mb-1">Create account</h1>
            <p className="text-sm text-[#64748B]">Start your free workspace today</p>
          </div>

          <GoogleLoginButton />

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs text-[#2D3A4A] font-medium">or</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="signup-name" className="form-label">Full name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input id="signup-name" type="text" value={form.name} onChange={set('name')} placeholder="Jane Smith" className="input-dark pl-9" autoComplete="name" required />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="form-label">Work email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input id="signup-email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className="input-dark pl-9" autoComplete="email" required />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="form-label">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min 8 characters"
                  className="input-dark pl-9 pr-10"
                  autoComplete="new-password"
                  required
                  aria-describedby="password-strength"
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

              {/* Password strength meter */}
              {form.password.length > 0 && (
                <div className="mt-2" id="password-strength" aria-label={`Password strength: ${strengthLabel}`}>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="flex-1 h-[3px] rounded-full transition-all duration-300"
                        style={{
                          background: i <= strength
                            ? strength === 1 ? '#EF4444'
                              : strength === 2 ? '#F59E0B'
                              : strength === 3 ? '#3B82F6'
                              : '#10B981'
                            : 'rgba(255,255,255,0.07)',
                        }}
                      />
                    ))}
                  </div>
                  <p className={`text-[10px] font-medium ${strengthColor}`}>{strengthLabel} password</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="signup-confirm" className="form-label">Confirm password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A4A] pointer-events-none" aria-hidden="true" />
                <input
                  id="signup-confirm"
                  type="password"
                  value={form.confirm}
                  onChange={set('confirm')}
                  placeholder="Repeat password"
                  className="input-dark pl-9"
                  autoComplete="new-password"
                  required
                />
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-[10px] text-red-400 mt-1.5" role="alert">Passwords do not match</p>
              )}
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2 text-xs text-[#F87171] bg-red-500/8 border border-red-500/16 px-3 py-2.5 rounded-lg">
                <span className="mt-0.5 shrink-0">⚠</span>
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-1 h-10 text-sm" rightIcon={<ArrowRight size={14} />}>
              Create account
            </Button>

            <p className="text-center text-xs text-[#2D3A4A] leading-relaxed">
              By signing up you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms</a> and{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>
            </p>
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
