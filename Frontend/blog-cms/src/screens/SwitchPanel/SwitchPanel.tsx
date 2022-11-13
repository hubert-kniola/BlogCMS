import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import Login from "../Login/Login";
import AdminPanel from "../AdminPanel/AdminPanel";

const SwitchPanel = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  return !Object.values(user).every((x) => x === null || x === "") ? (
    <AdminPanel />
  ) : (
    <Login />
  );
};

export default SwitchPanel;
