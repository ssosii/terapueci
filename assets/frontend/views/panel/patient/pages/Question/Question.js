import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./question.scss";
import {
    Select,
    TextField,
    FormControl,
    MenuItem
} from "@mui/material";
import message from '../../../../../../admin/components/Toast/message';
import { LoaderAbsolute } from '../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute';
import { InputTextCounter } from '../../../../../components/form/InputTextCounter/InputTextCounter';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary/ButtonPrimary';
import { FormHelperText } from '../../../../../components/form/FormHelperText/FormHelperText';
import { authGuard } from '../../../../../lib/authGuard';
import useApi from '../../../../../lib/api/useApi';
import messageToast from '../../../../../../admin/components/Toast/message';



const Question = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="question--component" style={{ position: "relative" }}>

            {isLoading && <LoaderAbsolute />}
            <Formik
                enableReinitialize={true}
                initialValues={{
                    topic: "",
                    message: "",

                    submit: null,
                }}
                handleSubmit={() => alert("submit")}
                validationSchema={Yup.object().shape({
                    topic: Yup.string().max(75, "Temat nie może mieć więcej niż 75 znaków.").required('To pole jest wymagane.'),
                    message: Yup.string().max(1000, "Wiadomość nie może mieć więcej niż 450 znaków.").required('To pole jest wymagane.'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    const { topic, message } = values;

                    setIsLoading(true);
                    const [fetch] = useApi();

                    fetch('/api-patient-send-message', { topic, message }, 'post')
                        .then((response) => {
                            console.log("response", response);
                            messageToast.success("Wiadomość została wysłana.");
                            resetForm();
                        })
                        .catch((error) => {
                            authGuard(error);
                            messageToast.error("Coś poszło nie tak. Spróbuj ponownie.");
                            // setIsSending(false);
                        }).finally(() => {
                            setIsLoading(false);
                        });

                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                    <Form>

                        <h1 className='main--title'>Zadaj pytanie</h1>

                        <TextField
                            fullWidth
                            name="topic"
                            label="Temat"
                            inputProps={{ maxLength: 255 }}
                            size="medium"
                            sx={{ mt: 3 }}
                            value={values.topic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.topic && errors.topic)}
                        />

                        {Boolean(touched.topic && errors.topic) && <FormHelperText error>{errors.topic}</FormHelperText>}

                        <TextField
                            fullWidth
                            name="message"
                            label="Treść"
                            multiline
                            minRows={5}
                            maxRows={5}
                            sx={{ mt: 3 }}
                            size="medium"
                            value={values.message}
                            onChange={handleChange}
                            inputProps={{ maxLength: 1000 }}
                            error={Boolean(touched.message && errors.message)}
                        />
                        {Boolean(touched.message && errors.message) && <FormHelperText error>{errors.message}</FormHelperText>}
                        <InputTextCounter signsNumber={values.message.length} limit={1000} />

                        <ButtonPrimary style={{ marginTop: 20 }} text="Wyślij wiadomość" />

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export { Question }