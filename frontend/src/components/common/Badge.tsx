import { clsx } from 'clsx';

type Variant =
  | 'default' | 'primary' | 'success' | 'danger' | 'warning'
  | 'info' | 'purple' | 'outline' | 'live' | 'ai' | 'recording';

const STYLES: Record<Variant, string> = {
  default:    'bg-gray-100 text-gray-600 border border-gray-200',
  primary:    'bg-blue-50 text-blue-700 border border-blue-200',
  success:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  danger:     'bg-red-50 text-red-700 border border-red-200',
  warning:    'bg-amber-50 text-amber-700 border border-amber-200',
  info:       'bg-blue-50 text-blue-700 border border-blue-200',
  purple:     'bg-purple-50 text-purple-700 border border-purple-200',
  outline:    'bg-transparent text-gray-600 border border-gray-300',
  live:       'badge-live',
  ai:         'badge-ai',
  recording:  'badge-recording',
};

const DOT_COLOR: Partial<Record<Variant, string>> = {
  success:   'bg-emerald-500',
  danger:    'bg-red-500',
  warning:   'bg-amber-500',
  primary:   'bg-blue-500',
  info:      'bg-blue-500',
  live:      'bg-emerald-500',
  recording: 'bg-red-500',
};

interface Props {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
  size?: 'sm' | 'md';
}

const Badge = ({ variant = 'default', children, className, dot, pulse, size = 'sm' }: Props) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
      STYLES[variant],
      className
    )}
  >
    {dot && (
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        {pulse && (
          <span
            className={clsx(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-60',
              DOT_COLOR[variant] || 'bg-current'
            )}
          />
        )}
        <span className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', DOT_COLOR[variant] || 'bg-current')} />
      </span>
    )}
    {children}
  </span>
);

export default Badge;
