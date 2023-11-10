
import { h, render } from 'preact';
import './formError.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FormSuccess = ({
    children,
    style
}) => {
    return (
        <div class='form-success' style={{...style}}>
        
             <CheckCircleIcon />
     
            <div>
                {children}
            </div>

        </div>
    );
};

export { FormSuccess };