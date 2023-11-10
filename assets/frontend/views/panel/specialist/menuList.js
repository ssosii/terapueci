
import { h, render, Fragment } from 'preact';


const menuList = {
    "planning": {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0 2.9 0 4V18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18ZM3.5 11C3.5 9.62 4.62 8.5 6 8.5C7.38 8.5 8.5 9.62 8.5 11C8.5 12.38 7.38 13.5 6 13.5C4.62 13.5 3.5 12.38 3.5 11Z" fill="#0A2100" />
        </svg>),
        text: "Zaplanowane wizyty"
    }, "archive": {
        icon: <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C7.03 0 3 4.03 3 9H0L3.89 12.89L3.96 13.03L8 9H5C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 12.87 15.87 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C7.27 16.99 9.51 18 12 18C16.97 18 21 13.97 21 9C21 4.03 16.97 0 12 0ZM11 5V10L15.25 12.52L16.02 11.24L12.5 9.15V5H11Z" fill="#45464F" />
        </svg>,
        text: "Archiwum wizyt"
    }, "pricing": {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="#45464F" />
        </svg>,
        text: "Cennik wizyt"
    }, "settings": {
        icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.31 20.03C14.21 20.71 13.59 21.25 12.85 21.25H9.14999C8.40999 21.25 7.78999 20.71 7.69999 19.98L7.42999 18.09C7.15999 17.95 6.89999 17.8 6.63999 17.63L4.83999 18.35C4.13999 18.61 3.36999 18.32 3.02999 17.7L1.19999 14.53C0.84999 13.87 0.99999 13.09 1.55999 12.65L3.08999 11.46C3.07999 11.31 3.06999 11.16 3.06999 11C3.06999 10.85 3.07999 10.69 3.08999 10.54L1.56999 9.34999C0.97999 8.89999 0.82999 8.08999 1.19999 7.46999L3.04999 4.27999C3.38999 3.65999 4.15999 3.37999 4.83999 3.64999L6.64999 4.37999C6.90999 4.20999 7.16999 4.05999 7.42999 3.91999L7.69999 2.00999C7.78999 1.30999 8.40999 0.759995 9.13999 0.759995H12.84C13.58 0.759995 14.2 1.29999 14.29 2.02999L14.56 3.91999C14.83 4.05999 15.09 4.20999 15.35 4.37999L17.15 3.65999C17.86 3.39999 18.63 3.68999 18.97 4.30999L20.81 7.48999C21.17 8.14999 21.01 8.92999 20.45 9.36999L18.93 10.56C18.94 10.71 18.95 10.86 18.95 11.02C18.95 11.18 18.94 11.33 18.93 11.48L20.45 12.67C21.01 13.12 21.17 13.9 20.82 14.53L18.96 17.75C18.62 18.37 17.85 18.65 17.16 18.38L15.36 17.66C15.1 17.83 14.84 17.98 14.58 18.12L14.31 20.03ZM9.61999 19.25H12.38L12.75 16.7L13.28 16.48C13.72 16.3 14.16 16.04 14.62 15.7L15.07 15.36L17.45 16.32L18.83 13.92L16.8 12.34L16.87 11.78L16.8731 11.7531C16.902 11.5027 16.93 11.2607 16.93 11C16.93 10.73 16.9 10.47 16.87 10.22L16.8 9.65999L18.83 8.07999L17.44 5.67999L15.05 6.63999L14.6 6.28999C14.18 5.96999 13.73 5.70999 13.27 5.51999L12.75 5.29999L12.38 2.74999H9.61999L9.24999 5.29999L8.71999 5.50999C8.27999 5.69999 7.83999 5.94999 7.37999 6.29999L6.92999 6.62999L4.54999 5.67999L3.15999 8.06999L5.18999 9.64999L5.11999 10.21C5.08999 10.47 5.05999 10.74 5.05999 11C5.05999 11.26 5.07999 11.53 5.11999 11.78L5.18999 12.34L3.15999 13.92L4.53999 16.32L6.92999 15.36L7.37999 15.71C7.80999 16.04 8.23999 16.29 8.70999 16.48L9.23999 16.7L9.61999 19.25ZM14.5 11C14.5 12.933 12.933 14.5 11 14.5C9.06699 14.5 7.49999 12.933 7.49999 11C7.49999 9.067 9.06699 7.49999 11 7.49999C12.933 7.49999 14.5 9.067 14.5 11Z" fill="#45464F" />
        </svg>,
        text: "Ustawienia konta"
    }
}

export default menuList;