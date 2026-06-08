const Button = ({
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
