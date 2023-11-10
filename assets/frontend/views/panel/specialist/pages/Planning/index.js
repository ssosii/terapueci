import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Calendar } from "./Calendar/Calendar";
import "./planning.scss";
import { AppointmentRuleModal } from './AppointmentRuleModal/AppointmentRuleModal';
import { ButtonFunctional } from '../../../../../components/ButtonFunctional/ButtonFunctional';
import { Schedule } from './Schedule/Schedule';
import dayjs from 'dayjs';
import { ScheduleBar } from './Schedule/ScheduleBar';
import { ScheduleList } from './Schedule/ScheduleList/ScheduleList';
import useApi from '../../../../../lib/api/useApi';

import { createContext } from 'react';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { authGuard } from '../../../../../lib/authGuard';

export const DataContext = createContext(null);

const today = dayjs();
const PlanningPage = () => {
    const [isInitQuery, setIsInitQuery] = useState(true);
    const [isAppointmentRuleModal, setIsAppointmentRuleModal] = useState(false);
    const [appointments, setAppoitments] = useState([]);
    const [sort, setSort] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [markedCalendarDates, setMarkedCalendarDates] = useState([]);
    const [markedDates, setMarkedDates] = useState([]);
    const [selectedDateFromCalendar, setSelectedDateFromCalendar] = useState(null);

    const [month, setMonth] = useState(today.month() + 1);
    const [year, setYear] = useState(today.year());

    useEffect(() => {
        const [fetch] = useApi();
        fetch('/api-fetch-calendar-appoitments', 'get')
            .then((response) => {
                const markedList = response.listOfKeys;

                setMarkedCalendarDates(markedList);
            })
            .catch((error) => {

                authGuard(error);
                // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                // setIsSending(false);
                setIsInitQuery(true);
            });

    }, [])

    useEffect(() => {
        const markedRange = [];
        [...appointments].forEach(item => {

            const { list, range } = item;
            const length = list.length;
            const usedArray = list.filter(itemList => itemList.isUsed);

            if (usedArray.length === length) {
                const rangeArray = range.split("-");
                markedRange.push(rangeArray[0]);
            }
        });

        setMarkedDates(markedRange);
    }, [appointments])

    if (!isInitQuery) {
        return <LoaderCenter />
    }


    return (
        <DataContext.Provider value={{ isAppointmentRuleModal, setIsAppointmentRuleModal, selectedDateFromCalendar, sort, setSort, isLoading, setIsLoading, appointments, setAppoitments, markedCalendarDates, setMarkedCalendarDates, markedDates, setMarkedDates, month, setMonth, year, setYear }}>
            <h2 className='main--title'>Zaplanowane wizyty</h2>
            <div class="mobile-add-appointment">
                <ButtonFunctional onClick={() => setIsAppointmentRuleModal(true)} text="Dodaj termin" style={{ marginBottom: 20 }} fullWidth />
            </div>

            <div className='wrap'>
                <div className='list'>
                    <ScheduleBar />
                    <ScheduleList />
                </div>
                <div className='calendar'>
                    <Calendar setSelectedDateFromCalendar={setSelectedDateFromCalendar} />
                    <ButtonFunctional onClick={() => setIsAppointmentRuleModal(true)} text="Dodaj termin" />

                </div>
                {isAppointmentRuleModal && <AppointmentRuleModal />}
            </div>
        </DataContext.Provider>
    )
}

export { PlanningPage }