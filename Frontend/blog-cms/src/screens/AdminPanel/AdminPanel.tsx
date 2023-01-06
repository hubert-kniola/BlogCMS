import React, { useState } from "react";
import { AdminHeader, AdminFooter, AdminContent } from "../../components";
import { useAppDispatch } from "../../../store/hooks";
import "./style.css";
import { updateUser, initialState } from "../../../store/slices/userSlice";
import Spinner from "../../components/Spinner/Spinner";
import { loader } from "../../apollo/apolloLoader";
import { useStateManager } from "react-select";
import { updateAbout } from "../../../store/slices/aboutSlice";
import { addCarousel } from "../../../store/slices/configureSlice";
import { updateContact } from "../../../store/slices/contactSlice";
import { addFaq } from "../../../store/slices/configureSlice";
import { updateFooter } from "../../../store/slices/configureSlice";
import { addPost } from "../../../store/slices/postSlice";
import { updateTop3 } from "../../../store/slices/configureSlice";
import { addCategory } from "../../../store/slices/categorySlice";
import gql from "graphql-tag";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
  GET_ABOUT,
  GET_CONTACT,
  GET_CAROUSEL,
  GET_CATEGORY,
  GET_TOP3,
  GET_FAQ,
  GET_FOOTER,
  GET_POSTS,
} from "../../apollo/apolloQueries";
import { GetImageFromAzure } from "../../tools";

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

  if(aboutData && !aboutLoading && !aboutError && !aboutLoaded) {
    let aboutValue = Object.values(aboutData)[0];
    dispatch(updateAbout(Object.values(aboutValue)[0]));
    if(Object.values(aboutValue)[0].imgName)
    {
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
