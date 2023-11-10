import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Modal } from '../../../../../../../../../components/Modal/Modal';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ButtonLink } from '../../../../../../../../../components/ButtonLink/ButtonLink';
import { FormHelperText } from '../../../../../../../../../components/form/FormHelperText/FormHelperText';
import useApi from '../../../../../../../../../lib/api/useApi';
import { CalendarModuleModal } from "./../../../../shared/CalendarModuleModal/CalendarModuleModal";
import { CalendarButtonIcon } from '../../../../../../../../../components/form/CalendarButtonIcon/CalendarButtonIcon';
import { authGuard } from '../../../../../../../../../lib/authGuard';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {
    TextField
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getHoursList } from '../../../../../../../../../lib/datatime';
import { LoaderAbsolute } from '../../../../../../../../../components/Loader/LoaderAbsolute/LoaderAbsolute';
import message from "./../../../../../../../../../components/Toast/message";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pl');
dayjs.tz.setDefault('Europe/Warsaw');


const sortFields = (array) => {
    array.sort((a, b) => {
        console.log
        return b.time.localeCompare(a.time);
    });
    return array;
}

const sortRanges = (array) => {
    array.sort((a, b) => {
        const first = a.range.split('-')[0];
        const second = b.range.split('-')[0];
        // console.log("test", parseInt(first), parseInt(second));
        return parseInt(second) - parseInt(first);
        // return b.time.localeCompare(a.time);
    });
    return array;
}

let tommorrow = dayjs().add(1, 'day');

