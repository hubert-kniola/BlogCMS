import { sha256 } from "js-sha256";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import axiosConfig from "../../axiosConfig";
import { updateUser } from "../../../store/slices/userSlice";
import "./Login.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleButtonClick = async () => {
    const params = {
      email: email,
      pass: sha256(password),
    };
    axiosConfig
      .post(`/login`, params)
      .then((response) => dispatch(updateUser(response.data)))
      .catch((error) => {
        setIsValid(false);
      });
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          id="email"
          name="email"
          className="input"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button type="button" className="button" onClick={handleButtonClick}>
          LOGIN
        </button>
        <div className="register">REGISTER</div>
        {!isValid && (
          <p className="valid-text">You entered wrong e-mail or password!</p>
        )}
      </div>
    </>
  );
};

export default Login;
