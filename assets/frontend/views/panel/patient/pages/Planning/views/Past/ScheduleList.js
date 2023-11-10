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
                                const { id, time,  doctor } = item;
                                return (
                                    <div className={`term ${doctor ? "--used" : ""}`}>
                                        <div className='info'>
                                            <div className='time'>{time}</div>
                                            <div className='patient'>{doctor ? doctor?.username : "Wolny termin"}</div>
                                        </div>
                                        <a href={`/${[doctor.slug]}/d-${doctor.id}`} className='button-action'>Umów spotkanie</a>
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