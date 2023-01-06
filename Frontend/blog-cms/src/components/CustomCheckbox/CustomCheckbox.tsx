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
}

export const CustomCheckbox = ({
  label,
  disabled = false,
}: ICustomCheckbox) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={BEM(css.customCheckbox)}
      onClick={() => setChecked((s) => !s)}>
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
