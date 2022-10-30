import React from "react";
import {AdminHeader, AdminFooter, AdminContent} from "../../components";
import Tile from "../../components/Tile/Tile";
import "./style.css";

const AdminPanel = () => {
  const cssClasses = {
    /* panel class */
    panel: "panel",
  };

  const Tiles: any = [{ text: "tile1" }, { text: "tile2" }, { text: "tile3" }];
  const menuItems: string[] = ["LogOut"];
  const gitItems: any[] = [ {text: "~ Mateusz", link: "https://github.com/mateuszkuzniak"},{text: "~ Hubert", link: "https://github.com/hubert-kniola"}]

  return (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent tiles={Tiles} />
      <AdminFooter items={gitItems}/>
    </div>
  );
};

export default AdminPanel;
