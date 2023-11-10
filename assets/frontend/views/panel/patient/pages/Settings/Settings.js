import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useApi from "../../../../../lib/api/useApi";
import "./settings.scss";
import {
    Select,
    TextField,
    FormControl,
    MenuItem,
} from "@mui/material";

import { ButtonPrimary } from '../../../../../components/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../../../components/ButtonSecondary/ButtonSecondary';
import { FormHelperText } from '../../../../../components/form/FormHelperText/FormHelperText';
import message from '../../../../../../admin/components/Toast/message';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { LoaderAbsolute } from '../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute';
import { authGuard } from '../../../../../lib/authGuard';
import { FormError } from "./../../../../../components/form/FormError/FormError";

const Settings = () => {
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [initialUserData, setInitialUserData] = useState();
    const [languesList, setLanguesList] = useState();
    const [langue, setLangue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailServerError, setEmailServerError] = useState(null);

    useEffect(() => {

        const [fetch] = useApi();
        fetch('/api-fetch-panel-patient-data-settings', 'post')
            .then((response) => {
                console.log("response", response);
                setInitialUserData(response.userData);
                setLanguesList(response.languesList);
                setLangue(response.userData.langue);
            })
            .catch((error) => {
                console.log("error", error);
                authGuard(error);
            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });

    }, [])

    const resetData = (e, resetData) => {
        e.preventDefault();
        resetData();
    }

    if (!isInitialDataLoaded) {
        return <LoaderCenter />;
    }

    return (
        <div className='settings--components'>

{isLoading && <LoaderAbsolute />}

            <Formik
                enableReinitialize={true}
                initialValues={{
                    username: initialUserData?.username ?? "",
                    email: initialUserData?.email ?? "",
                    phone: initialUserData?.phone ?? "",
                    langue: initialUserData?.langue ?? "pl",

                    submit: null,
                }}
                handleSubmit={() => alert("submit")}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('To pole jest wymagane.'),
                    email: Yup.string().email('Niepoprawny adres email.').max(255).required('To pole jest wymagane.'),
                    phone: Yup.string()
                        .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
                        .max(15, "Wybrany numer telefonu jest za długi.")
                        .nullable(),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { username, email, phone, langue } = values;
                    setIsLoading(true);

                    const [fetch] = useApi();
                    console.log("update patient", '/api-update-panel-patient-data-settings', username, email, phone, langue);
                    fetch('/api-update-panel-patient-data-settings', { username, email, phone, langue }, 'post')
                        .then((response) => {
                            console.log("responsexxx", response);
                            message.success("Twoje dane zostały zaktualizowane.");
                        })
                        .catch((error) => {
                            if (error?.message?.includes("email")) {
                                setEmailServerError("Wybrany email jest zajęty.");
                            }
                            authGuard(error);
                            setErrors("Coś poszło nie tak.");
                            // setIsSending(false);
                        }).finally(() => {
                            setIsLoading(false);
                        });

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues, resetForm }) => (
                    <Form>

                        <h1 className='main--title'>Ustawienia konta</h1>
                        <h3 className='main--subtitle'>Podstawowe informacje</h3>
                        <TextField
                            fullWidth
                            name="username"
                            label="Imię i nazwisko"
                            size="medium"
                            inputProps={{ maxLength: 255 }}
                            sx={{ mt: 3 }}
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {Boolean(touched.username && errors.username) && <FormHelperText error>{errors.username}</FormHelperText>}
                        {emailServerError && <FormError>Wybrany email jest zajęty.</FormError>}
                        <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            size="medium"
                            inputProps={{ maxLength: 255 }}
                            sx={{ mt: emailServerError ? 0 : 3  }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {Boolean(touched.email && errors.email) && <FormHelperText error>{errors.email}</FormHelperText>}
                        <TextField
                            fullWidth
                            name="phone"
                            label="Numer telefonu"
                            size="medium"
                            sx={{ mt: 3 }}
                            value={values.phone}
                            inputProps={{ maxLength: 255 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {Boolean(touched.phone && errors.phone) && <FormHelperText error>{errors.phone}</FormHelperText>}

                        <FormControl fullWidth>
                            <Select
                                labelId="langue"
                                name="langue"
                                id="langue"
                                fullWidth
                                size='medium'
                                sx={{ mt: 3, mb: 3 }}
                                value={langue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            // MenuProps={{
                            //     disableScrollLock: true,
                            //   }}
                            >
                                {languesList.map(langue => <MenuItem value={langue.id}>{langue.name}</MenuItem>)}
                            </Select>
                        </FormControl>


                        {Boolean(touched.phone && errors.phone) && <FormHelperText error>{errors.phone}</FormHelperText>}



                        <div style={{ display: "flex" }}>
                            <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />
                            <ButtonSecondary onClick={(e) => resetData(e, resetForm)} text="Odrzuć zmiany" />
                        </div>
                    </Form>
                )}
            </Formik>



        </div>
    )
}

export { Settings }