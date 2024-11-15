import React from "react";
import MenuBar from './components/MenuBar.js';
import Main from "./pages/main/Main.js";
import './app.css';

import { Routes, Route } from "react-router-dom";
import AboutMe from "./pages/aboutMe/AboutMe";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";


function App() {
  return (
    <div className="background">
      <header>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </header>
      {/* <Main /> */}
    </div>
  );
}

export default App;
