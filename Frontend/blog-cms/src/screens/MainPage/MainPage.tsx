import React from "react";
import { BestThree, Footer, List, Slider } from "../../components";
import { MainPageMenu } from "../../components/Menu/MainPageMenu/MainPageMenu";


const MainPage = () => {
    return (
      <>
        <MainPageMenu/>
        <Slider/>
        <List />
        <BestThree />
        <Footer/>
      </>
    );
}

export default MainPage;