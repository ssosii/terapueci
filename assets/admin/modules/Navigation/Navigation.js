import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
// import logo from "./../../images/logo.svg";
import closeIcon from "./../../images/admin_close.svg";

const Navigation = () => {
    const [page, setPage] = useState("");
    const [subpage, setSubpage] = useState("");
    const [params, setParams] = useState({ page: "", subpage: "" });
    const bodyClasslist = document.body.classList;

    useEffect(() => {
        const bodyClasslistValue = bodyClasslist.value;
        if (bodyClasslistValue) {
            const params = bodyClasslistValue.split('-');
            setPage(params[0]);
            setSubpage(params[1]);
        }
    }, [])
    const onClickClose = () => {
        bodyClasslist.remove('-navigation-opened');
    }
    console.log("page", page);


    return (
        <div class="navigation--component">
            <a href="/" class="navigation--header">
                {/* <div class="logo"><img src={logo} /></div> */}
                <div onClick={() => onClickClose()} class="close">
                    <img class="icon" src={closeIcon} />
                </div>
            </a>
            <div class="navigation--list">

                <a href="/admin/wizyty" class={`item -single ${page == 'recording' ? '-active' : ''}`}>
                    Wizyty
                    {/* <ExpandMoreIcon className="dropicon" /> */}
                </a>
                {/* <a href="/admin/platnosci" class={`item -single ${page == 'payment' ? '-active' : ''}`}>
                    Płatności
           
                </a> */}

                <a href="/admin/jezyki" class={`item -single ${page == 'langue' ? '-active' : ''}`}>
                    Języki
                    {/* <ExpandMoreIcon className="dropicon" /> */}
                </a>

                <a href="/admin/specjalisci" class={`item -single ${page == 'doctor' ? '-active' : ''}`}>
                    Specjaliści
                </a>
                <a href="/admin/pacjenci" class={`item -single ${page == 'patient' ? '-active' : ''}`}>
                    Pacjenci
                </a>
                <a href="/admin/cennik" class={`item -single ${page == 'pricing' ? '-active' : ''}`}>
                    Cennik
                </a>

                {/* <a href="/admin/kategorie" class={`item -single ${page == 'kategorie' ? '-active' : ''}`}>
                    Kategorie
                </a> */}
                <a href="/admin/kody-promocyjne" class={`item -single ${page == 'promo' ? '-active' : ''}`}>
                    Kody promocyjne
                </a>
                <a href="/admin/newsletter" class={`item -single ${page == 'newsletter' ? '-active' : ''}`}>
                    Newsletter
                </a>
                <a href="/admin/faq" class={`item -single ${page == 'faq' ? '-active' : ''}`}>
                    Faq
                </a>
                

                <div style={{height:20,width:"100%"}}></div>

                <a href="/admin/strona-glowna" class={`item -single ${page == 'homepage' ? '-active' : ''}`}>
                    Strona główna
                </a>

                <a href="/admin/pracuj-u-nas" class={`item -single ${page == 'pracuj' ? '-active' : ''}`}>
                    Pracuj u nas
                </a>

                <a href="/admin/dla-firm" class={`item -single ${page == 'for' ? '-active' : ''}`}>
                    Dla firm
                </a>

                {/* <a href="/admin/filmy-edukacyjne" class={`item -single ${page == 'education' ? '-active' : ''}`}>
                    Cms
                </a> */}


                {/* <div class={`navigation--list--dropdown ${page == 'users' ? '-open' : ''}`}>
                    <a href="/admin/uzytkownicy-lista" class={`item subitem ${subpage == 'list' && page == 'article' ? '-active' : ''}`}>Lista</a>
                    <a href="/admin/uzytkownicy-nowy" class={`item subitem ${subpage == 'new' && page == 'article' ? '-active' : ''}`}>Dodaj nowy</a>
                </div> */}

                {/* <div onClick={() => setPage(page == 'page' ? '' : 'page')} class={`item ${page == 'page' ? '-active' : ''}`}>
                    Strony
                </div>
                <div class={`navigation--list--dropdown ${page == 'page' ? '-open' : ''}`}>
                    <a href="/admin/strona-glowna" class={`item subitem ${page == 'page' && subpage == 'home' ? '-active' : ''}`}>Strona główna</a>
                    <a href="/admin/regulamin" class={`item subitem ${page == 'page' && subpage == 'regulamin' ? '-active' : ''}`}>Regulamin</a>
                </div> */}


            </div>
        </div>
    )
}
export default Navigation;
