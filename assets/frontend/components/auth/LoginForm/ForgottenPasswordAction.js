import { h, render, Fragment } from 'preact';
import { ButtonLink } from '../../ButtonLink/ButtonLink';

const ForgottenPasswordAction = ({ onClick, style = {} }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
            <ButtonLink onClick={onClick} text="Przypomnij hasło" />
        </div>
    )
}

export { ForgottenPasswordAction }