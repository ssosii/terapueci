import { Fragment, h, render } from 'preact';
import { useState } from 'preact/hooks';
import { Chip } from './Chip';

import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';



const DropdownRangesList = ({ listWeekDays, listRanges, setSelectedItems, type, selectedItems, label }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (type, id) => {
        let newState = { ...selectedItems };
        const isExist = newState[type].find(item => item === id);
        if (isExist) {
            const filtredArray = newState[type].filter(item => item !== id)
            newState[type] = filtredArray;

        } else {
            newState[type].push(id);
        }
        setSelectedItems(newState);

    }


    return (
        <div style={{ margin: 5 }}>
            <Chip handleOpen={handleClickListItem} label={label} isChecked={selectedItems.weekDays.length > 0 || selectedItems.ranges.length > 0} />
            <MuiMenu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        background: "#efedf1",
                        "&:hover": {
                            background: "#efedf1"
                        }
                    }
                }}
                // MenuProps={{
                //     disableScrollLock: true,
                // }}

                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                    disableScrollLock: true,
                }}
            >
                {listWeekDays.map((option, index) => (
                    <MenuItem style={{ padding: "8px 12px" }} onClick={() => handleChange("weekDays", option.id)} key={option.id} value={option.id}>
                        <Checkbox size='small' sx={{
                            "&.Mui-checked": {
                                "&, & + .MuiFormControlLabel-label": {
                                    color: "rgba(0, 0, 0, 0.6)",
                                }
                            }
                        }} style={{ padding: 4 }} checked={selectedItems.weekDays.includes(option.id)} />
                        <ListItemText primaryTypographyProps={{
                            fontSize: 15,
                        }} primary={option.name} />
                    </MenuItem>
                ))}

                <div style={{ height: 1, width: "100%", backgroundColor: "#C6C5D0", margin: "5px 0" }}></div>
                {listRanges.map((option, index) => (
                    <MenuItem style={{ padding: "8px 12px" }} onClick={() => handleChange("ranges", option.id)} key={option.id} value={option.id}>
                        <Checkbox sx={{
                            "&.Mui-checked": {
                                "&, & + .MuiFormControlLabel-label": {
                                    color: "rgba(0, 0, 0, 0.6)",
                                }
                            }
                        }} size='small' style={{ padding: 4 }} checked={selectedItems.ranges.includes(option.id)} />
                        <ListItemText primaryTypographyProps={{
                            fontSize: 15,
                        }} primary={option.name} />
                    </MenuItem>
                ))}
            </MuiMenu>
        </div>
    )
}

export { DropdownRangesList } 