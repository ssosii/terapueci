import { h, render } from 'preact';
import { DoctorItem } from './DoctorItem/DoctorItem';
import "./doctorsList.scss";

const DoctorsList = ({ doctors }) => {

    return (
        <div className='doctor-list'>
            {doctors.map(doctor => <DoctorItem {...doctor} />)}
        </div>
    )
}

export { DoctorsList }