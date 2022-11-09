import React from "react";
import "./style.css";
import GitHubIcon from "@mui/icons-material/GitHub";
interface AdminFooterProps {
  items: any[];
}

export const AdminFooter = ({ items }: AdminFooterProps) => {
  const cssClasses = {
    /* footer class */
    footer: "footer",
  };

  return (
    <div className={cssClasses.footer}>
      {items.map((e: any, i: number) => (
        <div>
          <a href={e.link} target="_blank" key={i}>
            <GitHubIcon sx={{ color: "#a8a8a8" }} fontSize="large" />
          </a>
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
};
