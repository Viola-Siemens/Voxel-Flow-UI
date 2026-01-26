import React, {useState, useRef, useEffect} from "react";
import Dropdown from "./Dropdown";

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const handler = (e: { target: any; }) => {
            if (dropdown && ref.current && !ref.current.contains(e.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [dropdown]);
    return (
        <li className="menu-items" ref={ref.current}
            onMouseEnter={() => window.innerWidth > 960 && setDropdown(true)}
            onMouseLeave={() => window.innerWidth > 960 && setDropdown(false)}>
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu"
                            aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown(prev => !prev)}>
                        {items.title} {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )}
        </li>
    );
};

export default MenuItems;