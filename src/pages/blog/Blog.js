import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import Button from '@mui/material/Button';

import './blog.css';

function Blog() {
     //더미 데이터(app와 blog에 있음)
    const [posts, setPosts] = useState([
        {id : 1, title: "demo01", content:"hihi", date:"2025-01-01"},
        {id : 2, title: "demo02", content:"hihihihi", date:"2025-01-02"},
    ]);

    const navigate = useNavigate();
    
    return (
        <div>
            <h3>블로그</h3>

        <NavLink to="/blog/input_text" >
        <Button 
                id='blogButton'
                variant="contained" sx={{
                    backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                        backgroundColor: '#bf65e5', // 호버 상태 배경색
                    },
                }} 
                >글쓰기</Button>
        </NavLink>

        <ul className='blogList'>
            {posts.map((post) => (
                <li className='blogItems' key ={post.id} onClick={() => navigate(`/blog/post/${post.id}`)}>
                    {post.title}
                </li>
            ))}
        </ul>
        </div>
        );     
}

export default Blog;