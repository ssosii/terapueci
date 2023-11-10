import { h, render, Fragment } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState } from 'preact/hooks';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./doctorItem.scss";

import 'swiper/css';
import 'swiper/scss/navigation';
import { AppoitmentsSlider } from '../../../../../../components/AppoitmentsSlider/AppoitmentsSlider';
import { ReadMore } from '../../../../../../components/ReadMore/ReadMore';

const DoctorItem = forwardRef(({ id, slug, username, about, avatarUrl, appoitments, languesList, categoriesList, individualPrice, crisisPrice, isDoctor, priceItemsList, masterCategories }, ref) => {
    const [appoitmentType, setAppoitmentType] = useState(priceItemsList[0]);


    const handleChangeAppoitmentType = (priceItem) => {
        const newItem = priceItemsList.find(item => item.priceItem === priceItem);
        setAppoitmentType(newItem);
    }

    const doctorBody = (
        <Fragment>
            <div className="content">
                <a href={`/${slug}/d-${id}`} className="label">
                    <div className="avatar">
                        <img src={avatarUrl} />
                    </div>
                    <div className="info">
                        <div className="username">{username}</div>
                        <div className="categories">
                            {masterCategories && masterCategories.map((category, i) => masterCategories.length !== i + 1 ? `${category} ・ ` : category)}
                        </div>
                        {languesList.length > 0 && (
                            <div className="langues">
                                <span className='title'>Języki:</span> {languesList.map((langue, i) => languesList.length !== i + 1 ? `${langue}, ` : langue)}
                            </div>
                        )}
                    </div>
                </a>
                {about && (
                    <div style={{ margin: "20px 0" }} className="main--line"></div>
                )}


                <div className="info">
                    {categoriesList.problem && categoriesList.problem.length > 0 && (
                        <Fragment>
                            <div className="title">Obszary wsparcia</div>
                            <div className="categories">
                                {categoriesList.problem && categoriesList.problem.map((category, i) => categoriesList.problem.length !== i + 1 ? `${category} ・ ` : category)}
                            </div>
                        </Fragment>
                    )}


                    {categoriesList.specialization && categoriesList.specialization.length > 0 && (
                        <Fragment>
                            <div className="title">Nurt i specjalizacja</div>
                            <div className="categories">
                                {categoriesList.specialization && categoriesList.specialization.map((category, i) => categoriesList.specialization.length !== i + 1 ? `${category} ・ ` : category)}
                            </div>
                        </Fragment>
                    )}



                    <div className="description">
                        <ReadMore limit={150}>
                            {about}
                        </ReadMore>
                    </div>

                </div>
            </div>
            <div className="action">
                   
                {isDoctor && <div className={'doctor-blocker'}></div>} 
                {Object.values(appoitments).length === 0 ? (
                    <div className='empty-info'>Brak wolnych terminów.</div>
                ) : (
                    <Fragment>
                        <FormControl fullWidth>
                            <InputLabel id="appoitmentType">Rodzaj konsultacji</InputLabel>
                            <Select
                                labelId="appoitmentType-label"
                                id="appoitmentType-select"
                                value={appoitmentType ? appoitmentType.priceItem : null}
                                label="Rodzaj konsultacji"
                                size='medium'
                                onChange={(e) => handleChangeAppoitmentType(e.target.value)}
                            >
                                {priceItemsList.map(item => <MenuItem value={item.priceItem}>{item.name} ({item.valueForPatient}zł)</MenuItem>)}
                                {/* {individualPrice && <MenuItem value={"terapia-indywidualna"}>Terapia indywidualna ({individualPrice.valueForPatient}zł)</MenuItem>}
                                {crisisPrice && <MenuItem value={"interwencja-kryzysowa"}>Interwencja kryzysowa ({crisisPrice.valueForPatient}zł)</MenuItem>} */}
                            </Select>
                        </FormControl>

                        <AppoitmentsSlider isDoctor={isDoctor} appoitments={appoitments} appoitmentType={appoitmentType} doctorID={id} doctorSlug={slug} />
                    </Fragment>
                )}


            </div>

        </Fragment>
    )

    const content = ref
        ? <article className='doctor-item' ref={ref}>{doctorBody}</article>
        : <article className='doctor-item'>{doctorBody}</article>

    return content


});

// <div ref={ref ? ref : null} className='doctor-item'>
//     <div className="content">
//         <a href={`/${slug}/d-${id}`} className="label">
//             <div className="avatar">
//                 <img src={avatarUrl} />
//             </div>
//             <div className="info">
//                 <div className="username">{username}</div>
//                 <div className="categories">
//                     {categoriesList.service && categoriesList.service.map((category, i) => categoriesList.service.length !== i + 1 ? `${category} ・ ` : category)}
//                 </div>
//                 {languesList.length > 0 && (
//                     <div className="langues">
//                         <span className='title'>Języki:</span> {languesList.map((langue, i) => languesList.length !== i + 1 ? `${langue}, ` : langue)}
//                     </div>
//                 )}
//             </div>
//         </a>
//         {about && (
//             <div style={{ margin: "20px 0" }} className="main--line"></div>
//         )}


//         <div className="info">
//             {categoriesList.problem && categoriesList.problem.length > 0 && (
//                 <Fragment>
//                     <div className="title">Obszary wsparcia</div>
//                     <div className="categories">
//                         {categoriesList.problem && categoriesList.problem.map((category, i) => categoriesList.problem.length !== i + 1 ? `${category} ・ ` : category)}
//                     </div>
//                 </Fragment>
//             )}

//             <div className="description">
//                 <ReadMore limit={150}>
//                     {about}
//                 </ReadMore>
//             </div>

//         </div>
//     </div>
//     <div className="action">
//         {Object.values(appoitments).length === 0 ? (
//             <div className='empty-info'>Brak wolnych terminów.</div>
//         ) : (
//             <Fragment>
//                 <FormControl fullWidth>
//                     <InputLabel id="appoitmentType">Rodzaj konsultacji</InputLabel>
//                     <Select
//                         labelId="appoitmentType-label"
//                         id="appoitmentType-select"
//                         value={appoitmentType}
//                         label="Rodzaj konsultacji"
//                         size='medium'
//                         onChange={(e) => setAppoitmentType(e.target.value)}
//                     >
//                         {individualPrice && <MenuItem value={"terapia-indywidualna"}>Terapia indywidualna ({individualPrice.valueForPatient}zł)</MenuItem>}
//                         {crisisPrice && <MenuItem value={"interwencja-kryzysowa"}>Interwencja kryzysowa ({crisisPrice.valueForPatient}zł)</MenuItem>}
//                     </Select>
//                 </FormControl>

//                 <AppoitmentsSlider appoitments={appoitments} appoitmentType={appoitmentType} doctorID={id} doctorSlug={slug} />
//             </Fragment>
//         )}


//     </div>

// </div>


export { DoctorItem }