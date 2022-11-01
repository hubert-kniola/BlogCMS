import React from "react";
import { BestThree, Footer, List } from "../../components";
import { MainPageMenu } from "../../components/Menu/MainPageMenu/MainPageMenu";


const MainPage = () => {
    return (
      <>
        <MainPageMenu/>
        <List />
        <BestThree />
        <Footer/>
      </>
    );
}

export default MainPage;