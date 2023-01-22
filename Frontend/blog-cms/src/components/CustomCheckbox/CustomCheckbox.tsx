import React, { useState } from "react";
import { BEM } from "../../tools";
import "./style.css";

const css = {
  customCheckbox: "customCheckbox",
  checkbox: "checkbox",
};

interface ICustomCheckbox {
  label: string;
  disabled?: boolean;
  onClickAction?: () => void;
}

export const CustomCheckbox = ({
  label,
  disabled = false,
  onClickAction,
}: ICustomCheckbox) => {
  const [checked, setChecked] = useState(false);
  const onClickHandler = () => {
    setChecked((e) => !e);
    onClickAction && onClickAction();
  };
  return (
    <div className={BEM(css.customCheckbox)} onClick={() => onClickHandler()}>
      <input
        type="checkbox"
        className={BEM(css.customCheckbox, css.checkbox)}
        checked={checked}
        disabled={disabled}
      />
      <div>{label}</div>
    </div>
  );
};
