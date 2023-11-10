import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "./../common/list";
import { Formik, Form } from 'formik';

import {
    TextField,
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import { ButtonGroup } from '../../../frontend/components/ButtonGroup/ButtonGroup';
import { InputTextCounter } from '../../../frontend/components/form/InputTextCounter/InputTextCounter';
import { CategoryList } from '../../../frontend/components/CategoryList/CategoryList';
import { MasterCategoryList } from '../../../frontend/components/MasterCategoryList/MasterCategoryList';
import { LangueList } from '../../../frontend/components/LangueList/LangueList';
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../frontend/components/ButtonSecondary/ButtonSecondary';
import { LoaderCenter } from "./../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from '../../lib/redirect';
import { ChangePassword } from './ChangePassword';
import { ChangeEmail } from './ChangeEmail';
import message from '../../components/Toast/message';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ImageUploader } from "./ImageUploader/ImageUploader"
import { LoaderAbsolute } from './../../../frontend/components/Loader/LoaderAbsolute/LoaderAbsolute';
import { PhotoInfo } from './PhotoInfo';

const EditDoctor = ({ doctorID }) => {
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [gender, setGender] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);
    const [initialCategoriesData, setInitialCategoriesData] = useState();
    const [serverError, setServerError] = useState(null);
    // const [individual, setIndividual] = useState();
    // const [intervention, setIntervention] = useState();
    // const [pricesList, setPricesList] = useState();
    const [emailServerError, setEmailServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [masterCategoriesSelected, setMasterCategoriesSelected] = useState([]);
    const [masterCategoryList, setMasterCategoryList] = useState([]);

    const [categoriesList, setCategoriesList] = useState({ "service": [], "specialization": [], "problem": [], "langue": [] });
    const [categoriesSelected, setCategoriesSelected] = useState({ "service": [], "specialization": [], "problem": [], "langue": [] });


    const [languesList, setLanguesList] = useState([]);
    const [languesSelected, setLanguesSelected] = useState([]);

    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/admin/doctor-init-data-edit/${doctorID}`, 'post')
            .then((response) => {
                console.log("response", response);
                setLanguesList(response.langues);
                setLanguesSelected(response.userData.langues);
                setCategoriesList(response.categories);
                setInitialUserData(response.userData);

                setInitialCategoriesData(response.userData.categories);
                setCategoriesSelected(response.userData.categories);
                setGender(response.userData.gender);


                setMasterCategoryList(response.masterCategories);
                setMasterCategoriesSelected(response.userData.masterCategories);

                // setPricesList(response.pricesList);
                // setIndividual(response.userData.individualPrice);
                // setIntervention(response.userData.crisisPrice);
                // console.log("xxx",response.userData);
            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });


    }, []);

    console.log("emailServerError", masterCategoryList);

    return (
        <Fragment>
            {!isInitialDataLoaded ? (
                <LoaderCenter />

            ) : (

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        username: initialUserData?.username ?? null,
                        phone: initialUserData?.phone ?? null,

                        about: initialUserData?.about ?? null,
                        workwith: initialUserData?.workwith ?? null,
                        education: initialUserData.education ?? null,
                        experience: initialUserData.experience ?? null,
                        submit: null,
                    }}
                    handleSubmit={() => alert("submit")}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().max(255).required('To pole jest wymagane.'),
                        // phone: Yup.string().matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.').max(4, "Wybrany numer telefonu jest za krótki.").max(15, "Wybrany numer telefonu jest za długi."),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const { password, username, phone, about, workwith, education, experience, submit } = values;

                        const categoriesList = []
                        Object.keys(categoriesSelected).map(key => categoriesSelected[key].map(item => categoriesList.push(item.id)));

                        const [fetch] = useApi();
                        console.log("Data", username, phone, about, workwith, education, experience, gender, "categories", JSON.stringify(categoriesList), "langues", languesSelected);

                        const masterCategoriesList = []
                        masterCategoriesSelected.map(item => masterCategoriesList.push(item.id));

                        fetch(`/admin/update-doctor/${doctorID}`, { password, username, phone, about, workwith, education, experience, gender, categories: JSON.stringify(categoriesList), langues: languesSelected, masterCategories: JSON.stringify(masterCategoriesList)}, 'post')
                            .then((response) => {
                                console.log("response", response);
                                message.success("Zapisano pomyślnie.");
                                // redirect("/admin/specjalisci");
                            })
                            .catch((error) => {
                                console.log("error edit", error);
                                setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                                if (error?.message?.includes("email")) {
                                    setEmailServerError("Wybrany email jest zajęty.");
                                }


                            }).finally(() => {
                                // setIsSending(false);
                            });

                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                        <Form>
       <div style="position:relative">
                            {isLoading && <LoaderAbsolute />}
                            <h3 className='main--subtitle'>Podstawowe informacje</h3>
                            {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}
                            <PhotoInfo />
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


                            <TextField
                                fullWidth
                                name="phone"
                                label="Numer telefonu"
                                size="medium"
                                sx={{ mt: 3 }}
                                value={values.phone}
                                inputProps={{ maxLength: 255 }}
                                onChange={handleChange}
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



{/* 
                            <Fragment>
                                <h3 style={{ marginTop: 40 }} className='main--subtitle'>Psychoterapia indywidualna</h3>

                                <FormControl fullWidth>
                                    <Select
                                        labelId="month-label"
                                        id="month-select"
                                        fullWidth
                                        size='small'
                                        sx={{ mt: 3 }}
                                        value={individual}
                                        onChange={(e) => setIndividual(e.target.value)}
                                    // MenuProps={{
                                    //     disableScrollLock: true,
                                    //   }}
                                    >
                                        {pricesList["terapia-indywidualna"].map(item => (
                                            <MenuItem value={item.id}>{`${item.valueForPatient} zł (dla ciebie ${item.valueForDoctor} zł / wizytę)`}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <div style={{ margin: "20px 0" }} className='main--line'></div>


                                <h3 className='main--subtitle'>Interwencja kryzysowa</h3>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="month-label"
                                        id="month-select"
                                        fullWidth
                                        size='small'
                                        sx={{ mt: 3 }}
                                        value={intervention}
                                        onChange={(e) => setIntervention(e.target.value)}
                                    // MenuProps={{
                                    //     disableScrollLock: true,
                                    //   }}
                                    >
                                        {pricesList["interwencja-kryzysowa"].map(item => (
                                            <MenuItem value={item.id}>{`${item.valueForPatient} zł (dla ciebie ${item.valueForDoctor} zł / wizytę)`}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Fragment> */}



                            <div style={{ margin: "40px 0" }} className='main--line'></div>

                            <h3 className='main--subtitle'>Jakie świadczysz usługi?</h3>
                            {masterCategoryList.length > 0 && <MasterCategoryList list={masterCategoryList} setCategoriesSelected={setMasterCategoriesSelected} categoriesSelected={masterCategoriesSelected} />}
                            
                            {/* <CategoryList type="service" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} /> */}

                            <h3 className='main--subtitle'>W jakich nurtach i specjalizacjach pracujesz?"</h3>


                            <CategoryList type="specialization" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} />

                            <h3 className='main--subtitle'>Jakimi problemami się zajmujesz?</h3>


                            <CategoryList type="problem" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} />

                            <h3 className='main--subtitle'>W jakich językach prowadzisz terapię?</h3>


                            {/* <CategoryList type="langue" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} /> */}

                            <LangueList list={languesList} setLanguesSelected={setLanguesSelected} languesSelected={languesSelected} />



                            <div style={{ margin: "40px 0" }} className='main--line'></div>

                            <div style={{ display: "flex" }}>
                                <ButtonPrimary style={{ marginRight: 10 }} text="Zapisz" />

                            </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}




            <h3 style={{ marginTop: 60 }} className='main--subtitle'>Zmień hasło</h3>

            <ChangePassword doctorID={doctorID} />

            <h3 style={{ marginTop: 60 }} className='main--subtitle'>Zmień email</h3>

            <ChangeEmail email={initialUserData?.email ?? null} doctorID={doctorID} />

        </Fragment>
    )
}

const el = document.querySelector('#editDoctor');
const doctorID = el.dataset.id;
console.log("el", el);

render(<EditDoctor doctorID={doctorID} />, el);