const EditModalHour = ({ handleClose, appointment, setAppoitments, range, appointments, handleRemoveAppointmentExtended, order }) => {
    const time = appointment.time.split(':')
    const initDateTime = dayjs(new Date(appointment.startDate)).set('hour', time[0]).set('minute', 0).set('second', 0);
    const initDateTimePlusOneHour = initDateTime.add(60, 'minute').endOf('minute');
    const [fromDate, setFromDate] = useState(initDateTime);
    const [hourStart, setHourStart] = useState(parseInt(fromDate.format("H")));
    const [toDate, setToDate] = useState(initDateTimePlusOneHour);
    const [isError, setIsError] = useState(false);
    const [isOpenDateCalendar, setIsOpenDateCalendar] = useState(false);
    const [validRangeHour, setValidRangeHour] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        // const selectedHourForFromDate = validRangeHour[fromDate.format("YYYY-MM-DD")];

        // if (selectedHourForFromDate) {
        //     const ruleStart = parseInt(fromDate.format('H'));
        //     const selectedHourWithRemovedCurrentTime = selectedHourForFromDate.list.filter(item => !(item[0] == ruleStart && item[1] === ruleFinish));
        //     const isFounded = selectedHourWithRemovedCurrentTime.find(item => ruleStart === item);

        //     if (isFounded) {
        //         setIsError(true);
        //     } else {
        //         setIsError(false);
        //     }

        // } else {
        //     setIsError(false);
        // }

        // if (selectedHourForFromDate) {


        //     // const selectedHourForFromDate = selectedHour["2023-10-23"];
        //     // console.log("selectedHourForFromDate", typeof selectedHour, selectedHourForFromDate, fromDate.format("YYYY-MM-DD"));
        //     const ruleStart = parseInt(fromDate.format('HHmm'));
        //     const ruleFinish = parseInt(toDate.format('HHmm'));

        //     const selectedHourWithRemovedCurrentTime = selectedHourForFromDate.list.filter(item => !(item[0] == ruleStart && item[1] === ruleFinish));
        //     // console.log("selectedHourWithRemovedCurrentTime",selectedHourWithRemovedCurrentTime);
        //     const isFounded = selectedHourWithRemovedCurrentTime.find(item => {
        //         return (ruleStart >= item[0] && ruleStart <= item[1]) || (ruleFinish >= item[0] && ruleFinish <= item[1]);
        //     });
        //     // console.log("isFounded",isFounded );
        //     if (isFounded) {
        //         setIsError(true);
        //     } else {
        //         setIsError(false);
        //     }
        // } else {
        //     setIsError(false);
        // }

        // console.log("responseValidRangeEdit xxx", ruleStart, ruleFinish);

    }, [validRangeHour, , fromDate]);


    useEffect(() => {
        const threeMonthsAfterTommorow = tommorrow.clone().add(3, 'month');

        const [fetch] = useApi();
        fetch('/api-fetch-appointments-for-valid-range-for-edit', { fromDate: tommorrow.format('YYYY/MM/DD'), toDate: threeMonthsAfterTommorow.format('YYYY/MM/DD') }, 'post')
            .then((response) => {

                console.log("response1", response);

                setValidRangeHour(response.appointments);


            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);
                // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                setIsLoading(false);

            });

    }, []);


    // const handleChangeHour = (value) => {
    //     setFromDate(value);
    //     setToDate(value.add(60, 'minute').endOf('minute'));
    // }


    const updateAppoitment = () => {

        let newList = [...appointments];

        if (initDateTime.month() === fromDate.month()) {

            if (appointment.startDate === fromDate.format('YYYY/MM/DD')) {
                const rangeIndex = newList.findIndex(item => item.range === range);
                const itemIndex = newList[rangeIndex].list.findIndex(item => item.id === appointment.id);
                newList[rangeIndex].list[itemIndex].startDate = fromDate.format("YYYY/MM/DD");
                newList[rangeIndex].list[itemIndex].time = fromDate.format("HH:mm");
                newList[rangeIndex].list[itemIndex].startHour = parseInt(fromDate.format("H"));
                newList[rangeIndex].list = sortFields(newList[rangeIndex].list);
                console.log("same", rangeIndex, itemIndex, fromDate.format("HH:mm"), parseInt(fromDate.format("H")));
            } else {
            
                const rangeIndex = newList.findIndex(item => item.range === range);
                const itemIndex = newList[rangeIndex].list.findIndex(item => item.id === appointment.id);
                //copy item
                const transferItem = { ...newList[rangeIndex].list[itemIndex] };
                transferItem.startDate = fromDate.format("YYYY/MM/DD");
                transferItem.time = fromDate.format("HH:mm");
                transferItem.startHour = parseInt(fromDate.format("H"));
                //remove item from old range
                newList[rangeIndex].list.splice(itemIndex, 1);

                //add item to new range
                //find new index range
                const newDay = fromDate.format('DD');
                const dayOfWeek = fromDate.day();
                const newRangeIndex = newList.findIndex(appointment => {
                    const rangeArray = appointment.range.split('-')
                    return rangeArray[0] === newDay;
                });


                if (newRangeIndex >= 0) {
                    newList[newRangeIndex].list = [...newList[newRangeIndex].list, transferItem];
                    newList[newRangeIndex].list = sortFields(newList[newRangeIndex].list);
                } else {
                    const newRange = `${newDay}-${dayOfWeek}`;
                    newList = [...newList, { range: newRange, list: [transferItem] }];
                    newList = sortRanges(newList);
                }

            }

        } else {
            const rangeIndex = newList.findIndex(item => item.range === range);
            const itemIndex = newList[rangeIndex].list.findIndex(item => item.id === appointment.id);
            newList[rangeIndex].list.splice(itemIndex, 1);
        }



        setIsLoading(true);
        const [fetch] = useApi();
        console.log("update appo", `/api-update-appointment/${appointment.id}`, order , fromDate.format('YYYY-MM-DD HH:mm'), toDate.format('YYYY-MM-DD HH:mm'));
        fetch(`/api-update-appointment/${appointment.id}`, { orderId: order ? order.id : null, fromDate: fromDate.format('YYYY-MM-DD HH:mm'), toDate: toDate.format('YYYY-MM-DD HH:mm'), }, 'post')
            .then((response) => {
                console.log("responseDAte", response);
                console.log("newList", newList);
                setAppoitments(newList);

                handleClose();
                message.success("Spotkanie zostało zaktualizowane.")
            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);
                message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." })

            }).finally(() => {
                setIsLoading(false);

            });

    }

    const handleChangeToDate = (newValue) => {
        const newValueObj = dayjs(new Date(newValue.format('YYYY-MM-DD'))).set('hour', fromDate.format('HH')).set('minute', 0).set('second', 0);;
        setFromDate(newValueObj);
    }

    const handleChangeFromDate = (newValue) => {
        const newValueObj = dayjs(new Date(newValue.format('YYYY-MM-DD'))).set('hour', fromDate.format('HH')).set('minute', 0).set('second', 0);
        const isBeforeToday = newValueObj.isBefore(tommorrow, 'day');

        let dateAfterThreeMonth = tommorrow.clone()
        dateAfterThreeMonth = dateAfterThreeMonth.add(3, 'month');
        const isAfterThreeMonthsToDate = newValueObj.isAfter(dateAfterThreeMonth, 'day');

        if (isBeforeToday) {
            const newValueObj = dayjs(new Date(tommorrow.format('YYYY-MM-DD')))
                .set('hour', fromDate.format('HH'))
                .set('minute', fromDate.format('mm'))
                .set('second', 0);
            setFromDate(newValueObj);
        } else if (isAfterThreeMonthsToDate) {
            setFromDate(dateAfterThreeMonth);
        } else {
            setFromDate(newValueObj);
        }

    }


    const removeElement = () => {
        handleRemoveAppointmentExtended();
        handleClose();
    }

    console.log("validRangeHour", validRangeHour);

    const isNotValidRange = () => {
        let isNotValid = false;

        const selectedHourForFromDate = validRangeHour[fromDate.format("YYYY-MM-DD")];
        if (selectedHourForFromDate) {

            console.log(initDateTime, fromDate, initDateTime === fromDate, initDateTime.isSame(fromDate), "the same");

            const selectedHourList = initDateTime.isSame(fromDate) ? selectedHourForFromDate.list.filter(item => hourStart !== appointment.startHour) : selectedHourForFromDate.list;
            console.log("selectedHourWithRemovedCurrentTime", selectedHourList, initDateTime.format("d"));
            selectedHourList.map(hour => {
                console.log("xxx", hour, hourStart, hour === hourStart);
                if (hour === hourStart) {
                    isNotValid = true;
                }
            })
        }

        console.log("isNotValid", isNotValid);

        return isNotValid;
    }



    const handleChangeHour = (newHour) => {
        setHourStart(newHour);
        let clonedFromDate = fromDate.clone();
        clonedFromDate = clonedFromDate.set('hour', newHour).set('minute', 0).set('second', 0);
        console.log("cloned", clonedFromDate.format('YYYY-MM-DD HH:mm:ss'));
        setFromDate(clonedFromDate);
        setToDate(clonedFromDate.add(60, 'minute').endOf('minute'));
    }


