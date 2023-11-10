import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Form } from './subcomponents/Form/Form';
import { Preview } from './subcomponents/Preview/Preview';
import "./profile.scss";


const Profile = ({ doctorID, username, isLogged, appointment }) => {
    const [page, setPage] = useState("pricing");

    useEffect(() => {


    }, [])

    if (!doctorID) {
        return "Coś poszło nie tak..."
    }


    return (
        <div className="container profile--container">
            <div className='form'>
                <h1 className="main--title --center">Umów się na wizytę</h1>
                <div className="inner">
                    <Form isLogged={isLogged} />
                </div>

            </div>
            <div className='preview'>
                <Preview username={username} {...appointment} />
            </div>
        </div>

    )
}

export { Profile }