import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import "./style.css";
import { useStateManager } from "react-select";
import { updateAbout } from "../../../store/slices/aboutSlice";
import { initialState, updateUser } from "../../../store/slices/userSlice";
import { GET_ABOUT } from "../../apollo/apolloQueries";
import { AdminContent, AdminFooter, AdminHeader } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { GetImageFromAzure } from "../../tools";
import "./style.css";

export const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [aboutLoaded, setAboutLoaded] = useState<boolean>(false);
  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
  } = useQuery(GET_ABOUT);

  const cssClasses = {
    /* panel class */
    panel: "panel",
  };

  /**================== ABOUT LOADING SECTION ==================*/
  if (aboutData && !aboutLoading && !aboutError && !aboutLoaded) {
    let aboutValue = Object.values(aboutData)[0];
    dispatch(updateAbout(Object.values(aboutValue)[0]));
    if (Object.values(aboutValue)[0].imgName) {
      console.log(Object.values(aboutValue)[0].imgName);
      const fileURL = GetImageFromAzure(Object.values(aboutValue)[0].imgName);
    }
    setLoading(false);
    setAboutLoaded(true);
  }

  const logoutUser = () => {
    dispatch(updateUser(initialState));
  };

  const menuItems: any[] = [{ text: "Wyloguj", method: logoutUser }];
  const gitItems: any[] = [
    { text: "~ Mateusz", link: "https://github.com/mateuszkuzniak" },
    { text: "~ Hubert", link: "https://github.com/hubert-kniola" },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <div className={cssClasses.panel}>
      <AdminHeader menuItems={menuItems} />
      <AdminContent />
      <AdminFooter items={gitItems} />
    </div>
  );
};
