import { h, render } from 'preact';
import "./menuDesktop.scss";


const MenuDesktop = ({ page, setPage, menuList }) => {

    const handleChange = (key) => {
        setPage(key);
    }

    return (
        <div className="menu--component">
            {Object.keys(menuList).map(key => {
                const item = menuList[key];
                return (
                    <div onClick={() => handleChange(key)} className={`item ${page === key ? "--active" : null}`}>
                        {item.icon}
                        <div className="text">{item.text}</div>
                    </div>
                )
            })}
        </div>

    )
}

export { MenuDesktop }