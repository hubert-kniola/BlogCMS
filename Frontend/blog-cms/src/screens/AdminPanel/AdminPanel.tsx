import React from "react";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const cssClasses = {
    /* panel class */
    panel: "panel",
    /* header class */
    header: "header",
    /* profil class */
    profil: "profil",
    /* menu class */
    menu: "adminMenu",
    /* content class */
    content: "content",
    /* footer class */
    footer: "footer",
  };

  return (
    <div className={cssClasses.panel}>
      <div className={cssClasses.header}>
        Admin Panel
        <div className={cssClasses.profil}>Profil</div>
        <div className={cssClasses.menu}>Menu</div>
      </div>
      <div className={cssClasses.content}>Content</div>
      <div className={cssClasses.footer}>Footer</div>
    </div>
  );
};

export default AdminPanel;
