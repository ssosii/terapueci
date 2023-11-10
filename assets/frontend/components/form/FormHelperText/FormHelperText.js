
import { h, render } from 'preact';
import './formHelperText.scss';


const FormHelperText = ({
    error = true,
    style={},
    children
}) => {
    return (
        <div class={`form--helper--text ${error ? '--error' :'--success'}`} style={{...style}}>
            {children}
        </div>
    );
};

export { FormHelperText };