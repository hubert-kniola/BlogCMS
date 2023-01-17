import LoadingOverlay from "react-loading-overlay-ts";
import { FC, ReactNode, useCallback, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { mainColor } from "../../types/consts";

import React from "react";

type LoadingOverlayPanelProps = {
  active: boolean;
  text: string;
  color?: string;
  children: ReactNode;
};

const LoaderOverlay: FC<LoadingOverlayPanelProps> = ({
  active,
  text,
  children,
  color,
}) => {
  return (
    <LoadingOverlay
      active={active}
      spinner={
        <CircularProgress
          sx={{
            color: color ? color : mainColor,
          }}
        />
      }
      text={text}
    >
      {children}
    </LoadingOverlay>
  );
};

export default LoaderOverlay;
