import React, { useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import Select, { GroupBase } from "react-select";
import FileUploader from "../FileUploader/FileUploader";
import { Post } from "../../types";
import { lorem, url1, url2 } from "../BestThree/BestThree";
import SaveButton from "../SaveButton/SaveButton";

const posts: Post[] = [
  { title: "Post 1", date: "25/10/2022", content: lorem, imgUrl: url1 },
  { title: "Post 2", date: "26/10/2022", content: lorem, imgUrl: url2 },
  { title: "Post 3", date: "27/10/2022", content: lorem, imgUrl: url1 },
  { title: "Post 4", date: "28/10/2022", content: lorem, imgUrl: url2 },
  { title: "Post 5", date: "29/10/2022", content: lorem, imgUrl: url1 },
  { title: "Post 6", date: "29/10/2022", content: lorem, imgUrl: url1 },
  { title: "Post 7", date: "29/10/2022", content: lorem, imgUrl: url1 },
];

const Configure = () => {
  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };
  const positionOptions: any = [
    { value: "top-left", label: "Górny lewy" },
    { value: "top-center", label: "Górny centrum" },
    { value: "top-right", label: "Górny prawy" },
    { value: "center-left", label: "Środkowy lewy" },
    { value: "center-center", label: "Środkowy centrum" },
    { value: "center-right", label: "Środkowy prawy" },
    { value: "bottom-left", label: "Dolny lewy" },
    { value: "bottom-center", label: "Dolny centrum" },
    { value: "bottom-right", label: "Dolny prawy" },
  ];

  const [titleSlider, setTitleSlider] = useState(null);
  const [avaiblePosts, setAvaiblePosts] = useState(posts);
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const [textPosition, setTextPosition] = useState(null);

  const handleTitleSlider = (e: any) => {
    setTitleSlider(e);
  };

  const handleTextPosition = (e: any) => {
    setTextPosition(e);
  };

  const mapPostsToOptions = (posts: Post[]): any => {
    const options = posts.map((element) => {
      return {
        value: element,
        label: `${element.title}-${element.date}`,
      };
    });
    return options;
  };

  const handlePostSelection = (e: any) => {
    const restPosts = avaiblePosts.filter(
      (elem) => elem.title !== e.label.split("-")[0]
    );
    setAvaiblePosts(restPosts);
    setSelectedPosts([...selectedPosts, e]);
  };

  const saveSlider = () => {};

  const saveTop3 = () => {};

  const saveFooter = () => {};

  return (
    <div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Karuzela zdjęć
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca zmieniające się zdjęcia wraz z wprowadzonym
          tekstem
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <p>Tytuł:</p>
          <input className={BEM(cssClasses.title, cssClasses.title)} type="text"></input>
          <p>Treść:</p>
          <textarea
            className={BEM(cssClasses.title, cssClasses.textarea)}
            value={titleSlider}
            onChange={handleTitleSlider}
          />
          {/* <p>Pozycja tekstu:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: state.menuIsOpen && "1px solid #00eadc",
                width: "15rem",
              }),
            }}
            defaultValue={"Brak"}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={positionOptions}
            onChange={handleTextPosition}
          /> */}
          <p>Zdjęcie:</p>
          <FileUploader />
        </div>
        <SaveButton handleSave={saveSlider} />
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Trzy najpopularniejsze posty
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca 3 wybrane posty
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <p>Post 1:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: state.menuIsOpen && "1px solid #00eadc",
                width: "15rem",
              }),
            }}
            defaultValue={"Brak"}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={handlePostSelection}
          />
          <p>Post 2:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: state.menuIsOpen && "1px solid #00eadc",
                width: "15rem",
              }),
            }}
            defaultValue={"Brak"}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={handlePostSelection}
          />
          <p>Post 3:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: state.menuIsOpen && "1px solid #00eadc",
                width: "15rem",
              }),
            }}
            defaultValue={"Brak"}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={handlePostSelection}
          />
        </div>
        <SaveButton handleSave={saveTop3} />
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Najnowsze posty
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca zbiór najnowszych postów
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <h3
            className={BEM(
              cssClasses.configure,
              cssClasses.container,
              cssClasses.title
            )}
          >
            Posty zostaną dobrane automatycznie według daty dodania
          </h3>
        </div>
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Stopka
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca stopkę strony
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <p>Tekst 1:</p>
          <input className={BEM(cssClasses.title, cssClasses.title)} type="text" />
          <p>Tekst 2:</p>
          <input className={BEM(cssClasses.title, cssClasses.title)} type="text" />
          <p>Tekst 3:</p>
          <input className={BEM(cssClasses.title, cssClasses.title)} type="text" />
        </div>
        <SaveButton handleSave={saveFooter} />
      </div>
    </div>
  );
};

export default Configure;
