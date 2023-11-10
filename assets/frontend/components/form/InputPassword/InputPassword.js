import { h, render } from 'preact';
import './InputPassword.scss'; // Adjust the path to your SCSS file

// ... Rest of your imports and component definitions

const InputPassword = ({
  // ... Prop definitions
}) => {
  const toggleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="wrapper"> {/* Use class names instead of styled components */}
      <input
        className={`input ${error ? 'error' : ''}`}
        name={name}
        type={isPasswordVisible ? 'text' : 'password'}
        fullWidth={fullWidth}
        value={value}
        autoComplete='off'
        onChange={onChange}
        placeholder=' '
        {...props}
      />
      <label>{label}</label>
      {name.toLowerCase().includes('password') &&
        (!isPasswordVisible ? (
          <img
            className="password-icon"
            onClick={toggleShowPassword}
            src={icons.eye}
            alt="Password Toggle"
          />
        ) : (
          <img
            className="password-icon"
            onClick={toggleShowPassword}
            src={icons.eye}
            alt="Password Toggle"
          />
        ))}
    </div>
  );
};