import { h, Component, Fragment } from 'preact';
import { createPortal, useState } from 'preact/compat'; // Import createPortal

import { Login } from './subcomponents/Login';
import { Register } from './subcomponents/Register';
import "./authModal.scss";


const AuthModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('login');

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <Fragment>
            {isOpen && (
                createPortal(
                    <div class="auth-modal">
                        <div class="overlay"></div>
                        <div class="content">
                            <span class="close" onClick={closeModal}>&times;</span>
                            {type === "login" && <Login setType={setType} />}
                            {type === "register" && <Register setType={setType} />}

                        </div>
                    </div>, document.body
                )
            )}

            <button className="btn--primary" onClick={() => setIsOpen(true)}>Zaloguj się</button>
            <button className="btn--primary" onClick={() => setIsOpen(true)}>Zaloguj się</button>
        </Fragment>
    )
}

export { AuthModal }
