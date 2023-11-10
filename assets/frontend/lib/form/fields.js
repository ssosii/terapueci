import { Fragment, h, render } from 'preact';

const renderRow = (ref, func, value,type, label) => (
    <div ref={ref} class="form--row">
        <input onChange={(e) => func(e.target.value)} class="input--text" type={type} value={value} />
        <div class="info">
            <div class="label">{label}</div><div class="error"></div>
        </div>
    </div>
)

const renderTextarea = (ref, func, value, label) => (
    <div ref={ref} class="form--row">
        <textarea onChange={(e) => func(e.target.value)} class="textarea--field" value={value}></textarea>
        <div class="info">
            <div class="label">{label}</div><div class="error"></div>
        </div>
    </div>
)


export { renderRow, renderTextarea };