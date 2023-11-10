import { h, Component, Fragment } from 'preact';
import { useState, useContext } from 'preact/compat';
import dayjs from 'dayjs';
import "./appointmentRuleModal.scss";
import { nanoid } from 'nanoid'
import { ChoiceDate } from './steps/ChoiceDate';
import { ChoiceHours } from './steps/ChoiceHours';
import { Modal } from "../../../../../../components/Modal/Modal";
import useApi from "../../../../../../lib/api/useApi";
import message from '../../../../../../components/Toast/message';
import { DataContext } from '..';
import { DateProvider } from '../../../../../../providers/DateProvider';
import { sortFields, sortRanges } from '../utils';
import { authGuard } from '../../../../../../lib/authGuard';



const AppointmentRuleModal = () => {
    const { setIsAppointmentRuleModal, setAppoitments, appointments, selectedDateFromCalendar, month } = useContext(DataContext);
    const today = dayjs().add(1, 'day');
    console.log("AppointmentRuleModal", today);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [fromDate, setFromDate] = useState(selectedDateFromCalendar ? selectedDateFromCalendar : today);
    const [toDate, setToDate] = useState(selectedDateFromCalendar ? selectedDateFromCalendar : today);
    const [frequency, setFrequency] = useState('norepeat');
    // const [hourRules, setHourRules] = useState([{ id: nanoid(), hourStart: dayjs('2022-04-17T9:00'), hourFinish: dayjs('2022-04-17T10:00') }]);
    const [hourRules, setHourRules] = useState([{ id: nanoid(), hourStart: 6, hourFinish: 7 }]);

    const handleClose = () => {
        setIsAppointmentRuleModal(false);
        setStep(1);
    }

    const saveRules = () => {
        //currentMonth! 
        const hourRulesPrepared = Object.values([...hourRules]).map(rule => (rule.hourStart));
        const data = { fromDate: fromDate.format('YYYY-MM-DD HH:mm:ss'), toDate: toDate.format('YYYY-MM-DD HH:mm:ss'), currentMonth:month, frequency, hourRules: hourRulesPrepared }


        console.log("data", JSON.stringify({ ...data }));


        const [fetch] = useApi();
        fetch('/api-create-appointment', { data: JSON.stringify({ ...data }) }, 'post')
            .then((response) => {

                console.log("save-rules-response",response);
                const newAppoitmentsList = response.apoitmentList;
                let newList = [...appointments];

                Object.keys(newAppoitmentsList).map(range => {
                    const keyIndex = newList.findIndex(item => item.range === range);

                    if (keyIndex < 0) {
                    
                        const newRecord = { range, list:  sortFields([...newAppoitmentsList[range]]) };
                        newList = [...newList, newRecord]
                        newList = sortRanges(newList);

                    } else {
                      
                        newList[keyIndex].list = [...newList[keyIndex].list, ...newAppoitmentsList[range]];
                        newList[keyIndex].list = sortFields(newList[keyIndex].list)
                        setAppoitments(newList);
                    }
                })


                setAppoitments(newList);
                setIsAppointmentRuleModal(false);

            })
            .catch((error) => {
                authGuard(error);
                // console.log("error", error);
                // message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                // setIsSending(false);

            });

    }

    // console.log("hourRules", hourRules);

    return (
        <Modal size="xs" isSmallSize={true} isOpen={true} isCloseIcon={false} handleClose={handleClose}>
            <DateProvider>
                {step === 1 && <ChoiceDate fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} frequency={frequency} setFrequency={setFrequency} handleClose={handleClose} setStep={setStep} />}
                {step === 2 && <ChoiceHours fromDate={fromDate} toDate={toDate} hourRules={hourRules} setHourRules={setHourRules} handleClose={handleClose} setStep={setStep} setIsLoading={setIsLoading} saveRules={saveRules} />}
            </DateProvider>
        </Modal>
    )
}

export { AppointmentRuleModal }
