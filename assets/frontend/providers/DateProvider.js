


import { Fragment, h, render } from 'preact';

import "dayjs/locale/pl";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pl');
dayjs.tz.setDefault('Europe/Warsaw');

const DateProvider = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            {children}
        </LocalizationProvider>
    )
}

export { DateProvider }