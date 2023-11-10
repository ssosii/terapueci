import { toast } from 'react-toastify';


const message = {
    success: (text = null) => {
        toast.success(text ? text : "Zapisano pomyślnie!", { hideProgressBar: true, autoClose: 3000 ,position: toast.POSITION.BOTTOM_LEFT });
    },
    error: (text = null) => {
        toast.error(text ? text : "Coś poszło nie tak!", { autoClose: 3000, hideProgressBar: true,position: toast.POSITION.BOTTOM_LEFT });
    },

}

export default message;