import React from "react";
import {
  Acordeon,
  BestThree,
  Footer,
  List,
  Pomodoro,
  Slider,
} from "../../components";

export const MainPage = () => {
  return (
    <>
      <Slider />
      <BestThree />
      <Pomodoro premiere={new Date(2022, 10, 27, 20, 5, 0)} />
      <List />
      <Acordeon />
      <Footer />
    </>
  );
};
