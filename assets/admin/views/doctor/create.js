import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "./../common/list";
import { Formik, Form } from 'formik';
import { TextField, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import { ButtonGroup } from '../../../frontend/components/ButtonGroup/ButtonGroup';
import { InputTextCounter } from '../../../frontend/components/form/InputTextCounter/InputTextCounter';
import { CategoryList } from '../../../frontend/components/CategoryList/CategoryList';
import { LangueList } from '../../../frontend/components/LangueList/LangueList';
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../frontend/components/ButtonSecondary/ButtonSecondary';
import { LoaderCenter } from "./../../../frontend/components/Loader/LoaderCenter/LoaderCenter";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from '../../lib/redirect';
import { LoaderAbsolute } from './../../../frontend/components/Loader/LoaderAbsolute/LoaderAbsolute';
import { MasterCategoryList } from '../../../frontend/components/MasterCategoryList/MasterCategoryList';

const CreateDoctor = () => {
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [gender, setGender] = useState("woman");
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [categoriesList, setCategoriesList] = useState({ "service": [], "specialization": [], "problem": [], "langue": [] });
    const [categoriesSelected, setCategoriesSelected] = useState({ "service": [], "specialization": [], "problem": [], "langue": [] });
    const [pricesList, setPricesList] = useState({ "terapia-indywidualna": [], "interwencja-kryzysowa": [] });
    const [individual, setIndividual] = useState();
    const [intervention, setIntervention] = useState();

    const [languesList, setLanguesList] = useState([]);
    const [languesSelected, setLanguesSelected] = useState([]);

    const [masterCategoriesSelected, setMasterCategoriesSelected] = useState([]);
    const [masterCategoryList, setMasterCategoryList] = useState([]);


    useEffect(() => {
        // api-fetch-panel-specialist-data

        const [fetch] = useApi();
        fetch('/admin/doctor-init-data', 'post')
            .then((response) => {
                // console.log("response", response);
                setLanguesList(response.langues);
                // setLanguesSelected(response.userData.langues);
                setCategoriesList(response.categories);
                setPricesList(response.pricesList);
                // setIndividual(response.pricesList["terapia-indywidualna"][0].id);
                // setIntervention(response.pricesList["interwencja-kryzysowa"][0].id);


                setMasterCategoryList(response.masterCategories);
                setMasterCategoriesSelected(response.userData.masterCategories);

            })
            .catch((error) => {
                console.log("error", error);


            }).finally(() => {
                // setIsSending(false);
                setIsInitialDataLoaded(true);
            });


    }, []);



    return (
        <Fragment>
            {!isInitialDataLoaded ? (
                <LoaderCenter />

            ) : (

                <Formik
                    // enableReinitialize={true}
                    initialValues={{
                        username: "",
                        email: "",
                        phone: "",
                        password: Math.random().toString(36).slice(-8),

                        about: "",
                        workwith: "",
                        education: "",
                        experience: "",
                        submit: null,
                    }}
                    handleSubmit={() => alert("submit")}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().max(255).required('To pole jest wymagane.'),
                        email: Yup.string().email('Niepoprawny adres email.').max(255).required('To pole jest wymagane.'),
                        phone: Yup.string()
                            .matches(/^\d+$/, 'Poprawny numer telefonu powinien zawierać tylko liczby.')
                            .max(15, "Wybrany numer telefonu jest za długi.")
                            .nullable()

                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        setIsLoading(true);
                        const { password, username, email, phone, about, workwith, education, experience, submit } = values;

                        const categoriesList = []
                        Object.keys(categoriesSelected).map(key => categoriesSelected[key].map(item => categoriesList.push(item.id)));

                        const [fetch] = useApi();

                        const masterCategoriesList = []
                        masterCategoriesSelected.map(item => masterCategoriesList.push(item.id));

                        fetch('/admin/create-doctor', { password, username, email, phone, about, workwith, education, experience, gender, categories: JSON.stringify(categoriesList), langues: languesSelected, masterCategories: JSON.stringify(masterCategoriesList) }, 'post')
                            .then((response) => {
                                console.log("response", response);
                                // message.success("Twoje dane zostały zaktualizowane.");
                                redirect("/admin/specjalisci");
                            })
                            .catch((error) => {
                                console.log("error", error);
                                if (error.message.includes("Wybrany")) {
                                    // setErrors({ email: "Wybrany email jest już zajęty." })
                                    setServerError("Wybrany email jest zajęty.");
                                } else {
                                    setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                                }
                                // setIsSending(false);
                            }).finally(() => {
                                setIsLoading(false);
                            });

                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
                        <Form>

                            <div style="position:relative">
                                {isLoading && <LoaderAbsolute />}


                                <h3 className='main--subtitle'>Podstawowe informacje</h3>
                                {serverError && <FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}
                                {/* <ImageUploader userID={initialUserData.userID} imageUrlDefault={initialUserData.avatar} /> */}
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
                                    name="email"
                                    label="Email"
                                    size="medium"
                                    sx={{ mt: 3 }}
                                    value={values.email}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 255 }}
                                />
                                {Boolean(touched.email && errors.email) && <FormHelperText error>{errors.email}</FormHelperText>}
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Hasło"
                                    size="medium"
                                    sx={{ mt: 3 }}
                                    value={values.password}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 255 }}
                                />
                                {Boolean(touched.password && errors.password) && <FormHelperText error>{errors.password}</FormHelperText>}
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


                                {/* <Fragment>
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


                                {/* <CategoryList type="service" list={categoriesList} setCategoriesSelected={setCategoriesSelected} categoriesSelected={categoriesSelected} /> */}
                                {masterCategoryList.length > 0 && <MasterCategoryList list={masterCategoryList} setCategoriesSelected={setMasterCategoriesSelected} categoriesSelected={masterCategoriesSelected} />}

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
        </Fragment>
    )
}


render(<CreateDoctor />, document.querySelector('#createDoctor'));
