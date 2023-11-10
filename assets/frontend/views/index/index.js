import { h, render } from "preact";
import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "preact/hooks";


import { Newsletter } from '../../components/Newsletter/Newsletter';
import "./../../components/Faq/index";

import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';





render(
    <Newsletter />, document.querySelector('#newsletter'));


// let element = document.querySelector('.player');
// console.log("element",element);

// render(<MyComponent />, element);



function faqOpen() {
    const toggles = document.querySelectorAll(".faq--toggle")

    if (toggles) {
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.parentNode.classList.toggle("active")
            })
        })
    }


}

faqOpen();

// const fadeInElements = () => {
//     const elements = document.querySelectorAll(".fadeInTrigger");
//     console.log("ele", elements);
//     elements.forEach((img) => {
//         const callback = (entries, observer) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add("fadeIn");
//                 }
//             });
//         };

//         const options = {
//             root: null,
//             rootMargin: "0px",
//             threshold: 0,
//         };
//         const myObserver = new IntersectionObserver(callback, options);
//         myObserver.observe(img);
//     });
// };

// fadeInElements();


window.addEventListener("DOMContentLoaded", (event) => {
    findSlider();
});



function findSlider() {

    new Swiper('.swiper-container', {
        // slidesPerView: "auto",
        spaceBetween: 30,

             // // },
        breakpoints: {
  
          320: {
            slidesPerView: 1.5,
            spaceBetween: 15
          },
  
          480: {
            slidesPerView: 2.5,
            spaceBetween: 30
          },
          980: {
            slidesPerView: 4.5,
            spaceBetween: 30
          },
          1250: {
            slidesPerView:5.5 ,
            spaceBetween: 30
          },
          
          1420: {
            slidesPerView:6.5 ,
            spaceBetween: 50
          },
  
        }


        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        // // Default parameters
        // slidesPerView: 1,
        // spaceBetween: 10,
        // // infinity: 1,
        // loop: true,
        // // navigation: {
        // //   nextEl: ".next",
        // //   prevEl: ".prev",
        // // },
        // // pagination: {
        // //   el: '.swiper-pagination',
        // //   type: 'bullets',
        // // },
        // breakpoints: {
  
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 15
        //   },
  
        //   480: {
        //     slidesPerView: 1,
        //     spaceBetween: 30
        //   },
        //   575: {
        //     slidesPerView: 1,
        //     spaceBetween: 50
        //   },
  
        // }
  
      });
    }


    // let slider = document.querySelector(".slider");
    // let innerSlider = document.querySelector(".slider--inner");
    // let sliderElements = document.querySelectorAll(".slider--element")
    // let pressed = false;
    // let startx;
    // let x;



    // innerSlider.style.gridTemplateColumns = `repeat(${sliderElements.length}, 1fr)`;



    // slider.addEventListener('mousedown', (e) => {
    //     pressed = true;
    //     startx = e.offsetX - innerSlider.offsetLeft;
    //     slider.style.cursor = 'grabbing'
    // })


    // slider.addEventListener('mouseenter', () => {

    //     slider.style.cursor = 'grab'
    // })
    // slider.addEventListener('mouseup', () => {

    //     slider.style.cursor = 'grab'
    // })
    // window.addEventListener('mouseup', () => {

    //     pressed = false;
    // })

    // slider.addEventListener('mousemove', (e) => {
    //     if (!pressed) return;
    //     e.preventDefault();

    //     x = e.offsetX

    //     innerSlider.style.left = `${x - startx}px`

    //     checkEdge();

    // })

    // function checkEdge() {
    //     let outer = slider.getBoundingClientRect();
    //     let inner = innerSlider.getBoundingClientRect();

    //     if (parseInt(innerSlider.style.left) > 0) {
    //         innerSlider.style.left = "0px"
    //     }
    //     else if (inner.right < outer.right) {
    //         innerSlider.style.left = `-${inner.width - outer.width}px`
    //     }
    // }










