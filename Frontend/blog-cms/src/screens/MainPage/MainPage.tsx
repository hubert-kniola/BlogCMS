import React from "react";
import { Acordeon, BestThree, Footer, List, Slider } from "../../components";
import { MainPageMenu } from "../../components/Menu/MainPageMenu/MainPageMenu";
import { SlideType, TextPosition } from "../../types";


const slides : SlideType[] = [
  {photoUrl: 'https://csb100320023183c079.blob.core.windows.net/cmspicture/a3ab86fcd2d8942c27e40e8fc5601663.jpg', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.LeftTop },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.CenterTop},
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.RightTop },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.Right },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.Center },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.Left },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.LeftBottom },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.CenterBottom },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.RightBottom },

] 

const MainPage = () => {
    return (
      <>
        <MainPageMenu/>
        <Slider slides={slides}/>
        <Acordeon/>
        <BestThree />
        <List />
        <Footer/>
      </>
    );
}

export default MainPage;