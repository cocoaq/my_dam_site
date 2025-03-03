import React from "react";
import { useState, useEffect } from 'react';

import Nav from './components/Nav.js';
import Main from "./pages/main/Main.js";

import './app.css';

import { Routes, Route, NavLink } from "react-router-dom";

import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import InputCommunity from "./pages/blog/InputCommunity.js";
import LoadCommunity from "./pages/blog/LoadCommunity.js";
import Login from "./pages/login/Login.js";
import SignIn from "./pages/signIn/SignIn.js";

function App() {


  //로그인
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  }, []);



  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("MEM_ID");
    localStorage.removeItem("MEM_NAME");
    localStorage.removeItem("MEM_NO");
    window.location.href = "/";
    console.log("로그아웃");
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

      { !isLoggedIn ? (
        <NavLink to="/logIn">
          {/* <p className='loginBtn' onClick={handleLogin}>Log In</p> */}
          <p className='loginBtn' >Log In</p>
        </NavLink>
      ) : (
        <p className='loginBtn' onClick={handleLogout}>{localStorage.getItem("MEM_NAME")}:Log Out</p>
      )}
        <header>
          <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </header>
      </div>
    
      <div id="contentDiv">
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          {/* 블로그 관련 */}
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/input_text" element={<InputCommunity />} />
          <Route path="/blog/post/:id" element={<LoadCommunity /> } />

        </Routes>
      </div>
    </div>
  );
}

export default App;