function opinionSlider() {
    const slideContent = document.getElementsByClassName('slide_content');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const sliderRail = document.getElementById('slider_rail');
    let currentPosition = 0;
    let currentSlideIndex = 0;
    let timer;
    const totalSlideCount = sliderRail.children.length;
    const slideWidth = 600;
    const autoPlayInterval = 4000;

    sliderRail.style.transform = 'translate3d(' + currentPosition + 'px, 0px, 0px)';

    sliderRail.style.width = slideWidth * totalSlideCount + 'px';

    function goNext() {
        if (currentSlideIndex === totalSlideCount - 1) {
            currentPosition = 0;
            sliderRail.style.transform = 'translate3d(' + currentPosition + 'px, 0px, 0px)';
            currentSlideIndex = 0;
        }
        else {
            currentSlideIndex += 1;
            currentPosition += -slideWidth;
            sliderRail.style.transform = 'translate3d(' + currentPosition + 'px, 0px, 0px)';
        }
    }

    function goPrev() {
        if (currentSlideIndex === 0) {
            currentPosition = -(slideWidth * (totalSlideCount - 1));
            sliderRail.style.transform = 'translate3d(' + currentPosition + 'px, 0px, 0px)';
            currentSlideIndex = totalSlideCount - 1;
        }
        else {
            currentSlideIndex -= 1;
            currentPosition += slideWidth;
            sliderRail.style.transform = 'translate3d(' + currentPosition + 'px, 0px, 0px)';
        }
    }

    function setTimer() {
        timer = setInterval(() => {
            goNext();
        }, autoPlayInterval);
    }

    setTimer();


    next.addEventListener('click', function () {
        clearInterval(timer);
        goNext();
        setTimer();
    });

    prev.addEventListener('click', function () {
        clearInterval(timer);
        goPrev();
        setTimer();
    });
}

// opinionSlider();













// import "./../../common/index";
// import "./../../modules/header";
// import "./../../modules/footer";
// import "./../../components/navigation";
// import "./../../components/auth";

// import "./../../components/hero";
// import "./../../components/info";
// import "./../../components/about";
// import "./../../components/contact-form";
// import "./../../components/blog";
// import "./../../components/donor";
// import "./../../components/price";
// import { acceptCookies, initUserSession } from "./../../lib/cookies"
// import ReactPlayer from 'react-player';

// window.addEventListener('DOMContentLoaded', (event) => {
//     setTimeout(() => {
//         updateScrollHash();
//     }, 100);
//     acceptCookies();
// })

// const updateScrollHash = () => {
//     const scrollSections = document.querySelectorAll('.sectionTrigger');
//     let lastHash;
//     let scrollTimeout;

//     const getSectionIdInViewport = () => {
//         let lastSection;

//         scrollSections.forEach((scrollSection) => {
//             if (scrollSection.getBoundingClientRect().y - 300 <= 0) {
//                 lastSection = scrollSection.id;
//             }
//         });

//         return lastSection;
//     };

//     const setSectionHash = () => {
//         let newHash = getSectionIdInViewport();
//         newHash = newHash == "index" || newHash == undefined ? "" : '#' + newHash;
//         if (lastHash != newHash) {
//             lastHash = newHash;
//             try {
//                 window.history.replaceState(null, '', window.location.href.split('?')[0].split('#')[0] + newHash);
//                 // console.log('newHash',lastHash,newHash);
//             } catch (e) { }
//         }
//     };

//     setSectionHash();

//     window.addEventListener('scroll', () => {
//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//             setSectionHash();
//         }, 50);
//     });

// }

// let elements = document.querySelectorAll('.player');

// elements.forEach(element => {
//     const type = element.dataset.type;
//     const id = element.dataset.id;
//     const file = element.dataset.file;

//     render(<ReactPlayer
//         className=""
//         url={"https://rehawinners.pl/upload/movies/2022-17/684aec67dd9c436a473a438393f6b3b3.mp4"}
//         width="250px"
//         height="100px"
//         controls={true}
//         playing={false}

//     />, element);
// });
