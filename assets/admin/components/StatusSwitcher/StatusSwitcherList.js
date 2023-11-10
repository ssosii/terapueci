import "./statusSwitcher.scss";
import { h, render, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';
// import CheckIcon from '@mui/icons-material/Check';
// import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import message from "./../../components/Toast/message"
import useApi from "./../../lib/api/useApi";
import check from "./../../images/admin_check.svg";
import uncheck from "./../../images/admin_uncheck.svg";


const StatusSwitcherList = ({ type, id, label, listValue: listValueDefault }) => {

    const [value, setValue] = useState(listValueDefault);     
    const [fetch] = useApi();
    const onClick = () => {


        console.log('type', type);

        if (type === "doctor-active") {
           
            fetch(`/admin/api-doctor-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }
        if (type === "doctor-highlighted") {
           
            fetch(`/admin/api-doctor-toggle-highligthed/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }
        if (type === "category-active") {
            fetch(`/admin/api-category-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }

        if (type === "langue-active") {

            fetch(`/admin/api-langue-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }


        if (type === "promo-active") {

            fetch(`/admin/api-promo-code-toggle-active/${id}`, {}, 'post')
                .then((response) => {
                    message.success();
                    console.log('response', response);
                })
                .catch((error) => {
                    // setType('fail');
                });
        }



        
        // if (type === "user-donated") {
        //     const [fetch] = useApi();
        //     fetch(`/admin/api-user-toggle-donated/${id}`, {}, 'post')
        //         .then((response) => {
        //             message.success();
        //             console.log('response', response);
        //         })
        //         .catch((error) => {
        //             // setType('fail');
        //         });
        // }
        // if (type === "recording-active") {
        //     const [fetch] = useApi();
        //     fetch(`/admin/api-recording-toggle-active/${id}`, {}, 'post')
        //         .then((response) => {
        //             message.success();
        //             console.log('response', response);
        //         })
        //         .catch((error) => {
        //             // setType('fail');
        //         });
        // }
        // if (type === "recording-active-advice") {
        //     const [fetch] = useApi();
        //     fetch(`/admin/api-recording-advice-toggle-active/${id}`, {}, 'post')
        //         .then((response) => {
        //             message.success();
        //             console.log('response', response);
        //         })
        //         .catch((error) => {
        //             // setType('fail');
        //         });
        // }
        // if (type === "education-active") {
        //     const [fetch] = useApi();
        //     fetch(`/admin/api-education-toggle-active/${id}`, {}, 'post')
        //         .then((response) => {
        //             message.success();
        //             console.log('response', response);
        //         })
        //         .catch((error) => {
        //             // setType('fail');
        //         });
        // }
        // if (type === "blog-active") {
        //     const [fetch] = useApi();
        //     fetch(`/admin/api-blog-toggle-active/${id}`, {}, 'post')
        //         .then((response) => {
        //             message.success();
        //             console.log('response', response);
        //         })
        //         .catch((error) => {
        //             // setType('fail');
        //         });
        // }
        setValue(!value);
    }


    return (
        <div class="status--switcher">
            {/* {label && (
                <div style={{ fontSize: "14px" }}>{label}: </div>
            )} */}
            <div class="status--content">
                <div onClick={onClick} class={`item -accept ${value ? "-active" : ""}`}>
                    <img style={{ width: 24 }} src={check} />
                </div>
                <div onClick={onClick} class={`item -reject ${!value ? "-active" : ""}`}>
                    <img style={{ width: 24 }} src={uncheck} />
                </div>


            </div>
        </div>
    )
}

export default StatusSwitcherList;