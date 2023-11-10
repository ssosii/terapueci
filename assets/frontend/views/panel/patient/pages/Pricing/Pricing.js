import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import "./pricing.scss";
import { ScheduleBar } from './ScheduleBar/ScheduleBar';
import dayjs from 'dayjs';
import useApi from '../../../../../lib/api/useApi';
import { ScheduleList } from './ScheduleList/ScheduleList';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { authGuard } from '../../../../../lib/authGuard';

const today = dayjs();
const Pricing = () => {
    const [month, setMonth] = useState(today.month() + 1);
    const [year, setYear] = useState(today.year());
    const [isLoading, setIsLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        setIsLoading(true);

        const [fetch] = useApi();
        fetch('/api-fetch-panel-patient-payment-by-month-year', { month, year }, 'post')

            .then((response) => {


                console.log("active2", response);
                let resultToArray = Object.keys(response.paymentList).map((range) => ({ range, list: [...response.paymentList[range].list] }));
                setPayments(resultToArray);


            })
            .catch((error) => {
                console.log("error", error);
                authGuard(error);

            }).finally(() => {
                setIsLoading(false);
            });

    }, [month, year])


    return (
        <div className="pricing--components">
            <h2 className='main--title'>Płatności i kupony</h2>

            <ScheduleBar month={month} setMonth={setMonth} year={year} setYear={setYear} />
            {isLoading ? <LoaderCenter /> : <ScheduleList payments={payments} />}


        </div>
    )
}

export { Pricing }