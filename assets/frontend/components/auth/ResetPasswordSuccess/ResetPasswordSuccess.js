import { h, render, Fragment } from 'preact';
import { ButtonPrimary } from "../../ButtonPrimary/ButtonPrimary"

const ResetPasswordSuccess = ({ onClick }) => {
    return (
        <div>

            <h2 class="main--title --center">Hasło zostało zmienione.</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonPrimary onClick={onClick} text="Zaloguj się" />
            </div>
        </div>
    )
}

export { ResetPasswordSuccess }