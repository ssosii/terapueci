
import { h, render } from 'preact';

import CircularProgress from '@mui/material/CircularProgress';
import "./loaderCenter.scss";

const LoaderCenter = ({ style }) => {
    return (
        <div className="loader-center" style={style}>
            <CircularProgress />
        </div>

    )
}

export { LoaderCenter }