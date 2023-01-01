import { updateAbout } from "../../store/slices/aboutSlice";
import { addCarousel } from "../../store/slices/configureSlice";
import { updateContact } from "../../store/slices/contactSlice";
import { addFaq } from "../../store/slices/configureSlice";
import { updateFooter } from "../../store/slices/configureSlice";
import { addPost } from "../../store/slices/postSlice";
import { updateTop3 } from "../../store/slices/configureSlice";
import { addCategory } from "../../store/slices/categorySlice";
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
} from "./apolloQueries";
import { useAppDispatch } from "../../store/hooks";

export const loader = (): boolean => {
  const dispatch = useAppDispatch();
  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
  } = useQuery(GET_ABOUT);
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_POSTS);
  const {
    data: contactData,
    loading: contactLoading,
    error: contactError,
  } = useQuery(GET_CONTACT);
  const {
    data: carouselData,
    loading: carouselLoading,
    error: carouselError,
  } = useQuery(GET_CAROUSEL);
  const {
    data: top3Data,
    loading: top3Loading,
    error: top3Error,
  } = useQuery(GET_TOP3);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORY);
  const {
    data: faqData,
    loading: faqLoading,
    error: faqError,
  } = useQuery(GET_FAQ);
  const {
    data: footerData,
    loading: footerLoading,
    error: footerError,
  } = useQuery(GET_FOOTER);

  //   if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (
    aboutLoading ||
    faqLoading ||
    footerLoading ||
    categoryLoading ||
    top3Loading ||
    carouselLoading ||
    contactLoading ||
    postsLoading
  )
    return true;

  if (
    aboutError ||
    faqError ||
    footerError ||
    categoryError ||
    top3Error ||
    carouselError ||
    contactError ||
    postsError
  )
    return true;

  if (
    aboutData &&
    faqData &&
    footerData &&
    categoryData &&
    top3Data &&
    carouselData &&
    contactData &&
    postsData
  ) {
    dispatch(updateAbout());
    dispatch(addFaq());
    //dispatch(updateFooter());
    dispatch(addCategory());
    //dispatch(updateTop3());
    dispatch(addCarousel());
    dispatch(updateContact());
    dispatch(updateContact());
    return false;
  }

};
