
import { h, render } from 'preact';
import StatusSwitcherList from "./StatusSwitcherList";

{/* <StatusSwitcherList type="tip" id={tips[tipKey].id} listValue={tips[tipKey].isVisible} />{tips[tipKey].isVisible} */ }

const elements = document.querySelectorAll('.statusSwitcherComponent');

elements.forEach(element => {
    const type = element.dataset.type;
    const id = element.dataset.id;
    const value = element.dataset.value;
    const label = element.dataset.label;

    render(<StatusSwitcherList label={label} type={type} id={id} listValue={value} />, element);
});