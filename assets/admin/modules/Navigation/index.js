
import { h, render } from 'preact';
import Navigation from "./Navigation";
console.log("components",document.querySelector('.navigationComponent'));
render(<Navigation />, document.querySelector('.navigationComponent'));