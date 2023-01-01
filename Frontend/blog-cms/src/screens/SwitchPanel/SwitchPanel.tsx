import React, { useEffect, useState } from "react";
import { AdminPanel, Login } from "..";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import Spinner from "../../components/Spinner/Spinner";
import { loader } from "../../apollo/apolloLoader";
import { useStateManager } from "react-select";

export const SwitchPanel = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loginFetch = () => {
      if (!Object.values(user).every((x) => x === null || x === "")) {
        setTimeout(() => setLoading(false), 15000);
      }
    };

    loginFetch();
  }, [user]);

  return Object.values(user).every((x) => x === null || x === "") ? (
    !loading ? (
      <Spinner />
    ) : (
      <AdminPanel />
    )
  ) : (
    <Login />
  );
};
