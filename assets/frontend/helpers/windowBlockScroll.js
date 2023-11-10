const windowScroll = {
    init: () => {
        document.querySelector("body").classList.add('_modal');

        // document.body.style.top = `-${window.scrollY}px`;
        // document.body.style.position = 'fixed';
        // document.body.style.width = `100%`;
    },

    remove: () => {
        document.querySelector("body").classList.remove('_modal');
        // const scrollY = document.body.style.top;
        // document.body.style.position = '';
        // document.body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);
    },
    toBottom: () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
};

export default windowScroll;

