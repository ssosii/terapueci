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
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { LoaderCenter } from "../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from '../../lib/redirect';


const EditLangue = ({ langueID }) => {
    const [initialData, setInitialData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/admin/langue-init-data-edit/${langueID}`, 'post')
            .then((response) => {
                console.log("response", response);
                // setLanguesList(response.langues);
                setInitialData(response.name);

            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
            });


    }, []);



    return (
        <Fragment>
            {!initialData ? (
                <LoaderCenter />

            ) : (

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialData ?? null,
                        submit: null,
                    }}
                    handleSubmit={() => alert("submit")}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('To pole jest wymagane.'),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const { name } = values;


                        const [fetch] = useApi();

                        fetch(`/admin/update-langue/${langueID}`, { name }, 'post')
                            .then((response) => {
                                console.log("response", response);
                                setInitialData(response.name);
                                // message.success("Twoje dane zostały zaktualizowane.");
                                redirect("/admin/jezyki");
                            })
                            .catch((error) => {

                                setServerError("Coś poszło nie tak. Spróbuj ponownie.");


                            }).finally(() => {
                                // setIsSending(false);
                            });

                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                        <Form>
                            {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}
                            <TextField
                                fullWidth
                                name="name"
                                label="Nazwa"
                                size="medium"
                                sx={{ mt: 3 }}
                                value={values.name}
                                onChange={handleChange}
                            />
                            {Boolean(touched.name && errors.name) && <FormHelperText error>{errors.name}</FormHelperText>}


                            <div style={{ display: "flex" ,marginTop:20 }}>
                                <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />
                            </div>
                        </Form>
                    )}
                </Formik>
            )}



        </Fragment>
    )
}

const el = document.querySelector('#editLangue');
const langueID = el.dataset.id;


render(<EditLangue langueID={langueID} />, el);
