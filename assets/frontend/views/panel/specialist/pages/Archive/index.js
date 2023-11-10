import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import "./archive.scss";

import useApi from '../../../../../lib/api/useApi';
import dayjs from 'dayjs';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { Bar } from './Bar/Bar';
import { ScheduleList } from "./ScheduleList/ScheduleList";
import { authGuard } from '../../../../../lib/authGuard';


const today = dayjs();

const ArchivePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [month, setMonth] = useState(today.month() + 1);
    const [year, setYear] = useState(today.year());
    const [appointments, setAppoitments] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        const [fetch] = useApi();
        fetch(`/api-fetch-panel-specialist-appointment-by-month-year-used`, { month, year }, 'post')
            .then((response) => {
                let resultToArray = Object.keys(response.appointments).map((range) => ({ range, list: response.appointments[range].list }));
                setAppoitments(resultToArray);

            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);

            }).finally(() => {
                setIsLoading(false);
            });

    }, [month, year])

    return (
        <div className="archive--component">
            <h2 className='main--title'>Archiwum</h2>

            <div>
                <Bar month={month} setMonth={setMonth} year={year} setYear={setYear} />

                {isLoading ? <LoaderCenter /> : <ScheduleList appointments={appointments} />}

            </div>


        </div>
    )
}

export { ArchivePage }