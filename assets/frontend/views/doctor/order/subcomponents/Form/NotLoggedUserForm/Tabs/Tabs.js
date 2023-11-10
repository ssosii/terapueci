import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import "./tabs.scss"

const Tabs = ({ tab, setTab }) => {


    return (
        <div className={`tabs--components ${tab === "login" ? "--login" : ""}`}>
            <div onClick={() => setTab("register")} className={`item ${tab === "register" ? "--active" : ""}`}>
                <div className="text">Nie mam jeszcze konta</div>
            </div>
            <div onClick={() => setTab("login")} className={`item ${tab === "login" ? "--active" : ""}`}>
                <div className="text">Zaloguj się</div>
            </div>

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="149" height="14" viewBox="0 0 149 14" fill="none">
                <path d="M2.5 14C2.5 12.3431 3.84315 11 5.5 11H143.5C145.157 11 146.5 12.3431 146.5 14V14H2.5V14Z" fill="#4259A9" />
            </svg> */}

        </div >
    )
}

export { Tabs }


