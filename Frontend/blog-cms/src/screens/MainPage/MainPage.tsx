import React from "react";
import { Acordeon, BestThree, Footer, List, Pomodoro, Slider } from "../../components";
import { SlideType, TextPosition } from "../../types";


 const slides : SlideType[] = [
  // {photoUrl: 'https://csb100320023183c079.blob.core.windows.net/cmspicture/a3ab86fcd2d8942c27e40e8fc5601663.jpg', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.LeftTop },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.LeftTop},
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.Center },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.CenterBottom },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.RightTop },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.RightTop },
  {photoUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o=', title:'PROMOCJA!!!', content: "Test 1 2 3", textPosition: TextPosition.RightTop },
] 

export const MainPage = () => {
    return (
      <>
        <Slider slides={slides}/>
        <BestThree />
        <Pomodoro premiere={new Date(2022,10,27,20,5,0)}/>
        <List />
        <Acordeon/>
        <Footer/>
      </>
    );
}