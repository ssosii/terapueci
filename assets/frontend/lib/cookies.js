export const initUserSession = () => {
    const ID = "_" + Math.random().toString(36).substr(2, 9);
    if (typeof getCookie("cookieSessionID") == "undefined") {
        setCookie("cookieSessionID", ID);
    }
    // console.log("useerCookie", getCookie("cookieSessionID"));
};

export const acceptCookies = () => {
    const cookiesAccept = document.querySelectorAll(
        "#accept-cookies-checkbox"
    );


    const cookies = document.querySelector(".cookies");
  
    if (cookies !== null) {
        if (typeof getCookie("isAcceptCookies") == "undefined") {
            cookies.classList.remove("-hide");
            cookiesAccept.forEach((element) => {
                element.addEventListener("click", (e) => {
                    e.preventDefault()
                    cookies.classList.add("-hide");
                    setCookie("isAcceptCookies", true);
                });
            });
        } else {
            cookies.classList.add("-hide");
        }
    }
};

export const setCookie = (name, val, days, path, domain, secure) => {
    if (navigator.cookieEnabled) {
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal;

        if (typeof days === "number") {
            const data = new Date();
            data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
            cookieText += "; expires=" + data.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    }
};

export const getCookie = (name) => {
    if (document.cookie !== "") {
        const cookies = document.cookie.split(/; */);

        for (let i = 0; i < cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
};
