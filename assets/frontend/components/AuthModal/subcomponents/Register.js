import { h, render, Fragment } from 'preact';
import axios from 'axios';
import useApi from '../../../lib/api/useApi';

import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { InputText } from '../../form/InputText/InputText';
import { Checkbox } from '../../form/Checkbox/Checkbox';
import { FormError } from '../../form/FormError/FormError';

const Register = ({ setType }) => {
    const [fetch] = useApi();
    const [serverError, setServerError] = useState(null);


    return (
        <Fragment>
            <h2 class="title">Dolącz do nas</h2>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    // confirm: false,
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('To pole jest wymagane.'),
                    email: Yup.string().email('Niepoprawny adres email').max(255).required('To pole jest wymagane.'),
                    password: Yup.string().required('To pole jest wymagane.').max(255),
                    phone: Yup.string().max(4, "Wybrany numer telefonu jest za krótki.").max(15, "Wybrany numer telefonu jest za długi.").required('To pole jest wymagane.'),
                    confirmPassword: Yup.string()
                        .required('To pole jest wymagane')
                        .oneOf([Yup.ref('password'), null], 'Hasła nie pasują'),
                    // confirm: Yup.bool().oneOf([true], 'Musisz zaakceptować regulamin.'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { email, password } = values;
                    console.log("submit");
                    console.log("email", email);

                    fetch(`/register`, { email }, 'post')
                        .then((response) => {
                            console.log("response fetch", response);
                        })
                        .catch((error) => {

                        }).finally(() => {

                        });

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <Form>

                        {serverError && <FormError>{serverError}</FormError>}
                        <InputText label="Imię i nazwisko" type="text" name='username' touched={touched.username} error={Boolean(touched.username && errors.username) ? errors.username : null} value={values.username} onBlur={handleBlur} handleChange={handleChange} />
                        <InputText label="Adres email" type="email" name='email' touched={touched.email} error={Boolean(touched.email && errors.email) ? errors.email : null} value={values.email} onBlur={handleBlur} handleChange={handleChange} />
                        <InputText label="Numer telefonu" type="text" name='phone' touched={touched.phone} error={Boolean(touched.phone && errors.phone) ? errors.phone : null} value={values.phone} onBlur={handleBlur} handleChange={handleChange} />

                        <InputText label="Hasło" type="password" name='password' touched={touched.password} error={Boolean(touched.password && errors.password) ? errors.password : null} value={values.password} onBlur={handleBlur} handleChange={handleChange} />
                        <InputText label="Powtórz hasło" type="password" name='confirmPassword' touched={touched.confirmPassword} error={Boolean(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword : null} value={values.confirmPassword} onBlur={handleBlur} handleChange={handleChange} />

                        {console.log(errors, values)}
                        <Field
                            error={touched.confirm && errors.confirm ? true : false}
                            name='confirm'
                            label='Zgoda'
                            component={Checkbox}
                        />
                        <ButtonPrimary text="Załóż konto" />

                        <div onClick={() => setType("forgot-password")}>Zapomniałes hasła?</div>


                        <div onClick={() => setType("register")}>Nie masz konta?</div>
                    </Form>

                )}
            </Formik>

        </Fragment>

    )
}

export { Register }