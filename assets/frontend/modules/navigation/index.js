import "./navigation.scss";
import { h, render, Fragment } from 'preact';
import { useState } from "preact/hooks";
import { ContactModal } from "./../../components/ContactModal/ContactModal";


const ContactLink = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Fragment>
            {isOpen && <ContactModal handleClose={() => setIsOpen(false)} />}
            <div onClick={() => setIsOpen(true)} class="link">Kontakt</div>
        </Fragment>

    )
}

const openContactForm = () => {
    const buttons = document.querySelectorAll('.openContactForm');
    console.log("buttons",buttons);
    Array.from(buttons).map(button => {
        render(<ContactLink
        />, button);
    });
}



document.addEventListener('DOMContentLoaded', (event) => {
    openContactForm();
});
