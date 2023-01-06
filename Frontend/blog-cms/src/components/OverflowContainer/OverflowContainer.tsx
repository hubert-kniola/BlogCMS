import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const css = {
  overflowContainer: "overflowContainer",
  header: "header",
};

interface IOverflowContainer {
  children: React.ReactNode;
  className?: string;
  header: string;
}

export const OverflowContainer = ({
  header,
  className = "max-h-[220px]",
  children,
}: IOverflowContainer) => {
  return (
    <>
      <p className={BEM(css.overflowContainer, css.header)}>{header}</p>
      <div className={`${BEM(css.overflowContainer)} ${className}`}>
        {children}
      </div>
    </>
  );
};
