import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline' | 'soft' | 'muted';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const BASE =
  'relative inline-flex items-center justify-center font-medium transition-all ' +
  'select-none cursor-pointer outline-none shrink-0 whitespace-nowrap ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/40 ' +
  'focus-visible:ring-offset-2';

const VARIANTS = {
  primary:
    'bg-blue-600 text-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.12)] ' +
    'hover:bg-blue-700 hover:shadow-[0_2px_8px_rgba(37,99,235,0.22)] ' +
    'active:bg-blue-800 duration-150',
  secondary:
    'bg-white text-gray-700 border border-gray-200 ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.06)] ' +
    'hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 duration-150',
  ghost:
    'bg-transparent text-gray-600 ' +
    'hover:bg-gray-100 hover:text-gray-900 duration-150',
  danger:
    'bg-red-600 text-white border border-red-700/20 ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.08)] ' +
    'hover:bg-red-700 hover:shadow-[0_2px_8px_rgba(239,68,68,0.2)] duration-150',
  success:
    'bg-emerald-600 text-white border border-emerald-700/20 ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.08)] ' +
    'hover:bg-emerald-700 duration-150',
  outline:
    'bg-white text-blue-600 border border-blue-200 ' +
    'hover:bg-blue-50 hover:border-blue-300 duration-150',
  soft:
    'bg-blue-50 text-blue-700 border border-blue-100 ' +
    'hover:bg-blue-100 hover:border-blue-200 duration-150',
  muted:
    'bg-gray-100 text-gray-600 border border-gray-200/60 ' +
    'hover:bg-gray-200 hover:text-gray-800 duration-150',
};

const SIZES = {
  xs:       'h-7  px-2.5  text-xs     rounded-md  gap-1    font-medium',
  sm:       'h-8  px-3    text-sm     rounded-lg  gap-1.5  font-medium',
  md:       'h-9  px-4    text-sm     rounded-lg  gap-2    font-medium',
  lg:       'h-11 px-5    text-[15px] rounded-xl  gap-2    font-medium',
  'icon-xs':  'h-7  w-7    text-sm rounded-md',
  'icon-sm':  'h-8  w-8    text-sm rounded-lg',
  'icon-md':  'h-9  w-9    text-sm rounded-lg',
  'icon-lg':  'h-11 w-11   text-sm rounded-xl',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  loading,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...rest
}: Props) => (
  <button
    className={clsx(BASE, VARIANTS[variant], SIZES[size], className)}
    disabled={disabled || loading}
    aria-busy={loading}
    {...rest}
  >
    {loading ? (
      <Loader2 size={14} className="animate-spin shrink-0" aria-hidden="true" />
    ) : leftIcon ? (
      <span className="shrink-0 flex items-center" aria-hidden="true">{leftIcon}</span>
    ) : null}
    {children}
    {!loading && rightIcon && (
      <span className="shrink-0 flex items-center" aria-hidden="true">{rightIcon}</span>
    )}
  </button>
);

export default Button;
