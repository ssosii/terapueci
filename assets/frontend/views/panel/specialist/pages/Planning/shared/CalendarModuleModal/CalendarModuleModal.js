
import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useContext } from 'preact/hooks';
import dayjs from "dayjs";
import CalendarReact from "react-calendar";
import { DataContext } from '../..';
import { Modal } from '../../../../../../../components/Modal/Modal';
import "./../calendar.scss";
import "./calendar-override.scss";
import { ButtonLink } from '../../../../../../../components/ButtonLink/ButtonLink';

//material ui
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


const formatShortWeekday = (locale, date) => ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'][date.getDay()]
const today = dayjs().format('YYYY-MM-DD');

const CalendarModuleModal = ({ dateState, setDateState, isOpen, handleClose }) => {
    const { markedCalendarDates } = useContext(DataContext);
    const [temponaryDateState, setTemponaryDateState] = useState(dateState);

    const changeDate = (e) => {
        console.log(e);
        setTemponaryDateState(e);
    };

    const saveDate = () => {
        setDateState(dayjs(temponaryDateState));
        handleClose();
    }
    const activeDatesStart = dayjs(); // Tomorrow
    const activeDatesEnd = dayjs().add(3, 'months').toDate(); // 3 months fro

    return (
        <Dialog
            fullWidth
            onClose={handleClose}
            open={isOpen}
            size="xs"
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        borderRadius: 4,
                        maxWidth: 340,
                        minHeight: 370
                    },
                }
            }}
        >
            <div className="caledar-override">
                <CalendarReact
                    value={temponaryDateState}
                    onChange={changeDate}
                    locale="pl-PL"

                    formatShortWeekday={formatShortWeekday}
                    tileClassName={({ date, view }) => {
                        if (markedCalendarDates.find((x) => x === dayjs(date).format('YYYY-MM-DD'))) {
                            return 'react-calendar__highlighted';
                        }
                        if (today === dayjs(date).format('YYYY-MM-DD')) {
                            return 'react-calendar__today';
                        }
                    }}
                    tileDisabled={({ date }) => {
                        return !dayjs(date).isAfter(activeDatesStart) || !dayjs(date).isBefore(activeDatesEnd);
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "end", marginBottom: 20, marginRight: 20 }}>
                <ButtonLink onClick={handleClose} text="Wróć" />
                <ButtonLink onClick={saveDate} text="Zmień" />
            </div>

        </Dialog>
    )
}

export { CalendarModuleModal }