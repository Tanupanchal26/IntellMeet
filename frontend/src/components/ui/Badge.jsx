const Badge = ({ children, variant = 'purple', className = '' }) => (
  <span className={`badge badge--${variant} ${className}`}>{children}</span>
);

export default Badge;
