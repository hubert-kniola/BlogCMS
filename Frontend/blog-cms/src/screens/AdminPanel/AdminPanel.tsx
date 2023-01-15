import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { initialState, updateUser } from "../../../store/slices/userSlice";
import { AdminContent, AdminFooter, AdminHeader } from "../../components";
import LoadingDataPanel from "./LoadingDataPanel";
import "./style.css";

export const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const cssClasses = {
    /* panel class */
    panel: "panel",
  };

  const logoutUser = () => {
    dispatch(updateUser(initialState));
  };

  const menuItems: any[] = [{ text: "Wyloguj", method: logoutUser }];
  const gitItems: any[] = [
    { text: "~ Mateusz", link: "https://github.com/mateuszkuzniak" },
    { text: "~ Hubert", link: "https://github.com/hubert-kniola" },
  ];

  return loading ? (
    <LoadingDataPanel handleLoading={(value: boolean) => setLoading(value)} />
  ) : (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent />
      <AdminFooter items={gitItems} />
    </div>
  );
};
