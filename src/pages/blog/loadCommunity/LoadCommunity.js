import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import '../blog.css';

function LoadCommunity({posts}) {
    const { id } = useParams();
    const post = posts.find((p) => p.id === Number(id));
    const navigate = useNavigate();

    if (!post) return <div>게시글이 존재하지 않습니다.</div>;

    return (
        <div>
            <p>상세페이지</p>
            <hi>{post.title}</hi>
            <p>{post.content}</p>
            <Button
                className='inputButtonStyle'
                variant="contained" 
                sx={{
                backgroundColor: '#7115e9', // 기본 배경색
                    '&:hover': {
                backgroundColor: '#bf65e5', // 호버 상태 배경색
                 },
                }} onClick={() => navigate('/blog')}>목록으로</Button>
        </div>
        );     
}

export default LoadCommunity;