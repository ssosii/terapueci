import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ScheduleBar } from '../ScheduleBar';
import dayjs from 'dayjs';
import useApi from '../../../../../../../lib/api/useApi';
import { ScheduleList } from './ScheduleList';
import { LoaderCenter } from '../../../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { authGuard } from '../../../../../../../lib/authGuard';


const today = dayjs();
const Past = () => {
    const [month, setMonth] = useState(today.month() + 1);
    const [year, setYear] = useState(today.year());
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    console.log("orders", orders);
    useEffect(() => {
        setIsLoading(true);
        
        const [fetch] = useApi();
        fetch('/api-fetch-panel-patient-appointment-by-month-year-past', { month, year }, 'post')
    
            .then((response) => {

           
                console.log("active1", response, Object.keys(response.orderList));     
                let resultToArray = Object.keys(response.orderList).map((range) => ({ range, list: [...response.orderList[range].list] }));
                setOrders(resultToArray);


            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);

            }).finally(() => {
                setIsLoading(false);
            });

    }, [month, year])


    return (
        <div>
            <ScheduleBar url="/api-fetch-panel-specialist-appointment-by-month-year-active" month={month} year={year} setYear={setYear} setMonth={setMonth} />
            {isLoading ? <LoaderCenter /> : (
                <ScheduleList orders={orders} />
            )}

        </div>
    )
}

export { Past }


