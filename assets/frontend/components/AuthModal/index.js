
import { h, render } from 'preact';
import { AuthModal } from "./AuthModal";

if( document.querySelector('#authModal')){
render(<AuthModal />, document.querySelector('#authModal'));
}
