
import { h, render, Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import dayjs from "dayjs";
import CalendarReact from "react-calendar";
import { DataContext } from '../..';
import "./../calendar.scss";


const formatShortWeekday = (locale, date) => ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'][date.getDay()]
const today = dayjs().format('YYYY-MM-DD');

const CalendarModule = ({ dateState, setDateState }) => {
    const { markedCalendarDates } = useContext(DataContext);

    const changeDate = (e) => {
        setDateState(e);
    };

    // const activeDatesStart = dayjs().add(1, 'day').toDate(); /
    const activeDatesStart = dayjs(); // Tomorrow
    const activeDatesEnd = dayjs().add(3, 'months').toDate(); // 3 months from today

    return (
        <CalendarReact
            value={dateState}
            onChange={changeDate}
            locale="pl-PL"

            formatShortWeekday={formatShortWeekday}
            tileDisabled={({ date }) => {
                return !dayjs(date).isAfter(activeDatesStart) || !dayjs(date).isBefore(activeDatesEnd);
            }}
            tileClassName={({ date, view }) => {
                if (markedCalendarDates.find((x) => x === dayjs(date).format('YYYY-MM-DD'))) {
                    return 'react-calendar__highlighted';
                }
                if (today === dayjs(date).format('YYYY-MM-DD')) {
                    return 'react-calendar__today';
                }

            }}
        />

    )
}

export { CalendarModule }