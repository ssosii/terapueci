import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Tabs } from './Tabs/Tabs';
import { OrderWithRegisterForm } from './OrderWithRegisterForm/OrderWithRegisterForm';
import { OrderLoginForm } from './OrderLoginForm/OrderLoginForm';
import { ForgottenPasswordForm } from '../../../../../../components/auth/ForgottenPasswordForm/ForgottenPasswordForm';


const NotLoggedUserForm = ({ doctorID, appointment ,price }) => {
    const [tab, setTab] = useState("register");
    const [loginPage, setLoginPage] = useState("login");
    console.log("ppp",price);
    return (
        <div>
            <Tabs tab={tab} setTab={setTab} />
            <div>
                {tab === "register" && <OrderWithRegisterForm price={price} doctorID={doctorID} appointment={appointment} />}
                {tab === "login" && (
                    <Fragment>
                        {loginPage === "login" && <OrderLoginForm  page={loginPage} setPage={setLoginPage} />}
                        {loginPage === "forgottenPassword" && <ForgottenPasswordForm  onClick={() => setLoginPage("login")} page={loginPage} setPage={setLoginPage} />}
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export { NotLoggedUserForm }