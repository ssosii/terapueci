import { Fragment, h, render } from 'preact';
import { useEffect, useContext, useState } from 'preact/hooks';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useApi from '../../../../../../lib/api/useApi';
import { DataContext } from '..';
import dayjs from 'dayjs';
import { generateYearArray } from '../../../../../../lib/datatime';
import { authGuard } from '../../../../../../lib/authGuard';

const years = generateYearArray();
const ScheduleBar = () => {

    const { setAppoitments ,setSort, sort, setIsLoading, year, setYear, month,setMonth  } = useContext(DataContext);
    // const [month, setMonth] = useState(today.month()+1);
    // const [year, setYear] = useState(today.year());


    useEffect(() => {
        setIsLoading(true);
        const [fetch] = useApi();
        console.log("fetch yy");
        fetch(`/api-fetch-panel-specialist-appointment-by-month-year`, { month, year }, 'post')
            .then((response) => {
                let resultToArray = Object.keys(response.appointments).map((range) => ({ range, list: response.appointments[range].list }));
                setAppoitments(resultToArray);

                // console.log("responseBar", resultToArray, response.appointments);
            })
            .catch((error) => {
                // console.log("error", error);
                authGuard(error);

            }).finally(() => {
                setIsLoading(false);
            });

    }, [month, year])


    const handleChange = (e) => {
        setSort(e.target.value)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
             
            <FormControl className="remove-select-outline">
                    <Select
                        labelId="month-label"
                        id="month-select"
                        size='small'
                        value={month}
                        sx={{ mr: 2,border:0,outline:0, }}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <MenuItem value={1}>Styczeń</MenuItem>
                        <MenuItem value={2}>Luty</MenuItem>
                        <MenuItem value={3}>Marzec</MenuItem>
                        <MenuItem value={4}>Kwiecień</MenuItem>
                        <MenuItem value={5}>Maj</MenuItem>
                        <MenuItem value={6}>Czerwiec</MenuItem>
                        <MenuItem value={7}>Lipiec</MenuItem>
                        <MenuItem value={8}>Sierpień</MenuItem>
                        <MenuItem value={9}>Wrzesień</MenuItem>
                        <MenuItem value={10}>Pażdziernik</MenuItem>
                        <MenuItem value={11}>Listopad</MenuItem>
                        <MenuItem value={12}>Grudzień</MenuItem>
                    </Select>
                </FormControl>

 
                <FormControl className="remove-select-outline">
                    <Select
                        labelId="year-label"
                        id="year-select"
                        size='small'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                   {years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>

            <FormControl>

                <Select
                    labelId="type-label"
                    id="type-select"
                    value={sort}
                    size='small'
                    onChange={handleChange}
                >
                    <MenuItem value="all">Wszystkie</MenuItem>
                    <MenuItem value="free">Wolne terminy</MenuItem>
                    <MenuItem value="busy">Zajęte terminy</MenuItem>
                </Select>
            </FormControl>

        </div>

    )
}

export { ScheduleBar }