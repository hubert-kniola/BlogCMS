import React from "react";
import { BestThree, Footer, List, MainPageMenu } from "../../components";


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