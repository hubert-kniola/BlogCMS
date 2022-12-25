import React from "react";
import { AdminPanel, Login } from "..";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import Login from "../Login/Login";
import AdminPanel from "../AdminPanel/AdminPanel";
import Spinner from "../../components/Spinner/Spinner";

const SwitchPanel = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return Object.values(user).every((x) => x === null || x === "") ? (
    <AdminPanel />
  ) : (
    <Login />
  );
};