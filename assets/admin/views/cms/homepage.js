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

const Homepage = ({ type }) => {
    const [serverError, setServerError] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        // api-fetch-panel-specialist-data

        const [fetch] = useApi();
        fetch('/admin/api-fetch-cms-homepage-init', 'post')
            .then((response) => {
                console.log("response", response);
                setData(response.data);
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
                        console.log("data",JSON.stringify(data));
                        const [fetch] = useApi();
                        fetch('/admin/api-cms-update-homepage',{ data: JSON.stringify(data)} , 'post')
                            .then((response) => {
                                console.log("response", response);
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
                    {({ errors, handleBlur,  handleSubmit, isSubmitting, touched, values, setValues }) => (
                        <Form>
                            {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}


                            {/* 'sg_hero_title' => $sg_hero_title,
                'sg_hero_description' => $sg_hero_description,

                'sg_why_cat1_title' => $sg_why_cat1_title,
                'sg_why_cat1_description' => $sg_why_cat1_description,

                'sg_why_cat2_title' => $sg_why_cat2_title,
                'sg_why_cat2_description' => $sg_why_cat2_description,


                'sg_why_cat3_title' => $sg_why_cat3_title,
                'sg_why_cat3_description' => $sg_why_cat3_description,

                'sg_why_cat4_title' => $sg_why_cat4_title,
                'sg_why_cat4_description' => $sg_why_cat4_description,

                'sg_why_cat5_title' => $sg_why_cat5_title,
                'sg_why_cat5_description' => $sg_why_cat5_description,

                'sg_why_cat6_title' => $sg_why_cat6_title,
                'sg_why_cat6_description' => $sg_why_cat6_description,


                'sg_effect_title' => $sg_effect_title,
                'sg_effect_description' => $sg_effect_description, */}


                            <div className='midsection--title'>Hero</div>

                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_hero_title}
                                onChange={(e) => handleChange("sg_hero_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_hero_description}
                                onChange={(e) => handleChange("sg_hero_description", e.target.value)}
                            />

                            <div className='section--title'>Dlaczego warto sięgnąć po wsparcie właśnie u nas?</div>

                            {/* cat1 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat1_title}
                                onChange={(e) => handleChange("sg_why_cat1_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat1_description}
                                onChange={(e) => handleChange("sg_why_cat1_description", e.target.value)}
                            />

                            <div className='main--line'></div>


                            {/* cat2 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat2_title}
                                onChange={(e) => handleChange("sg_why_cat2_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat2_description}
                                onChange={(e) => handleChange("sg_why_cat2_description", e.target.value)}
                            />

                            <div className='main--line'></div>

                            {/* cat3 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat3_title}
                                onChange={(e) => handleChange("sg_why_cat3_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat3_description}
                                onChange={(e) => handleChange("sg_why_cat3_description", e.target.value)}
                            />


                            <div className='main--line'></div>

                            {/* cat4 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat4_title}
                                onChange={(e) => handleChange("sg_why_cat4_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat4_description}
                                onChange={(e) => handleChange("sg_why_cat4_description", e.target.value)}
                            />

                            <div className='main--line'></div>
                            {/* cat5 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat5_title}
                                onChange={(e) => handleChange("sg_why_cat5_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat5_description}
                                onChange={(e) => handleChange("sg_why_cat5_description", e.target.value)}
                            />


                            <div className='main--line'></div>
                            {/* cat6 */}
                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat6_title}
                                onChange={(e) => handleChange("sg_why_cat6_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3,mb:3 }}
                                multiline
                                rows={5}
                                value={data.sg_why_cat6_description}
                                onChange={(e) => handleChange("sg_why_cat6_description", e.target.value)}
                            />

                            <div className='midsection--title'>Skuteczność psychoterapii online jest potwierdzona badaniami naukowymi</div>


                            <TextField
                                fullWidth
                                name="name"
                                label="Tytuł"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_effect_title}
                                onChange={(e) => handleChange("sg_effect_title", e.target.value)}
                            />

                            <TextField
                                fullWidth
                                name="name"
                                label="Opis"
                                size="medium"
                                sx={{ mt: 3 }}
                                multiline
                                rows={5}
                                value={data.sg_effect_description}
                                onChange={(e) => handleChange("sg_effect_description", e.target.value)}
                            />



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

render(<Homepage />, document.querySelector('#homepage'));
