import { h, render } from 'preact';
import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import * as Yup from 'yup';
import useApi from '../../../../../../lib/api/useApi';
import { Form, Formik } from 'formik';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';


import { InputTextCounter } from '../../../../../../components/form/InputTextCounter/InputTextCounter';
import { FormError } from '../../../../../../components/form/FormError/FormError';
import { ButtonPrimary } from '../../../../../../components/ButtonPrimary/ButtonPrimary';
import { ConfirmFields } from '../../../../../../components/auth/RegisterForm/ConfirmFields';
import { FormHelperText } from '../../../../../../components/form/FormHelperText/FormHelperText';
import { LoaderCenter } from '../../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { PromoCodeField } from '../PromoCodeField';
import {LoaderAbsolute} from "./../../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute";



const LoggedUserForm = ({ doctorID, appointment: { id, type, priceItem }, price }) => {
    console.log("appointment",id, type, priceItem );
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isPromoCode, setIsPromoCode] = useState(false);
    const [isPromoCodeChecking, setIsPromoCodeChecking] = useState(false);
    const [promoCodeId, setPromoCodeId] = useState(null);
    const [promoCodeStatus, setPromoCodeStatus] = useState(null);


    const validationSchema =
    {
        phone: Yup.string()
            .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
            .max(15, "Wybrany numer telefonu jest za długi.")
            .nullable(),
        confirmPolicy: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
        confirmStatute: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
        confirmPrzelewy24: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
        promoCode: isPromoCode
            ? Yup.string().test('checkPromoCode', 'Wybrany kod jest nieprawidłowy.', value => {
                setIsPromoCodeChecking(true);

                return fetch(`/api-check-promocode`, {
                    method: "POST", body: JSON.stringify({
                        promoCode: value,
                    }),
                }).then(async res => {

                    const { promoCodeId } = await res.json();
                    console.log("check code",value.promoCodeId);
                    if (promoCodeId) {
                        setPromoCodeStatus("success");
                        setPromoCodeId(promoCodeId);
                        return true;
                    } else {
                        setPromoCodeStatus("error");
                        setPromoCodeId(null);
                        return false;
                    }

                }).finally(() => {
                    setIsPromoCodeChecking(false);
                })
            }

            )
            : Yup.string(),

    }


    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/api-fetch-data-for-appointment/${doctorID}/${id}`, {}, 'post')
            .then((response) => {
                console.log("response", response);
                setUserData(response.user);
                setServerError(null);
            })
            .catch((error) => {
                console.log("error", error);


                setServerError("Coś poszło nie tak. Spróbuj ponownie.");




            }).finally(() => {
                // setIsLoading(false);
                // setIsInitialDataLoaded(true);
            });

    }, [])


    if (!userData) {
        return <LoaderCenter />
    }


    return (
        <div className="">
            <Formik
                initialValues={{
                    phone: "",
                    message: "",
                    promoCode:"",
                    confirmPolicy: false,
                    confirmStatute: false,
                    confirmMarketing: false,
                    confirmPrzelewy24: false,
                    submit: null,
                }}
                validationSchema={Yup.object().shape(validationSchema)}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { phone, message } = values;

                    setIsLoading(true);

                    console.log("call1", `/api-make-appointment-for-logged/${userData.id}/${id}/${priceItem}`, promoCodeId, phone, message, price);
                    const [fetch] = useApi();
                    fetch(`/api-make-appointment-for-logged/${userData.id}/${id}/${priceItem}`, { promoCodeId, phone, message, price, priceItem }, 'post')
                        .then(response => {
                            console.log("responseOrder", response);
                            // // setServerError(null);
                            if (response.url) {
                                location.href = response.url;
                            }
                        }).catch(error => {
                            console.log("error1", error.message);
                            // if (error.message.includes("Wybrany")) {
                            //     // setErrors({ email: "Wybrany email jest już zajęty." })
                            //     setServerError("Wybrany email jest zajęty.");
                            // } else {
                            //     setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                            // }

                        }).finally(() => {
                            setIsLoading(false);
                        })

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues, setFieldValue }) => (
                    <Form style={{position:"relative"}}>
                        {isLoading && <LoaderAbsolute />}
                        {console.log("values", values)}
                        {console.log("errors", errors)}
                        {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}


                        <FormControl
                            fullWidth
                            disabled={true}
                        // error={Boolean(touched.email && errors.email)}
                        >
                            <InputLabel htmlFor='email-login'>Imię i nazwisko</InputLabel>
                            <OutlinedInput
                                id='username'
                                type='text'
                                value={userData.username}
                                size="medium"
                                name='username'
                                label='Imię i nazwisko'
                                autoComplete='off'
                                inputProps={{ maxLength: 255 }}

                            />
                        </FormControl>

                        <FormControl
                            fullWidth
                            disabled={true}
                            sx={{ mt: 3 }}
                        >
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <OutlinedInput
                                id='username'
                                type='text'
                                value={userData.email}
                                size="medium"
                                name='email'
                                label='Email'
                                autoComplete='off'
                                inputProps={{ maxLength: 255 }}
                            />
                        </FormControl>


                        <TextField
                            fullWidth
                            name="phone"
                            label="Numer telefonu"
                            size="medium"
                            sx={{ mt: 3 }}
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ maxLength: 255 }}
                            error={Boolean(touched.phone && errors.phone)}
                        />
                        {touched.phone && errors.phone && (
                            <FormHelperText error id='helper-text-phone'>
                                {errors.phone}
                            </FormHelperText>
                        )}


                        <TextField
                            fullWidth
                            name="message"
                            label="Informacja dla specjalisty"
                            multiline
                            minRows={5}
                            maxRows={5}
                            sx={{ mt: 3 }}
                            size="medium"
                            value={values.message}
                            onChange={handleChange}
                            inputProps={{ maxLength: 500 }}
                        />
                        <InputTextCounter signsNumber={values.message.length} limit={500} />

                        <PromoCodeField
                            promoCodeStatus={promoCodeStatus}
                            isPromoCodeChecking={isPromoCodeChecking}
                            setIsPromoCodeChecking={setIsPromoCodeChecking}
                            setIsPromoCode={setIsPromoCode}
                            promoCodeId={promoCodeId}
                            isPromoCode={isPromoCode}
                            value={values.promoCode}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                        />

                        <ConfirmFields isPrzelewy24={true} values={values} errors={errors} handleChange={handleChange} touched={touched} />

                        <ButtonPrimary style={{ marginTop: 30 }} text="Umów wizytę i zapłać" center />
                    </Form>
                )}
            </Formik>



            {/* <SocialButtons /> */}


        </div>
    )
}

export { LoggedUserForm }