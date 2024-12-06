import React from 'react';
import { NavLink } from "react-router-dom";
import './blog.css';

function Blog() {
    return (
        <div>
            <p>블로그</p>

        <NavLink to="/input_text" >
            <button>글쓰기</button>
        </NavLink>
        </div>
        );     
}

export default Blog;