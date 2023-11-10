
import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import "./menuMobile.scss";
import { Modal } from '../../../../../components/Modal/Modal';


const MenuMobile = ({ page, setPage, menuList }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleChange = (key) => {
        setIsOpen(false);
        setPage(key);
    }
    console.log("menuList",menuList,page);
    const selectedItem = menuList[page];

    return (
        <div className="menu--mobile--component">
            <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
                <div className='menu--mobile--modal'>

                    {Object.keys(menuList).map(key => {
                        const item = menuList[key];
                        return (
                            <div onClick={() => handleChange(key)} className={`menu--mobile--item ${page === key ? "--active" : null}`}>
                                {item.icon}
                                <div className="menu--mobile--text">{item.text}</div>
                            </div>
                        )
                    })}
                </div>
            </Modal>

            <div onClick={() => setIsOpen(true)} className={`menu--mobile--item --preview`}>
                {selectedItem.icon}
                <div className="menu--mobile--text">{selectedItem.text}</div>
            </div>
        </div>
    )
}

export { MenuMobile }