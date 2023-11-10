import "./statusSwitcher.scss";
import { h, render, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import articleServices from "../../services/article";
import categoryServices from "../../services/category";

import check from "./../../images/admin_check.svg";
import uncheck from "./../../images/admin_uncheck.svg";


const StatusSwitcher = ({ type, id, value, setValue, label }) => {

    const onClick = () => {
        if (type === "user-active") {
            const [fetch] = useApi();
            fetch(`/admin/api-user-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }
        if (type === "category-active") {
            const [fetch] = useApi();
            fetch(`/admin/api-category-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }
        setValue(!value);
    }
    return (
        <div class="status--switcher">
            {label && (
                <div class="title">{label}: </div>
            )}
            <div class="status--content">
                <div class={`item -accept ${value ? "-active" : ""}`}>
                <img style={{ width: 24 }} src={check} />
                </div>
                <div class={`item -reject ${!value ? "-active" : ""}`}>
                <img style={{ width: 24 }} src={uncheck} />
                </div>
            </div>
        </div>
    )
}

export default StatusSwitcher;