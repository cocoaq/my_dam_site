import React from "react";
import Nav from './components/Nav.js';
import Main from "./pages/main/Main.js";
import './app.css';

import { Routes, Route, NavLink } from "react-router-dom";

import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import InputCommunity from "./pages/blog/inputCommunity/InputCommunity.js";
import LoadCommunity from "./pages/blog/loadCommunity/LoadCommunity.js";
import Login from "./pages/login/Login.js";
import SignIn from "./pages/signIn/SignIn.js";


import { useState, useEffect } from 'react';


function App() {

  const [responseText, setResponseText] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://tiri99.dothome.co.kr/api/items.php');
      const text = await response.text(); // JSON 대신 텍스트로 확인
      console.log(text); // HTML이나 에러 메시지가 반환되는지 확인
      setResponseText(text); // 데이터를 상태에 저장
    } catch (error) {
      console.error("데이터 가져오기 실패:", error); // 에러 로그 출력
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  //더미 데이터(app와 blog에 있음)
  const [posts, setPosts] = useState([
    {id : 1, title: "demo01", content:"hihi", date:"2025-01-01"},
    {id : 2, title: "demo02", content:"hihihihi", date:"2025-01-02"},
]);
  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
};

    //로그인
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };


  return (
    <div className="background">
      <div id="topManu">
       <NavLink to="/" >
        <img src='/dam_01.png' alt='DAM'  
        style={{
          maxWidth: '120px', height: 'auto', objectFit: 'cover', padding: '10px 10%',}}
        />
      </NavLink>

      {user ? (
        <div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <NavLink to="/logIn">
          <p className='loginBtn'>Log In</p>
        </NavLink>
      )}
        <header>
          <Nav />
        </header>
      </div>
    
      <div id="contentDiv">
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          {/* 블로그 관련 */}
          <Route path="/blog" element={<Blog posts={posts}/>} />
          <Route path="/blog/input_text" element={<InputCommunity onAddPost={handleAddPost}/>} />
          <Route path="/blog/post/:id" element={<LoadCommunity posts={posts} /> } />
          {/* api 관련 */}
          <Route path="/api" element={<items />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
