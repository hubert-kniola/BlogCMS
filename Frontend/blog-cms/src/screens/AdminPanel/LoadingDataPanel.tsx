import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { updateAbout } from "../../../store/slices/aboutSlice";
import {
  addCategory,
  CategoryState,
  updateId
} from "../../../store/slices/categorySlice";
import { addCarousel, addFaq } from "../../../store/slices/configureSlice";
import { updateContact } from "../../../store/slices/contactSlice";
import { addPost } from "../../../store/slices/postSlice";
import {
  GET_ABOUT,
  GET_CAROUSEL,
  GET_CATEGORY_OBJECT,
  GET_CONTACT_INFO,
  GET_FAQ,
  GET_POSTS
} from "../../apollo/apolloQueries";
import Spinner from "../../components/Spinner/Spinner";
import { Carousel, FAQ, Post } from "../../types";
import "./style.css";

interface LoadingDataPanelProps {
  handleLoading: (value: boolean) => void;
}

const LoadingDataPanel = ({ handleLoading }: LoadingDataPanelProps) => {
  const dispatch = useAppDispatch();
  const [aboutLoaded, setAboutLoaded] = useState<boolean>(false);
  const [contactLoaded, setContactLoaded] = useState<boolean>(false);
  const [faqLoaded, setFaqLoaded] = useState<boolean>(false);
  const [carouselLoaded, setCarouselLoaded] = useState<boolean>(false);
  const [categoryLoaded, setCategoryLoaded] = useState<boolean>(false);
  const [postLoaded, setPostLoaded] = useState<boolean>(false);
  const [aboutFile, setAboutFile] = useState<File>(null);
  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
  } = useQuery(GET_ABOUT);
  const {
    data: contactData,
    loading: contactLoading,
    error: contactError,
  } = useQuery(GET_CONTACT_INFO);
  const {
    data: faqData,
    loading: faqLoading,
    error: faqError,
  } = useQuery(GET_FAQ);
  const {
    data: carouselData,
    loading: carouselLoading,
    error: carouselError,
  } = useQuery(GET_CAROUSEL);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORY_OBJECT);
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POSTS);

  /**================== ABOUT LOADING SECTION ==================*/
  if (aboutData && !aboutLoading && !aboutError && !aboutLoaded) {
    let aboutArray = Object.values(aboutData)[0];
    let aboutValue = _.cloneDeep(Object.values(aboutArray)[0]);
    //const file = await Promise.resolve(GetImageFromAzure(aboutValue.imgName));
    //aboutValue.file = new File([file], aboutValue.imgName);
    //setAboutFile(new File([res.data], aboutValue.imgName));
    setAboutLoaded(true);
    dispatch(updateAbout(aboutValue));
  }

  /**================== CONTACT LOADING SECTION ==================*/
  if (contactData && !contactLoading && !contactError && !contactLoaded) {
    let contactValue: any = Object.values(contactData)[0];
    dispatch(
      updateContact({
        id: contactValue.id,
        title: contactValue.title,
        text: contactValue.content,
        fieldNameOne: contactValue.textBoxes[0].fieldName,
        contentOne: contactValue.textBoxes[0].content,
        fieldNameTwo: contactValue.textBoxes[1].fieldName,
        contentTwo: contactValue.textBoxes[1].content,
        fieldNameThree: contactValue.textBoxes[2].fieldName,
        contentThree: contactValue.textBoxes[2].content,
      })
    );
    setContactLoaded(true);
  }

  /**================== FAQ LOADING SECTION ==================*/
  if (faqData && !faqLoading && !faqError && !faqLoaded) {
    let faqValue: any = Object.values(faqData)[0];
    faqValue.map((element: FAQ) => dispatch(addFaq(element)));
    setFaqLoaded(true);
  }

  /**================== CAROUSEL LOADING SECTION ==================*/
  if (carouselData && !carouselLoading && !carouselError && !carouselLoaded) {
    let carouselValue: any = Object.values(carouselData)[0];
    carouselValue.map((element: Carousel) => dispatch(addCarousel(element)));
    setCarouselLoaded(true);
  }

  /**================== CATEGORY LOADING SECTION ==================*/
  if (categoryData && !categoryLoading && !categoryError && !categoryLoaded) {
    let categoryValue: any = Object.values(categoryData)[0];
    categoryValue[0].subCategory.map((element: CategoryState) =>
      dispatch(addCategory(element))
    );
    dispatch(updateId({id: categoryValue[0].id}));
    setCategoryLoaded(true);
  }

  /**================== POST LOADING SECTION ==================*/
  if (postData && !postLoading && !postError && !postLoaded) {
    let postValue: any = Object.values(postData)[0];
    postValue.map((element: Post) => dispatch(addPost(element)));
    setPostLoaded(true);
  }

  if (
    aboutLoaded &&
    contactLoaded &&
    faqLoaded &&
    carouselLoaded &&
    categoryLoaded &&
    postLoaded
  ) {
    handleLoading(false);
  }

  return <Spinner/>;
};

export default LoadingDataPanel;
