import { h, render } from 'preact';
import { useEffect, useRef, useState, useMemo } from 'preact/hooks';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';





const Menu = ({ anchorEl, open, handleClose, list, type, setSelectedItems, selectedItems }) => {
    const handleChange = (id) => {
        
        let newState = { ...selectedItems };
        const isExist = newState[type].find(item => item === id);
        if (isExist) {
           const filtredArray =  newState[type].filter(item => item !== id)
            newState[type] = filtredArray;

        } else {
            newState[type].push(id);
        }
        setSelectedItems(newState);
 
    }
    return (
        <MuiMenu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // MenuProps={{
            //     disableScrollLock: true,
            // }}
            PaperProps={{
                style: {
                    background: "#efedf1",
                    "&:hover": {
                        background: "#efedf1"
                    }
                }
            }}
            MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
                disableScrollLock: true,
            }}
        >
            {list.map((option, index) => (
                <MenuItem style={{ padding: "8px 12px" }} onClick={() => handleChange(option.id)} key={option.id} value={option.id}>
                    <Checkbox sx={{
                            "&.Mui-checked": {
                                "&, & + .MuiFormControlLabel-label": {
                                    color: "rgba(0, 0, 0, 0.6)",
                                }
                            }
                        }} size='small' style={{ padding: 4 }} checked={selectedItems[type].includes(option.id)} />
                    <ListItemText primaryTypographyProps={{
                        fontSize: 15,
                    }} primary={option.name} />
                    
                </MenuItem>
            ))}
        </MuiMenu>
    )
}

export { Menu }