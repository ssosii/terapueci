
import { h, render } from 'preact';
import SingleImageUploader from "./SingleImageUploader";


const element = document.querySelector('.singleImageUploaderComponent');
const type = element.dataset.type;
const userID = element.dataset.userid;
const imageUrlDefault = element.dataset.imageurldefault;

console.log("single", document.querySelector('.singleImageUploaderComponent'),type,userID,imageUrlDefault);
render(<SingleImageUploader type={type} userID={userID} imageUrlDefault={imageUrlDefault} />, document.querySelector('.singleImageUploaderComponent'));

