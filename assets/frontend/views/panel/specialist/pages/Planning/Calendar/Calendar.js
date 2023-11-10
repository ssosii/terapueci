
import { h, render, Fragment } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import dayjs from "dayjs";
import { CalendarModule } from "../shared/CalendarModule/CalendarModule";

const Calendar = ({ setSelectedDateFromCalendar }) => {
    const [dateState, setDateState] = useState(null);


    useEffect(() => {

        if (dateState) {
            setSelectedDateFromCalendar(dayjs(dateState));
        }

    }, [dateState])

    return (
        <CalendarModule setDateState={setDateState} dateState={dateState} />
    )
}

export { Calendar }