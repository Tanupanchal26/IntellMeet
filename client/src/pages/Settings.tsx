import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Lock, Bell, Palette, Shield, Save, CreditCard,
  Puzzle, Brain, Trash2, ExternalLink, Check, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
If you want the AI to fix it, use this prompt:

Fix my logout functionality.

Requirement:

When the user clicks the "Sign Out" button, they must be immediately redirected to the public Home page ("/").

Expected flow:

1. User clicks "Sign Out".
2. Logout API executes successfully.
3. Clear all authentication data.
4. Clear localStorage auth tokens.
5. Clear sessionStorage auth data.
6. Clear user context/store state.
7. Redirect user to "/".
8. Replace browser history so user cannot press Back and return to protected pages.
9. If user tries to access Dashboard, Meetings, Teams, Channels, Tasks, Analytics, Notifications, or Settings after logout, redirect them back to "/".
10. Refreshing the browser must not restore the previous session.

Implementation details:

* React
* TypeScript
* React Router
* Production-ready
* Secure logout

Use:

navigate("/", { replace: true });

after logout completes.

Also update ProtectedRoute so unauthenticated users are automatically redirected to "/".

Return the complete code changes required for:

* Sign Out button
* Logout handler
* AuthContext
* ProtectedRoute
* Router configuration

If you're coding it yourself, your logout handler should look something like:

```tsx
const handleLogout = async () => {
  try {
    await logout();

    localStorage.clear();
    sessionStorage.clear();

    navigate("/", { replace: true });
  } catch (error) {
    console.error(error);
  }
};
```

And your protected routes should redirect unauthenticated users to `/`.
import { clearAuth } from '../store/slices/authSlice';
import { ROUTES, STORAGE_KEYS } from '../constants';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

type Tab = 'profile' | 'security' | 'notifications' | 'appearance' | 'billing' | 'integrations' | 'ai';

const TABS: { id: Tab; label: string; icon: React.ElementType; group?: string }[] = [
  { id: 'profile',       label: 'Profile',        icon: User,       group: 'Account' },
  { id: 'security',      label: 'Security',        icon: Shield,     group: 'Account' },
  { id: 'notifications', label: 'Notifications',   icon: Bell,       group: 'Account' },
  { id: 'appearance',    label: 'Appearance',      icon: Palette,    group: 'Account' },
  { id: 'billing',       label: 'Billing',         icon: CreditCard, group: 'Workspace' },
  { id: 'integrations',  label: 'Integrations',    icon: Puzzle,     group: 'Workspace' },
  { id: 'ai',            label: 'AI Preferences',  icon: Brain,      group: 'Workspace' },
];

/* ── Toggle switch ── */
interface ToggleProps { id: string; checked: boolean; onChange: () => void; label: string; }
const Toggle = ({ id, checked, onChange, label }: ToggleProps) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={clsx(
      'relative w-10 h-[22px] rounded-full shrink-0 transition-colors duration-200 outline-none',
      'focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#07070C]',
      checked ? 'bg-indigo-500' : 'bg-[rgba(255,255,255,0.1)]'
    )}
  >
    <span
      className={clsx(
        'absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white',
        'shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
        'transition-transform duration-200',
        checked && 'translate-x-[18px]'
      )}
    />
  </button>
);

/* ── Section header ── */
const SectionHeader = ({ title, desc }: { title: string; desc?: string }) => (
  <div className="mb-5">
    <h2 className="text-[0.9375rem] font-semibold text-[#F1F5F9] tracking-tight">{title}</h2>
    {desc && <p className="text-sm text-[#64748B] mt-0.5 leading-relaxed">{desc}</p>}
  </div>
);

