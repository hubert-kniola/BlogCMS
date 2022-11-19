import React from "react";
import { AdminHeader, AdminFooter, AdminContent } from "../../components";
import { useAppDispatch } from "../../../store/hooks";
import Tile from "../../components/Tile/Tile";
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

  const Tiles: any = [{ text: "tile1" }, { text: "tile2" }, { text: "tile3" }];``
  const menuItems: any[] = [{ text: "LogOut", method: logoutUser }];
  const gitItems: any[] = [
    { text: "~ Mateusz", link: "https://github.com/mateuszkuzniak" },
    { text: "~ Hubert", link: "https://github.com/hubert-kniola" },
  ];

  return (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent tiles={Tiles} />
      <AdminFooter items={gitItems} />
    </div>
  );
};

export default AdminPanel;
