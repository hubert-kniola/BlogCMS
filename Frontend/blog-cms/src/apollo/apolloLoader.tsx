import { useQuery } from "@apollo/client";
import { useAppDispatch } from "../../store/hooks";
import { updateAbout } from "../../store/slices/aboutSlice";
import { addCategory } from "../../store/slices/categorySlice";
import { addCarousel, addFaq } from "../../store/slices/configureSlice";
import { updateContact } from "../../store/slices/contactSlice";
import {
  GET_ABOUT,
  GET_CAROUSEL,
  GET_CATEGORY,
  GET_CONTACT,
  GET_FAQ,
  GET_FOOTER,
  GET_POSTS,
  GET_TOP3,
} from "./apolloQueries";

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
