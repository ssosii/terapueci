import { h, render, Fragment } from 'preact';
import { MenuDesktop } from "./MenuDesktop/MenuDesktop";
import { MenuMobile } from "./MenuMobile/MenuMobile";

const Menu = ({ menuList, page, setPage }) => {
    return (
        <div>
            <MenuDesktop menuList={menuList} page={page} setPage={setPage} />
            <MenuMobile menuList={menuList} page={page} setPage={setPage} />
        </div>
    )
}

export { Menu }