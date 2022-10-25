import React from "react";
import "./AdminPanel.scss";

const AdminPanel = () => {
  return (
    <div className="panel">
      <div className="header">
        Admin Panel
        <div className="profil">Profil</div>
        <div className="menu">Menu</div>
      </div>
      <div className="content">
        Content
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
};

export default AdminPanel;
