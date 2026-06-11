import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hash, Lock, Plus, Send, SmilePlus, Users, ChevronLeft, Settings, Trash2 } from 'lucide-react';
import { teamService, type Team, type Channel } from '../services/team.service';
import { channelService, type Message } from '../services/channel.service';
import { useAppSelector } from '../hooks/useAppDispatch';
import { toChannel } from '../constants';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

const ChannelView = ({ channel, teamId }: { channel: Channel; teamId: string }) => {
  const qc = useQueryClient();
  const user = useAppSelector((s) => s.auth.user);
  const [content, setContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: msgData, isLoading } = useQuery({
    queryKey: ['messages', channel._id],
    queryFn: () => channelService.getMessages(channel._id).then((r: any) => r.data as { data: Message[] }),
    refetchInterval: 5000,
  });

  const messages = msgData?.data ?? [];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);

  const sendMutation = useMutation({
    mutationFn: () => channelService.sendMessage(channel._id, { content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['messages', channel._id] });
      setContent('');
    },
    onError: () => toast.error('Failed to send message'),
  });

  const deleteMsgMutation = useMutation({
    mutationFn: (msgId: string) => channelService.deleteMessage(channel._id, msgId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages', channel._id] }),
  });

  const reactMutation = useMutation({
    mutationFn: ({ msgId, emoji }: { msgId: string; emoji: string }) =>
      channelService.toggleReaction(channel._id, msgId, emoji),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages', channel._id] }),
  });

  const handleSend = () => {
    if (!content.trim()) return;
    sendMutation.mutate();
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      {/* Channel header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)] flex-shrink-0">
        {channel.type === 'private' ? <Lock size={16} className="text-[var(--color-text-muted)]" /> : <Hash size={16} className="text-[var(--color-text-muted)]" />}
        <div>
          <p className="font-semibold text-[var(--color-text)] text-sm">{channel.name}</p>
          {channel.description && <p className="text-xs text-[var(--color-text-dim)]">{channel.description}</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full"><Loader /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Hash size={32} className="text-[var(--color-text-dim)]" />
            <p className="text-sm text-[var(--color-text-muted)]">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={clsx('flex gap-3 group', msg.sender._id === user?._id && 'flex-row-reverse')}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {msg.sender.name.charAt(0).toUpperCase()}
              </div>
              <div className={clsx('flex flex-col gap-1 max-w-[70%]', msg.sender._id === user?._id && 'items-end')}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">{msg.sender.name}</span>
                  <span className="text-[10px] text-[var(--color-text-dim)]">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={clsx(
                  'px-3 py-2 rounded-xl text-sm',
                  msg.isDeleted
                    ? 'italic text-[var(--color-text-dim)] bg-transparent'
                    : msg.sender._id === user?._id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface-2)] text-[var(--color-text)]'
                )}>
                  {msg.content}
                  {msg.isEdited && !msg.isDeleted && <span className="text-[10px] opacity-60 ml-1">(edited)</span>}
                </div>
                {/* Reactions */}
                {msg.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {msg.reactions.map((r) => (
                      <button
                        key={r.emoji}
                        onClick={() => reactMutation.mutate({ msgId: msg._id, emoji: r.emoji })}
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs hover:border-[var(--color-primary)]/50 transition-colors"
                      >
                        <span>{r.emoji}</span>
                        <span className="text-[var(--color-text-dim)]">{r.users.length}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Actions */}
              {msg.sender._id === user?._id && !msg.isDeleted && (
                <button
                  onClick={() => deleteMsgMutation.mutate(msg._id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-text-dim)] hover:text-red-400 transition-all self-start mt-6"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-end gap-3 bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)] px-3 py-2 focus-within:border-[var(--color-primary)]/50 transition-colors">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={`Message #${channel.name}`}
            rows={1}
            className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder-[var(--color-text-dim)] resize-none outline-none max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || sendMutation.isPending}
            className="p-1.5 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 disabled:opacity-40 transition-opacity flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Channels = () => {
  const { id: teamId, channelId } = useParams<{ id: string; channelId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', type: 'public' as 'public' | 'private' });

  const { data: team, isLoading: teamLoading } = useQuery<Team>({
    queryKey: ['team', teamId],
    queryFn: () => teamService.getById(teamId!).then((r: any) => r.data),
    enabled: !!teamId,
  });

  const { data: channels = [], isLoading: chLoading } = useQuery<Channel[]>({
    queryKey: ['channels', teamId],
    queryFn: () => teamService.listChannels(teamId!).then((r: any) => r.data),
    enabled: !!teamId,
  });

  const activeChannel = channels.find((c) => c._id === channelId) ?? channels[0] ?? null;

  // Auto-navigate to first channel
  useEffect(() => {
    if (!channelId && channels.length > 0 && teamId) {
      navigate(toChannel(teamId, channels[0]._id), { replace: true });
    }
  }, [channels, channelId, teamId]);

  const createChannelMutation = useMutation({
    mutationFn: (data: typeof form) => teamService.createChannel(teamId!, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['channels', teamId] });
      toast.success('Channel created!');
      setShowCreate(false);
      setForm({ name: '', description: '', type: 'public' });
    },
    onError: () => toast.error('Failed to create channel'),
  });

  if (teamLoading || chLoading) return <Loader fullPage />;

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 animate-fade-in">
      {/* Channel sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        {/* Team header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
          <button onClick={() => navigate('/teams')} className="p-1 rounded hover:bg-[var(--color-surface-2)] text-[var(--color-text-dim)]">
            <ChevronLeft size={15} />
          </button>
          <p className="font-semibold text-sm text-[var(--color-text)] truncate flex-1">{team?.name}</p>
          <span className="text-xs text-[var(--color-text-dim)]">
            <Users size={13} />
          </span>
        </div>

        {/* Channel list */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider">Channels</span>
            <button onClick={() => setShowCreate(true)} className="p-0.5 rounded hover:bg-[var(--color-surface-2)] text-[var(--color-text-dim)]">
              <Plus size={13} />
            </button>
          </div>
          {channels.map((ch) => (
            <button
              key={ch._id}
              onClick={() => navigate(toChannel(teamId!, ch._id))}
              className={clsx(
                'flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors',
                ch._id === activeChannel?._id
                  ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-medium'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]'
              )}
            >
              {ch.type === 'private' ? <Lock size={13} /> : <Hash size={13} />}
              <span className="truncate">{ch.name}</span>
              {ch.isDefault && (
                <span className="ml-auto text-[9px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-1.5 py-0.5 rounded-full">default</span>
              )}
            </button>
          ))}
        </div>

        {/* Team members count */}
        <div className="px-4 py-3 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-dim)] flex items-center gap-1.5">
            <Users size={12} />
            {team?.members?.length ?? 0} members
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {activeChannel ? (
          <ChannelView channel={activeChannel} teamId={teamId!} />
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-3">
            <Hash size={36} className="text-[var(--color-text-dim)]" />
            <p className="text-[var(--color-text-muted)]">Select or create a channel</p>
            <Button onClick={() => setShowCreate(true)} className="gap-2"><Plus size={14} /> Create Channel</Button>
          </div>
        )}
      </main>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Channel">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Channel Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. general"
              className="input-dark"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Description</label>
            <input
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What is this channel for?"
              className="input-dark"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Type</label>
            <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as any }))} className="input-dark">
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button
              className="flex-1"
              onClick={() => createChannelMutation.mutate(form)}
              disabled={!form.name.trim() || createChannelMutation.isPending}
            >
              {createChannelMutation.isPending ? 'Creating...' : 'Create Channel'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Channels;
