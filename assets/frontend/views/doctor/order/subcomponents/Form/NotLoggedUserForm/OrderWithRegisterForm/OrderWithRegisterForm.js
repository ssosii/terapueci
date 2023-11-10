import { h, render } from 'preact';
import axios from 'axios';
import { useState } from 'preact/hooks';
import * as Yup from 'yup';
import useApi from '../../../../../../../lib/api/useApi';
import { Form, Formik } from 'formik';
import { useDebounce } from 'use-debounce';
import {

    TextField
} from "@mui/material";


import { InputTextCounter } from '../../../../../../../components/form/InputTextCounter/InputTextCounter';
import { FormError } from '../../../../../../../components/form/FormError/FormError';
import { ButtonPrimary } from '../../../../../../../components/ButtonPrimary/ButtonPrimary';
import { validationSchema } from "../../../../../../../components/auth/RegisterForm/validationSchema";
import { ConfirmFields } from '../../../../../../../components/auth/RegisterForm/ConfirmFields';
import { Fields } from '../../../../../../../components/auth/RegisterForm/Fields';
import { PromoCodeField } from '../../PromoCodeField';
import { LoaderAbsolute } from "./../../../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute";

const OrderWithRegisterForm = ({ doctorID, appointment: { id, type, priceItem }, price }) => {
    const [serverError, setServerError] = useState(null);
    const [isPromoCode, setIsPromoCode] = useState(false);
    const [isPromoCodeChecking, setIsPromoCodeChecking] = useState(false);
    const [promoCodeId, setPromoCodeId] = useState(null);
    const [promoCodeStatus, setPromoCodeStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const extendedValidationSchema = {
        ...validationSchema, ...{
            phone: Yup.string()
                .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
                .max(15, "Wybrany numer telefonu jest za długi.")
                .nullable(),
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
    }

    return (
        <div className="">
            <Formik
                //   innerRef={p => ( setFormikRef(p))}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    phone: "",
                    message: "",
                    promoCode: "",
                    confirmPolicy: false,
                    confirmStatute: false,
                    confirmMarketing: false,
                    confirmPrzelewy24: false,
                    submit: null,
                }}
                validationSchema={Yup.object().shape(extendedValidationSchema)}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { username, email, password, phone, message, confirmMarketing } = values;
                    setIsLoading(true);
                    console.log("call", `/api-make-appointment-with-register/${id}/${priceItem}`, "promoCode", promoCodeId, "username", username, "email", email, "password", password, "phone", phone, "message", message, "confirm", confirmMarketing, "price", price);

                    const [fetch] = useApi();
                    fetch(`/api-make-appointment-with-register/${id}/${priceItem}`, { isPromoCode, promoCodeId, username, email, password, phone, message, confirmMarketing, price, priceItem }, 'post')
                        .then(response => {
                            console.log("responseRegisterWithout", response);
                            setServerError(null);
                            if (response.url) {
                                location.href = response.url;
                            }
                        }).catch(error => {
                            console.log("error1", error.message);
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
                    <Form style={{ position: "relative" }}>
                        {isLoading && <LoaderAbsolute />}
                        {console.log("values", values)}
                        {console.log("errors", errors)}
                        {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}

                        <Fields values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange} errors={errors} isPhone={true} />

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
                        <InputTextCounter signsNumber={values.message.length} limit={500} value={values.promoCode} handleChange={handleChange} />

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

export { OrderWithRegisterForm }