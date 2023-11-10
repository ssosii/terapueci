
import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { PlanningPage } from './pages/Planning';
import { SettingsPage } from "./pages/Settings";
import { PricingPage } from "./pages/Pricing";
import { ArchivePage } from "./pages/Archive";
import { Menu } from './../components/Menu/Menu';
import menuList from "./menuList";
import "./panel-specialist.scss";
import { ThemeProvider } from '../../../providers/ThemeProvider';


const SpecialistPanelPage = () => {
    const [page, setPage] = useState("planning");


    return (
        <ThemeProvider>

            <div className="container page--container">
                <div className='menu'>
                    <Menu menuList={menuList} page={page} setPage={setPage} />
                </div>

                <div className='content'>
                    {page === "planning" && <PlanningPage />}
                    {page === "archive" && <ArchivePage />}
                    {page === "pricing" && <PricingPage />}
                    {page === "settings" && <SettingsPage />}
                </div>
            </div>
        </ThemeProvider>

    )
}


render(<SpecialistPanelPage />, document.querySelector('#calendar'));


