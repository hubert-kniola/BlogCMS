import React from "react";

interface IBackgroundDiv {
  url: string;
  height?: string;
  width?: string;
  margin?: string;
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundDiv = ({
  url,
  height,
  width,
  margin,
  className,
  children,
}: IBackgroundDiv) => {
  return (
    <div
      className={`bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${url})`,
        height: height,
        width: width,
        margin: margin,
      }}>
      {children && children}
    </div>
  );
};
