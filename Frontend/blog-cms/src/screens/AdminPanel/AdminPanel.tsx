import React from "react";
import { AdminHeader, AdminFooter, AdminContent } from "../../components";
import { useAppDispatch } from "../../../store/hooks";
import Tile from "../../components/Tile/Tiles";
import "./style.css";
import { updateUser, initialState } from "../../../store/slices/userSlice";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
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

  return (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent/>
      <AdminFooter items={gitItems} />
    </div>
  );
};

export default AdminPanel;
