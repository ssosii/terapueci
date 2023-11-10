import { h, Component, Fragment } from 'preact';
import { useEffect, useState } from 'preact/compat';
import { nanoid } from 'nanoid'
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { ButtonLink } from '../../../../../../../components/ButtonLink/ButtonLink';
import { ButtonFunctional } from '../../../../../../../components/ButtonFunctional/ButtonFunctional';
import useApi from "./../../../../../../../lib/api/useApi";
import { FormHelperText } from '../../../../../../../components/form/FormHelperText/FormHelperText';
import { useContext } from 'react';
import { DataContext } from '../..';
import { authGuard } from '../../../../../../../lib/authGuard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getHoursList } from '../../../../../../../lib/datatime';
import {
    TextField
} from "@mui/material";

const tommorrow = dayjs().add(1, 'day');
const threeMonthsAfterTommorow = tommorrow.clone().add(3, 'month');



const ChoiceHours = ({ hourRules, handleClose, setStep, saveRules, setHourRules, fromDate, toDate }) => {
    const [validRangeHour, setValidRangeHour] = useState([]);
    const [validHourRule, setValidHourRule] = useState([]);
    const [duplicates, setDuplicates] = useState([]);
    const { month } = useContext(DataContext);



    const detectRepeatedElements = () => {
        const rules = hourRules.map(rule => parseInt(rule.hourStart));
        console.log("rules", rules);
        const uniq = rules
            .map((name) => {
                return {
                    count: 1,
                    name: name
                };
            })
            .reduce((result, b) => {
                result[b.name] = (result[b.name] || 0) + b.count;

                return result;
            }, {});
        let duplicatesArray = Object.keys(uniq).filter((a) => uniq[a] > 1);
        duplicatesArray = duplicatesArray.map(rule => parseInt(rule));
        setDuplicates(duplicatesArray);

    }

    const checkIsInValidRange = () => {

    }


    // console.log("duplicates", duplicates);

    useEffect(() => {
        let notValidRules = [];

        //detect repeated

        // checkIsInValidRange();
        detectRepeatedElements();


        // hourRules.map(rule => {
        //     const ruleStart = parseInt(rule.hourStart.format('HHmm'));
        //     const ruleFinish = parseInt(rule.hourFinish.format('HHmm'));
        //     const isFounded = [...selectedHour].find(item => {
        //         console.log("ruleValidator", ruleStart + ">=" + item[0] + "&&" + ruleFinish + "<=" + item[1]);
        //         return (ruleStart >= item[0] && ruleStart <= item[1]) || (ruleFinish >= item[0] && ruleFinish <= item[1]);
        //     });
        //     if (isFounded) {
        //         // alert("founded", rule.id);
        //         notValidRules.push(rule.id);
        //     } else {
        //         // alert("notfounded", rule.id);
        //         notValidRules = notValidRules.filter(item => item !== rule.id);
        //     }

        // })
        // setValidHourRule(notValidRules);

    }, [validRangeHour, hourRules]);


    console.log("hourRules1", validHourRule);

    useEffect(() => {
        console.log("fromDateXX", { currentMonth: month, fromDate: fromDate.format('YYYY/MM/DD'), toDate: toDate.format('YYYY/MM/DD') });
        const [fetch] = useApi();
        fetch('/api-fetch-appointments-for-valid-range', { currentMonth: month, fromDate: fromDate.format('YYYY/MM/DD'), toDate: toDate.format('YYYY/MM/DD') }, 'post')
            .then((response) => {
                setValidRangeHour(response.appointments);
                console.log("responseValidRange", response);

            })
            .catch((error) => {
                authGuard(error);
                console.log("error", error);
                message.error({ text: "Coś poszło nie tak. Spróbuj ponownie." });

            }).finally(() => {
                // setIsSending(false);

            });

    }, []);


    console.log("hourRules", hourRules);

    const handleChangeHour = (id, value) => {

        const newValue = value.target.value;
        console.log("valuie", newValue);
        const newHourRules = [...hourRules];
        const index = newHourRules.findIndex(item => item.id === id);

        let hourStart = newValue;
        let hourFinish = newValue + 1; 

        if(newValue === 23){
            hourStart = 23;
            hourFinish = "00";
        }
        newHourRules[index].hourStart = hourStart;
        newHourRules[index].hourFinish = hourFinish;

        setHourRules(newHourRules);
    }

    const handleRemoveRule = (id) => {
        const newHourRules = [...hourRules];
        const index = newHourRules.findIndex(item => item.id === id);
        newHourRules.splice(index, 1);
        setHourRules(newHourRules);
    }

    const handleAddRule = () => {
        let clonedHoursRules = [...hourRules];
        let maxItem = clonedHoursRules.reduce((max, currentItem) => (currentItem.hourStart > max.hourStart ? currentItem : max));

        let hourStart = maxItem.hourStart + 1;
        let hourFinish = maxItem.hourStart + 2 

        if(maxItem.hourStart === 23){
            hourStart = 23;
            hourFinish = "00";
        }

        const newItem = { id: nanoid(), hourStart, hourFinish }
        setHourRules([...hourRules, newItem]);
    }


   
    console.log("hourRule", hourRules);



    const isValidToSave = () => {

        const isRangeCorrect = () => {
            let isValid = true;
            hourRules.map(rule =>{
                if(validRangeHour.includes(rule.hourStart)){
                    isValid = false;
                }
            })
            return isValid;
        }

        if (duplicates.length === 0 && isRangeCorrect()) {
            return true
        }
        return false;
    }


    return (
        <Fragment>
            <h2 className='main--title'>
                Dodaj godziny
            </h2>
            <p className='description'>
                Godziny zostaną dodane do wszystkich wybranych dni.
            </p>


            <div className="hours--list">
                {hourRules.map(rule => (
                    <Fragment>
                        <div className="item">
                            <div className="inputs">
                                <div style={{ position: "relative", width: "45%" }}>
                                    {validHourRule.includes(rule.id) && (
                                        <svg style={{ position: "absolute", top: "28%", right: 16 }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z" fill="#BA1A1A" />
                                        </svg>
                                    )}
                                    {/* <TimeField
                                        label="Od"
                                        value={rule.hourStart}
                                        size='medium'
                                        error={Boolean(validHourRule.includes(rule.id))}
                                        onChange={(newValue) => handleChangeHour(rule.id, newValue)}
                                        format="HH:mm"
                                        sx={{ marginRight: 1 }}
                                    /> */}

                                    <FormControl sx={{ marginRight: 1 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Od</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={rule.hourStart}
                                            label="Od"
                                            error={Boolean(duplicates.includes(rule.hourStart)) || Boolean(validRangeHour.includes(rule.hourStart))}
                                            fullWidth
                                            name="from"
                                            onChange={(newValue) => handleChangeHour(rule.id, newValue)}
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
                                    label="Do"
                                    value={rule.hourFinish}
                                    size='medium'
                                    // onChange={(newValue) => handleChangeHour(rule.id, newValue)}
                                    format="HH:mm"
                                    // sx={{ width: "40%" }}
                                    disabled={true}
                                    clearIc
                                    style={{width:"45%"}}
                                /> */}
                                <TextField
                                    name="to"
                                    label="Do"
                                    size="medium"
                                    disabled
                                    sx={{ width: "45%" }}
                                    value={`${rule.hourFinish}:00`}
                                    inputProps={{ maxLength: 255 }}
                                />
                            </div>

                            <div className="functional">
                                {hourRules.length > 1 && (
                                    <ButtonFunctional isRounded={true} variant="green" icon="minus" onClick={() => handleRemoveRule(rule.id)} />
                                )}
                            </div>
                        </div>

                        {(duplicates.includes(rule.hourStart) || Boolean(validRangeHour.includes(rule.hourStart))) && (
                            <FormHelperText style={{ marginTop: 4 }} error>
                                Ta godzina jest już zaplanowana
                            </FormHelperText>
                        )}
                    </Fragment>


                ))}
            </div>

            {hourRules.length < 16 && (
                <ButtonFunctional style={{ marginTop: 15 }} variant="green" text="Dodaj godzinę" onClick={handleAddRule} />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <div>
                    <ButtonLink text="Wróć" onClick={() => setStep(1)} />
                </div>
                <div>
                    <ButtonLink text="Anuluj" onClick={handleClose} />
                    <ButtonLink text="Dodaj" onClick={isValidToSave() ? saveRules : null} />
                </div>

            </div>

        </Fragment>
    )
}

export { ChoiceHours }