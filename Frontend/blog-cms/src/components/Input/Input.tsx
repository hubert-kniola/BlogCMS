import React from "react"
import "./style.css"

interface IInput {
    type?: string ;
    placeholder: string;
}

export const Input = ({placeholder, type = "text"} : IInput) => {
    return (
        <div className="input_container">
            <input type={type} placeholder={placeholder} required/>
        </div>
    );
}