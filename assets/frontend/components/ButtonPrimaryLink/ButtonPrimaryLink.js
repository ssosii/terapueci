import { h, render } from 'preact';
import './buttonPrimaryLink.scss';

const ButtonPrimaryLink = ({
    text,
    variant = 'primary',
    center = false,
    fullWidth = false,
    style,
    href
}) => {
    return (
        <a href={href}
            type='submit'
            className={`btn--primary-link ${variant} ${center ? 'center' : ''} ${fullWidth ? 'full-width' : ''
                }`}
            style={{ ...style }}
        >

            {text}
        </a>
    );
};

export { ButtonPrimaryLink };