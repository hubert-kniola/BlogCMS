import React, { useEffect, useRef, useState } from "react"
import { BEM, GetTextPositionStyle } from "../../tools"
import { SlideType } from "../../types"
import "./style.css"

const css = {
  slider: "slider",
  allSlides: "allSlides",
  slide: "slide",
  container: "container",
  content: "content",
  navigation: "navigation",
  dot:"dot",
  title: "title",
  modifiers: {
    active: "active"
  }
}

interface ISlider  {
  slides : SlideType[]
}

export const Slider = ({slides} : ISlider) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);


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
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [index])

    return (
      <>
        <div className="slider_container">
          <div className="view">
            <div
              className="slider_row"
              style={{ transform: `translate3d(${(-index * 100) / slides.length}%, 0, 0)` }}
            >
              {

              }
              {
                slides.map((item, idx) => {
                  return (
                    <div className="slider_slide" key={idx}>
                      <div
                        className={
                          idx === index ? "slide_box--active" : `slide_box`
                        }
                        style={{
                          backgroundImage: `url(${item.photoUrl})`,
                        }}
                      ></div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className={BEM(css.slider,css.navigation)}>
            {slides.map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={`${BEM(css.slider, css.navigation, css.dot)} ${
                    idx === index
                      ? BEM(css.slider, css.navigation, css.modifiers.active)
                      : ""
                  }`}
                  onClick={() => setIndex(idx)}
                />
              );
            })}
          </div>
        {/* <div className={BEM(css.slider, css.container)}>
          <div className={BEM(css.slider,css.allSlides)} style={{width: `${slides.length*100}%`}}>
            {slides.map((oneSlide, idx) => {
              return (
                <>
                  <div
                    key={idx}
                    className={BEM(css.slider, css.slide)}
                    style={{
                      backgroundImage: `url(${oneSlide.photoUrl})`,
                      transform: `translate3d(${-index * 100}%, 0, 0)`,
                      width: `${100 / slides.length}%`,
                    }}
                  >
                    <div className={BEM(css.slide,css.content)} style={GetTextPositionStyle(oneSlide.textPosition)} >
                        <p
                        className={BEM(css.slide,css.content, css.title)}
                        >
                          {oneSlide.title}
                          {oneSlide.content && (
                            <p
                            className={BEM(css.slide,css.content, css.content)}
                            >
                              {oneSlide.content}
                            </p>
                          )}
                        </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className={BEM(css.slider,css.navigation)}>
            {slides.map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={`${BEM(css.slider, css.navigation, css.dot)} ${
                    idx === index
                      ? BEM(css.slider, css.navigation, css.modifiers.active)
                      : ""
                  }`}
                  onClick={() => setIndex(idx)}
                />
              );
            })}
          </div>
        </div> */}
      </>
    );
}