import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "../common/list";
import { Formik, Form } from 'formik';
import { TextField, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { LoaderCenter } from "../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from '../../lib/redirect';
import message from '../../components/Toast/message';
import { ListSelector } from '../../components/ListSelector/ListSelector';

const Pricing = ({ type }) => {
    const [serverError, setServerError] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(null);
    const [list, setList] = useState([]);

    useEffect(() => {
        // api-fetch-panel-specialist-data

        const [fetch] = useApi();
        fetch('/admin/api-fetch-pricing-init', 'post')
            .then((response) => {
                console.log("response", response);
                setList(response.list);
            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });


    }, []);


    if (!isInitialDataLoaded) {
        return <LoaderCenter />
    }

    const handleChange = (id, key, value) => {
        const newList = [...list];
        const index = newList.findIndex(item => item.id === id);
        console.log("index", newList[index][key],value);
        newList[index][key] = value;

        setList(newList);
    }


    const savePrice = (id, valueForPatient, valueForDoctor) => {

        const [fetch] = useApi();
        fetch(`/admin/api-update-pricing/${id}`, { id, valueForPatient, valueForDoctor }, 'post')
            .then((response) => {
                console.log("response", response);
                setList(response.list);

            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });


    }


    return (
        <Fragment>

            {isInitialDataLoaded && (

                <Fragment>

                    {list.map(item => (
                        <div style="display:flex;align-items:center;">
                            <TextField
                                fullWidth
                                name="name"
                                label="Cena dla pacjent"
                                size="medium"
                                sx={{ mt: 3, mr: 1 }}

                                value={item.valueForPatient}
                                onChange={(e) => handleChange(item.id, 'valueForPatient', e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Cena dla specjalisty"
                                size="medium"
                                sx={{ mt: 3, mr: 1 }}

                                value={item.valueForDoctor}
                                onChange={(e) => handleChange(item.id, 'valueForDoctor', e.target.value)}
                            />
                            <div>
                                <ButtonPrimary onClick={() => savePrice(item.id, item.valueForPatient, item.valueForDoctor)} style={{ marginRight: 10, marginTop: 20 }} text="Zapisz" />
                            </div>


                        </div>
                    ))}
                </Fragment>
            )}

        </Fragment>
    )
}

render(<Pricing />, document.querySelector('#pricing'));
