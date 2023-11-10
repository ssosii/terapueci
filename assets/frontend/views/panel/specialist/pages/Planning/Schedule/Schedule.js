import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ScheduleBar } from './ScheduleBar';
import { ScheduleList } from './ScheduleList/ScheduleList';
import useApi from '../../../../../../lib/api/useApi';


const Schedule = () => {
    const [sort, setSort] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     // api-fetch-panel-specialist-data
    //     const [fetch] = useApi();
    //     fetch(`/api-fetch-panel-specialist-appointment-by-month`, {year,month}, 'post')
    //         .then((response) => {
    //             setAppoitments(response.appointments);
    //             console.log("response", response.appointments);


    //         })
    //         .catch((error) => {
    //             console.log("error", error);

    //         }).finally(() => {
    //             // setIsSending(false);
    //             // setIsInitialDataLoaded(true);
    //         });


    // }, [])





    return (
        <div>
            <ScheduleBar setSort={setSort} sort={sort} setIsLoading={setIsLoading} />
            <ScheduleList sort={sort} isLoading={isLoading} />
        </div>
    )
}

export { Schedule }