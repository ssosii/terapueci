import { h, Component, Fragment } from 'preact';
import { useState } from 'preact/compat';
import { DateField } from '@mui/x-date-pickers/DateField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ButtonLink } from '../../../../../../../components/ButtonLink/ButtonLink';
import dayjs from 'dayjs';
import { CalendarButtonIcon } from '../../../../../../../components/form/CalendarButtonIcon/CalendarButtonIcon';
import { CalendarModuleModal } from '../../shared/CalendarModuleModal/CalendarModuleModal';
import { useEffect } from 'react';

const tommorrow = dayjs().add(1, 'day');

// console.log("today", today.format("YY-mm-d"));

const ChoiceDate = ({ fromDate, toDate, setToDate, setFromDate, frequency, setFrequency, handleClose, setStep }) => {

    const [isOpenFromDateCalendar, setIsOpenFromCalendar] = useState(false);
    const [isOpenFromToCalendar, setIsOpenToCalendar] = useState(false);
    const [isMoreThanOneWeek, setIsMoreThanOneWeek] = useState(false);


    useEffect(() => {
        

        const daysDiff = toDate.diff(fromDate, 'day')+2;
        console.log('daysDiff', toDate.format('YYYY-MM-DD'), fromDate.format('YYYY-MM-DD'),  daysDiff);
        if (daysDiff > 7) {
            setIsMoreThanOneWeek(true);
            if (!frequency !== "norepeat") {
                setFrequency("norepeat");
            }
        } else {
            setIsMoreThanOneWeek(false);
    
        }

    }, [fromDate, toDate]);



    const handleChangeFromDate = (newValue) => {

        const newValueObj = dayjs(new Date(newValue.format('YYYY-MM-DD'))).set('hour', fromDate.format('HH')).set('minute', fromDate.format('mm')).set('second', 0);
        const isBeforeToday = newValueObj.isBefore(tommorrow, 'day');
        if (isBeforeToday) {
            const newValueObj = dayjs(new Date(tommorrow.format('YYYY-MM-DD')))
                .set('hour', fromDate.format('HH'))
                .set('minute', fromDate.format('mm'))
                .set('second', 0);
            // console.log('before', newValueObj.format('YYYY-MM-DD'), 'today', today.format('YYYY-MM-DD'));
            setFromDate(newValueObj);
        } else {
            setFromDate(newValueObj);
        }

        const isAfterToDate = newValueObj.isAfter(toDate, 'day');
        const newValueObjSecond = dayjs(new Date(newValue.format('YYYY-MM-DD'))).set('hour', fromDate.format('HH')).set('minute', fromDate.format('mm')).set('second', 0);

        if (isAfterToDate) {
            const newValueObj = dayjs(new Date(newValueObjSecond.format('YYYY-MM-DD')))
                .set('hour', fromDate.format('HH'))
                .set('minute', fromDate.format('mm'))
                .set('second', 0);
            setToDate(newValueObj);
        }

    }

    const handleChangeToDate = (newValue) => {
        const newValueObj = dayjs(new Date(newValue.format('YYYY-MM-DD'))).set('hour', toDate.format('HH')).set('minute', toDate.format('mm')).set('second', 0);
        const isBeforeFromDate = newValueObj.isBefore(fromDate, 'day');
        let dateAfterThreeMonth = fromDate.clone()
        dateAfterThreeMonth = dateAfterThreeMonth.add(3, 'month');
        const isAfterThreeMonthsToDate = newValueObj.isAfter(dateAfterThreeMonth, 'day');

        console.log('dateAfterThreeMonth', dateAfterThreeMonth.format('YYYY-MM-DD'), "toDate", fromDate.format('YYYY-MM-DD'), isAfterThreeMonthsToDate);

        if (isBeforeFromDate) {
            const newValueObj = dayjs(new Date(fromDate.format('YYYY-MM-DD')))
                .set('hour', fromDate.format('HH'))
                .set('minute', fromDate.format('mm'))
                .set('second', 0);
            // console.log('before', isBeforeFromDate, newValueObj.format('YYYY-MM-DD'), 'today', tommorrow.format('YYYY-MM-DD'));
            setToDate(newValueObj);
        } else if (isAfterThreeMonthsToDate) {
            setToDate(dateAfterThreeMonth);
        } else {
            // console.log('after', newValueObj.format('YYYY-MM-DD'), 'today', tommorrow.format('YYYY-MM-DD'));
            setToDate(newValueObj);
        }
    }

    const openFromDateCalendar = () => {
        setIsOpenFromCalendar(true);
    }

    const openToDateCalendar = () => {
        setIsOpenToCalendar(true);
    }


    return (
        <Fragment>

            <CalendarModuleModal dateState={fromDate} setDateState={handleChangeFromDate} isOpen={isOpenFromDateCalendar} handleClose={() => setIsOpenFromCalendar(false)} />
            <CalendarModuleModal dateState={toDate} setDateState={handleChangeToDate} isOpen={isOpenFromToCalendar} handleClose={() => setIsOpenToCalendar(false)} />

            <h2 className='main--title'>
                Wybierz datę
            </h2>
            <p className='description'>
                Wybierz datę lub zakres dat, aby dodać więcej terminów jednocześnie.
            </p>

            <div style={{ position: 'relative' }}>
                <DateField
                    fullWidth
                    label="Od dnia"
                    // minDate={dayjs('2023-09-28')}
                    // disablePast
                    value={fromDate}
                    // minDate={tommorrow}
                    inputFormat="yyyy-MM-dd"
                    onChange={(newValue) => handleChangeFromDate(newValue)}
                    sx={{ marginTop: 1 }}
                />
                <CalendarButtonIcon onClick={openFromDateCalendar} />

            </div>

            <div style={{ position: 'relative' }}>
                <DateField
                    fullWidth
                    label="Do dnia"
                    value={toDate}
                    // disablePast
                    onChange={(newValue) => handleChangeToDate(newValue)}
                    sx={{ marginTop: 2 }}
                />
                <CalendarButtonIcon onClick={openToDateCalendar} />

            </div>


            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="frequency">Powtarzaj</InputLabel>
                <Select
                    labelId="frequency"
                    id="frequency-select"
                    value={frequency}
                    label="Powtarzaj"
                    onChange={(e) => setFrequency(e.target.value)}
                // MenuProps={{
                //     disableScrollLock: true,
                //   }}
                >
                    <MenuItem value='norepeat'>Nie powtarzaj</MenuItem>
                    {!isMoreThanOneWeek && <MenuItem value='everyweek'>Co tydzień</MenuItem>}


                </Select>
                {!isMoreThanOneWeek && frequency === "everyweek" && <div style={{ color: "#968d8d", fontSize: 11, marginTop: 7 }}>Wybranie opcji "Co tydzień" spowoduje wygenerowanie spotkań w zaznaczonych dniach tygodnia na okres trzech miesięcy.</div>}
            </FormControl>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 10 }}>
                <ButtonLink text="Anuluj" onClick={handleClose} />
                <ButtonLink text="Wybierz godziny" onClick={() => setStep(2)} />
            </div>
        </Fragment>
    )
}

export { ChoiceDate }