console.log("fromDate",fromDate.format('YYYY-MM-DD HH:mm:ss'));
    return (


        <Modal size="xs" isSmallSize={true}
            isOpen={true}
            isCloseIcon={false} handleClose={handleClose}>
            {isLoading && <LoaderAbsolute />}
            <CalendarModuleModal dateState={toDate} setDateState={handleChangeToDate} isOpen={isOpenDateCalendar} handleClose={() => setIsOpenDateCalendar(false)} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                <h2 className='main--title'>
                    Edytuj wizytę
                </h2>

                <div style={{ position: 'relative' }}>

                    <DateField
                        fullWidth
                        label="Od dnia"
                        value={fromDate}
                        onChange={(newValue) => handleChangeFromDate(newValue)}
                        sx={{ marginTop: 1 }}
                    />
                    <CalendarButtonIcon onClick={() => setIsOpenDateCalendar(true)} />
                </div>


                <div className="hours--list">
                    <div className="item">
                        <div className="inputs">
                            <div style={{ position: "relative", width: "45%" }}>
                                {/* {isError && (
                                    <svg style={{ position: "absolute", top: "24%", right: 16 }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z" fill="#BA1A1A" />
                                    </svg>
                                )} */}
                                {/* <TimeField
                                    label="Od"
                                    value={fromDate}
                                    size='medium'
                                    error={isError}
                                    onChange={(newValue) => handleChangeHour(newValue)}
                                    format="HH:mm"
                                    sx={{ marginRight: 1 }}
                                /> */}

                                <FormControl sx={{ marginRight: 1 }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Od</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={hourStart}
                                        label="Od"
                                        error={isNotValidRange()}
                                        fullWidth
                                        name="from"
                                        onChange={(e) => handleChangeHour(e.target.value)}
                                    >
                                        {getHoursList().map(hour => (
                                            <MenuItem key={hour} value={hour}>
                                                {hour}:00
                                            </MenuItem>
                                        ))}


                                    </Select>
                                </FormControl>

                            </div>

                            {/* <TimeField
                                label="Od"
                                value={toDate}
                                size='medium'
                                format="HH:mm"
                                // sx={{ width: "40%" }}
                                disabled={true}
                            /> */}

                            <TextField
                                name="to"
                                label="Do"
                                size="medium"
                                disabled
                                sx={{ width: "45%" }}
                                value={`${hourStart + 1}:00`}
                                inputProps={{ maxLength: 255 }}
                            />

                        </div>

                    </div>
                    {isNotValidRange() && (
                        <FormHelperText style={{ marginTop: 4 }} error>
                            Ta godzina jest już zaplanowana
                        </FormHelperText>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                    <ButtonLink text="Usuń" onClick={removeElement} />
                    <div style="display:flex">
                        <ButtonLink text="Anuluj" onClick={handleClose} />
                        <ButtonLink text="Zapisz" onClick={isNotValidRange() ? null : updateAppoitment} />
                    </div>
                </div>

            </LocalizationProvider>
        </Modal>

    )
}

export { EditModalHour }