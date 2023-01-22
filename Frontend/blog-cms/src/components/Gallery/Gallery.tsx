import React, { useState } from "react";
import { BlobStorageURL } from "../../settings";
import { BEM } from "../../tools";
import { ArrowLeftCircleIco, ArrowRigthCicleIco } from "../Ico";
import "./style.css";

const img =
  "https://pix10.agoda.net/hotelImages/951189/-1/a3ab86fcd2d8942c27e40e8fc5601663.jpg?ca=9&ce=1&s=1024x768";
const img1 =
  "https://c8.alamy.com/comp/HNPYX1/vertical-view-of-an-old-town-in-europe-in-beautiful-golden-evening-HNPYX1.jpg";
const imgssss = [
  img,
  img,
  img,
  img1,
  img,
  img1,
  img,
  img1,
  img,
  img1,
  img,
  img1,
  img,
  img1,
];

const css = {
  gallery: "galleryView",
  container: "container",
  image: "image",
  active: "active",
  left: "left",
  right: "right",
  grid: "grid",
};

interface IGalery {
  images: string[];
}

export const Gallery = ({ images }: IGalery) => {
  const [active, setActive] = useState(0);

  const next = () => {
    if (active < images.length - 1) {
      setActive((a) => a + 1);
    } else {
      setActive(0);
    }
  };

  const previous = () => {
    if (active > 0) {
      setActive((a) => a - 1);
    } else {
      setActive(images.length - 1);
    }
  };

  return (
    <div className={BEM(css.gallery, css.container)}>
      <div className={BEM(css.gallery, css.image)}>
        <div className={BEM(css.gallery, css.active)}>
          <img src={`${BlobStorageURL}${images[active]}`} />
          <div
            className={BEM(css.gallery, css.image, css.left)}
            onClick={() => previous()}>
            <ArrowLeftCircleIco />
          </div>
          <div
            className={BEM(css.gallery, css.image, css.right)}
            onClick={() => next()}>
            <ArrowRigthCicleIco />
          </div>
        </div>
      </div>
      <div className={BEM(css.gallery, css.grid)}>
        {images.map((item, idx) => {
          return (
            <div key={idx}>
              <img
                src={`${BlobStorageURL}${item}`}
                onClick={() => setActive(idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
