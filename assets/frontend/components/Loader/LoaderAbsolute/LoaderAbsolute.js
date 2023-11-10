
import { h, render } from 'preact';

import CircularProgress from '@mui/material/CircularProgress';
import "./loaderAbsolute.scss";

const LoaderAbsolute = () => {
    return (
        <div className="loader-absolute">
            <CircularProgress />
        </div>

    )
}

export { LoaderAbsolute }