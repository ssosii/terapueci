import { Fragment, h, render } from 'preact';
import { useContext } from 'preact/hooks';


import "./scheduleList.scss";
import { DropdownMenu } from './DropdownMenu/DropdownMenu';
import useApi from '../../../../../../../lib/api/useApi';
import message from "../../../../../../../components/Toast/message";
import { LoaderCenter } from "../../../../../../../components/Loader/LoaderCenter/LoaderCenter";
import { DataContext } from '../..';
import { getDayOfWeekShortname } from '../../../../../../../lib/datatime';
import { authGuard } from '../../../../../../../lib/authGuard';


const ScheduleList = () => {
    const { setAppoitments, appointments, sort, isLoading, markedDates } = useContext(DataContext);


    const handleRemoveAppointment = (range, id) => {
        const newList = [...appointments];
        const rangeIndex = newList.findIndex(item => item.range === range);

        const list = newList[rangeIndex].list.filter(item => item.id !== id);
        newList[rangeIndex].list = list;

        setAppoitments(newList);

        const [fetch] = useApi();
        fetch(`/api-remove-appointment/${id}`, 'get')
            .then((response) => {

                message.success("Spotkanie zostało usunięte.")
            })
            .catch((error) => {
                authGuard(error);
                message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." })

            }).finally(() => {
                // setIsSending(false);

            });

    }


    const handleRemoveOrderAppointment = (range, appointmentId, orderId) => {
        const newList = [...appointments];
        const rangeIndex = newList.findIndex(item => item.range === range);
        

        const termIndex = newList[rangeIndex].list.findIndex(item => item.id === appointmentId);
        newList[rangeIndex].list[termIndex].order.isDeleted = true;
        setAppoitments(newList);

        // newList[rangeIndex].list = list;


        setAppoitments(newList);

        const [fetch] = useApi();
        fetch(`/api-remove-order-appointment/${orderId}`, 'get')
            .then((response) => {

                message.success("Spotkanie zostało odwołane.")
            })
            .catch((error) => {
                authGuard(error);
                message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." })

            }).finally(() => {
                // setIsSending(false);

            });

    }

    const handleEditAppointment = () => {

    }

    if (isLoading) {
        return <LoaderCenter style={{ marginTop: 20 }} />
    }


    return (
        <div className='schedule--component'>

            {appointments.length === 0 && <div className="info">Brak zaplanowanych wizyt</div>}

            {appointments.map(({ range, list }) => {
                const [day, dayOfWeek] = range.split('-');
                if (list.length > 0) {

                    const numberUsed = list.filter(item => item.isUsed).length;
                    const numberNotUsed = list.filter(item => !item.isUsed).length;

                    if (sort === "free" && numberNotUsed === 0) {
                        return null;
                    }
                    if (sort === "busy" && numberUsed === 0) {
                        return null;
                    }

                    return (
                        <div className={`schedule--item`}>
                            <div className='date'>
                                <div className='number'>{getDayOfWeekShortname(dayOfWeek)}</div>
                                <div className={`text ${markedDates.includes(day) ? "--marked" : ""}`}>{day}</div>
                            </div>
                            <div className='schedule--list'>
                                {list.map(appointment => {
                                    const { id, time, isUsed, order ,startHour } = appointment;
                                    const isOrderDeleted = Boolean(order && order.isDeleted);
                                    console.log("order", order,appointment);
                                    let isDisplay = true;
                                    if (sort === "free" && isUsed) {
                                        isDisplay = false;
                                    }
                                    if (sort === "busy" && !isUsed) {
                                        isDisplay = false;
                                    }
                                    if (isDisplay)
                                        return (
                                            <div className={`term ${isUsed ? "--used" : ""} ${isOrderDeleted ? "--remove" : ""}`}>
                                                <div className='info'>
                                                    <div className='time'>{time}</div>
                                                    <div className='patient'>{order ? order.patientUsername : "Wolny termin"}</div>
                                                </div>
                                                {/* {!isUsed && ( */}
                                                <div className='icon'>
                                                    {!isOrderDeleted && <DropdownMenu
                                                        order={order}
                                                        range={range}
                                                        handleRemoveOrderAppointment={handleRemoveOrderAppointment}
                                                        handleRemoveAppointment={handleRemoveAppointment}
                                                        setAppoitments={setAppoitments}
                                                        appointment={appointment}
                                                        appointments={appointments} />}

                                                </div>
                                                {isOrderDeleted && <div className='deleted-label'>Odwołane</div>}
                                                {/* )} */}

                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    )
                }
            })}
        </div>

    )
}

export { ScheduleList }