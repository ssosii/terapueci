import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { nanoid } from 'nanoid';

import { TextField, FormHelperText } from '@mui/material';

const ListSelector = ({list, setList}) => {


    const addItem = () => {
        setList([...list, { id: nanoid(), value: "" }]);
    }

    console.log("list",list);
    const handleChange =(key,value) =>{
        const newList = [...list];
        const index = newList.findIndex(item=>item.id ===key);
        newList[index].value = value;
        setList(newList);
    }

    const removeItem = (key) =>{
        const newList = [...list];
        const filtred = newList.filter(item => item.id !== key);
        setList(filtred);
    }

    return (
        <div>

            {list.map(item => (
                <div style="display:flex;align-items:center;">
                    <TextField
                        fullWidth
                        name="name"
                        label="Wartość"
                        size="medium"
                        sx={{ mt: 3 }}
                        multiline
                        rows={3}
                        value={item.value}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                    />
                    <DeleteIcon onClick={()=>removeItem(item.id)} style={{marginLeft:30,marginTop:20,cursor:"pointer"}} />

                </div>
            ))}

            <div onClick={addItem} style="margin-top:20px;" className='btn--secondary'>Dodaj</div>

        </div>
    )
}

export { ListSelector }