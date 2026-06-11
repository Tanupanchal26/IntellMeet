import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Check, CheckCheck, Trash2, Video, Users, AtSign, CheckSquare, Info, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService, type Notification } from '../services/notification.service';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { SkeletonCard } from '../components/common/Loader';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

const ICONS: Record<string, React.ElementType> = {
  meeting_invite: Video, meeting_started: Video, meeting_ended: Video, meeting_reminder: Video,
  team_invite: Users, team_role_changed: Users,
  channel_mention: AtSign, message_reply: AtSign,
  task_assigned: CheckSquare, task_due: CheckSquare,
  system: Info,
};

const ICON_STYLE: Record<string, string> = {
  meeting_invite: 'bg-indigo-500/9 text-indigo-400', meeting_started: 'bg-emerald-500/9 text-emerald-400',
  meeting_ended: 'bg-white/[0.04] text-[#3F4D5C]', meeting_reminder: 'bg-amber-500/9 text-amber-400',
  team_invite: 'bg-blue-500/9 text-blue-400', team_role_changed: 'bg-orange-500/9 text-orange-400',
  channel_mention: 'bg-violet-500/9 text-violet-400', message_reply: 'bg-violet-500/9 text-violet-400',
  task_assigned: 'bg-blue-500/9 text-blue-400', task_due: 'bg-red-500/9 text-red-400',
  system: 'bg-white/[0.04] text-[#3F4D5C]',
};

const timeAgo = (iso: string) => {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
};

type Filter = 'all' | 'unread' | 'meetings' | 'tasks' | 'mentions';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',      label: 'All' },
  { id: 'unread',   label: 'Unread' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'tasks',    label: 'Tasks' },
  { id: 'mentions', label: 'Mentions' },
];

const filterNotif = (n: Notification, f: Filter) => {
  if (f === 'unread')   return !n.isRead;
  if (f === 'meetings') return n.type.startsWith('meeting');
  if (f === 'tasks')    return n.type.startsWith('task');
  if (f === 'mentions') return n.type.includes('mention') || n.type.includes('reply');
  return true;
};

const Notifications = () => {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<Filter>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.list({ limit: 50 }).then((r: any) => r.data as { data: Notification[]; unread: number }),
    refetchInterval: 30000,
  });

  const notifications = (data?.data ?? []).filter(n => filterNotif(n, filter));
  const unreadCount   = data?.unread ?? 0;

  const markRead = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAll = useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
  });

  const del = useMutation({
    mutationFn: (id: string) => notificationService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  return (
    <div className="flex flex-col gap-5 max-w-2xl w-full">

      {/* Header */}
      <motion.div
        className="flex items-center justify-between flex-wrap gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-h3 text-[#F1F5F9]">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="primary">{unreadCount} unread</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<CheckCheck size={13} />}
            onClick={() => markAll.mutate()}
            loading={markAll.isPending}
          >
            Mark all read
          </Button>
        )}
      </motion.div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] self-start"
        role="tablist"
        aria-label="Notification filters"
      >
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={filter === id}
            onClick={() => setFilter(id)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              filter === id
                ? 'bg-[#1A1A28] text-[#CBD5E1] border border-[rgba(255,255,255,0.07)] shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
                : 'text-[#3F4D5C] hover:text-[#64748B]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col gap-3" aria-label="Loading notifications">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && notifications.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-20 gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
            <Bell size={24} className="text-[#2D3A4A]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#3F4D5C]">
              {filter === 'all' ? 'All caught up' : `No ${filter} notifications`}
            </p>
            <p className="text-xs text-[#2D3A4A] mt-1">
              {filter === 'all' ? "You're up to date. Check back later." : `No notifications match this filter.`}
            </p>
          </div>
          {filter !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setFilter('all')}>View all</Button>
          )}
        </motion.div>
      )}

      {/* Notifications list */}
      {!isLoading && notifications.length > 0 && (
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0F0F18] overflow-hidden divide-y divide-[rgba(255,255,255,0.04)]"
          role="list"
          aria-label="Notifications"
        >
          <AnimatePresence>
            {notifications.map((notif, i) => {
              const Icon      = ICONS[notif.type] ?? Info;
              const iconStyle = ICON_STYLE[notif.type] ?? 'bg-white/[0.04] text-[#3F4D5C]';
              return (
                <motion.div
                  key={notif._id}
                  role="listitem"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6, height: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.025 }}
                  className={clsx(
                    'flex items-start gap-4 p-4 group transition-colors relative',
                    notif.isRead
                      ? 'hover:bg-white/[0.02]'
                      : 'bg-indigo-500/[0.035] hover:bg-indigo-500/[0.06]'
                  )}
                >
                  {/* Unread indicator */}
                  {!notif.isRead && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-indigo-500 rounded-r-full"
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', iconStyle)}
                    aria-hidden="true"
                  >
                    <Icon size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={clsx(
                          'text-sm font-medium tracking-tight',
                          notif.isRead ? 'text-[#64748B]' : 'text-[#CBD5E1]'
                        )}>
                          {notif.title}
                        </p>
                        {notif.body && (
                          <p className="text-xs text-[#3F4D5C] mt-0.5 line-clamp-2 leading-relaxed">
                            {notif.body}
                          </p>
                        )}
                      </div>
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" aria-label="Unread" />
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="text-[10px] text-[#2D3A4A] font-medium">{timeAgo(notif.createdAt)}</span>
                      {notif.actor && (
                        <>
                          <span className="text-[#2D3A4A] text-[10px]">·</span>
                          <span className="text-[10px] text-[#2D3A4A]">by {notif.actor.name}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
                    {!notif.isRead && (
                      <button
                        onClick={() => markRead.mutate(notif._id)}
                        className="p-1.5 rounded-lg text-[#2D3A4A] hover:text-emerald-400 hover:bg-emerald-400/8 transition-all"
                        aria-label="Mark as read"
                      >
                        <Check size={13} />
                      </button>
                    )}
                    <button
                      onClick={() => del.mutate(notif._id)}
                      className="p-1.5 rounded-lg text-[#2D3A4A] hover:text-red-400 hover:bg-red-400/8 transition-all"
                      aria-label="Delete notification"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Notifications;
