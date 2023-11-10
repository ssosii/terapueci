import { h, render, Fragment } from 'preact';
import { useState, useCallback, useRef, useEffect } from 'preact/hooks';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from "dayjs";

import useApi from '../../lib/api/useApi';
import 'swiper/css';
import 'swiper/scss/navigation';

import "./appoitmentsSlider.scss";
import { getDayOfWeekShortname } from '../../lib/datatime';
import { Modal } from "./../Modal/Modal";
import { LoaderCenter } from '../Loader/LoaderCenter/LoaderCenter';
import { ButtonLink } from '../ButtonLink/ButtonLink';


const isTommorow = (dateString, onClick) => {
    const today = dayjs();
    const tomorrow = today.add(1, 'day');
    const dateToCompare = dayjs(dateString);
    return dateToCompare.isSame(tomorrow, 'day');
}

const AppoitmentsSliderModal = ({ doctorID, handleClose, setAppoitment, appointment, setPrice }) => {
    const sliderRef = useRef(null);
    const [appoitments, setAppoitments] = useState([]);
    const [temponaryAppointment, setTemponaryAppointment] = useState(appointment);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [pricesList, setPricesList] = useState({});

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);



    const handleChangeAppoitmentType = (priceItem) => {
        const newItem = Object.values(pricesList).find(item => item.priceItem === priceItem);
        setSelectedPrice(newItem);

    }


    
    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/api-fetch-data-for-change-appointments/${doctorID}`, 'get')
            .then((response) => {
                console.log("response", response);
                setAppoitments(response.appoitmentsList);
                // setPricesList(response.pricesList);
                const selectedPrices = {}
                response.masterCategoriesList.map(item => {
                    selectedPrices[item.masterCategory] = { price: item.selectedPrice, priceItem: item.selectedPriceItem, masterCategory: item.masterCategory, name: item.name, valueForPatient: item.valueForPatient };
                })

                setPricesList(selectedPrices);
                setSelectedPrice(Object.values(selectedPrices)[0]);
                // setPrices({ "terapia-indywidualna": response.individualPrice, "interwencja-kryzysowa": response.crisisPrice });
            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                setIsLoading(false);
            });

    }, []);



    console.log("selectedPrices", selectedPrice, pricesList);

    // const handleChangeAppointmentType = (value) => {
    //     setTemponaryAppointment({ ...temponaryAppointment, type: value });
    // }

    const handleSave = () => {
        setAppoitment(temponaryAppointment);
        setPrice(selectedPrice.valueForPatient);
        handleClose();

    }

    const handleChangeTemponaryAppointment = ({ id, dayOfWeek, time }) => {
        setTemponaryAppointment({ ...temponaryAppointment, ...{ id, dayOfWeek, time } });
    }


    return (

        <Modal style={{ maxWidth: 460 }} size="sm" isOpen={true} handleClose={handleClose}>

            <h2 className='main--title'>
                Zmień termin lub usługę
            </h2>


            <Fragment>
                {/* <FormControl fullWidth 
                // size="small"
                >
                    <InputLabel id="appoitmentType">Rodzaj konsultacji</InputLabel>
                    <Select
                        labelId="appoitmentType-label"
                        id="appoitmentType-select"
                        value={temponaryAppointment.type}
                        label="Rodzaj konsultacji"
    
                        onChange={(e) => handleChangeAppointmentType(e.target.value)}
                    >
                        {prices["terapia-indywidualna"] && <MenuItem value={"terapia-indywidualna"}>Terapia indywidualna ({prices["terapia-indywidualna"]}zł)</MenuItem>}
                        {prices["interwencja-kryzysowa"] && <MenuItem value={"interwencja-kryzysowa"}>Interwencja kryzysowa ({prices["interwencja-kryzysowa"]}zł)</MenuItem>}
                    </Select>
                </FormControl> */}

                <Fragment>
                    {selectedPrice && (
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

                    )}

                </Fragment>

            </Fragment>

            <div className='appointments-slider --modal'>

                {isLoading ? <LoaderCenter /> : (

                    <Swiper
                        ref={sliderRef}
                        // spaceBetween={10}
                        // slidesPerView={4}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        onReachEnd={() => { }}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            385: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {Object.entries(appoitments).map(([keyDate, appointment]) => {
                            const { date, dayOfWeek, list, id } = appointment;
                            return (
                                <SwiperSlide>
                                    <div className='slider-item'>
                                        <div className='day'>
                                            {isTommorow(keyDate) ? "jutro" : getDayOfWeekShortname(dayOfWeek)}
                                        </div>
                                        <div className='date'>{date}</div>
                                        <div className='list'>
                                            {list.map(({ time, id }, index) => {
                                                return <div
                                                    onClick={() => handleChangeTemponaryAppointment({ id, dayOfWeek, time })}
                                                    className={`list-item ${temponaryAppointment && parseInt(temponaryAppointment.id) === id ? "--active" : ""}`}>
                                                    {time}
                                                </div>

                                            })}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                )}
                {Object.values(appoitments).length > 0 && (
                    <Fragment>
                        <div className="arrow prev-arrow" onClick={handlePrev}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" fill="#45464F" />
                            </svg>
                        </div>
                        <div className="arrow next-arrow" onClick={handleNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9.70504 6L8.29504 7.41L12.875 12L8.29504 16.59L9.70504 18L15.705 12L9.70504 6Z" fill="#45464F" />
                            </svg>
                        </div>
                    </Fragment>
                )}

            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonLink onClick={handleClose} text="Anuluj" />
                <ButtonLink onClick={handleSave} text="Zapisz" />
            </div>

        </Modal>
    )
}

export { AppoitmentsSliderModal }