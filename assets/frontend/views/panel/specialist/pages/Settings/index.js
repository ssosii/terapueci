import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useApi from "../../../../../lib/api/useApi";
import "./settings.scss";
import {
    TextField
} from "@mui/material";

import { ButtonGroup } from '../../../../../components/ButtonGroup/ButtonGroup';
import { InputTextCounter } from '../../../../../components/form/InputTextCounter/InputTextCounter';
import { CategoryList } from '../../../../../components/CategoryList/CategoryList';
import { MasterCategoryList } from '../../../../../components/MasterCategoryList/MasterCategoryList';
import { LangueList } from '../../../../../components/LangueList/LangueList';
import { ButtonPrimary } from '../../../../../components/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../../../components/ButtonSecondary/ButtonSecondary';
import { FormHelperText } from '../../../../../components/form/FormHelperText/FormHelperText';
import message from '../../../../../../admin/components/Toast/message';
import { LoaderCenter } from '../../../../../components/Loader/LoaderCenter/LoaderCenter';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { authGuard } from '../../../../../lib/authGuard';
import { FormError } from "./../../../../../components/form/FormError/FormError";


const SettingsPage = () => {
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [gender, setGender] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);
    const [initialUserDataCopy, setInitialUserDataCopy] = useState(null);
    // const [initialCategoriesData, setInitialCategoriesData] = useState();

    const [categoriesList, setCategoriesList] = useState({  "specialization": [], "problem": [], "langue": [] });
    const [categoriesSelected, setCategoriesSelected] = useState({  "specialization": [], "problem": [], "langue": [] });
    const [masterCategoriesSelected, setMasterCategoriesSelected] = useState([]);
    const [masterCategoryList, setMasterCategoryList] = useState([]);
    const [emailServerError, setEmailServerError] = useState(null);

    const [languesList, setLanguesList] = useState([]);
    const [languesSelected, setLanguesSelected] = useState([]);




    useEffect(() => {
        const [fetch] = useApi();
        fetch('/api-fetch-panel-specialist-data-settings', 'post')
            .then((response) => {
                console.log("resp", response);
                setLanguesList(response.langues);
                setLanguesSelected(response.userData.langues);
                setCategoriesList(response.categories);
                setMasterCategoryList(response.masterCategories);


                //userDataSection
                setInitialUserData(response.userData);
                setCategoriesSelected(response.userData.categories);
                setMasterCategoriesSelected(response.userData.masterCategories);

                setGender(response.userData.gender);
                setFormData({
                    username: response.userData?.username,
                    email: response.userData?.email,
                    phone: response.userData?.phone,

                    about: response.userData?.about,
                    workwith: response.userData?.workwith,
                    education: response.userData?.education,
                    experience: response.userData?.experience,
                });

                setInitialUserDataCopy(response.userData);

            })
            .catch((error) => {
                console.log("error", error);
                authGuard(error);

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });
    }, [])

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",

        about: "",
        workwith: "",
        education: "",
        experience: "",
    });



    const resetData = (e, resetForm) => {
        e.preventDefault();

        resetForm();
        setInitialUserData(initialUserDataCopy);
        setCategoriesSelected(initialUserDataCopy.categories);
        setGender(initialUserDataCopy.gender);
        setLanguesSelected(initialUserDataCopy.langues);

    }

   

    return (
        <div className='settings--components'>

            {(isInitialDataLoaded && initialUserData) ? (
                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                    handleSubmit={() => alert("submit")}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().max(255).required('To pole jest wymagane.'),
                        email: Yup.string().email('Niepoprawny adres email.').max(255).required('To pole jest wymagane.'),
                        phone: Yup.string()
                            .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
                            .max(15, "Wybrany numer telefonu jest za długi.")
                            .nullable(),
                        about: Yup.string().max(500)

                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const { username, email, phone, about, workwith, education, experience, submit } = values;

                        const categoriesList = []
                        Object.keys(categoriesSelected).map(key => categoriesSelected[key].map(item => categoriesList.push(item.id)));

                        const masterCategoriesList = []
                        masterCategoriesSelected.map(item => masterCategoriesList.push(item.id));
                        console.log("masterCategoriesSelected",masterCategoriesSelected,JSON.stringify(masterCategoriesList));

                        const [fetch] = useApi();
                        fetch('/api-update-doctor-settings', { username, email, phone, about, workwith, education, experience, gender, masterCategories: JSON.stringify(masterCategoriesList),  categories: JSON.stringify(categoriesList), langues: languesSelected }, 'post')
                            .then((response) => {
                                console.log("response", response);
                                message.success("Twoje dane zostały zaktualizowane.");
                            })
                            .catch((error) => {
                                if (error?.message?.includes("email")) {
                                    setEmailServerError("Wybrany email jest zajęty.");
                                }
                                authGuard(error);
                                console.log("eror", error.message, error?.message?.includes("email"));
                                // setIsSending(false);
                                message.error("Coś poszło nie tak. Sprawdź błędy w formularzu i spróbuj ponownie.");
                            }).finally(() => {
                                // setIsSending(false);
                            });

                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues, resetForm }) => (
                        <Form>

                            <h1 className='main--title'>Ustawienia konta</h1>
                            <h3 className='main--subtitle'>Podstawowe informacje</h3>

                            <ImageUploader userID={initialUserData.userID} imageUrlDefault={initialUserData.avatar} />
                            <TextField
                                fullWidth
                                name="username"
                                label="Imię i nazwisko"
                                size="medium"
                                sx={{ mt: 3 }}
                                value={values.username}
                                onChange={handleChange}
                                inputProps={{ maxLength: 255 }}
                            />
                            {Boolean(touched.username && errors.username) && <FormHelperText error>{errors.username}</FormHelperText>}

                            {emailServerError && <FormError>Wybrany email jest zajęty.</FormError>}
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                size="medium"
                                sx={{ mt: emailServerError ? 0 : 3 }}
                                value={values.email}
                                onChange={handleChange}
                                inputProps={{ maxLength: 255 }}
                            />
                            {Boolean(touched.email && errors.email) && <FormHelperText error>{errors.email}</FormHelperText>}
                            <TextField
                                fullWidth
                                name="phone"
                                label="Numer telefonu"
                                size="medium"
                                sx={{ mt: 3 }}
                                value={values.phone}
                                onChange={handleChange}
                                inputProps={{ maxLength: 255 }}
                            />
                            {Boolean(touched.phone && errors.phone) && <FormHelperText error>{errors.phone}</FormHelperText>}

                            <div style={{ margin: "40px 0" }} className='main--line'></div>
                            <h3 className='main--subtitle'>Zaznacz swoją płeć</h3>
                            <div style={{ marginTop: 20 }}>
                                <ButtonGroup gender={gender} setGender={setGender} />
                            </div>
                            <div style={{ margin: "40px 0" }} className='main--line'></div>
                            <h3 className='main--subtitle'>Biogram</h3>

                            <TextField
                                fullWidth
                                name="about"
                                label="O mnie"
                                multiline
                                minRows={5}
                                maxRows={5}
                                sx={{ mt: 3 }}
                                size="medium"
                                value={values.about}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                            />
                            <InputTextCounter signsNumber={values.about.length} limit={500} />


                            <TextField
                                fullWidth
                                name="workwith"
                                label="Z kim pracuję"
                                multiline
                                minRows={5}
                                maxRows={5}
                                sx={{ mt: 3 }}
                                size="medium"
                                value={values.workwith}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                            />
                            <InputTextCounter signsNumber={values.workwith.length} limit={500} />


                            <TextField
                                fullWidth
                                name="education"
                                label="Edukacja"
                                multiline
                                minRows={5}
                                maxRows={5}
                                sx={{ mt: 3 }}
                                size="medium"
                                value={values.education}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                            />
                            <InputTextCounter signsNumber={values.education.length} limit={500} />

                            <TextField
                                fullWidth
                                name="experience"
                                label="Doświadczenie"
                                multiline
                                minRows={5}
                                maxRows={5}
                                sx={{ mt: 3 }}
                                size="medium"
                                value={values.experience}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                            />
                            <InputTextCounter signsNumber={values.experience.length} limit={500} />

                            <div style={{ margin: "40px 0" }} className='main--line'></div>

                            <h3 className='main--subtitle'>Jakie świadczysz usługi?</h3>
                            <h4 className='main--smalltitle'>Zaznacz wszystkie pasujące odpowiedzi.</h4>
                        {masterCategoryList && <MasterCategoryList list={masterCategoryList} setCategoriesSelected={setMasterCategoriesSelected} categoriesSelected={masterCategoriesSelected} />}
                            

                            <h3 className='main--subtitle'>W jakich nurtach i specjalizacjach pracujesz?"</h3>
                            <h4 className='main--smalltitle'>Zaznacz wszystkie pasujące odpowiedzi.</h4>

                            <CategoryList type="specialization" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} />

                            <h3 className='main--subtitle'>Jakimi problemami się zajmujesz?</h3>
                            <h4 className='main--smalltitle'>Zaznacz wszystkie pasujące odpowiedzi.</h4>

                            <CategoryList type="problem" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} />

                            <h3 className='main--subtitle'>W jakich językach prowadzisz terapię?</h3>
                            <h4 className='main--smalltitle'>Zaznacz wszystkie pasujące odpowiedzi.</h4>

                            <LangueList list={languesList} setLanguesSelected={setLanguesSelected} languesSelected={languesSelected} />



                            <div style={{ margin: "40px 0" }} className='main--line'></div>

                            <div style={{ display: "flex" }}>
                                <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />
                                <ButtonSecondary onClick={(e) => resetData(e, resetForm)} text="Odrzuć zmiany" />
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <LoaderCenter />
            )}


        </div>
    )
}

export { SettingsPage }