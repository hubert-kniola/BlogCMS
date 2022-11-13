import React, { useEffect, useRef, useState } from "react"
import "./style.css"

const photos = [
    {url: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o='},
    {url: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o='},
    {url: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o='},
    {url: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/200332548.jpg?k=34ecaa0d7c1ee3359f83e4b60178f64ef9824eeed435a1d195d815ab8ebdf0a2&o='},
]



export const Slider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const array = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const resetTimeout = () => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === array.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    array[index].current.checked = true;

    return () => {
      resetTimeout();
    };
  }, [index])


    return (
        <>
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" ref={array[0]} checked={true}/>
          <input type="radio" name="radio-btn" id="radio2" ref={array[1]}/>
          <input type="radio" name="radio-btn" id="radio3" ref={array[2]}/>
          <input type="radio" name="radio-btn" id="radio4" ref={array[3]}/>

          {photos.map((p, i) => {
              return (
              <div
              className={`slide ${i == 0 && "first"}`}
                style={{ backgroundImage: `url(${p.url})` }}
                />
                );
            })}
          
          <div className="navigation-auto" >
            <div className="auto-btn1" ></div>
            <div className="auto-btn2" ></div>
            <div className="auto-btn3" ></div>
            <div className="auto-btn4" ></div>
          </div>

        </div>
        <div className="navigation-manual">
            <label htmlFor="radio1" className="manual-btn"></label>
            <label htmlFor="radio2" className="manual-btn"></label>
            <label htmlFor="radio3" className="manual-btn" onClick={() => setIndex(2)}></label>
            <label htmlFor="radio4" className="manual-btn"></label>
          </div>
      </div>
     </>
    );
}