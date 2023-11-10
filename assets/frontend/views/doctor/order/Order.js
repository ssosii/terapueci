import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Preview } from './subcomponents/Preview/Preview';
import useApi from '../../../lib/api/useApi';
import { LoaderCenter } from "./../../../components/Loader/LoaderCenter/LoaderCenter";
import { NotLoggedUserForm } from './subcomponents/Form/NotLoggedUserForm/NotLoggedUserForm';
import { LoggedUserForm } from './subcomponents/Form/LoggedUserForm/LoggedUserForm';
import "./order.scss";
import { FormError } from '../../../components/form/FormError/FormError';



const Order = ({ doctorID, slug, username, categoriesString, isLogged, defaultAppointment, defaultPrice, defaultIsUsed }) => {
    const [appointment, setAppoitment] = useState(defaultAppointment);
    const [price, setPrice] = useState(defaultPrice);
    const [isUsed, setIsUsed] = useState(defaultIsUsed);

    useEffect(() => {
        if (parseInt(defaultAppointment.id) !== parseInt(appointment.id) && isUsed === "true") {
            setIsUsed(false);
        }
    }, [appointment])

    return (
        <Fragment>

            <div className="container">
                <div className="profile--container">
                    <Fragment>
                        <div className='form box-shadow'>
                            <h1 className="main--title --center">Umów się na wizytę</h1>
                            <div className="inner">
                                <div className="form">
                                    {isUsed === "true" ? (
                                        <FormError style={{ marginBottom: 0 }}>Ten termin jest już zajęty.</FormError>
                                    ) : (
                                        <Fragment>
                                            {isLogged ? (
                                                <LoggedUserForm doctorID={doctorID} appointment={appointment} price={price} />
                                            ) : (
                                                <NotLoggedUserForm doctorID={doctorID} appointment={appointment} price={price} />
                                            )}

                                        </Fragment>
                                    )}

                                </div>

                            </div>

                        </div>

                        <Preview
                            setPrice={setPrice}
                            price={price}
                            setAppoitment={setAppoitment}
                            appointment={appointment}
                            doctorID={doctorID}
                            slug={slug} username={username}
                            {...appointment}
                            categoriesString={categoriesString}
                        />

                    </Fragment>

                </div>
            </div>

        </Fragment>




    )
}

export { Order }
