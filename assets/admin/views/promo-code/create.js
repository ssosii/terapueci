import { h, render, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { TextField, FormHelperText } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import "./create.scss";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { ButtonPrimary } from "./../../../frontend/components/ButtonPrimary/ButtonPrimary";
import useApi from "./../../lib/api/useApi";
import { FormError } from '../../../frontend/components/form/FormError/FormError';
import { redirect } from "./../../lib/redirect";

// Administrator generuje kod promocyjny:

// a) rabaty będą procentowe czy kwotowe

// b) kazdy kod powinien być unikalny XyGHX34G czy słowo kluczowe np. rabat50

// c) kod ma datę wazność “od do”

// d) jeśli decydujemy się na słowo kluczowe rabat50 ograniczamy ustawiamy limit wykorzystania kodu np. 20x


const makeCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


const nextWeek = dayjs().add(7, 'day');

const Create = () => {
    const [typeCode, setTypeCode] = useState("quota");

    const [rangeType, setRangeType] = useState("termless");
    const [expirationDate, setExpirationDate] = useState(nextWeek);

    const [quota, setQuota] = useState(0);
    const [percent, setPercent] = useState(0);

    const [number, setNumber] = useState(0);
    const [name, setName] = useState(makeCode(9));

    const [serverError, setServerError] = useState(null);

    const save = () => {
        setServerError(null);
        if (typeCode === "quota") {
            if (quota < 1) {
                setServerError("Kwota powinna być większa niż 0.");
                return true;
            }
        }
        if (typeCode === "percent") {
            if (percent < 1) {
                setServerError("Zniżka powinna być większa niż 0%.");
                return true;
            }
            if (percent > 100) {
                setServerError("Zniżka nie powinna być większa niż 0%.");
                return true;
            }
        }


        setServerError(null);
        const [fetch] = useApi();
     ;
        fetch(`/admin/api-promo-code/create`, { typeCode, expirationDate, rangeType, number, quota, percent, name }, 'post')
            .then((response) => {
                console.log("response", response);
                redirect('/admin/kody-promocyjne');
                setServerError(null);

            })
            .catch((error) => {
                console.log("error", error);
                setServerError("Wybrana nazwa została już wcześniej użyta.");



            }).finally(() => {
                // setIsSending(false);
            });


    }


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {serverError && <FormError>{serverError}</FormError>}
            <Fragment>

                <FormControl>
                    <FormLabel>Rodzaj kuponu</FormLabel>
                    <RadioGroup
                        row
                        value={typeCode}
                        onChange={(e) => setTypeCode(e.target.value)}
                        sx={{ display: "flex" }}
                    >
                        <FormControlLabel value="quota" control={<Radio />} label="Kwotowy" />
                        <FormControlLabel value="percent" control={<Radio />} label="Procentowy" />
                    </RadioGroup>
                </FormControl>
                <div>

                    {typeCode === "quota" && (


                        <div>
                            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                                <OutlinedInput
                                    value={quota}
                                    onChange={(e) => setQuota(e.target.value)}
                                    id="outlined-adornment-weight"
                                    type="number"
                                    endAdornment={<InputAdornment position="end">zł</InputAdornment>}

                                />
                            </FormControl>
                        </div>

                    )}


                    {typeCode === "percent" && (
                        <div>

                            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                                <OutlinedInput
                                    value={percent}
                                    onChange={(e) => setPercent(e.target.value)}
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>

                        </div>
                    )}

                    <FormControl style={{ marginTop: 10 }}>
                        <FormLabel>Data wygaśnięcia</FormLabel>
                        <RadioGroup
                            row
                            value={rangeType}
                            onChange={(e) => setRangeType(e.target.value)}
                        >
                            <FormControlLabel value="termless" control={<Radio />} label="Bezterminowo" />
                            <FormControlLabel value="expiration" control={<Radio />} label="Z dniem wygaśnięcia" />
                        </RadioGroup>
                    </FormControl>


                    {rangeType === "expiration" && (
                        <DemoContainer sx={{ maxWidth: 300 }} components={['DatePicker']}>
                            <DatePicker value={expirationDate} onChange={(value) => setExpirationDate(value)} label="Do" format="DD-MM-YYYY" />
                        </DemoContainer>

                    )}

                    <div>
                        <FormControl sx={{ mt: 1, width: 300 }} variant="outlined">
                            <FormLabel>Liczba</FormLabel>
                            <OutlinedInput
                                sx={{ mt: 0.5 }}
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                id="outlined-adornment-weight"
                                type="number"


                            />
                        </FormControl>
                    </div>

                    <div>
                        <FormControl sx={{ mt: 1, width: 300 }} variant="outlined">
                            <FormLabel>Nazwa</FormLabel>
                            <OutlinedInput
                                sx={{ mt: 0.5 }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="outlined-adornment-weight"
                                type="text"


                            />
                        </FormControl>
                    </div>


                    <ButtonPrimary onClick={() => save()} style={{ marginTop: 30 }} text="Wygeneruj" />

                </div>

            </Fragment>

        </LocalizationProvider>
    )

}



render(<Create />, document.querySelector('#createPromoCode'));

