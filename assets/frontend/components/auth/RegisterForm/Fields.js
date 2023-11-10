import { h, render ,Fragment} from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { FormHelperText } from '../../form/FormHelperText/FormHelperText';

import {
    IconButton,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Fields = ({ values, handleChange, touched, handleBlur, errors, isPhone = false }) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <TextField
                fullWidth
                name="username"
                label="Imię"
                size="medium"
                sx={{ mt: 1 }}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 255 }}
                error={Boolean(touched.username && errors.username)}
            />
            {touched.username && errors.username && (
                <FormHelperText error id='helper-text-username'>
                    {errors.username}
                </FormHelperText>
            )}
            <TextField
                fullWidth
                name="email"
                label="Email"
                size="medium"
                sx={{ mt: 3 }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 255 }}
                error={Boolean(touched.email && errors.email)}
            />

            {touched.email && errors.email && (
                <FormHelperText error id='helper-text-email'>
                    {errors.email}
                </FormHelperText>
            )}
            {isPhone && (
                <Fragment>
                    <TextField
                        fullWidth
                        name="phone"
                        label="Numer telefonu "
                        size="medium"
                        sx={{ mt: 3 }}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{ maxLength: 255 }}
                        error={Boolean(touched.phone && errors.phone)}
                    />
                    {touched.phone && errors.phone && (
                        <FormHelperText error id='helper-text-username'>
                            {errors.phone}
                        </FormHelperText>
                    )}

                </Fragment>


            )}

            <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ mt: 3 }}

            >
                <InputLabel htmlFor='password-login'>Hasło</InputLabel>
                <OutlinedInput
                    id='password-login'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="medium"
                    inputProps={{ maxLength: 255 }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                                size='large'
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label='Hasło'
                />

            </FormControl>
            {touched.password && errors.password && (
                <FormHelperText error id='helper-text-password'>
                    {errors.password}
                </FormHelperText>
            )}
        </div>
    )
}

export { Fields }