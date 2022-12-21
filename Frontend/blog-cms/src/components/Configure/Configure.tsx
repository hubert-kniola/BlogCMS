import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../../store/hooks";
import { BEM } from "../../tools";
import { mainColor } from "../../types/consts";
import Carousel from "./Carousel";
import Faq from "./Faq";
import Footer from "./Footer";
import "./style.css";
import Top3 from "./Top3";

interface IFormTop3Input {
  title: string;
  text: string;
  file?: any;
}

interface IFormFooterInput {
  footer: string[];
}

export const Configure = () => {
  const dispatch = useAppDispatch();
  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  const positionOptions: any = [
    { value: "top-left", label: "Górny lewy" },
    { value: "top-center", label: "Górny centrum" },
    { value: "top-right", label: "Górny prawy" },
    { value: "center-left", label: "Środkowy lewy" },
    { value: "center-center", label: "Środkowy centrum" },
    { value: "center-right", label: "Środkowy prawy" },
    { value: "bottom-left", label: "Dolny lewy" },
    { value: "bottom-center", label: "Dolny centrum" },
    { value: "bottom-right", label: "Dolny prawy" },
  ];

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });
  };

  return (
    <div>
      <Top3 onSubmit={notify} />
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Najnowsze posty
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca zbiór najnowszych postów
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <h3
            className={BEM(
              cssClasses.configure,
              cssClasses.container,
              cssClasses.title
            )}
          >
            Posty zostaną dobrane automatycznie według daty dodania
          </h3>
        </div>
      </div>
      <Footer onSubmit={notify} />
      <Carousel />
      <Faq />
      <ToastContainer toastStyle={{ backgroundColor: mainColor }}/>
    </div>
  );
};

