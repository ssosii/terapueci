import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "./buttonGroup.scss"
import { Icon } from './Icon';

const ButtonVisitGroup = ({ visitType, setVisitType }) => {

    return (
        <div className='button--group'>
            <div onClick={() => setVisitType("active")} className={`item --first ${visitType === "active" ? "--active" : ""}`}><Icon isVisible={Boolean(visitType === "active")} />Zaplanowane</div>
            <div onClick={() => setVisitType("past")} className={`item --last ${visitType === "past" ? "--active" : ""}`}><Icon isVisible={Boolean(visitType === "past")} />Minione</div>
        </div>
    )
}

export { ButtonVisitGroup }