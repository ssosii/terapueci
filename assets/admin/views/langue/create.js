import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "../common/list";
import { Formik, Form } from 'formik';
import { TextField, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { LoaderCenter } from "../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from '../../lib/redirect';

const CreateLangue = () => {
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        // api-fetch-panel-specialist-data

        // const [fetch] = useApi();
        // fetch('/admin/doctor-init-data', 'post')
        //     .then((response) => {
        //         console.log("response",response);
        //         setLanguesList(response.langues);
        //         // setLanguesSelected(response.userData.langues);
        //         setCategoriesList(response.categories);
        //         // setInitialUserData(response.userData);

        //         // setInitialCategoriesData(response.userData.categories);
        //         // setCategoriesSelected(response.userData.categories);
        //         // setGender(response.userData.gender);
        //     })
        //     .catch((error) => {
        //         console.log("error", error);

        //     }).finally(() => {
        //         // setIsSending(false);
        //         setIsInitialDataLoaded(true);
        //     });


    }, []);



    return (
        <Fragment>

            <Formik
                initialValues={{
                    name: "",
                    submit: null,
                }}
                handleSubmit={() => alert("submit")}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('To pole jest wymagane.'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { name } = values;

                    const [fetch] = useApi();

                    fetch('/admin/api-create-langue', { name }, 'post')
                        .then((response) => {
                            console.log("response", response);
                            // message.success("Twoje dane zostały zaktualizowane.");
                            redirect("/admin/jezyki");
                        })
                        .catch((error) => {
                            console.log("error", error);

                            setServerError("Coś poszło nie tak. Spróbuj ponownie.");

                            // setIsSending(false);
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
                            inputProps={{ maxLength: 255 }}
                            error={Boolean(touched.name && errors.name)}
                            onChange={handleChange}
                        />
                        {Boolean(touched.name && errors.name) && <FormHelperText error>{errors.name}</FormHelperText>}


                        <div style={{ display: "flex", marginTop: 20 }}>
                            <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />

                        </div>
                    </Form>
                )}
            </Formik>

        </Fragment>
    )
}


render(<CreateLangue />, document.querySelector('#createLangue'));
