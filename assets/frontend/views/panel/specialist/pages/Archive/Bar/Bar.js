import { Fragment, h, render } from 'preact';
import "./bar.scss";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { generateYearArray } from '../../../../../../lib/datatime';
// const useStyles = makeStyles({
//     root: {
//         "& $notchedOutline": {
//             borderColor: "green"
//         },
//         "&:hover $notchedOutline": {
//             borderColor: "green"
//         },
//         "&$focused $notchedOutline": {
//             borderColor: "green"
//         }
//     }
// });

// const styles = theme => ({
//     root: {
//         "& $notchedOutline": {
//             borderColor: "green"
//         },
//         "&:hover $notchedOutline": {
//             borderColor: "green"
//         },
//         "&$focused $notchedOutline": {
//             borderColor: "green"
//         }
//     },
//     focused: {},
//     notchedOutline: {}
// });
const years = generateYearArray();
const Bar = ({ month, setMonth, year, setYear }) => {
    // const classes = useStyles();


    return (
        <div>
            <FormControl className="remove-select-outline">
       
                <Select
                    labelId="month-label"
                    id="month-select"
                    size='small'
                    value={month}
                    // MenuProps={{
                    //     disableScrollLock: true,
                    //   }}

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
                    // MenuProps={{
                    //     disableScrollLock: true,
                    //   }}
                >
                       {years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
                </Select>
            </FormControl></div>
    )
}

export { Bar }