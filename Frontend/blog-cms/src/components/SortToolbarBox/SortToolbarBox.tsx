import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import { ArrowDownIco } from "../Ico/ArrowDownIco";
import "./style.css";

const css = {
  sortToolbarBox: "sortToolbarBox",
  toolbar: "toolbar",
  active: "active",
  box: "box",
  down: "down",
  up: "up",
};

interface ISortToolbarBox {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  children: React.ReactNode;
}

export const SortToolbarBox = ({
  isActive,
  children,
  setIsActive,
}: ISortToolbarBox) => {
  const [isDown, setIsDown] = useState(true);

  const onClickHandler = () => {
    if (!isActive) {
      setIsActive(true);
    } else if (isActive && isDown) {
      setIsDown((s) => !s);
    } else {
      setIsActive(false);
      setIsDown((s) => !s);
    }
  };

  useEffect(() => {
    if (!isActive) {
      setIsDown(true);
    }
  }, [isActive]);

  return (
    <div
      className={`${BEM(css.sortToolbarBox, css.toolbar)} ${
        isActive && BEM(css.sortToolbarBox, css.toolbar, css.active)
      }`}>
      <div
        className={BEM(css.sortToolbarBox, css.box)}
        onClick={() => onClickHandler()}
        onDoubleClick={() => setIsActive(false)}>
        {children}
        <ArrowDownIco
          className={
            isDown
              ? BEM(css.sortToolbarBox, css.box, css.down)
              : BEM(css.sortToolbarBox, css.box, css.up)
          }
        />
      </div>
    </div>
  );
};
