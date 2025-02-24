import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import Button from '@mui/material/Button';




function Blog() {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10; // 한 페이지당 게시글 개수

    const fetchPosts = async (page) => {
        try {
            const response = await fetch(`http://tiri99.dothome.co.kr/api/list.php?page=${page}`);
            const data = await response.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("게시글 불러오기 실패", error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);


    const navigate = useNavigate();

    return (
        <div className='blogBG'>
            <h3>썱 Blog</h3>

            <NavLink to="/blog/input_text" >
                <Button
                    id='blogButton'
                    className='blogButton'
                    variant="contained" sx={{
                        position: 'relative',
                        zIndex: 1,
                        backgroundColor: '#7115e9', // 기본 배경색
                        '&:hover': {
                            backgroundColor: '#bf65e5', // 호버 상태 배경색
                        },
                    }}
                >글쓰기</Button>
            </NavLink>
            <div className='blogListBG'>
                <ul className='blogList'>
                    {posts && posts.map((posts) => (
                        <div key={posts.COM_NO}>
                            <li className='blogItems' onClick={() => navigate(`/blog/post/${posts.COM_NO}`)}>
                                <p className='listNo'>{posts.COM_NO}</p>
                                {(posts.COM_MEMBER).split("/")[1] == 1 && <p className='listNotice'>공지사항</p>}
                                <p className='listTitle'>{posts.COM_TITLE}</p>
                                <p className='listMember'> {(posts.COM_MEMBER).split("/")[0]}</p>
                                <small className='listDate'> {(posts.COM_DATE).split("T")[0]}
                                    /{((posts.COM_DATE).split("T")[1]).split(":")[0]}
                                    :{((posts.COM_DATE).split("T")[1]).split(":")[1]}
                                </small>
                            </li>
                        </div>
                    ))}
                </ul>
                {/* 페이징 버튼 */}
                <div>
                    <Button
                        onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                        variant="contained" sx={{
                            backgroundColor: '#7115e9', // 기본 배경색
                            '&:hover': {
                                backgroundColor: '#bf65e5', // 호버 상태 배경색
                            },
                        }}
                    >이전</Button>
                    {/* <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button> */}
                    <span> {currentPage} / {totalPages} </span>
                    <Button
                        onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                        variant="contained" sx={{
                            backgroundColor: '#7115e9', // 기본 배경색
                            '&:hover': {
                                backgroundColor: '#bf65e5', // 호버 상태 배경색
                            },
                        }}
                    >이전</Button>
                    {/* <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button> */}
                </div>
            </div>
        </div>
    );
}

export default Blog;