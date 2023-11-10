import { h, render } from 'preact';
import './buttonPrimary.scss';

const ButtonPrimary = ({
  text,
  variant = 'primary',
  center = false,
  fullWidth = false,
  startIcon,
  endIcon,
  style,
  onClick,
}) => {
  return (
    <button
      type='submit'
      className={`btn--primary1 ${variant} ${center ? 'center' : ''} ${
        fullWidth ? 'full-width' : ''
      }`}
      style={{ ...style }}
      onClick={onClick ? onClick : () => null}
    >
      {/* {startIcon && <Icon src={icons[startIcon]} />} */}
      <span>{text}</span>
      {/* {endIcon && <Icon src={icons[endIcon]} />} */}
    </button>
  );
};

export { ButtonPrimary };