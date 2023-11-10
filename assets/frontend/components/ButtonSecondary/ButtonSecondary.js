import { h, render } from 'preact';
import './buttonSecondary.scss';

const ButtonSecondary = ({
    text,
    center = false,
    fullWidth = false,
    style,
    onClick,
}) => {
    return (
        <button
            type='submit'
            className={`btn--secondary ${center ? '--center' : ''} ${fullWidth ? '--full-width' : ''
                }`}
            style={{ ...style }}
            onClick={onClick ? onClick : () => null}
        >
            <span>{text}</span>
        </button>
    );
};

export { ButtonSecondary };