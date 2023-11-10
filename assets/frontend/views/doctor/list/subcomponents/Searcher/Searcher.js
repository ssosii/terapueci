import { h, render } from 'preact';
import { useEffect, useRef, useState, useMemo } from 'preact/hooks';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import useApi from '../../../../../lib/api/useApi';
import "./searcher.scss";


const Searcher = ({ setSearcherValue }) => {
    const ref = useRef();
    const [value, setValue] = useState("");

    const onChange = () => {
        setSearcherValue(value);

    };

    useEffect(() => {
        ref.current = onChange;
    }, [onChange]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, 1000);
    }, []);

    { console.log("value", value) }

    return (
        <div className="searcher">
            <div className="content">
                <SearchIcon fontSize="medium" />
                <input
                    className="input"
                    placeholder="Wyszukaj specjalisty"
                    onChange={(e) => {
                        debouncedCallback();
                        setValue(e.target.value);
                    }}
                    value={value}
                />
            </div>

        </div>
    )
}

export { Searcher }