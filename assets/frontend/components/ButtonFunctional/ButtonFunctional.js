
import { h, render } from 'preact';
import './buttonFunctional.scss';


const variants = {
    blue: { color: "white", background: '#4259A9' },
    green: { color: "#0A2100", background: "#BBF294" }
}

const ButtonFunctional = ({
    onClick,
    text,
    variant = 'blue',
    style = {},
    isRounded = false,
    icon = "plus",
    fullWidth=false
}) => {
    return (
        <button onClick={() => onClick ? onClick(true) : null} className={`btn--functional ${isRounded ? "--rounded" : ""} ${fullWidth ? "--full-width" : ""}`} style={{ background: variants[variant].background, color: variants[variant].color, ...style }}>
            {icon === "plus" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15 9.75H9.75V15H8.25V9.75H3V8.25H8.25V3H9.75V8.25H15V9.75Z" fill={variants[variant].color} />
                </svg>
            )}
            {icon === "minus" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 13V11H17V13H7Z" fill={variants[variant].color} />
                </svg>
            )}
   
            {text}
        </button>
    );
};

export { ButtonFunctional };