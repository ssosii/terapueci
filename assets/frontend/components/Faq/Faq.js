import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import useApi from '../../lib/api/useApi';
import { ButtonLink } from "./../ButtonLink/ButtonLink";
import "./faq.scss";

const labelsType = {
    "psychoterapia": "Psychoterapia", "rodzajewizyt": "Rodzaje wizyt", "techniczne": "Kwestie techniczne",
}

const Faq = ({ isHomepage }) => {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [showMore, setShowMore] = useState({ "psychoterapia": false, "rodzajewizyt": false, "techniczne": false });


    useEffect(() => {

        const [fetch] = useApi();
        fetch(`/api-faq`, 'get')
            .then((response) => {
                console.log("response", response);
                setList(response.list);

            })
            .catch((error) => {
                console.log("error", error);

            }).finally(() => {
                // setIsSending(false);
                // setIsLoading(false);
            });

    }, []);


    const toggleOpen = (id) => {
        if (selected.includes(id)) {
            const selectedList = [...selected];
            const filtred = selectedList.filter(item => item !== id);
            setSelected(filtred);
        } else {
            setSelected([...selected, id]);
        }
    }


    return (
        <div className="faq">

            <div className="container">
                <div>
                    <div className="main--title --darkBlue --center --big">
                        Najczęściej zadawane pytania (FAQ)</div>
                </div>


                {Object.keys(list).map(key => {
                    const listLength = list[key].length;
                    if (listLength === 0) return null;
                    return (
                        <Fragment>
                            <div class='faq--category'>{labelsType[key]}</div>

                            {list[key].map((item, index) => (
                                <div class={`faq--element ${isHomepage === "1" && !showMore[key] && index > 2 ? "hide" : ""} ${selected.includes(item.id) ? "active" : ""}`}>

                                    <h3 onClick={() => toggleOpen(item.id)} class="faq--title">{item.title}</h3>
                                    <button onClick={() => toggleOpen(item.id)} class="faq--toggle">
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#00164F" />
                                        </svg>

                                    </button>
                                    <p class="faq--text">{item.value}</p>

                                </div>
                            ))}
                            {console.log("xxx", isHomepage === "1", !showMore[key])}
                            {listLength > 3 && isHomepage === "1" && !showMore[key] && <div style={{display:"flex",justifyContent:"center"}}><ButtonLink  onClick={() => setShowMore({ ...showMore, [key]: true })} text="Pokaż więcej..." /></div>}

                        </Fragment>
                    )
                })}



                {/* {% for key, list in cmsService.getFaqItems %}
                <div class='faq--category fadeInTrigger'>{{ labelsType[key] }}</div>
                {% for item in list %}
                <div class="faq--element fadeInTrigger">
                    <h3 class="faq--title">{{ item.title }}</h3>
                    <p class="faq--text">{{ item.value }}</p>
                    <button class="faq--toggle">
                        <img src="{{ asset('images/arrow_blue.svg') }}" />
                    </button>
                </div>
                {% endfor %}
                {% endfor %} */}


            </div>

        </div>

    )
}

export { Faq }