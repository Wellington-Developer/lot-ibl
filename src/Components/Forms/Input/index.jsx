// Styles
import './styles.css';

export const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{ label }</label>
      <input 
        onChange={onChange}
        value={value}
        id={name}
        type={type}
        className="input"
        name={name}
        onBlur={onBlur}
      ></input>
      {
        error && <p className="error">{error}</p>
      }
    </div>
  )
}