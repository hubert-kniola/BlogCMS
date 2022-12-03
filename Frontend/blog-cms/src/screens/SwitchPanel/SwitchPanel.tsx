import React from "react";
import { AdminPanel, Login } from "..";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const SwitchPanel = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  return !Object.values(user).every((x) => x === null || x === "") ? (
    <AdminPanel />
  ) : (
    <Login />
  );
};