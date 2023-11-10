const effects = {
    fadeIn: (elements) => {
        elements.forEach(element => {
            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fadeIn");
                    }
                })
            }
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0
            }
            const myObserver = new IntersectionObserver(callback, options);
            myObserver.observe(element);
        });
    }
}


export default effects;



