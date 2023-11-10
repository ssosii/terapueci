import { Fragment, h, render } from 'preact';
import { useState } from 'preact/hooks';
import "./preview.scss";
import { getDayOfWeekName } from "../../../../../lib/datatime";
import { AppoitmentsSliderModal } from '../../../../../components/AppoitmentsSlider/AppoitmentsSliderModal';


const labelsType = {
    "terapia-indywidualna": "Terapia indywidualna",
    "interwencja-kryzysowa": "Interwencja kryzysowa"
};

const Preview = ({ id, doctorID, username, slug, dayOfWeek, dateString, time,priceItemMasterCategoryName, priceItem, avatar, categoriesString,setAppoitment,appointment ,price ,setPrice }) => {
    const [isOpenSliderModal, setIsOpenSliderModal] = useState(false);
    const categoriesList = categoriesString.split("_");
    return (
        <Fragment>
            {isOpenSliderModal && <AppoitmentsSliderModal setPrice={setPrice} appointment={appointment} setAppoitment={setAppoitment} handleClose={() => setIsOpenSliderModal(false)} defaultAppointmentID={id} defaultPriceItem={priceItem} doctorID={doctorID} doctorSlug={slug} />}

            <div className="preview">

                <div className="label">
                    <div className="avatar">
                        <img src={avatar} />
                    </div>
                    <div className="info">
                        <div className="username">
                            {username}
                        </div>
                        <div className="categories">
                            {categoriesList.map((category, i) => {
                                if (categoriesList.length - 1 === i) {
                                    return category;
                                } else {
                                    return (<span>{category} <span style={{ color: "#C7C6CA" }}>・</span></span>);
                                }
                            })}
                        </div>
                    </div>
                </div>

                <div className="action box-shadow">
                    <div className='item'>
                        <div><span style={{ display: "inline", marginRight: 5 }}>{getDayOfWeekName(dayOfWeek)}</span>{dateString}</div>
                        <div>{time}</div>
                    </div>
                    <div style={{ margin: "20px 0" }} className='main--line'></div>
                    <div className='item'>
                        <div>{ priceItemMasterCategoryName}</div>
                        <div style={{ fontWeight: 500 }}>(50 min, {price} zł)</div>
                    </div>
                    <div 
                    onClick={() => setIsOpenSliderModal(true)} 
                    style={{ display: "flex", justifyContent: "end" }}>
                        <div className='button'>
                            Zmień usługę lub termin
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>

    )
}

export { Preview }