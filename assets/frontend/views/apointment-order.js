
import { h, render } from 'preact';

import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import { ButtonPrimary } from '../components/ButtonPrimary/ButtonPrimary';
import { InputText } from '../components/form/InputText/InputText';
import { FormHelperText } from '../components/form/FormHelperText/FormHelperText';



// $selectedDate = $request->request->get('selectedDate');
// $company = $request->request->get('company');
// $email = $request->request->get('email');
// $name = $request->request->get('name');
// $skype = $request->request->get('skype');
// $phone = $request->request->get('phone');
// $hour = $request->request->get('hour');
// $comment = $request->request->get('comment');
// $appointmentRuleID = $request->request->get('appointmentRuleID');

// $otherCheckbox = $request->request->get('otherCheckbox');
// $other = $request->request->get('other');
// $chanel = $request->request->get('chanel');


const OrderForm = ({ doctorID }) => {
    return (
        <Formik
            initialValues={{
                email: '',
                phone: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Niepoprawny adres email.')
                    .max(255)
                    .required('Email jest wymagany.'),
                phone: Yup.string()
                    .max(15, "Wybrany numer jest za długi")
                    .required('Numer telefonu jest wymagany.'),
                // phone: Yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false})
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                const { email } = values;
                try {
                    // await updateEmail(email);
                } catch (err) {
                    console.log('register error', err);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (

                <div style="width:100%;max-width:600px; margin:70px auto 0 auto;">
                    <InputText label="Adres email" type="email" name='email' touched={touched.email} error={Boolean(touched.email && errors.email) ? errors.email : null} value={values.email} onBlur={handleBlur} handleChange={handleChange} />
                    <InputText label="Numer telefonu" type="tel" name='phone' touched={touched.phone} error={Boolean(touched.phone && errors.phone) ? errors.phone : null} value={values.phone} onBlur={handleBlur} handleChange={handleChange} />


                    {console.log(errors, values)}
                    {/* <InputText label="Imię i nazwisko" name='name' value="" />
                        <InputText label="Numer telefonu" name='email' value="" /> */}
                    {/* <ButtonPrimary text="Zarezerwuj wizytę" /> */}
                </div>

            )}
        </Formik>
    )
}



const form = document.querySelector('#formOrder');
const doctorID = form.dataset.doctorid;

console.log("form", form, doctorID);

render(<OrderForm doctorID={doctorID} />, form);

// window.addEventListener("DOMContentLoaded", (event) => {
//   new Order();

//   const otherCheckbox = document.querySelector(".otherCheckbox");
//   const other = document.querySelector(".other");
//   const chanel = document.querySelector('select[name="chanel"]');
//   otherCheckbox.addEventListener("change", (event) => {
//     const current = event.target;

//     if (current.checked) {
//       other.classList.remove("display-none");
//       chanel.disabled = true;
//     } else {
//       other.classList.add("display-none");
//       chanel.disabled = false;
//     }
//   });
// });

// class Order {
//   constructor() {
//     this.fetchData();
//     this.callendaObject = null;
//     this.selectHours();
//     this.submitForm();
//     this.clearDefaultInput();
//   }

//   fetchData() {
//     let currentLocation = window.location;

//     // var pathname = new URL(currentLocation).pathname;
//     // let lastPart = pathname.split("-");
//     // const doctorId = lastPart.slice(-2)[0];
//     // console.log(doctorId);
//     const doctorID = document.querySelector("input[name='doctorID']").value;

//     console.log(`/get-apointment-rule-${doctorID}`);
//     $.ajax({
//       url: `/get-apointment-rule-${doctorID}`,
//       data: "",
//       type: "post",
//       contentType: false,
//       processData: false,
//       cache: false,
//       dataType: "json",
//       success: (data) => {
//         if (Object.keys(data.dates).length > 0) {
//           this.callendaObject = this.initCallendar(data);
//           document
//             .querySelector(".doctor-order__title")
//             .classList.remove("display-none");
//         } else {
//           document
//             .querySelector(".doctor-order__empty-dates")
//             .classList.remove("display-none");
//         }
//         const loader = document.querySelector(".doctor-order__loader");
//         loader.classList.add("display-none");
//       },
//     });
//   }

//   selectHours() {
//     const hourInput = document.querySelector("input[name='hour']");
//     const hourContainer = document.querySelector(".doctor-order__hours");
//     hourContainer.addEventListener("click", (event) => {
//       const current = event.target;
//       const value = current.dataset.value;
//       if (current.classList.contains("doctor-order__hour")) {
//         hourInput.value = value;
//         const hours = hourContainer.querySelectorAll(".doctor-order__hour");
//         hours.forEach((hour) => {
//           hour.classList.remove("doctor-order__hour--selected");
//         });
//         current.classList.add("doctor-order__hour--selected");
//       }
//       this.isSelectedDateAndHour();
//     });
//   }

//   initCallendar(data) {
//     if (data) {
//       const dates = data.dates;
//       console.log("dates", dates);
//       const self = this;
//       $(function () {
//         $.datepicker.regional.pl = {
//           monthNames: [
//             "Styczeń",
//             "Luty",
//             "Marzec",
//             "Kwiecień",
//             "Maj",
//             "Czerwiec",
//             "Lipiec",
//             "Sierpień",
//             "Wrzesień",
//             "Październik",
//             "Listopad",
//             "Grudzień",
//           ],
//           monthNamesShort: [
//             "Sty",
//             "Lut",
//             "Mar",
//             "Kwi",
//             "Maj",
//             "Cze",
//             "Lip",
//             "Sie",
//             "Wrz",
//             "Paź",
//             "Lis",
//             "Gru",
//           ],
//           dayNames: [
//             "Niedziela",
//             "Poniedziałek",
//             "Wtorek",
//             "Środa",
//             "Czwartek",
//             "Piątek",
//             "Sobota",
//           ],
//           dayNamesShort: ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
//           dayNamesMin: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
//           firstDay: 1,
//         };
//         $.datepicker.setDefaults($.datepicker.regional.pl);

//         // var array = ["2021-01-27", "2021-01-29", "2021-02-02"];

//         $("#datepicker").datepicker({
//           dateFormat: "yy-mm-dd",
//           onSelect: function (date, callendar) {
//             const dateIndex = self.sortSelectedDate(date, dates);
//             const item = dates[dateIndex];
//             const hours = item["hours"];

//             const appointmentRuleID = item["id"];
//             self.setAppointmentRuleID(appointmentRuleID);

//             const selectedDateInput = document.querySelector(
//               "input[name='selectedDate']"
//             );

//             selectedDateInput.value = date;
//             if (hours) {
//               self.insertHours(hours);
//             }
//             self.isSelectedDateAndHour();
//           },
//           beforeShowDay: function (date) {
//             var string = jQuery.datepicker.formatDate("yy-mm-dd", date);
//             return [Object.keys(dates).indexOf(string) != -1];
//           },
//         });
//       });
//     }
//   }

//   setAppointmentRuleID(id) {
//     document.querySelector("input[name='appointmentRuleID'").value = id;
//   }

//   insertHours(hours) {
//     const hoursContainer = document.querySelector(".doctor-order__hours");
//     hoursContainer.innerHTML = "";
//     Object.keys(hours).forEach((i) => {
//       let newDiv = document.createElement("div");
//       newDiv.className = "doctor-order__hour";
//       newDiv.dataset.value = hours[i];
//       newDiv.innerText = hours[i] + ":00";
//       hoursContainer.appendChild(newDiv);
//     });
//   }

//   sortSelectedDate(selected, dates) {
//     function sortdates(selected) {
//       return function (element) {
//         return element == selected;
//       };
//     }
//     return Object.keys(dates).filter(sortdates(selected));
//   }
//   submitForm() {
//     const form = document.querySelector(".doctor-order__form");
//     form.addEventListener("submit", (e) => {
//       if (!this.isValidForm(form)) {
//         e.preventDefault();
//       }
//     });
//   }
//   isValidChanel() {
//     const otherCheckbox = document.querySelector(".otherCheckbox").checked;
//     const chanel = document.querySelector(".chanel").value;
//     const other = document.querySelector(".other").value;

//     if (otherCheckbox) {
//       if (other.length > 0) {
//         return true;
//       }
//     } else {
//       if (chanel == "empty") {
//         return false;
//       } else {
//         return true;
//       }
//     }

//     return false;
//   }
//   isValidForm(form) {
//     const company = form.querySelector("input[name='company']");
//     const email = form.querySelector("input[name='email']").value;
//     const name = form.querySelector("input[name='name']").value;
//     const phone = form.querySelector("input[name='phone']").value;
//     const hour = form.querySelector("input[name='hour']").value;
//     const selectedDate = form.querySelector("input[name='selectedDate']").value;
//     const isValidPreferContact = this.isValidChanel();
//     const accept = form.querySelector("input[name='accept']").checked;
//     const rodo = form.querySelector("input[name='rodo']").checked;
//     this.clearAllErrors();

//     let errors = {};

//     if (selectedDate.length == 0) {
//       errors["selectedDate"] = true;
//       this.showErrorFrame("selectedDate");
//     }
//     if (hour.length == 0) {
//       errors["hour"] = true;
//       this.showErrorFrame("hour");
//     }
//     if (email.length == 0) {
//       errors["email"] = true;
//       this.showErrorFrame("email");
//     } else {
//       if (!this.isValidEmail(email)) {
//         errors["emailValid"] = true;
//         this.showErrorFrame("emailValid");
//       }
//     }

//     if (name.length == 0) {
//       errors["name"] = true;
//       this.showErrorFrame("name");
//     }
//     if (!isValidPreferContact) {
//       errors["preferContact"] = true;
//       this.showErrorFrame("preferContact");
//     }
//     if (phone.length == 0) {
//       errors["phone"] = true;
//       this.showErrorFrame("phone");
//     }
//     if (!accept) {
//       errors["accept"] = true;
//       this.showErrorFrame("accept");
//     }
//     if (!rodo) {
//       errors["rodo"] = true;
//       this.showErrorFrame("rodo");
//     }
//     if (Object.keys(errors).length == 0) {
//       return true;
//     }

//     return false;
//   }

//   showErrorFrame(type) {
//     const errorWrap = document.querySelector(`.field-error--${type}`);
//     console.log(type);
//     errorWrap.classList.remove("display-none");
//   }

//   clearAllErrors() {
//     const errors = document.querySelectorAll(".field-error");
//     errors.forEach((error) => {
//       error.classList.add("display-none");
//     });
//   }
//   clearDefaultInput() {
//     const form = document.querySelector(".doctor-order__form");
//     form.querySelector("input[name='hour']").value = "";
//     form.querySelector("input[name='selectedDate']").value = "";
//     form.querySelector("input[name='appointmentRuleID']").value = "";
//     document.querySelector(".otherCheckbox").checked = false;
//   }
//   isSelectedDateAndHour() {
//     const form = document.querySelector(".doctor-order__form");

//     if (
//       form.querySelector("input[name='hour']").value == "" ||
//       form.querySelector("input[name='selectedDate']").value == "" ||
//       form.querySelector("input[name='appointmentRuleID']").value == ""
//     ) {
//       form.classList.add("display-none");
//     } else {
//       form.classList.remove("display-none");
//     }
//   }
//   isValidEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   }
// }
