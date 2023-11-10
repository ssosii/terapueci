import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Tabs } from './Tabs/Tabs';
import { OrderWithRegisterForm } from './OrderWithRegisterForm/OrderWithRegisterForm';
import { OrderLoginForm } from './OrderLoginForm/OrderLoginForm';
import { ForgottenPasswordForm } from '../../../../../../../components/auth/ForgottenPasswordForm/ForgottenPasswordForm';

const NotLoggedUserForm = () => {
    const [tab, setTab] = useState("register");
    const [loginPage, setLoginPage] = useState("login");
    return (
        <div>
            <Tabs tab={tab} setTab={setTab} />
            <div>
                {tab === "register" && <OrderWithRegisterForm />}
                {tab === "login" && (<Fragment>

                    {loginPage === "login" && <OrderLoginForm page={loginPage} setPage={setLoginPage} />}
                    {loginPage === "forgottenPassword" && <ForgottenPasswordForm onClick={() => setLoginPage("login")} page={loginPage} setPage={setLoginPage} />}

                </Fragment>)}
            </div>
        </div>
    )
}

export { NotLoggedUserForm }