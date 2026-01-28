import React from "react";
import { Navbar } from '@/components/Navigation';

const Header = () => {
    return (
        <header>
            <div className="nav-area">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="logo" />
                </a>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;