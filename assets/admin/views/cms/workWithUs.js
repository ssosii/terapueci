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
import message from '../../components/Toast/message';
import { ListSelector } from '../../components/ListSelector/ListSelector';

const WorkWithUs = ({ type }) => {
    const [serverError, setServerError] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(null);
    const [data, setData] = useState();
    const [list, setList] = useState([]);

    useEffect(() => {
        // api-fetch-panel-specialist-data

        const [fetch] = useApi();
        fetch('/admin/api-fetch-cms-work-with-us-init', 'post')
            .then((response) => {
                console.log("response", response);
                setData(response.data);
                setList(response.list);
                // setLanguesList(response.langues);
                // setLanguesSelected(response.userData.langues);
                // setCategoriesList(response.categories);
                // setInitialUserData(response.userData);

                // setInitialCategoriesData(response.userData.categories);
                // setCategoriesSelected(response.userData.categories);
                // setGender(response.userData.gender);
            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });


    }, []);


    if (!isInitialDataLoaded) {
        return <LoaderCenter />
    }



    const handleChange = (key, value) => {
        setData({ ...data, [key]: value });
    }


    return (
        <Fragment>

            {isInitialDataLoaded && (
                <Formik
                    initialValues={{

                        submit: null,
                    }}
                    handleSubmit={() => alert("submit")}
                    validationSchema={Yup.object().shape({

                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const { name } = values;
                        console.log("data", JSON.stringify(data),JSON.stringify(list));
                        const [fetch] = useApi();
                        fetch('/admin/api-cms-update-work-with-us', { data: JSON.stringify(data) ,list: JSON.stringify(list)  }, 'post')
                            .then((response) => {
                                console.log("responseSave", response);
                                message.success();
                                // redirect("/admin/kategorie");
                            })
                            .catch((error) => {
                                console.log("error", error);
                                message.error();
                                setServerError("Coś poszło nie tak. Spróbuj ponownie.");

                                // setIsSending(false);
                            }).finally(() => {
                                // setIsSending(false);
                            });

                    }}
                >
                    {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, setValues }) => (
                        <Form>
                            {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}


                            <div className='midsection--title'>Hero</div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_hero_title}
                                onChange={(e) => handleChange("work_hero_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_hero_description}
                                onChange={(e) => handleChange("work_hero_description", e.target.value)}
                            />

                            <div className='section--title'>Co Ci oferujemy?</div>


                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_offer1_title}
                                onChange={(e) => handleChange("work_offer1_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_offer1_description}
                                onChange={(e) => handleChange("work_offer1_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_offer2_title}
                                onChange={(e) => handleChange("work_offer2_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_offer2_description}
                                onChange={(e) => handleChange("work_offer2_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_offer3_title}
                                onChange={(e) => handleChange("work_offer3_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_offer3_description}
                                onChange={(e) => handleChange("work_offer3_description", e.target.value)}
                            />



                            <div className='section--title'>Cennik</div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_price1_title}
                                onChange={(e) => handleChange("work_price1_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_price1_description}
                                onChange={(e) => handleChange("work_price1_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_price2_title}
                                onChange={(e) => handleChange("work_price2_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_price2_description}
                                onChange={(e) => handleChange("work_price2_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.work_price3_title}
                                onChange={(e) => handleChange("work_price3_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.work_price3_description}
                                onChange={(e) => handleChange("work_price3_description", e.target.value)}
                            />


                            <div className='section--title'>Lista</div>
                            <ListSelector list={list} setList={setList} />
                            <div className='main--line'></div>

                            <div style={{ display: "flex", marginTop: 20 }}>
                                <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />

                            </div>
                        </Form>
                    )}
                </Formik>
            )}



        </Fragment>
    )
}

render(<WorkWithUs />, document.querySelector('#workWithUs'));
