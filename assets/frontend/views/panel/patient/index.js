
import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Planning } from './pages/Planning/Planning';
import { Settings } from "./pages/Settings/Settings";
import { Question } from "./pages/Question/Question";
import { Pricing } from "./pages/Pricing/Pricing";
import { Menu } from './../components/Menu/Menu';
import menuList from "./menuList";
import "./panel-patient.scss";
import { ThemeProvider } from '../../../providers/ThemeProvider';

const PatientPanelPage = () => {
    const [page, setPage] = useState("planning");


    return (
        <ThemeProvider>
            <div className="container page--container">
                <div className='menu'>
                    <Menu menuList={menuList} page={page} setPage={setPage} />
                </div>
                <div className='content'>
                    {page === "planning" && <Planning />}
                    {page === "pricing" && <Pricing />} 
                    {page === "settings" && <Settings />}
                    {page === "question" && <Question />}
                </div>
            </div>
        </ThemeProvider>
    )
}


render(<PatientPanelPage />, document.querySelector('#calendar'));


