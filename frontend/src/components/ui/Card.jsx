const Card = ({ children, glass = false, className = '', ...props }) => (
  <div className={`card ${glass ? 'card--glass' : ''} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
