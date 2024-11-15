import React from "react";
import { NavLink } from "react-router-dom";
import './nav.css';

const Nav = () => {
    return (
        <nav id="divstyle">
            <div>
                <NavLink to="/" >
                <p>Main</p>
                </NavLink>
            </div>
            <div>
                <NavLink to="/about" >
                <p>About Me</p>
                </NavLink>
            </div>
            <div>
                <NavLink to="/blog" >
                <p>Blog</p>
                </NavLink>
            </div>
            <div>
                <NavLink to="/contact" >
                <p>Contact</p>
                </NavLink>
            </div>
        </nav>
    );
};

 export default Nav;