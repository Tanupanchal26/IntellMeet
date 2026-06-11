import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import {
  Brain, Sparkles, FileText, Download, Search,
  Loader2, Mic, Bot, Video, ArrowRight, Hash,
  CheckCircle2, Send,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader, { SkeletonBlock } from '../components/common/Loader';
import { aiService } from '../services/ai.service';
import { useAIStore } from '../store/ai.store';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const CAPABILITIES = [
  { icon: Mic,       label: 'Transcription',    color: 'text-blue-400',   bg: 'bg-blue-500/8',   border: 'border-blue-500/12' },
  { icon: Sparkles,  label: 'Summarization',    color: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/12' },
  { icon: CheckCircle2, label: 'Action Items',  color: 'text-emerald-400',bg: 'bg-emerald-500/8',border: 'border-emerald-500/12' },
  { icon: FileText,  label: 'Minutes',          color: 'text-amber-400',  bg: 'bg-amber-500/8',  border: 'border-amber-500/12' },
  { icon: Bot,       label: 'AI Assistant',     color: 'text-pink-400',   bg: 'bg-pink-500/8',   border: 'border-pink-500/12' },
  { icon: Search,    label: 'Semantic Search',  color: 'text-cyan-400',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/12' },
];

const PROMPT_SUGGESTIONS = [
  'What were the key decisions made?',
  'Who is responsible for what action items?',
  'Summarise the main blockers discussed',
  'What was agreed about the timeline?',
];

const AISummary = () => {
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab]     = useState<'summary' | 'actions' | 'minutes'>('summary');
  const [chatMsg, setChatMsg]         = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching]     = useState(false);

  const store = useAIStore();

  const { data: meetingData, isLoading } = useQuery({
    queryKey: ['meetings-ai'],
    queryFn: () =>
      import('../services/meeting.service').then((m) =>
        m.meetingService.getAll({ limit: 30, status: 'ended' }).then((r: any) => r.data)
      ),
  });
  const meetings: any[] = meetingData?.data ?? [];

  const { data: aiResult, isLoading: aiLoading } = useQuery({
    queryKey: ['ai-result', selectedId],
    queryFn: () => aiService.getResult(selectedId!).then((r) => r.data),
    enabled: !!selectedId,
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const { data } = await aiService.searchMeetings(searchQuery);
      setSearchResults(data.results);
    } catch {
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedId) return;
    store.setGenerating(true);
    try {
      const { data: s } = await aiService.generateSummary(selectedId);
      store.setSummary(s.summary);
      const { data: a } = await aiService.getActionItems(selectedId);
      store.setActionItems(a.actionItems);
      toast.success('Summary generated');
    } catch {
      toast.error('Failed to generate summary');
    } finally {
      store.setGenerating(false);
    }
  };

  const handleGenerateMinutes = async () => {
    if (!selectedId) return;
    try {
      const { data } = await aiService.generateMinutes(selectedId);
      store.setMinutes(data.minutes);
      setActiveTab('minutes');
      toast.success('Minutes generated');
    } catch {
      toast.error('Failed to generate minutes');
    }
  };

  const handleChat = async (msg: string) => {
    if (!msg.trim() || !selectedId) return;
    setChatMsg('');
    setChatLoading(true);
    const updated = [...chatHistory, { role: 'user', content: msg }];
    setChatHistory(updated);
    try {
      const { data } = await aiService.assistantChat(selectedId, msg, chatHistory);
      setChatHistory([...updated, { role: 'assistant', content: data.reply }]);
    } catch {
      toast.error('Assistant error');
    } finally {
      setChatLoading(false);
    }
  };

  const downloadMarkdown = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const displaySummary = aiResult?.summary || store.summary;
  const displayMinutes = aiResult?.minutes || store.minutes;
  const displayActions = aiResult?.actionItems?.length ? aiResult.actionItems : store.actionItems;

  if (isLoading) return <Loader fullPage />;

  return (
    <div className="flex flex-col gap-5 animate-fade-in max-w-[1200px]">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-heading-lg text-[#F8FAFC]">AI Meeting Intelligence</h1>
          <p className="text-sm text-[#475569] mt-0.5">
            Transcripts, summaries, and action items — powered by GPT-4o
          </p>
        </div>
        <Badge variant="ai" dot pulse>GPT-4o</Badge>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {CAPABILITIES.map(({ icon: Icon, label, color, bg, border }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${border} ${bg} text-center`}
          >
            <Icon size={14} className={color} />
            <span className="text-[10px] font-medium text-[#94A3B8] leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Semantic search */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Search size={13} className="text-indigo-400" />
          <span className="text-sm font-semibold text-[#CBD5E1]">Semantic Search</span>
          <span className="text-[10px] text-[#475569]">— search by meaning, not keywords</span>
        </div>
        <div className="flex gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. What was decided about the infrastructure rollout?"
            className={clsx(
              'flex-1 h-8 px-3 text-xs bg-white/[0.03] border border-[rgba(255,255,255,0.07)] rounded-lg',
              'text-[#CBD5E1] placeholder:text-[#334155] outline-none',
              'focus:border-indigo-500/40 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all'
            )}
          />
          <Button
            size="sm"
            onClick={handleSearch}
            loading={searching}
            leftIcon={<Search size={12} />}
          >
            Search
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-3 flex flex-col gap-1.5">
            {searchResults.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-[rgba(255,255,255,0.05)] cursor-pointer hover:border-indigo-500/20 hover:bg-indigo-500/4 transition-all"
              >
                <Video size={12} className="text-indigo-400 shrink-0" />
                <p className="text-xs text-[#94A3B8] flex-1 truncate">{r.title}</p>
                <span className="text-[9px] text-[#334155]">{new Date(r.date).toLocaleDateString()}</span>
                <Badge variant="primary">{Math.round(r.score * 100)}%</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">

        {/* Meeting list */}
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold text-[#334155] uppercase tracking-wider mb-1">Past Meetings</p>
          {meetings.length === 0 ? (
            <p className="text-xs text-[#334155]">No ended meetings yet</p>
          ) : (
            meetings.map((m: any) => (
              <button
                key={m._id}
                onClick={() => { setSelectedId(m._id); store.clearAI(); setChatHistory([]); }}
                className={clsx(
                  'flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all group w-full',
                  selectedId === m._id
                    ? 'bg-indigo-500/8 border border-indigo-500/20 text-[#F8FAFC]'
                    : 'hover:bg-white/[0.03] border border-transparent text-[#94A3B8] hover:text-[#CBD5E1]'
                )}
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500/8 flex items-center justify-center shrink-0">
                  <Video size={11} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{m.title}</p>
                  <p className="text-[10px] text-[#334155] mt-0.5">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail area */}
        <div className="flex flex-col gap-4">
          {!selectedId ? (
            <Card className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/8 border border-purple-500/12 flex items-center justify-center">
                <Brain size={20} className="text-purple-400 opacity-60" />
              </div>
              <p className="text-sm text-[#475569]">Select a meeting to view AI intelligence</p>
            </Card>
          ) : aiLoading ? (
            <Card className="flex flex-col gap-4 py-8 items-center">
              <Loader size="lg" />
              <p className="text-xs text-[#475569]">Loading AI data…</p>
            </Card>
          ) : (
            <>
              {/* Action bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  loading={store.isGenerating}
                  leftIcon={<Sparkles size={12} />}
                  onClick={handleGenerateSummary}
                >
                  Generate Summary
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<FileText size={12} />}
                  onClick={handleGenerateMinutes}
                >
                  Minutes
                </Button>
                {displaySummary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Download size={12} />}
                    className="ml-auto text-[#475569]"
                    onClick={() => downloadMarkdown(displaySummary, 'summary.md')}
                  >
                    Export
                  </Button>
                )}
              </div>

              {/* Tab switcher */}
              <div className="flex gap-px p-1 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] w-fit">
                {(['summary', 'actions', 'minutes'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                      activeTab === tab
                        ? 'bg-[#111119] text-[#F8FAFC] shadow-sm'
                        : 'text-[#475569] hover:text-[#94A3B8]'
                    )}
                  >
                    {tab}
                    {tab === 'actions' && displayActions.length > 0 && (
                      <span className="ml-1.5 px-1 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-[9px]">
                        {displayActions.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <Card>
                {activeTab === 'summary' && (
                  displaySummary ? (
                    <div className="prose prose-sm prose-invert max-w-none text-[#94A3B8] text-xs leading-relaxed [&_h2]:text-xs [&_h2]:font-semibold [&_h2]:text-[#CBD5E1] [&_h2]:mt-4 [&_h2]:mb-2 [&_ul]:pl-4 [&_li]:my-0.5">
                      <ReactMarkdown>{displaySummary}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-12">
                      <Sparkles size={24} className="text-[#334155]" />
                      <p className="text-sm text-[#475569]">Click "Generate Summary" to analyse this meeting</p>
                    </div>
                  )
                )}

                {activeTab === 'actions' && (
                  displayActions.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {displayActions.map((a: any, i: number) => (
                        <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-[rgba(255,255,255,0.05)]">
                          <div className={clsx(
                            'w-1.5 h-1.5 rounded-full shrink-0 mt-1.5',
                            a.priority === 'high' ? 'bg-red-400' : a.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#CBD5E1]">{a.text}</p>
                            {a.assignee && (
                              <p className="text-[10px] text-[#475569] mt-0.5">→ {a.assignee}</p>
                            )}
                          </div>
                          <span className={clsx(
                            'text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0',
                            a.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                            a.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-emerald-500/10 text-emerald-400'
                          )}>
                            {a.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-12">
                      <CheckCircle2 size={24} className="text-[#334155]" />
                      <p className="text-sm text-[#475569]">Generate a summary to extract action items</p>
                    </div>
                  )
                )}

                {activeTab === 'minutes' && (
                  displayMinutes ? (
                    <div className="prose prose-sm prose-invert max-w-none text-[#94A3B8] text-xs leading-relaxed">
                      <ReactMarkdown>{displayMinutes}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-12">
                      <FileText size={24} className="text-[#334155]" />
                      <p className="text-sm text-[#475569]">Click "Minutes" to generate formal meeting minutes</p>
                    </div>
                  )
                )}
              </Card>

              {/* AI Chat */}
              <Card noPadding>
                <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                  <Bot size={13} className="text-purple-400" />
                  <span className="text-sm font-semibold text-[#CBD5E1]">Ask about this meeting</span>
                </div>

                {/* Prompt suggestions */}
                {chatHistory.length === 0 && (
                  <div className="flex flex-wrap gap-2 p-4 pb-0">
                    {PROMPT_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleChat(s)}
                        className="text-[10px] text-[#64748B] bg-white/[0.03] border border-[rgba(255,255,255,0.06)] rounded-lg px-2.5 py-1.5 hover:bg-white/[0.06] hover:text-[#94A3B8] transition-all text-left"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Chat history */}
                {chatHistory.length > 0 && (
                  <div className="flex flex-col gap-3 p-4 max-h-64 overflow-y-auto">
                    {chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={clsx(
                          'flex gap-2 text-xs leading-relaxed',
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-5 h-5 rounded-full bg-purple-500/12 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot size={10} className="text-purple-400" />
                          </div>
                        )}
                        <div className={clsx(
                          'max-w-[85%] px-3 py-2 rounded-xl',
                          msg.role === 'user'
                            ? 'bg-indigo-500/10 border border-indigo-500/15 text-[#CBD5E1] rounded-br-sm'
                            : 'bg-white/[0.04] border border-[rgba(255,255,255,0.06)] text-[#94A3B8] rounded-bl-sm'
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-500/12 flex items-center justify-center shrink-0">
                          <Bot size={10} className="text-purple-400" />
                        </div>
                        <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Input */}
                <div className="flex items-center gap-2 p-3 border-t border-[rgba(255,255,255,0.05)]">
                  <input
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleChat(chatMsg)}
                    placeholder="Ask anything about this meeting…"
                    disabled={!selectedId || chatLoading}
                    className={clsx(
                      'flex-1 h-8 px-3 text-xs bg-white/[0.03] border border-[rgba(255,255,255,0.07)] rounded-lg',
                      'text-[#CBD5E1] placeholder:text-[#334155] outline-none',
                      'focus:border-indigo-500/40 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all'
                    )}
                  />
                  <button
                    onClick={() => handleChat(chatMsg)}
                    disabled={!chatMsg.trim() || chatLoading}
                    className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {chatLoading ? (
                      <Loader2 size={13} className="text-white animate-spin" />
                    ) : (
                      <Send size={13} className="text-white" />
                    )}
                  </button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISummary;
