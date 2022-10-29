import React from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminFooter from "../../components/AdminFooter/AdminFooter";
import AdminContent from "../../components/AdminContent/AdminContent";
import Tile from "../../components/Tile/Tile";
import "./AdminPanel.css";

const AdminPanel = () => {
  const cssClasses = {
    /* panel class */
    panel: "panel",
  };

  const Tiles: any = [{ text: "tile1" }, { text: "tile2" }, { text: "tile3" }];
  const menuItems: string[] = ["LogOut"];
  const footerItems: string[] = ["GitHub", "Created by Mateusz Kuźniak & Hubert Knioła"]

  return (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent tiles={Tiles} />
      <AdminFooter items={footerItems}/>
    </div>
  );
};

export default AdminPanel;
