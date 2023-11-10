const body = {
    addClass: (className) => {
        document.querySelector('body').classList.add(className);
    },

    removeClass: (className) => {
        document.querySelector('body').classList.remove(className);
    },
    toggleClass: (className) => {
        document.querySelector('body').classList.remove(className);
    }
}


export default body;



