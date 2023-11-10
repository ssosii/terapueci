
import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useApi from '../../../lib/api/useApi';
import { LoaderCenter } from "./../../../components/Loader/LoaderCenter/LoaderCenter";
import { ReadMore } from '../../../components/ReadMore/ReadMore';
import { AppoitmentsSlider } from '../../../components/AppoitmentsSlider/AppoitmentsSlider';
import "./profile.scss";



const PatientProfile = ({ doctorID }) => {

    const [userData, setUserData] = useState(null);

    const [selectedPrice, setSelectedPrice] = useState(null);
    const [pricesList, setPricesList] = useState({});


    useEffect(() => {
        const [fetch] = useApi();
        fetch(`/api-fetch-single-doctor/${doctorID}`, 'get')
            .then((response) => {

                console.log("response", response);
                const selectedPrices = {}
                response.doctor.priceItemsList.map(item => {
                    selectedPrices[item.masterCategory] = { price: item.price, priceItem: item.priceItem, masterCategory: item.masterCategory, name: item.name, valueForPatient: item.valueForPatient };
                })

                setPricesList(selectedPrices);
                setSelectedPrice(Object.values(selectedPrices)[0]);

                setUserData(response.doctor);
            })
            .catch((error) => {
                console.log("error", error);
                // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                // setIsInitDoctorList(true);
                // setIsLoading(false);
            });



        // /api-fetch-doctors-list-init-data


    }, []);

    console.log("userData", selectedPrice);

    return (
        <Fragment>

            {!userData ? <LoaderCenter /> : (
                <div className="container">
                    <div className='doctor-item'>

                        <div className="content">
                            <div className="label">
                                <div className="avatar">
                                    <img src={userData.avatarUrl} />
                                </div>
                                <div className="info">
                                    <div className="username">{userData.username}</div>
                                    <div className="categories">
                                        {userData.masterCategories && userData.masterCategories.map((category, i) => userData.masterCategories.length !== i + 1 ? `${category} ・ ` : category)}
                                    </div>
                                    {userData.languesList.length > 0 && (
                                        <div className="langues">
                                            <span className='title'>Języki:</span> {userData.languesList.map((langue, i) => userData.languesList.length !== i + 1 ? `${langue}, ` : langue)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {userData.about && (
                                <div style={{ margin: "20px 0" }} className="main--line"></div>
                            )}


                            <div className="info">


                                {userData.categoriesList.specialization && userData.categoriesList.specialization.length > 0 && (
                                    <div className='item'>
                                        <div className="title">Nurt / specjalizacja</div>
                                        <div className="categories">
                                            {userData.categoriesList.specialization && userData.categoriesList.specialization.map((category, i) => userData.categoriesList.specialization.length !== i + 1 ? `${category} ・ ` : category)}
                                        </div>
                                    </div>
                                )}

                                {userData.categoriesList.problem && userData.categoriesList.problem.length > 0 && (
                                    <div className='item'>
                                        <div className="title">Obszary wsparcia</div>
                                        <div className="categories">
                                            {userData.categoriesList.problem && userData.categoriesList.problem.map((category, i) => userData.categoriesList.problem.length !== i + 1 ? `${category} ・ ` : category)}
                                        </div>
                                    </div>
                                )}


                                {userData.about && userData.about.length > 0 && (
                                    <div className='item'>
                                        <div className='title'>O mnie</div>
                                        <div className='description'>{userData.about}</div>
                                    </div>
                                )}

                                {userData.workWith && userData.workWith.length > 0 && (
                                    <div className='item'>
                                        <div className='title'>Z kim pracuje</div>
                                        <div className='description'>{userData.workWith}</div>
                                    </div>
                                )}

                                {userData.education && userData.education.length > 0 && (
                                    <div className='item'>
                                        <div className='title'>Edukacja</div>
                                        <div className='description'>{userData.education}</div>
                                    </div>
                                )}

                                {userData.experience && userData.experience.length > 0 && (
                                    <div className='item'>
                                        <div className='title'>Doświadczenie</div>
                                        <div className='description'>{userData.experience}</div>
                                    </div>
                                )}


                            </div>
                        </div>

                        <div className="action">

                            <Fragment>
                                {Object.values(userData.appoitments).length === 0 ? (
                                    <div className='empty-info'>Brak wolnych terminów.</div>
                                ) : (
                                    // <Fragment>
                                    //     {appointmentType && (
                                    //         <Fragment>
                                    //             <FormControl fullWidth>
                                    //                 <InputLabel id="appoitmentType">Rodzaj konsultacji</InputLabel>
                                    //                 <Select
                                    //                     labelId="appoitmentType-label"
                                    //                     id="appoitmentType-select"
                                    //                     value={appointmentType}
                                    //                     label="Rodzaj konsultacji"
                                    //                     size='medium'
                                    //                     onChange={(e) => setAppointmentType(e.target.value)}
                                    //                 >
                                    //                     {userData.individualPrice && <MenuItem value={"terapia-indywidualna"}>Terapia indywidualna ({userData.individualPrice.valueForPatient}zł)</MenuItem>}
                                    //                     {userData.crisisPrice && <MenuItem value={"interwencja-kryzysowa"}>Interwencja kryzysowa ({userData.crisisPrice.valueForPatient}zł)</MenuItem>}
                                    //                 </Select>
                                    //             </FormControl>
                                    //             <AppoitmentsSlider appoitments={userData.appoitments} appoitmentType={appointmentType} doctorID={doctorID} doctorSlug={userData.slug} />
                                    //         </Fragment>
                                    //     )}
                                    // </Fragment>
                                    <Fragment>
                                        {selectedPrice && (
                                            <Fragment>
                                                <FormControl fullWidth>
                                                    <InputLabel id="appoitmentType">Rodzaj konsultacji</InputLabel>
                                                    <Select
                                                        labelId="appoitmentType-label"
                                                        id="appoitmentType-select"
                                                        value={selectedPrice.priceItem}
                                                        label="Rodzaj konsultacji"
                                                        size='medium'
                                                        onChange={(e) => handleChangeAppoitmentType(e.target.value)}
                                                    >

                                                        {Object.values(pricesList).map(item => <MenuItem value={item.priceItem}>{item.name} ({item.valueForPatient}zł)</MenuItem>)}
                                                        {/* {individualPrice && <MenuItem value={"terapia-indywidualna"}>Terapia indywidualna ({individualPrice.valueForPatient}zł)</MenuItem>}
                                                {crisisPrice && <MenuItem value={"interwencja-kryzysowa"}>Interwencja kryzysowa ({crisisPrice.valueForPatient}zł)</MenuItem>} */}
                                                    </Select>
                                                </FormControl>
                                                <AppoitmentsSlider appoitments={userData.appoitments} appoitmentType={selectedPrice} doctorID={doctorID} doctorSlug={userData.slug} />
                                            </Fragment>


                                        )}

                                    </Fragment>
                                )}
                            </Fragment>




                        </div>

                    </div>

                </div>
            )}



        </Fragment>




    )
}




const el = document.querySelector('#patientProfile');
const doctorID = el.dataset.id;


render(<PatientProfile
    doctorID={doctorID}
/>, document.querySelector('#patientProfile'));
