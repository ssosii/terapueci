// import "./../components/btn-replacer";
// import "./../components/btn-replacer-more";
// import "./../components/btn-replacer-logged";

import "./_colors.scss";
import "./../components/Toast"
import "./_index.scss";
import "./../modules/header";
import "./../modules/navigation";
import "./../modules/footer";
import "./_typography.scss";
import "./../modules/footer"

function navigationScroll() {
    let navigation = document.querySelector(".header--component");

    document.addEventListener("scroll", () => {
        if (window.scrollY > 0) {

            navigation.classList.add('header--scroll')
        } else {
            navigation.classList.remove('header--scroll')
        }
    });
}



const transition = () => {
    const origin = window.location.host;
    const selector = `[href*="${origin}"]`;
    const anchors = document.querySelectorAll(selector);
    const transitionElement = document.querySelector('.transition');

    setTimeout(() => {
        if (transitionElement) {
            transitionElement.classList.remove('is-active');
        }
    }, 250);

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            if (transitionElement) {
                transitionElement.classList.add('is-active');
            }
        });
    });
};

const manegeNavigation = () => {
    const navigationInit = document.querySelector('.navigationTrigger');
    console.log("nav",navigationInit);
    navigationInit.addEventListener('click', () => {
        document.querySelector('body').classList.toggle('_navigation-opened');
    })
}




// import "./_pagination.scss";
// import "./_pagination.scss";

document.addEventListener('DOMContentLoaded', (event) => {
    transition();
    manegeNavigation();
    navigationScroll();
    fadeInElements();
    // headerScroll();
    // alert('common');

});


// const html = document.documentElement;
// const scrollbarWidth = window.innerWidth - html.clientWidth;
// console.log("scrollbatWidth", scrollbarWidth);
// html.style.setProperty('--scrolbar-componsation', scrollbarWidth + "px");

// function navigationScroll() {
//     let navigation = document.querySelector(".header--component");

//     document.addEventListener("scroll", () => {
//         if (window.scrollY > 0) {

//             navigation.classList.add('header--scroll')
//         } else {
//             navigation.classList.remove('header--scroll')
//         }
//     });
// }



// const transition = () => {
//     const origin = window.location.host;
//     const selector = `[href*="${origin}"]`;
//     const anchors = document.querySelectorAll(selector);
//     const transitionElement = document.querySelector('.transition');

//     setTimeout(() => {
//         if (transitionElement) {
//             transitionElement.classList.remove('is-active');
//         }
//     }, 250);

//     anchors.forEach((anchor) => {
//         anchor.addEventListener('click', (e) => {
//             if (transitionElement) {
//                 transitionElement.classList.add('is-active');
//             }
//         });
//     });
// };


// // import "./_pagination.scss";
// // import "./_pagination.scss";

// document.addEventListener('DOMContentLoaded', (event) => {
//     transition();
//     manegeNavigation();
//     navigationScroll();
//     // fadeInElements();
//     // headerScroll();

// });




// const headerScroll = () => {
//     let position = 0;
//     let lastPosition;
//     let ticking = false;

//     document.addEventListener('scroll', () => {
//         position = window.scrollY;

//         if (!ticking) {
//             window.requestAnimationFrame(function () {
//                 if (position > 20) {
//                     document.body.classList.add("_scrolled");
//                 } else {
//                     document.body.classList.remove("_scrolled");
//                 }

//                 lastPosition = position <= 0 ? 0 : position;

//                 ticking = false;
//             });
//             ticking = true;
//         }
//     });
// }


const fadeInElements = () => {
    const elements = document.querySelectorAll(".fadeInTrigger")
    // console.log("fadeInTrigger",elements);
    elements.forEach(img => {
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fadeIn")
                }
            })
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }
        const myObserver = new IntersectionObserver(callback, options)
        myObserver.observe(img)
    });


}
