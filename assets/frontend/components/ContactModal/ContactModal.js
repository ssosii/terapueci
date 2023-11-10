import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Modal } from "./../../components/Modal/Modal";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useApi from "./../../lib/api/useApi";
import { CheckboxField } from "./../../components/form/CheckboxField/CheckboxField";

// import "./settings.scss";
import {
    TextField,
} from "@mui/material";

import { ButtonPrimary } from '../../components/ButtonPrimary/ButtonPrimary';
import { FormHelperText } from '../../components/form/FormHelperText/FormHelperText';
// import message from '../../../../../../admin/components/Toast/message';
import { LoaderAbsolute } from '../../components/Loader/LoaderAbsolute/LoaderAbsolute';
import { InputTextCounter } from '../form/InputTextCounter/InputTextCounter';

const ContactModal = ({handleClose}) => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bodyClass, setBodyClass] = useState(document.body.className)
    const bodyClasslist = document.body.classList;

    useEffect(() => {
        // const bodyClasslistValue =bodyClass.value;
        // if (bodyClasslistValue.includes("-contact-form-opened")) {
        //     console.log("bodyClasslistValue", bodyClasslistValue);
        //     setIsOpen(true);
        // }
    })

    useEffect(() => {
        console.log("bodyClass");
        // const handleBodyClassChange = () => {
        //     const currentBodyClass = document.body.className;
        //     if (currentBodyClass !== bodyClass) {
        //         setBodyClass(currentBodyClass);
        //     }
        // };

        // // Attach an event listener to detect changes in the body class
        // document.body.addEventListener('DOMSubtreeModified', handleBodyClassChange);

        // return () => {
        //     // Remove the event listener when the component unmounts
        //     document.body.removeEventListener('DOMSubtreeModified', handleBodyClassChange);
        // };
    }, [bodyClass]);






    return (
        <Modal style={{ maxWidth: 660 }} size="sm" isOpen={true} handleClose={handleClose}>
            <div className='main--title --center'>
                {isSubmitted ? "Twoja wiadomość została wysłana!" : "Napisz do nas"}
            </div>
            {isSubmitted && (
                <div style="text-align:center;">Wkrótce nasz pracownik skontaktuje się z Tobą.</div>
            )}


            {!isSubmitted && (

                <Fragment>

                    {isLoading && <LoaderAbsolute />}


                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            username: "",
                            email: "",
                            phone: "",
                            message: "",
                            confirmPolicy: false,
                            submit: null,
                        }}
                        handleSubmit={() => alert("submit")}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().max(255, "Możesz wpisać maksymalnie 255 znaków.").required('To pole jest wymagane.'),
                            email: Yup.string().email('Niepoprawny adres email.').max(255, "Możesz wpisać maksymalnie 255 znaków.").required('To pole jest wymagane.'),
                            phone: Yup.string()
                                .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
                                .max(15, "Wybrany numer telefonu jest za długi.")
                                .nullable(),
                            message: Yup.string().max(1000, "Treść wiadomości jest za długa.").required('To pole jest wymagane.'),
                            confirmPolicy: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            const { username,
                                topic,
                                email,
                                phone,
                                message } = values;

                            setIsLoading(true);

                            const [fetch] = useApi();
                            fetch(`/api-send-contact-form`, {
                                username,
                                email,
                                phone,
                                message,
                            }, 'post')
                                .then((response) => {

                                    setIsSubmitted(true);
                                })
                                .catch((error) => {
                                    console.log("error", error);

                                }).finally(() => {
                                    setIsLoading(false);
                                });


                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues, resetForm }) => (
                            <Form>

                                <TextField
                                    fullWidth
                                    name="username"
                                    label="Imię"
                                    size="medium"
                                    sx={{ mt: 3 }}
                                    error={Boolean(touched.username && errors.username)}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ maxLength: 255 }}
                                />
                                {Boolean(touched.username && errors.username) && <FormHelperText error>{errors.username}</FormHelperText>}
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    size="medium"
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ mt: 3 }}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ maxLength: 255 }}
                                />
                                {Boolean(touched.email && errors.email) && <FormHelperText error>{errors.email}</FormHelperText>}
                                <TextField
                                    fullWidth
                                    name="phone"
                                    label="Numer telefonu"
                                    size="medium"
                                    error={Boolean(touched.phone && errors.phone)}
                                    sx={{ mt: 3 }}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ maxLength: 255 }}
                                />
                                {Boolean(touched.phone && errors.phone) && <FormHelperText error>{errors.phone}</FormHelperText>}



                                <TextField
                                    fullWidth
                                    name="message"
                                    label="Treść wiadomości"
                                    size="medium"
                                    error={Boolean(touched.message && errors.message)}
                                    sx={{ mt: 3 }}
                                    rows={5}
                                    multiline
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ maxLength: 1000 }}
                                />
                                {Boolean(touched.message && errors.message) && <FormHelperText error>{errors.message}</FormHelperText>}


                                <InputTextCounter signsNumber={values.message.length} limit={1000} />


                                <CheckboxField field="confirmPolicy" value={values.confirmPolicy} error={Boolean(touched.confirmPolicy && errors.confirmPolicy)} handleChange={handleChange} style={{ marginBottom: 10, marginTop: 10 }}>
                                    Akceptuję <a className='linkBright' href="/polityka-prywatnosci" target="_blank">Politykę Prywatności.</a>*
                                </CheckboxField>


                                <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
                                    <ButtonPrimary style={{ marginRight: 10 }} text="Wyślij wiadomość" />

                                </div>
                            </Form>
                        )}
                    </Formik>
                </Fragment>
            )}
        </Modal>
    )
}

export { ContactModal }