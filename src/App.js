import React from "react";
import Nav from './components/Nav.js';
import Main from "./pages/main/Main.js";
import './app.css';

import { Routes, Route } from "react-router-dom";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio.js";


function App() {
  return (
    <div className="background">
      <div id="topManu">
      <img src='/dam_01.png' alt='DAM'  
      style={{
        maxWidth: '120px', height: 'auto', objectFit: 'cover', padding: '10px 10%',}}
      />
        <header>
          <Nav />
        </header>
      </div>
    
      <div id="contentDiv">
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
