import { h, render } from 'preact';
import image from "./../../../../images/auth-preview.png";

const Preview = () => {
  return (
    <div><img src={image}/></div>
  )
}

export { Preview }