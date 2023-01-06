import React, { useEffect, useState } from "react";
import { AdminPanel, Login } from "..";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const SwitchPanel = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return !Object.values(user).every((x) => x === null || x === "") ? (
    <AdminPanel />
  ) : (
    <Login />
  );
};
