import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { RegisterForm } from "./../../components/auth/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/auth/LoginForm/LoginForm";
import { Preview } from "./subcomponents/Preview/Preview";
import { ForgottenPasswordForm } from "../../components/auth/ForgottenPasswordForm/ForgottenPasswordForm";
import "./auth.scss";
import { SocialButtons } from '../../components/auth/SocialButtons/SocialButtons';
import { ResetPasswordForm } from '../../components/auth/ResetPassword/ResetPasswordForm';
import { ButtonPrimary } from '../../components/ButtonPrimary/ButtonPrimary';
import { ResetPasswordSuccess } from '../../components/auth/ResetPasswordSuccess/ResetPasswordSuccess';


const Auth = () => {
    const [page, setPage] = useState();

    const onChangePage = (pathname) => {
        window.history.replaceState(null, "", pathname)
        setPage(pathname);
    }

    useEffect(() => {
        const {
            pathname
        } = window.location

        setPage(pathname);

    }, []);


    console.log

    return (
        <div className='container'>
            <div className="auth--component">
                <div className="content">
                    <div className="cover">

                    </div>
                    <div className="auth--form">
                        {page === "/zaloz-konto" && (
                            <Fragment>
                                <h2 class="main--title --center">Załóż konto</h2>
                                <RegisterForm setPage={onChangePage} />
                            </Fragment>
                        )}
                        {page === "/zaloguj-sie" && (
                            <Fragment>
                                <h2 class="main--title --center">Zaloguj się</h2>
                                <LoginForm setPage={onChangePage} />
                            </Fragment>
                        )}
                        {page === "/przypomnij-haslo" && (
                            <Fragment> <h2 class="main--title --center">Zresetuj swoje hasło</h2>
                                <ForgottenPasswordForm onClick={() => onChangePage("/zaloguj-sie")} />
                            </Fragment>
                        )}
                        {page && page.includes("resetuj-haslo") && (
                            <Fragment> 
                                <ResetPasswordForm onClick={() => onChangePage("/zmieniono-haslo")} />
                            </Fragment>
                        )}
                        {page === "/zmieniono-haslo" && (
                            <Fragment>
                                <ResetPasswordSuccess onClick={() => onChangePage("/zaloguj-sie")} />
            
                            </Fragment>
                        )}
                    </div>

                </div>
                <div className="preview">
                    <Preview />
                </div>
            </div>
        </div>

    )
}

export { Auth }


render(<Auth />, document.querySelector('#auth'));