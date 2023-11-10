import { h, render, Fragment } from 'preact';
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

const LoginFormFields = ({ values, handleChange, touched, handleBlur, errors, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Fragment>
            <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
            >
                <InputLabel htmlFor='email-login'>Email</InputLabel>
                <OutlinedInput
                    id='email-login'
                    type='email'
                    value={values.email}
                    size="medium"
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label='Email'
                    autoComplete='off'

                />
                {touched.email && errors.email && (
                    <FormHelperText error id='email-login'>
                        {errors.email}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ mt: 3, mb: 3 }}

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
                    inputProps={{}}
                />
                {touched.password && errors.password && (
                    <FormHelperText error id='standard-weight-helper-text-password-login'>
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>

        </Fragment>
    )
}

export { LoginFormFields }