import { h, render } from 'preact';
import "./preview.scss";
import { getDayOfWeekName} from "./../../../../../lib/datatime";

const Preview = ({ id, username, dayOfWeek, dateString, time, type, avatar }) => {
    console.log("xxx", id, dayOfWeek, dateString, time, type, avatar);
    return (
        <div className="preview">

            <div className="label">
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <div className="info">
                    <div className="username">
                        {username}
                    </div>
                    <div className="categories">
                        Konsultacja psychologiczna ・Interwencja kryzysowa ・ Psychoedukacja ・ Poznawczo-bechawioralny
                    </div>
                </div>
            </div>

            <div className="action">
                <div style={{ displat: "flex", justifyContent: "space-between" }}>
                    <div>{getDayOfWeekName(dayOfWeek)}{dateString}</div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export { Preview }