import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  fetchAboutImageByData,
  updateAbout,
} from "../../../store/slices/aboutSlice";
import {
  addCategory,
  CategoryState,
  updateId,
} from "../../../store/slices/categorySlice";
import {
  addCarousel,
  addFaq,
  fetchCarouselImagesByData,
  updateFooter,
  updateNewest,
  updateTop3,
} from "../../../store/slices/configureSlice";
import { addContactForm, updateContact } from "../../../store/slices/contactSlice";
import { addPost } from "../../../store/slices/postSlice";
import {
  GET_ABOUT,
  GET_CAROUSEL,
  GET_CATEGORY_OBJECT,
  GET_CONTACT_FORMS,
  GET_CONTACT_INFO,
  GET_FAQ,
  GET_FOOTER_CONTENT,
  GET_LAST_POST_TITLE_CONTENT,
  GET_POSTS,
  GET_TOP3,
} from "../../apollo/apolloQueries";
import Spinner from "../../components/Spinner/Spinner";
import { BlobStorageURL } from "../../settings";
import { Carousel, ContentInput, FAQ, Post } from "../../types";
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
  const [top3Loaded, setTop3Loaded] = useState<boolean>(false);
  const [lastPostLoaded, setLastPostLoaded] = useState<boolean>(false);
  const [footerLoaded, setFooterLoaded] = useState<boolean>(false);
  const [contactFormLoaded, setContactFormLoaded] = useState<boolean>(false);
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
    data: contactFormData,
    loading: contactFormLoading,
    error: contactFormError,
  } = useQuery(GET_CONTACT_FORMS);
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
  const {
    data: top3Data,
    loading: top3Loading,
    error: top3Error,
  } = useQuery(GET_TOP3);
  const {
    data: lastPostData,
    loading: lastPostLoading,
    error: lastPostError,
  } = useQuery(GET_LAST_POST_TITLE_CONTENT);
  const {
    data: footerData,
    loading: footerLoading,
    error: footerError,
  } = useQuery(GET_FOOTER_CONTENT);

  /**================== ABOUT LOADING SECTION ==================*/
  if (aboutData && !aboutLoading && !aboutError && !aboutLoaded) {
    let aboutArray = Object.values(aboutData)[0];
    let aboutValue = _.cloneDeep(Object.values(aboutArray)[0]);
    if (aboutValue.imgName) {
      aboutValue.file = `${BlobStorageURL}${aboutValue.imgName}`;
    }
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

   /**================== CONTACT FORM LOADING SECTION ==================*/
   if (contactFormData && !contactFormLoading && !contactFormError && !contactFormLoaded) {
    let contactFormValue: any = Object.values(contactFormData)[0];
    dispatch(addContactForm(contactFormValue));
    setContactFormLoaded(true);
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
    let newCarouselValue: Carousel[] = carouselValue.map(
      (element: Carousel): Carousel => {
        return { file: null, ...element };
      }
    );
    if (newCarouselValue) {
      newCarouselValue.forEach((element: Carousel) => {
        if (element.imgName) {
          const index = newCarouselValue.findIndex(
            (index: Carousel) => index.id === element.id
          );
          newCarouselValue[index].file = `${BlobStorageURL}${element.imgName}`;
        }
      });
    }
    newCarouselValue.map((element: Carousel) => dispatch(addCarousel(element)));
    setCarouselLoaded(true);
  }

  /**================== CATEGORY LOADING SECTION ==================*/
  if (categoryData && !categoryLoading && !categoryError && !categoryLoaded) {
    let categoryValue: any = Object.values(categoryData)[0];
    categoryValue[0].subCategory.map((element: CategoryState) =>
      dispatch(addCategory(element))
    );
    dispatch(updateId({ id: categoryValue[0].id }));
    setCategoryLoaded(true);
  }

  /**================== POST LOADING SECTION ==================*/
  if (postData && !postLoading && !postError && !postLoaded) {
    let postValue: any = Object.values(postData)[0];
    let newPostValue: Post[] = postValue.map((element: Post): Post => {
      return { primaryFile: null, contentFile: null, ...element };
    });
    if (newPostValue) {
      newPostValue.forEach((element: Post) => {
        const index = newPostValue.findIndex(
          (index: Post) => index.id === element.id
        );
        if (element.primaryImgName) {
          newPostValue[
            index
          ].primaryFile = `${BlobStorageURL}${element.primaryImgName}`;
        }
        if (element.contentImgName) {
          newPostValue[index].contentFile = [];
          element.contentImgName.map((element: string) => {
            newPostValue[index].contentFile.push(
              `${BlobStorageURL}${element}`
            );
          });
        }
      });
    }
    newPostValue.map((element: Post) => dispatch(addPost(element)));
    setPostLoaded(true);
  }

  /**================== TOP3 LOADING SECTION ==================*/
  if (top3Data && !top3Loading && !top3Error && !top3Loaded) {
    let top3Value: any = Object.values(top3Data)[0];
    dispatch(updateTop3(top3Value));
    setTop3Loaded(true);
  }

  /**================== LAST POST LOADING SECTION ==================*/
  if (lastPostData && !lastPostLoading && !lastPostError && !lastPostLoaded) {
    let lastPostValue: any = Object.values(lastPostData)[0];
    dispatch(updateNewest(lastPostValue));
    setLastPostLoaded(true);
  }

  /**================== FOOTER LOADING SECTION ==================*/
  if (footerData && !footerLoading && !footerError && !footerLoaded) {
    let footerValue: any = Object.values(footerData)[0];
    dispatch(updateFooter(footerValue));
    setFooterLoaded(true);
  }

  if (
    aboutLoaded &&
    contactLoaded &&
    faqLoaded &&
    carouselLoaded &&
    categoryLoaded &&
    postLoaded &&
    top3Loaded &&
    lastPostLoaded &&
    footerLoaded &&
    contactFormLoaded
  ) {
    handleLoading(false);
  }

  return <Spinner />;
};

//TODO: Refetching data

export default LoadingDataPanel;
