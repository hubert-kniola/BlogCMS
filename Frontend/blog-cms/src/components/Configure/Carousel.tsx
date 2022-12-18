import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import CarouselTable from "../Tables/CarouselTable";
import "./style.css";

const CarouselConfigure = () => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(
    (state: RootState) => state.configure.carousel
  );
  const { register, setValue, handleSubmit } = useForm();
  const cssClasses = {
    configure: "configure",
    carousel: "carousel",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  return (
    <div className={BEM(cssClasses.carousel, cssClasses.container)}>
      <h3
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.title
        )}
      >
        Karuzela zdjęć
      </h3>
      <p
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.description
        )}
      >
        Sekcja wyświetlająca zmieniające się zdjęcia wraz z wprowadzonym tekstem
      </p>
      <CarouselTable />
    </div>
  );
};

export default CarouselConfigure;
