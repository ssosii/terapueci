import { useApiStatic } from "./../api/useApi";


const displayError = (ref, msg) => {
    const row = ref.current;
    row.classList.add('-error');
    // const input = row.querySelector('input');
    const error = row.querySelector('.error');
    // if (input) {
    //     input.classList.add('-error');
    // }

    error.innerText = msg;
}

const hideError = (ref) => {
    const row = ref.current;
    // const input = row.querySelector('input');
    const error = row.querySelector('.error');
    row.classList.remove('-error');
    // if(input){
    //     input.classList.remove('-error');
    // }
    error.innerText = "";
}

const clearErrors = (refs) => {
    refs.map(ref => hideError(ref));
}

const isValidEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isEmailNotAvailable = async (email) => {
    const { status } = await useApiStatic("/api-check-user-exist", { email }, 'post');
    if (status == "OK") {
        return false;
    }
    return true;
}

const isUserEmailExist = async (email) => {
    const { status } = await useApiStatic("/api-check-email-exist", { email }, 'post');
    if (status == "OK") {
        return true;
    }
    return false;
}


export { displayError, hideError, isValidEmail, isEmailNotAvailable, clearErrors,isUserEmailExist };