import { h, render, Fragment } from 'preact';
import axios from 'axios';

import {  useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { ButtonPrimary } from '../../../../../../../components/ButtonPrimary/ButtonPrimary';
import { FormError } from '../../../../../../../components/form/FormError/FormError';
import { ForgottenPasswordAction } from "../../../../../../../components/auth/LoginForm/ForgottenPasswordAction";
import { LoginFormFields } from "../../../../../../../components/auth/LoginForm/LoginFormFields";

import { validationSchema } from '../../../../../../../components/auth/LoginForm/validationSchema';
import { initialValues } from '../../../../../../../components/auth/LoginForm/initValues';


const OrderLoginForm = ({ setPage }) => {
    const [serverError, setServerError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(validationSchema)}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { email, password } = values;

                    await axios
                        .post('/login', {
                            email,
                            password
                        })
                        .then(response => {
                            console.log("response", response);
                            setServerError(null);
                            location.reload();
                            // if (response.data.url) {
                            //     location.href = response.data.url;
                            // }
                        }).catch(error => {
                            console.log("error", error);
                            setServerError("Błędne dane.");
                        }).finally(() => {

                        })


                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <Form>

                        {serverError && <FormError>{serverError}</FormError>}

                        <LoginFormFields values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange} errors={errors} />


                        <ButtonPrimary style={{ marginBottom: 20 }} text="Zaloguj się" fullWidth />


                        <ForgottenPasswordAction onClick={() => setPage("forgottenPassword")} />


                    </Form>
                )}
            </Formik>
        </Fragment>
    )
}

export { OrderLoginForm }