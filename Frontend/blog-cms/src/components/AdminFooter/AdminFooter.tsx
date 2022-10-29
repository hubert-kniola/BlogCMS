import React from "react";
import "./AdminFooter.css";

interface AdminFooterProps {
  items: any;
}

export const AdminFooter = ({ items }: AdminFooterProps) => {
  const cssClasses = {
    /* footer class */
    footer: "footer",
  };

  return (
    <div className={cssClasses.footer}>
      {items.map((e: any) => (
        <p>{e}</p>
      ))}
    </div>
  );
};

export default AdminFooter;
