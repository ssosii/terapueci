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

const ForCompany = ({ type }) => {
    const [serverError, setServerError] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(null);
    const [data, setData] = useState();
    const [list, setList] = useState([]);

    useEffect(() => {
        // api-fetch-panel-specialist-data

        const [fetch] = useApi();
        fetch('/admin/api-fetch-cms-for-company-init', 'post')
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
                        fetch('/admin/api-cms-update-company', { data: JSON.stringify(data) ,list: JSON.stringify(list)  }, 'post')
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
{/* 
                            $company_hero_title = $this->getValue('company_hero_title');
        $company_hero_description = $this->getValue('company_hero_description');

        $company_offer1_title = $this->getValue('company_offer1_title');
        $company_offer1_description = $this->getValue('company_offer1_description');

        $company_offer2_title = $this->getValue('company_offer2_title');
        $company_offer2_description = $this->getValue('company_offer2_description');

        $company_offer3_title = $this->getValue('company_offer3_title');
        $company_offer3_description = $this->getValue('company_offer3_description'); */}


                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.company_hero_title}
                                onChange={(e) => handleChange("company_hero_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.company_hero_description}
                                onChange={(e) => handleChange("company_hero_description", e.target.value)}
                            />

                            <div className='section--title'>Co Ci oferujemy?</div>


                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.company_offer1_title}
                                onChange={(e) => handleChange("company_offer1_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.company_offer1_description}
                                onChange={(e) => handleChange("company_offer1_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.company_offer2_title}
                                onChange={(e) => handleChange("company_offer2_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.company_offer2_description}
                                onChange={(e) => handleChange("company_offer2_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}

                                value={data.company_offer3_title}
                                onChange={(e) => handleChange("company_offer3_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.company_offer3_description}
                                onChange={(e) => handleChange("company_offer3_description", e.target.value)}
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

render(<ForCompany />, document.querySelector('#forCompany'));
