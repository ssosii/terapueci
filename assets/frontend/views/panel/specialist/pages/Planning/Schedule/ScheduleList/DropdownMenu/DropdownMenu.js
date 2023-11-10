import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EditModalHour } from './EditHourModal/EditModalHour';
import { ConfirmRemove } from './ConfirmRemove/ConfirmRemove';


const DropdownMenu = ({ range, handleRemoveAppointment, handleRemoveOrderAppointment, setAppoitments, appointment, appointments, order }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenEditModalAppointment, setIsAppointmentRuleModal] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveAppointmentExtended = () => {

        if (order) {
            setIsOpenConfirm(true);
            // handleRemoveOrderAppointment(range,appointment.id,order.id);


        } else {
            handleRemoveAppointment(range, appointment.id);
            handleClose();
        }



    }

    const openEditAppointmentModal = () => {
        setAnchorEl(null);
        setIsAppointmentRuleModal(true);
    }

    return (
        <div>
            {isOpenConfirm && <ConfirmRemove handleClose={() => setIsOpenConfirm(false)} removeOrder={() => handleRemoveOrderAppointment(range, appointment.id, order.id)} />}
            {isOpenEditModalAppointment && (
                <EditModalHour
                    // isOpen={isOpenEditModalAppointment}
                    handleClose={() => setIsAppointmentRuleModal(false)}
                    appointment={appointment} appointments={appointments}
                    setAppoitments={setAppoitments}
                    range={range}
                    handleRemoveAppointmentExtended={handleRemoveAppointmentExtended}
                    order={order}
                />
            )}

            <IconButton onClick={handleClick} size="medium">
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MenuItem onClick={openEditAppointmentModal}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Edytuj</Typography>
                </MenuItem>
                <MenuItem onClick={handleRemoveAppointmentExtended}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Usuń</Typography>
                </MenuItem>

            </Menu>
        </div>
    )
}

export { DropdownMenu }