import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "../common/list";
import { Formik, Form } from 'formik';

import {
    TextField,
    FormHelperText,
} from '@mui/material';

import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import message from '../../components/Toast/message';
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { FormError } from '../../../frontend/components/form/FormError/FormError';


const ChangeEmail = ({ doctorID, email }) => {
    const [serverError, setServerError] = useState(null);
    console.log("email", email);
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                email,
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Niepoprawny adres email.').max(255).required('To pole jest wymagane.'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                const { email } = values;
                setServerError(null);
                const [fetch] = useApi();

                fetch(`/admin/change-email/${doctorID}`, { email }, 'post')
                    .then((response) => {
                        console.log("response", response);
                        message.success("Zapisano.");
                        resetForm();

                    })
                    .catch((error) => {
                        if (error.message.includes("Wybrany")) {
                            // setErrors({ email: "Wybrany email jest już zajęty." })
                            setServerError("Wybrany email jest zajęty.");
                        } else {
                            setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                        }
                        // message.error("Coś poszło nie tak. Spróbuj ponownie.");

                    }).finally(() => {
                        // setIsSending(false);
                    });

            }}
        >
            {({
                errors,
                handleChange,
                touched,
                values,
            }) => (
                <Form>
                    {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}

             

                        <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            size="medium"
                            inputProps={{ maxLength: 255 }}
                            sx={{ mt: serverError ? 0: 3 }}
                            value={values.email}
                            onChange={handleChange}
                        />
                        {Boolean(touched.email && errors.email) && <FormHelperText error>{errors.email}</FormHelperText>}
                 

                    <ButtonPrimary style={{ marginRight: 10, marginTop: 20 }} text="Zmień" />

                </Form>
            )}
        </Formik>
    )
}

export { ChangeEmail }