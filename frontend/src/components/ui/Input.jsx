const Input = ({ label, id, className = '', ...props }) => (
  <div className="input-wrapper">
    {label && <label htmlFor={id} className="input-label">{label}</label>}
    <input id={id} className={`input ${className}`} {...props} />
  </div>
);

export default Input;
