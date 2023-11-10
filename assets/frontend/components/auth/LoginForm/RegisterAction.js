import { h, render, Fragment } from 'preact';
import { ButtonLink } from '../../ButtonLink/ButtonLink';

const RegisterAction = ({ onClick, style = {} }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
            <div className="text">Nie masz konta?</div>
            <ButtonLink onClick={onClick} text="Zarejestruj się" />
        </div>
    )
}

export { RegisterAction }