import { h, Component, Fragment } from 'preact';
import TodayIcon from '@mui/icons-material/Today';
import IconButton from '@mui/material/IconButton';

const CalendarButtonIcon= ({ onClick }) => {
    return (
        <IconButton onClick={onClick} style={{ position: "absolute", top: "calc(50% + 6px)", right: 2, transform: "translateY(-50%)" }} aria-label="delete" size="medium">
            <TodayIcon style={{ color: "#45464F" }} fontSize="inherit" />
        </IconButton>
    )
}

export { CalendarButtonIcon}