/* ── Row item for notification/settings toggles ── */
const SettingRow = ({
  title, desc, id, checked, onChange,
}: { title: string; desc: string; id: string; checked: boolean; onChange: () => void }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
    <div className="flex-1 pr-6">
      <label htmlFor={id} className="text-sm font-medium text-[#CBD5E1] cursor-pointer">{title}</label>
      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{desc}</p>
    </div>
    <Toggle id={id} checked={checked} onChange={onChange} label={title} />
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user   = useAppSelector((s) => s.auth.user);
  const [tab,  setTab]  = useState<Tab>('profile');
  const [name, setName] = useState(user?.name ?? '');

  const [notifs, setNotifs] = useState({
    email: true, push: true, digest: false, mentions: true,
    meetingInvite: true, taskAssigned: true, aiSummary: true,
  });

  const [ai, setAI] = useState({
    autoSummary: true, actionItems: true, transcription: true,
    suggestions: false, searchHistory: true,
  });

  const toggleNotif = (k: keyof typeof notifs) =>
    setNotifs(n => ({ ...n, [k]: !n[k] }));

  const toggleAI = (k: keyof typeof ai) =>
    setAI(a => ({ ...a, [k]: !a[k] }));

  const save = () => toast.success('Settings saved!');

  const handleLogout = () => {
    // Clear state and storage
    dispatch(clearAuth());
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem('im_user');
    sessionStorage.clear();

    toast.success('Signed out successfully');
    // Redirect to public homepage and replace history
    navigate(ROUTES.HOME, { replace: true });
  };

  const tabGroups = ['Account', 'Workspace'];

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-h3 text-[#F1F5F9]">Settings</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Manage your account and workspace preferences</p>
      </motion.div>

      <div className="flex gap-6 flex-col md:flex-row">

        {/* ── Tab list ── */}
        <nav className="flex md:flex-col gap-0.5 md:w-52 flex-shrink-0 flex-wrap" aria-label="Settings navigation">
          {tabGroups.map(group => (
            <div key={group} className="flex md:flex-col gap-0.5 w-full">
              <p className="text-[10px] font-semibold text-[#2D3A4A] uppercase tracking-[0.1em] px-2.5 py-1 hidden md:block">
                {group}
              </p>
              {TABS.filter(t => t.group === group).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                  className={clsx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium transition-all text-left',
                    tab === id
                      ? 'bg-[rgba(99,102,241,0.1)] text-[#818CF8] border border-indigo-500/14'
                      : 'text-[#64748B] hover:bg-white/[0.04] hover:text-[#94A3B8] border border-transparent'
                  )}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          ))}
          
          <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] hidden md:block">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium text-[#64748B] hover:bg-red-500/10 hover:text-red-400 transition-all text-left w-full"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </nav>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >

              {/* Profile */}
              {tab === 'profile' && (
                <Card>
                  <SectionHeader title="Profile Information" desc="Your public name and email visible to team members." />
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}
                      aria-label={`Avatar for ${name}`}
                    >
                      {name.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#CBD5E1]">{name || 'Your Name'}</p>
                      <p className="text-xs text-[#3F4D5C] mt-0.5">{user?.email}</p>
                      <Button variant="ghost" size="xs" className="mt-2 text-[#64748B]">Change photo</Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="settings-name" className="form-label">Full Name</label>
                      <input id="settings-name" type="text" value={name} onChange={e => setName(e.target.value)} className="input" />
                    </div>
                    <div>
                      <label htmlFor="settings-email" className="form-label">Email Address</label>
                      <input id="settings-email" type="email" value={user?.email ?? ''} readOnly className="input opacity-60 cursor-not-allowed" />
                      <p className="form-hint">Email changes require verification. Contact support.</p>
                    </div>
                    <div className="flex justify-end pt-1">
                      <Button onClick={save} leftIcon={<Save size={13} />}>Save Changes</Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Security */}
              {tab === 'security' && (
                <div className="flex flex-col gap-4">
                  <Card>
                    <SectionHeader title="Change Password" />
                    <div className="flex flex-col gap-4">
                      {[
                        { id: 'cur-pass', label: 'Current Password' },
                        { id: 'new-pass', label: 'New Password' },
                        { id: 'cfm-pass', label: 'Confirm New Password' },
                      ].map(({ id, label }) => (
                        <div key={id}>
                          <label htmlFor={id} className="form-label">{label}</label>
                          <input id={id} type="password" placeholder="••••••••" className="input" autoComplete="new-password" />
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button onClick={save} leftIcon={<Lock size={13} />}>Update Password</Button>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <SectionHeader title="Two-Factor Authentication" desc="Add an extra layer of security to your account." />
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                      <div>
                        <p className="text-sm font-medium text-[#CBD5E1]">Authenticator App</p>
                        <p className="text-xs text-[#64748B] mt-0.5">Use an app like Authy or Google Authenticator</p>
                      </div>
                      <Button variant="secondary" size="sm">Enable</Button>
                    </div>
                  </Card>

                  <Card variant="danger">
                    <SectionHeader title="Danger Zone" desc="Permanent and irreversible actions." />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#CBD5E1]">Delete Account</p>
                        <p className="text-xs text-[#64748B] mt-0.5">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="danger" size="sm" leftIcon={<Trash2 size={13} />}>Delete Account</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Notifications */}
              {tab === 'notifications' && (
                <Card>
                  <SectionHeader title="Notification Preferences" desc="Choose what you want to be notified about." />
                  <div className="flex flex-col">
                    <SettingRow title="Email Notifications" desc="Receive meeting summaries and alerts via email" id="n-email" checked={notifs.email} onChange={() => toggleNotif('email')} />
                    <SettingRow title="Push Notifications" desc="Browser push for real-time meeting alerts" id="n-push" checked={notifs.push} onChange={() => toggleNotif('push')} />
                    <SettingRow title="Daily Digest" desc="Morning summary of tasks and upcoming meetings" id="n-digest" checked={notifs.digest} onChange={() => toggleNotif('digest')} />
                    <SettingRow title="Mentions" desc="Notify when someone @mentions you in channels" id="n-mentions" checked={notifs.mentions} onChange={() => toggleNotif('mentions')} />
                    <SettingRow title="Meeting Invites" desc="Get notified when you're added to a meeting" id="n-invite" checked={notifs.meetingInvite} onChange={() => toggleNotif('meetingInvite')} />
                    <SettingRow title="Task Assignments" desc="Notify when a task is assigned to you" id="n-task" checked={notifs.taskAssigned} onChange={() => toggleNotif('taskAssigned')} />
                    <SettingRow title="AI Summaries Ready" desc="Notify when AI finishes processing a meeting" id="n-ai" checked={notifs.aiSummary} onChange={() => toggleNotif('aiSummary')} />
                  </div>
                </Card>
              )}

              {/* Appearance */}
              {tab === 'appearance' && (
                <Card>
                  <SectionHeader title="Theme" desc="IntellMeet defaults to dark mode for enterprise use." />
                  <div className="flex gap-3 mb-6">
                    {['Dark', 'Light', 'System'].map(t => (
                      <button
                        key={t}
                        className={clsx(
                          'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          t === 'Dark'
                            ? 'border-indigo-500/35 bg-indigo-500/8 text-indigo-300'
                            : 'border-[rgba(255,255,255,0.07)] text-[#64748B] hover:border-[rgba(255,255,255,0.12)] hover:text-[#94A3B8]'
                        )}
                        aria-pressed={t === 'Dark'}
                      >
                        {t === 'Dark' && <Check size={13} className="inline mr-1.5" />}
                        {t}
                      </button>
                    ))}
                  </div>
                  <SectionHeader title="Density" desc="Control how compact the interface appears." />
                  <div className="flex gap-3">
                    {['Comfortable', 'Compact'].map(d => (
                      <button
                        key={d}
                        className={clsx(
                          'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          d === 'Comfortable'
                            ? 'border-indigo-500/35 bg-indigo-500/8 text-indigo-300'
                            : 'border-[rgba(255,255,255,0.07)] text-[#64748B] hover:border-[rgba(255,255,255,0.12)]'
                        )}
                        aria-pressed={d === 'Comfortable'}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Billing */}
              {tab === 'billing' && (
                <div className="flex flex-col gap-4">
                  <Card variant="brand">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-[#F1F5F9]">Pro Plan</p>
                          <Badge variant="primary">Active</Badge>
                        </div>
                        <p className="text-xs text-[#64748B]">$15/user/month · 8 seats · Next billing Dec 1, 2025</p>
                      </div>
                      <Button variant="soft" size="sm">Manage</Button>
                    </div>
                  </Card>
                  <Card>
                    <SectionHeader title="Payment Method" />
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                      <CreditCard size={16} className="text-[#64748B]" />
                      <div>
                        <p className="text-sm font-medium text-[#CBD5E1]">Visa ending in 4242</p>
                        <p className="text-xs text-[#3F4D5C]">Expires 12/26</p>
                      </div>
                      <Button variant="ghost" size="xs" className="ml-auto">Update</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Integrations */}
              {tab === 'integrations' && (
                <Card>
                  <SectionHeader title="Integrations" desc="Connect IntellMeet with your favourite tools." />
                  <div className="flex flex-col gap-3">
                    {[
                      { name: 'Slack',              desc: 'Post meeting summaries to channels', connected: true },
                      { name: 'Google Calendar',    desc: 'Sync meetings with your calendar', connected: true },
                      { name: 'Notion',             desc: 'Export notes and summaries to Notion', connected: false },
                      { name: 'Linear',             desc: 'Create issues from action items', connected: false },
                      { name: 'Jira',               desc: 'Sync tasks with Jira projects', connected: false },
                    ].map(({ name, desc, connected }) => (
                      <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.08)] transition-colors">
                        <div>
                          <p className="text-sm font-medium text-[#CBD5E1]">{name}</p>
                          <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                        </div>
                        {connected ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="success" dot>Connected</Badge>
                            <Button variant="ghost" size="xs" className="text-[#64748B]">Disconnect</Button>
                          </div>
                        ) : (
                          <Button variant="secondary" size="sm" rightIcon={<ExternalLink size={11} />}>Connect</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* AI Preferences */}
              {tab === 'ai' && (
                <Card>
                  <SectionHeader title="AI Preferences" desc="Configure how IntellMeet's AI assistant behaves." />
                  <div className="flex flex-col">
                    <SettingRow title="Auto-generate Summaries" desc="Automatically generate AI summary after each meeting ends" id="ai-summary" checked={ai.autoSummary} onChange={() => toggleAI('autoSummary')} />
                    <SettingRow title="Extract Action Items" desc="Automatically identify and extract tasks from transcripts" id="ai-actions" checked={ai.actionItems} onChange={() => toggleAI('actionItems')} />
                    <SettingRow title="Live Transcription" desc="Enable real-time speech-to-text during meetings" id="ai-transcript" checked={ai.transcription} onChange={() => toggleAI('transcription')} />
                    <SettingRow title="AI Suggestions" desc="Receive proactive suggestions during meetings" id="ai-suggest" checked={ai.suggestions} onChange={() => toggleAI('suggestions')} />
                    <SettingRow title="Search History" desc="Allow AI to reference past meetings when answering questions" id="ai-history" checked={ai.searchHistory} onChange={() => toggleAI('searchHistory')} />
                  </div>
                </Card>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
