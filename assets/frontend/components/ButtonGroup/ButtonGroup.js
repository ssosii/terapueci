import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "./buttonGroup.scss"
import { Icon } from './Icon';

const ButtonGroup = ({ gender, setGender }) => {


    return (
        <div className='button--group'>
            <div onClick={() => setGender("woman")} className={`item --first ${gender === "woman" ? "--active" : ""}`}><Icon isVisible={Boolean(gender === "woman")} />Kobieta</div>
            <div onClick={() => setGender("man")} className={`item ${gender === "man" ? "--active" : ""}`}><Icon isVisible={Boolean(gender === "man")} />Mężczyzna</div>
            <div onClick={() => setGender("other")} className={`item --last ${gender === "other" ? "--active" : ""}`}><Icon isVisible={Boolean(gender === "other")} />Inna</div>
        </div>
    )
}

export { ButtonGroup }