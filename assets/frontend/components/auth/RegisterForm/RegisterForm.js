import { h, render } from 'preact';
import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import useApi from '../../../lib/api/useApi';
import { Form, Formik } from 'formik';



import { FormError } from '../../form/FormError/FormError';
import { FormHelperText } from '../../form/FormHelperText/FormHelperText';
import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { CheckboxField } from '../../form/CheckboxField/CheckboxField';
import { ButtonLink } from "../../ButtonLink/ButtonLink";
import { SocialButtons } from "../SocialButtons/SocialButtons";
import { validationSchema } from "./validationSchema";
import { ConfirmFields } from './ConfirmFields';
import { Fields } from './Fields';



import { LoaderAbsolute } from '../../Loader/LoaderAbsolute/LoaderAbsolute';


const RegisterForm = ({ setPage }) => {
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    return (
        <div>

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPolicy: false,
                    confirmStatute: false,
                    confirmMarketing: false,
                    submit: null,
                }}
                validationSchema={Yup.object().shape(validationSchema)}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { username, email, password, confirmPolicy, confirmStatute, confirmMarketing } = values;

                    setIsLoading(true);
                    const [fetch] = useApi();

                    fetch(`/register`, { username, email, password, confirmPolicy, confirmStatute, confirmMarketing }, 'post')
                        .then(response => {
                            console.log("responseRegister", response);
                            // setServerError(null);
                            // if (response.url) {
                            //     location.href = response.url;
                            // }
                        }).catch(error => {
                            console.log("error1", typeof error.message);
                            if (error.message.includes("Wybrany")) {
                                // setErrors({ email: "Wybrany email jest już zajęty." })
                                setServerError("Wybrany email jest zajęty.");
                            } else {
                                setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                            }

                        }).finally(() => {
                            setIsLoading(false);
                        })
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues, setFieldValue }) => (
                    <Form>
                        {isLoading && <LoaderAbsolute />}
                        {console.log("values", values)}
                        {console.log("errors", errors)}
                        {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}


                        <Fields values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange} errors={errors} />


                        <ConfirmFields values={values} errors={errors} handleChange={handleChange} touched={touched} />



                        <ButtonPrimary style={{ marginTop: 30 }} text="Zarejestruj się" fullWidth />


                    </Form>
                )}
            </Formik>

            <SocialButtons />
            <div className="transporter --flex">
                <div className="text">Masz już konto?</div>
                <ButtonLink onClick={() => setPage("/zaloguj-sie")} text="Zaloguj się" />
            </div>


            {/* <SocialButtons /> */}
        </div>
    )
}

export { RegisterForm }