import React from "react";
import "./style.css";

interface IInput {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
}: IInput) => {
  return (
    <div className="input_container">
      <input
        type={type}
        placeholder={placeholder}
        value={value && value}
        onChange={
          onChange
            ? (e) => onChange(e)
            : () => console.log("Zapomniano o mnie :( ")
        }
        required
      />
    </div>
  );
};
