
import { h, render } from 'preact';
import './InputText.scss';
import { FormHelperText } from '../FormHelperText/FormHelperText';

const InputText = ({
    type = 'text',
    handleChange,
    label,
    name,
    value,
    onChange,
    error,
    fullWidth = false,
    isRequired = true,
    ...props
}) => {
    return (
        <div class="input-text-secondary-wrapper">
            <input
                name={name}
                class={`input-text-secondary ${error && isRequired ? 'error' : ''}`}
                type={type}
                autoComplete="off"
                onChange={handleChange}
                placeholder=" "
                value={value}
                {...props}
            />
            <label class="input-text-secondary-label">
                {`${label}${isRequired ? '*' : ''}`}
            </label>
            {error && <FormHelperText error>{error}</FormHelperText>}
        </div>
    );
};

export { InputText };