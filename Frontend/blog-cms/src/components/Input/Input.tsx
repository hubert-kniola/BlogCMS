import { borderColor } from "@mui/system";
import React from "react";
import "./style.css";

interface IInput {
  type?: string;
  placeholder: string;
  value?: string;
  invalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const Input = ({
  placeholder,
  type = "text",
  value,
  invalid,
  onChange,
  onBlur,
}: IInput) => {
  return (
    <div className="input_container">
      <input
        style={invalid ? { borderColor: "red" } : {}}
        type={type}
        placeholder={placeholder}
        value={value && value}
        onChange={onChange ? (e) => onChange(e) : () => {}}
        required
        onBlur={onBlur ? () => onBlur() : () => {}}
      />
    </div>
  );
};
