import { h, render } from 'preact';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MuiChip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

const Chip = ({ handleOpen, label, isChecked }) => {


    return (
        <div style={{ position: "relative" }}>
            {isChecked && <CheckIcon fontSize='13' style={{ position: "absolute", left: 7, top: 8 ,zIndex:2 }} />}

            <MuiChip
                label={label}
                variant="outlined"
                onClick={handleOpen}
                icon={<ArrowDropDownIcon style={{ marginRight: 8, marginLeft: -5 }} />}
                style={{  
                    position:"relative", 
                    zIndex:1,
                    display: 'inline-flex', 
                    flexDirection: "row-reverse", 
                    alignItems: 'center', 
                    borderRadius: 8, 
                    backgroundColor: "white",
                    paddingLeft: isChecked ? 15 : 0,
                    border: isChecked ?  "1px solid #bbf294" : "1px solid #C6C5D0",
                    backgroundColor: isChecked ?  "#bbf294" : "transparent",
                     
                }}
            />
        </div>

    )
}

export { Chip }