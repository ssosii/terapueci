import { h, render } from 'preact';
import { Faq } from "./Faq";

if (document.querySelector('#faq')) {
    const el = document.querySelector('#faq');
    const isHomepage = el.dataset.homepage;
    render(<Faq isHomepage={isHomepage} />, document.querySelector('#faq'));
}