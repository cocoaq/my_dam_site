import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import '../blog.css';

function LoadCommunity() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://tiri99.dothome.co.kr/api/post.php?id=${id}`);
                const text = await response.text(); // JSON 대신 텍스트로 응답 받기
                if (response.ok) {
                    const data = JSON.parse(text); // 텍스트를 JSON으로 파싱
                    setPost(data.post);
                } else {
                    console.error("서버 에러:", text);
                    setPost(null);
                }
            } catch (error) {
                console.error("게시글 불러오기 실패", error);
                setPost(null);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) return <div>게시글이 존재하지 않습니다.</div>;

//COM_NO, COM_TITLE, COM_CONTENT, COM_TYPE, COM_DATE, COM_MEMBER
    return (
        <div className="contBG">
            {(post.COM_MEMBER).split("/")[1] == 1 && <p className='listNotice'>공지사항</p>}
            <p className='listTitle'>제목 : {post.COM_TITLE}</p>
            <p className='listMember'> 작성자 : {(post.COM_MEMBER).split("/")[0]}</p>
            <small className='loadDate'> 작성일 : { (post.COM_DATE).split("T")[0] }/{ ((post.COM_DATE).split("T")[1]).split(":")[0] }:{ ((post.COM_DATE).split("T")[1]).split(":")[1] }</small>

            <div dangerouslySetInnerHTML={{ __html: post.COM_CONTENT }} className="post-content"></div>
           
            <Button
                variant="contained" 
                id="blogButton"
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