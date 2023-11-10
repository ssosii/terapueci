import { Fragment, h, render } from 'preact';
import { useState} from 'preact/hooks';

import { Chip } from './Chip';
import { Menu } from './Menu';

const DropdownList = ({ list, setSelectedItems, type, selectedItems, label ,isChecked = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div style={{ margin: 5 }}>
            <Chip handleOpen={handleClickListItem} label={label} isChecked={isChecked} />
            <Menu list={list} type={type} selectedItems={selectedItems} setSelectedItems={setSelectedItems} anchorEl={anchorEl} open={open} handleClose={handleClose} />
        </div>
    )
}

export { DropdownList } 