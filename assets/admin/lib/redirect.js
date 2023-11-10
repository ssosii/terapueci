export const redirect = (url) => {
    const origin = window.location.origin;
    window.location.href = `${origin}${url}`;
}

export const getOriginUrl = () =>{
    return  window.location.origin;
}