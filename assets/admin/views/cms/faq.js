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
import { nanoid } from 'nanoid';
import DeleteIcon from '@mui/icons-material/Delete';


const labels = {
    "psychoterapia": "Psychoterapia", "rodzajewizyt": "Rodzaje wizyt", "techniczne": "Kwestie techniczne",
}

const Faq = ({ type }) => {
    const [serverError, setServerError] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(null);
    const [list, setList] = useState({ "psychoterapia": [], "rodzajewizyt": [], "techniczne": [], });

    useEffect(() => {
        const [fetch] = useApi();
        fetch('/admin/faq-init', 'post')
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

    const handleChange = (key, id, type, value) => {
        const newList = { ...list };

        const index = newList[key].findIndex(item => item.id === id);
        newList[key][index][type] = value;
        console.log("newList[key][index", newList[key][index]);
        setList(newList);
    }

    const removeItem = (key, id) => {
        const newList = { ...list };
        console.log("it", newList[key], key);
        const filtred = newList[key].filter(item => item.id !== id);
        newList[key] = filtred;
        setList(newList);
    }

    const addItem = (key) => {
        setList({ ...list, [key]: [...list[key], { id: nanoid(), title: "", value: "" }] });
    }



    if (!isInitialDataLoaded) {
        return <LoaderCenter />
    }



    const saveFaq = (type) => {
        const [fetch] = useApi();

        fetch('/admin/api-update-categories', { type, list: JSON.stringify(list[type]) }, 'post')
            .then((response) => {
                console.log("response", response);
                // setList(response.list);
                message.success();
            })
            .catch((error) => {
                console.log("error", error);
                message.error();

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });

    }


    return (
        <Fragment>

            {isInitialDataLoaded && (
                <Fragment>
                    {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}

                    {Object.keys(list).map(key => (

                        <Fragment>
                            <div className='midsection--title'>{labels[key]}</div>
                            {list[key].map(item => (
                                <Fragment>
                                    <div style="display:flex;align-items:center;">
                                        <div>
                                            <TextField
                                                fullWidth
                                                name="name"
                                                label="Tytuł"
                                                size="medium"
                                                sx={{ mt: 3, minWidth: 600 }}
                                                multiline
                                                rows={2}
                                                value={item.title}
                                                onChange={(e) => handleChange(key, item.id, "title", e.target.value)}
                                            />
                                            <TextField
                                                fullWidth
                                                name="name"
                                                label="Opis"
                                                size="medium"
                                                multiline
                                                rows={5}
                                                sx={{ mt: 3, minWidth: 600 }}

                                                value={item.value}
                                                onChange={(e) => handleChange(key, item.id, "value", e.target.value)}
                                            />
                                        </div>

                                        <DeleteIcon onClick={() => removeItem(key, item.id)} style={{ marginLeft: 30, marginTop: 20, cursor: "pointer" }} />

                                    </div>
                                    <div className='main--line'></div>
                                </Fragment>
                            ))}
                            <div style={{ display: "flex", marginTop: 20, marginBottom: 40, alignItems: "center" }}>
                                <div onClick={() => addItem(key)} className='btn--secondary'>Dodaj</div>
                                <div>
                                    <ButtonPrimary onClick={() => saveFaq(key)} style={{ marginLeft: 10, padding: "8px 16px 8px 16px" }} text="Zapisz" />
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </Fragment>

            )}



        </Fragment>
    )
}

render(<Faq />, document.querySelector('#faq'));
