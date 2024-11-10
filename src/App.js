import React from "react";
import './css/App.css';
import MenuBar from './components/MenuBar.js';
import Main from "./pages/main/Main.js";

function App() {
  return (
    <div className="background">
      <header>
        <Main />
        <MenuBar />
      </header>
      <body>
        <p>시작</p>
      </body>
    </div>
  );
}

export default App;
