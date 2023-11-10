import { h, render } from 'preact';
import { Order } from './Order';

import "./order.scss";

const element = document.querySelector('#doctorOrder');
const doctorID = element.dataset.doctorid;
const username = element.dataset.doctorusername;
const slug = element.dataset.doctorslug;
const user = element.dataset.ul;
const defaultPrice = element.dataset.defaultprice;

const appointmentID = element.dataset.aid;
const categoriesString = element.dataset.categoriesstring;
const appointmentDayOfWeek = element.dataset.adayofweek;
const appointmentDateString = element.dataset.adatestring;
const appointmentTime = element.dataset.atime;
const appointmentPriceItem = element.dataset.apriceitem;
console.log("appointmentPriceItem",appointmentPriceItem);
const priceitemmastercategoryname = element.dataset.priceitemmastercategoryname;
const appointmentAvatar = element.dataset.aavatar;
const isUsed = element.dataset.isused;
console.log("categoriesstring",categoriesString);
render(<Order
    doctorID={doctorID}
    username={username}
    slug={slug}
    isLogged={user === "1" ? true : false}
    categoriesString={categoriesString}
    defaultPrice={defaultPrice}
    defaultIsUsed={isUsed }
    defaultAppointment={{ id: appointmentID, dayOfWeek: appointmentDayOfWeek, dateString: appointmentDateString, priceItemMasterCategoryName: priceitemmastercategoryname, time: appointmentTime, priceItem: appointmentPriceItem, avatar: appointmentAvatar }}

/>, document.querySelector('#doctorOrder'));


