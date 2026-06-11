import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'inset' | 'brand' | 'danger' | 'success' | 'warning';
  hover?: boolean;
  interactive?: boolean;
  padding?: string;
  noPadding?: boolean;
}

const VARIANTS = {
  default:
    'bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
  elevated:
    'bg-white border border-gray-200 shadow-[0_4px_6px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)]',
  bordered:
    'bg-white border border-gray-200',
  inset:
    'bg-gray-50 border border-gray-200',
  brand:
    'bg-blue-50 border border-blue-200',
  danger:
    'bg-red-50 border border-red-200',
  success:
    'bg-emerald-50 border border-emerald-200',
  warning:
    'bg-amber-50 border border-amber-200',
};

const HOVER =
  'cursor-pointer ' +
  'hover:border-gray-300 ' +
  'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ' +
  'hover:-translate-y-0.5 ' +
  'transition-all duration-200';

const Card = ({
  variant = 'default',
  hover,
  interactive,
  padding,
  noPadding,
  className,
  children,
  onClick,
  ...rest
}: Props) => (
  <div
    onClick={onClick}
    role={onClick || interactive ? 'button' : undefined}
    tabIndex={onClick || interactive ? 0 : undefined}
    onKeyDown={onClick || interactive
      ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as any); } }
      : undefined}
    className={clsx(
      'rounded-xl',
      VARIANTS[variant],
      !noPadding && (padding || 'p-5'),
      (hover || interactive || onClick) && HOVER,
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
