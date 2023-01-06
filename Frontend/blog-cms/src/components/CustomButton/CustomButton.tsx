import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const css = {
  customButton: "customButton",
};

interface ICustomButton {
  label: string;
  onClickAtionHandler: () => void;
  className?: string;
}

export const CustomButton = ({
  label,
  className = "",
  onClickAtionHandler,
}: ICustomButton) => {
  return (
    <div
      className={`${BEM(css.customButton)} ${className}`}
      onClick={() => onClickAtionHandler()}>
      <p>{label}</p>
    </div>
  );
};
