import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Users, Brain, FileText, Zap,
  PhoneOff, Mic, MicOff, Video, VideoOff,
  Monitor, Circle, Hand, Smile, MoreHorizontal,
  ChevronRight, Maximize2, Minimize2,
} from 'lucide-react';
import { clsx } from 'clsx';
import VideoGrid from '../components/meeting/VideoGrid';
import Controls from '../components/meeting/Controls';
import ChatBox from '../components/meeting/ChatBox';
import ParticipantList from '../components/meeting/ParticipantList';
import TranscriptPanel from '../components/ai/TranscriptPanel';
import SummaryCard from '../components/ai/SummaryCard';
import ActionItems from '../components/ai/ActionItems';
import AIAssistant from '../components/ai/AIAssistant';
import { useMeetingStore } from '../store/meeting.store';
import { useWebRTC } from '../hooks/useWebRTC';
import { useAuthStore } from '../store/auth.store';
import Badge from '../components/common/Badge';

type Panel   = 'chat' | 'participants' | 'ai' | 'notes';
type AITab   = 'summary' | 'transcript' | 'actions' | 'assistant';

const PANELS: { id: Panel; label: string; icon: React.ElementType }[] = [
  { id: 'chat',         label: 'Chat',    icon: MessageSquare },
  { id: 'participants', label: 'People',  icon: Users         },
  { id: 'ai',          label: 'AI',      icon: Brain         },
  { id: 'notes',       label: 'Notes',   icon: FileText      },
];

const AI_TABS: { id: AITab; label: string }[] = [
  { id: 'summary',    label: 'Summary'    },
  { id: 'transcript', label: 'Transcript' },
  { id: 'actions',    label: 'Actions'    },
  { id: 'assistant',  label: 'Chat'       },
];

/* ── AI sub-panel ── */
const AIPanel = ({ meetingId }: { meetingId: string }) => {
  const [tab, setTab] = useState<AITab>('summary');
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-0.5 px-2 pt-2 shrink-0" role="tablist" aria-label="AI panel tabs">
        {AI_TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={clsx(
              'flex-1 py-2 text-[10px] font-semibold rounded-lg transition-all relative',
              tab === id
                ? 'text-indigo-300 bg-indigo-500/8'
                : 'text-[#2D3A4A] hover:text-[#64748B] hover:bg-white/[0.03]'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto" role="tabpanel">
        {tab === 'transcript' && <TranscriptPanel />}
        {tab === 'summary'    && <SummaryCard meetingId={meetingId} />}
        {tab === 'actions'    && <ActionItems meetingId={meetingId} />}
        {tab === 'assistant'  && <AIAssistant meetingId={meetingId} />}
      </div>
    </div>
  );
};

/* ── Notes sub-panel ── */
const NotesPanel = () => {
  const [notes, setNotes] = useState('');
  return (
    <div className="p-3 h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#2D3A4A] uppercase tracking-[0.1em]">Meeting Notes</p>
        <button className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Save</button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Type your notes here…"
        aria-label="Meeting notes"
        className={clsx(
          'flex-1 resize-none text-xs text-[#CBD5E1] leading-relaxed',
          'bg-transparent border-none outline-none placeholder:text-[#2D3A4A]',
        )}
        style={{ minHeight: 200 }}
      />
    </div>
  );
};

/* ── Main component ── */
const MeetingRoom = () => {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const { user }   = useAuthStore();

  const [activePanel, setActivePanel] = useState<Panel>('chat');
  const [panelOpen,   setPanelOpen]   = useState(true);

  const { setCurrentMeeting, isRecording, currentMeeting } = useMeetingStore();
  const { localStreamRef } = useWebRTC({ roomId: id ?? '', userId: user?.id ?? '' });

  useEffect(() => {
    if (id) setCurrentMeeting({ id, title: 'Live Meeting', roomId: id, host: user?.id ?? '' });
    return () => setCurrentMeeting(null);
  }, [id, user?.id, setCurrentMeeting]);

  const meetingTitle = currentMeeting?.title ?? 'Meeting';

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050810] overflow-hidden" style={{ zIndex: 'var(--z-max)' }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)] shrink-0" style={{ background: 'rgba(7,7,12,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <Zap size={12} className="text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-[#CBD5E1] hidden sm:block tracking-tight">IntellMeet</span>
          </div>

          <div className="w-px h-4 bg-[rgba(255,255,255,0.08)]" aria-hidden="true" />

          {/* Meeting info */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#F1F5F9] hidden sm:block tracking-tight">{meetingTitle}</p>
            {id && (
              <code className="text-[10px] text-[#2D3A4A] bg-white/[0.04] border border-white/[0.06] rounded-md px-1.5 py-0.5">
                #{id.slice(0, 8)}
              </code>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Recording indicator */}
          {isRecording && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-red-500/22 bg-red-500/7 text-red-400 text-[10px] font-semibold" role="status" aria-live="polite">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-record" aria-hidden="true" />
              REC
            </div>
          )}

          {/* Live badge */}
          <Badge variant="live" dot pulse>Live</Badge>

          <span className="text-xs text-[#3F4D5C] tabular-nums hidden sm:block" aria-label={`Current time: ${now}`}>
            {now}
          </span>

          {/* Toggle panel */}
          <button
            onClick={() => setPanelOpen(v => !v)}
            className="p-1.5 rounded-md text-[#3F4D5C] hover:bg-white/[0.05] hover:text-[#94A3B8] transition-colors"
            aria-label={panelOpen ? 'Close side panel' : 'Open side panel'}
            aria-expanded={panelOpen}
          >
            <ChevronRight size={14} className={clsx('transition-transform duration-200', panelOpen && 'rotate-180')} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">

        {/* Video area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="flex-1 relative overflow-hidden">
            <VideoGrid />
          </div>
          <Controls />
        </div>

        {/* Right panel */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              className="flex flex-col border-l border-[rgba(255,255,255,0.05)] bg-[#09090E] shrink-0 overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 304, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              style={{ minWidth: 0 }}
              aria-label="Meeting side panel"
            >
              {/* Panel tab bar */}
              <div
                className="flex border-b border-[rgba(255,255,255,0.05)] shrink-0"
                role="tablist"
                aria-label="Panel sections"
              >
                {PANELS.map(({ id: pid, label, icon: Icon }) => (
                  <button
                    key={pid}
                    role="tab"
                    aria-selected={activePanel === pid}
                    onClick={() => setActivePanel(pid)}
                    className={clsx(
                      'flex-1 flex flex-col items-center gap-1 py-3 transition-all relative',
                      activePanel === pid
                        ? 'text-indigo-300'
                        : 'text-[#2D3A4A] hover:text-[#64748B]'
                    )}
                    aria-label={label}
                  >
                    {activePanel === pid && (
                      <motion.span
                        layoutId="panelIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-indigo-500 rounded-full"
                      />
                    )}
                    <Icon size={14} aria-hidden="true" />
                    <span className="text-[9px] font-semibold">{label}</span>
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div className="flex-1 overflow-hidden" role="tabpanel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel}
                    className="h-full"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activePanel === 'chat'         && <ChatBox meetingId={id ?? ''} />}
                    {activePanel === 'participants' && <ParticipantList />}
                    {activePanel === 'ai'           && <AIPanel meetingId={id ?? ''} />}
                    {activePanel === 'notes'        && <NotesPanel />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MeetingRoom;
