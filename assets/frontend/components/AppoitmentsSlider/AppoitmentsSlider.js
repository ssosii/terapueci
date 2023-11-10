import { h, render, Fragment } from 'preact';
import { useState, useCallback, useRef } from 'preact/hooks';

import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from "dayjs";
import 'swiper/css';
import 'swiper/scss/navigation';

import "./appoitmentsSlider.scss";
import { getDayOfWeekShortname } from '../../lib/datatime';



const isTommorow = (dateString, onClick) => {
    const today = dayjs();
    const tomorrow = today.add(1, 'day');
    const dateToCompare = dayjs(dateString);
    return dateToCompare.isSame(tomorrow, 'day');
}

const AppoitmentsSlider = ({ appoitments, doctorID, doctorSlug, appoitmentType ,isDoctor }) => {
    const [isShowMore, setIsShowMore] = useState(false);
    const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


    const renderListItem = (time) => {

        // if (isShowMore) {
        //     // return <div className='list-item'>{time}</div>
        //     <a  href={`/zloz-zamowienie/${doctorID}-${slug}/${appoitment.id}/${appoitmentType}`} className='list-item'>{time}</a>
        // } else if (!isShowMore && index < 4) {
        //     return <div className='list-item'>{time}</div>
        // }

    }
    {/* <a href={`/zloz-zamowienie/${id}-${slug}/${appoitment.id}/${appoitmentType}`} */ }
console.log("appoitments",appoitments);

    return (
        <div className='appointments-slider'>
    
            <Swiper
                ref={sliderRef}
                // spaceBetween={10}
                // slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                onReachEnd={() => { }}
                breakpoints={{
                    0:{
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    385:{
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
                    if (list.length > 4) {
                        setIsShowMoreVisible(true);
                    }

                    return (
                        <SwiperSlide>
                            <div className='slider-item'>
                                <div className='day'>
                                    {isTommorow(keyDate) ? "jutro" : getDayOfWeekShortname(dayOfWeek)}
                                </div>
                                <div className='date'>{date}</div>
                                <div className='list'>
                                    {list.map(({ time, id }, index) => {
                                        if (isShowMore) {
                                            return <a className='list-item' href={`/zloz-zamowienie/${doctorID}-${doctorSlug}/${id}/${appoitmentType.priceItem}`}>{time}</a>
                                        } else if (!isShowMore && index < 4) {
                                            return <a className='list-item' href={`/zloz-zamowienie/${doctorID}-${doctorSlug}/${id}/${appoitmentType.priceItem}`}>{time}</a>
                                        }

                                    })}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            {Object.values(appoitments)?.length > 4 && (
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



            {isShowMoreVisible && (
                <div className='show-more' onClick={() => setIsShowMore(!isShowMore)}>
                    <span>{isShowMore ? "Ukryj" : "Pokaż"} więcej godzin</span>
                    <svg style={{ transform: isShowMore ? "rotate(180deg)" : "rotate(0)" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M5.5575 6.4425L9 9.8775L12.4425 6.4425L13.5 7.5L9 12L4.5 7.5L5.5575 6.4425Z" fill="black" />
                    </svg>
                </div>
            )}

        </div>
    )
}

export { AppoitmentsSlider }