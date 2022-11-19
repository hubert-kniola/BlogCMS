import React from "react";
import "./App.css";
import { BEM } from "./tools";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className={BEM("App", "text", "p")}>/admin /main</p>
      </header>
    </div>
  );
}

export default App;
