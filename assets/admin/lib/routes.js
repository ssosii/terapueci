import { serverUrl } from "./config";
export const redirectTo = (path) => {
    window.location.href = `${serverUrl}/${path}`;
}

export const getIdFromUrl = () => {
    let array = window.location.href.split('/');
    return array[array.length - 1];
}
