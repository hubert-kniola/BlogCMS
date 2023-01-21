import React from "react";
import { BlobStorageURL, EmptyIcoName } from "../../settings";
import "./style.css";

export const Empty = () => {
  return (
    <div className="empty_container">
      <a href="/">
        <img src={`${BlobStorageURL}${EmptyIcoName}`} className="empty" />
        <div>
          Wygląda na to, że lista jest pusta <br />
          Kliknij aby wrócić do strony głównej
        </div>
      </a>
    </div>
  );
};
