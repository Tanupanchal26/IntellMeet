import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  ...props
}) => (
  <button
    className={`btn btn--${variant} btn--${size} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? <span className="btn-spinner" /> : children}
  </button>
);

export default Button;
