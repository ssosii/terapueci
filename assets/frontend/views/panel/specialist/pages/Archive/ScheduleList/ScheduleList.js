import { Fragment, h, render } from 'preact';
import "./scheduleList.scss";
import { getDayOfWeekShortname } from '../../../../../../lib/datatime';

const ScheduleList = ({ appointments }) => {
    return (
        <div className='schedule--component'>

            {appointments.length === 0 && <div className="info">Brak zaplanowanych wizyt</div>}

            {appointments.map(({ range, list }) => {
                const [day, dayOfWeek] = range.split('-');
                if (list.length > 0) {

                    // const numberUsed = list.filter(item => item.isUsed).length;
                    // const numberNotUsed = list.filter(item => !item.isUsed).length;

                    // if (sort === "free" && numberNotUsed === 0) {
                    //     return null;
                    // }
                    // if (sort === "busy" && numberUsed === 0) {
                    //     return null;
                    // }

                    return (
                        <div className={`schedule--item`}>

                            <div className='date'>
                                <div className='number'>{getDayOfWeekShortname(dayOfWeek)}</div>
                                <div className="text">{day}</div>
                            </div>
                            <div className='schedule--list'>
                                {list.map(appointment => {
                                    const { id, time, isUsed, order } = appointment;

                                    return (
                                        <div className={`term ${isUsed ? "--used" : ""}`}>
                                            <div className='info'>
                                                <div className='time'>{time}</div>
                                                <div className='patient'>{order  ? order.patientUsername  : "Wolny termin"}</div>
                                            </div>
                                            {!isUsed && (
                                                <div className='icon'>
                                                    <DropdownMenu range={range} handleRemoveAppointment={handleRemoveAppointment} setAppoitments={setAppoitments} appointment={appointment} appointments={appointments} />
                                                </div>
                                            )}

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