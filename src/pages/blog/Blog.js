import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import './blog.css';

function Blog() {
    const [posts, setPosts] = useState([
        {id : 1, title: "demo1", content:"hihi"},
        {id : 2, title: "demo2", content:"hihihihi"},
    ]);

    const navigate = useNavigate();


    return (
        <div>
            <p>블로그</p>

        <NavLink to="/blog/input_text" >
            <button>글쓰기</button>
        </NavLink>

        <ul>
            {posts.map((post) => (
                <li key ={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}>
                    {post.title}
                </li>
            ))}
        </ul>
        </div>
        );     
}

export default Blog;