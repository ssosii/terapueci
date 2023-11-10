import { h, render, Fragment } from 'preact';
import axios from 'axios';

import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { ButtonLink } from '../../ButtonLink/ButtonLink';
import { InputText } from '../../form/InputText/InputText';
import { FormError } from '../../form/FormError/FormError';
import { ForgottenPasswordAction } from "./ForgottenPasswordAction";
import { LoginFormFields } from "./LoginFormFields";


import {
    Box,
    Button,
    Stack,
    IconButton,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RegisterAction } from './RegisterAction';
import { validationSchema } from './validationSchema';
import { initialValues } from './initValues';
import { SocialButtons } from "./../../auth/SocialButtons/SocialButtons";
import { LoaderAbsolute } from '../../Loader/LoaderAbsolute/LoaderAbsolute';


const LoginForm = ({ setPage }) => {
    const [serverError, setServerError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                    setIsLoading(true);
                    await axios
                        .post('/login', {
                            email,
                            password
                        })
                        .then(response => {

                            setServerError(null);
                            if (response.data.url) {
                                location.href = response.data.url;
                            }
                        }).catch(error => {

                            setServerError("Błędne dane.");
                        }).finally(() => {
                            setIsLoading(false);
                        })


                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <Form>
                        {isLoading && <LoaderAbsolute />}
                        {serverError && <FormError>{serverError}</FormError>}

                        <LoginFormFields values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange} errors={errors} />

                        {/* 

                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                        >
                            <InputLabel htmlFor='email-login'>Email</InputLabel>
                            <OutlinedInput
                                id='email-login'
                                type='email'
                                value={values.email}
                                size="medium"
                                name='email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label='Email'
                                autoComplete='off'

                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id='email-login'>
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ mt: 3, mb: 3 }}

                        >
                            <InputLabel htmlFor='password-login'>Hasło</InputLabel>
                            <OutlinedInput
                                id='password-login'
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                size="medium"
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                            size='large'
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Hasło'
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id='standard-weight-helper-text-password-login'>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl> */}




                        <ButtonPrimary text="Zaloguj się" fullWidth />



                        {/* <div className="transporter --flex">
                            <ButtonLink onClick={() => setPage("/przypomnij-haslo")} text="Przypomnij hasło" />
                        </div>



                        <div className="transporter --flex">
                            <div className="text">Nie masz konta?</div>
                            <ButtonLink onClick={() => setPage("/zaloz-konto")} text="Zarejestruj się" />
                        </div> */}




                    </Form>

                )}

            </Formik>
            <ForgottenPasswordAction style={{ marginTop: 20 }} onClick={() => setPage("/przypomnij-haslo")} />

            <SocialButtons />

            <RegisterAction style={{ marginTop: 20 }} onClick={() => setPage("/zaloz-konto")} />


        </Fragment>
    )
}

export { LoginForm }