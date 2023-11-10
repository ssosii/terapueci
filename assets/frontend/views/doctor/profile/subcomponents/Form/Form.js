import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { NotLoggedUserForm } from './components/NotLoggedUserForm/NotLoggedUserForm';
import { LoggedUserForm } from './components/LoggedUserForm/LoggedUserForm';

const Form = ({ isLogged }) => {
    // const [, setValue] = useState("");

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };


    return (
        <div>
            <div className="form">
                {isLogged ? (
                    <LoggedUserForm />
                ) : (
                    <NotLoggedUserForm />
                )}

            </div>



        </div>
    )
}

export { Form }