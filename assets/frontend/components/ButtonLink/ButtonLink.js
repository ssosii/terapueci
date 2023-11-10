import { h, render } from 'preact';
import './buttonLink.scss';

const ButtonLink = ({
  text,
  variant = 'primary',
  center = false,
  fullWidth = false,
  style,
  onClick,
}) => {
  return (
    <div
      className={`btn--link ${variant} ${center ? 'center' : ''} ${
        fullWidth ? 'full-width' : ''
      }`}
      style={{ ...style }}
      onClick={onClick ? onClick : () => null}
    >
      <span>{text}</span>
    </div>
  );
};

export { ButtonLink };