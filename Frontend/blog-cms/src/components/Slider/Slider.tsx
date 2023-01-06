import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_ACTIVE_CAROUSEL } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { Carousel } from "../../types";
import Spinner from "../Spinner/Spinner";
import { css } from "./css";
import { Slide } from "./Slide";
import { SliderNavigation } from "./SliderNavigation";
import "./style.css";

export const Slider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const { loading, error, data } = useQuery(GET_ACTIVE_CAROUSEL);
  const [carousel, setCarousel] = useState(undefined as Carousel[]);

  const getCarouselData = (data: any): Carousel[] => {
    return data?.activeCarousels;
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (carousel) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
          ),
        5000
      );
      return () => {
        resetTimeout();
      };
    }
  }, [index, carousel]);

  useEffect(() => {
    if (!loading) {
      setCarousel(getCarouselData(data));
    }
  }, [loading]);

  return (
    <>
      {loading && carousel === undefined ? (
        <Spinner />
      ) : (
        <>
          <div className={BEM(css.slider, css.container)}>
            <div className={BEM(css.slider, css.view)}>
              <div
                className={BEM(css.slider, css.row)}
                style={
                  carousel && {
                    width: `${100 * carousel.length}%`,
                    transform: `translate3d(${
                      (-index * 100) / carousel.length
                    }%, 0, 0)`,
                  }
                }>
                {carousel &&
                  carousel.map((item, idx) => {
                    return (
                      <Slide
                        key={idx}
                        slidesLenght={carousel.length}
                        active={index === idx}
                        idx={idx}
                        slide={item}
                        onClickHandler={() => setIndex(idx)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <SliderNavigation
            onClickHandler={(idx: number) => setIndex(idx)}
            activeIdx={index}
            slides={carousel}
          />
        </>
      )}
    </>
  );
};
