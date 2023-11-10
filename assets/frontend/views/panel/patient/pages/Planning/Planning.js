import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ButtonVisitGroup } from '../../../../../components/ButtonGroup/ButtonVisitGroup';
import { ButtonPrimaryLink } from '../../../../../components/ButtonPrimaryLink/ButtonPrimaryLink';
import "./planning.scss";

import { Active } from './views/Active/Active';
import { Past } from './views/Past/Past';

const Planning = () => {
    //past
    const [visitType, setVisitType] = useState("active");

    return (
        <div className='wrap'>
            <div className='list'>
                <h2 className='main--title'>Moje wizyty</h2>
                <ButtonVisitGroup visitType={visitType} setVisitType={setVisitType} />

                {visitType === "active" && <Active />}
                {visitType === "past" && <Past />}

            </div>
        </div>
    )
}

export { Planning }