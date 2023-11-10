import { h, render, Fragment } from 'preact';
import axios from 'axios';

import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { InputText } from '../../form/InputText/InputText';
import { FormError } from '../../form/FormError/FormError';

const Login = ({ type, setType }) => {
    const [serverError, setServerError] = useState(null);


    return (
        <Fragment>
            <h2 class="title">Witaj z powrotem</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Niepoprawny adres email.')
                        .max(255)
                        .required('To pole jest wymagane.'),
                    password: Yup.string()
                        .required('To pole jest wymagane.'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { email, password } = values;
                    console.log("submit");

                    await axios
                        .post('/login', {
                            email,
                            password
                        })
                        .then(response => {
                            console.log("response", response);
                            setServerError(null);
                            if (response.data.url) {
                                location.href = response.data.url;
                            }
                        }).catch(error => {
                            console.log("error", error);
                            setServerError("Błędna dane!");
                        }).finally(() => {

                        })


                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <Form>

                        {serverError && <FormError>{serverError}</FormError>}

                        <InputText label="Adres email" type="email" name='email' touched={touched.email} error={Boolean(touched.email && errors.email) ? errors.email : null} value={values.email} onBlur={handleBlur} handleChange={handleChange} />
                        <InputText label="Hasło" type="password" name='password' touched={touched.password} error={Boolean(touched.password && errors.password) ? errors.password : null} value={values.password} onBlur={handleBlur} handleChange={handleChange} />

                        {console.log(errors, values)}

                        <ButtonPrimary text="Zaloguj się" />

                        <div onClick={() => setType("forgot-password")}>Zapomniałes hasła?</div>


                        <div onClick={() => setType("register")}>Nie masz konta?</div>
                    </Form>

                )}
            </Formik>

        </Fragment>

    )
}

export { Login }