
import { h, render } from 'preact';
import message from "./../Toast/message";

const success = document.querySelector('.toast-success');console.log("success",success);
if (success) {
    message.success();
}

const error = document.querySelector('.toast-error');
if (success) {
    message.error();
}

