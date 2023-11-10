import { Fragment, h, render } from 'preact';
import { getDayOfWeekShortname } from '../../../../../../../lib/datatime';
import "./scheduleList.scss";

const ScheduleList = ({ orders }) => {


    return (
        <div className='schedule--component'>

            {orders.length === 0 && <div className="info">Brak zaplanowanych wizyt</div>}

            {orders.map(({ range, list }) => {
                const [day, dayOfWeek] = range.split('-');


                return (
                    <div className={`schedule--item`}>
                        <div className='date'>
                            <div className='number'>{getDayOfWeekShortname(dayOfWeek)}</div>
                            <div className={`text`}>{day}</div>
                        </div>
                        <div className='schedule--list'>
                            {list.map(item => {
                                console.log(item);
                                const { id, time, doctor, isDeleted,appointment } = item;
                                console.log("isDeleted",isDeleted,item.appoitment.id );
                                return (
                                    <div className={`term ${doctor ? "--used" : ""} ${isDeleted ? "--remove" : ""}`}>
                                        <div className='info'>
                                            <div className='time'>{time}</div>
                                            <div className='patient'>{doctor ? doctor?.username : "Wolny termin"}</div>
                                        </div>
                                        {isDeleted && <div className='deleted-label'>Odwołane</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )

            })}
        </div>

    )
}

export { ScheduleList }