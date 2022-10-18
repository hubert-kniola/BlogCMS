import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="container">
      <input type="text" id="login" name="login" className="input"></input>
      <input type="text" id="password" name="password" className="input"></input>
      <button type="button" className="button">LOGIN</button>
    </div>
  );
};

export default Login;
