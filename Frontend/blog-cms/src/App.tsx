import React from "react";
import "./App.css";
import { BEM } from "./tools";

function App() {

  const getTextCssClasses = () => { //example of use BEM method
    return BEM("App", "text", "p");
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className={getTextCssClasses()}>
          Read code in <code>src/App.tsx</code> to check use of BEM style method
        </p>
      </header>
    </div>
  );
}

export default App;
