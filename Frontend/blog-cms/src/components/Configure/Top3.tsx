import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import Select, { GroupBase } from "react-select";
import FileUploader from "../FileUploader/FileUploader";
import { Post } from "../../types";
import { lorem, url1, url2 } from "../BestThree/BestThree";
import SaveButton from "../SaveButton/SaveButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import {
  updateCarousel,
  updateTop3,
  updateFooter,
  ConfigureState,
} from "../../../store/slices/configureSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { mainColor } from "../../types/consts";

interface Top3Props {
  onSubmit: () => void;
}

const Top3 = ({ onSubmit }: Top3Props) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const top3 = useAppSelector((state: RootState) => state.configure.top3);
  const [avaiblePosts, setAvaiblePosts] = useState(posts);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const { register, setValue, handleSubmit } = useForm();

  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  useEffect(() => {
    const fetchData = () => {
      top3 && setSelectedPosts(mapPostsToOptions(top3));
      let avaiblePosts;
      if (top3 && posts) {
        avaiblePosts = posts.filter((element) => !top3.includes(element));
        setAvaiblePosts(avaiblePosts);
      }
    };

    fetchData();
  }, []);

  const onSubmitTop3: SubmitHandler<any> = async (data) => {
    dispatch(updateTop3(selectedPosts.map((element: any) => element.value)));
    onSubmit();
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

  const handlePostSelection = (e: any, index: number) => {
    const restPosts = avaiblePosts.filter(
      (elem) => elem.title !== e.label.split("-")[0]
    );
    setAvaiblePosts(restPosts);
    let items = [...selectedPosts];
    if (items[index]) {
      items[index] = e;
      setSelectedPosts([selectedPosts]);
    } else {
      setSelectedPosts([...selectedPosts, e]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitTop3)}>
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
                marginTop: "0.5rem",
                marginLeft: "0.1rem",
                width: "15rem",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: mainColor,
              },
            })}
            defaultValue={"Brak"}
            value={selectedPosts.length >= 1 && (selectedPosts[0] as any)}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={(e) => handlePostSelection(e, 0)}
          />
          <p>Post 2:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginTop: "0.5rem",
                marginLeft: "0.1rem",
                width: "15rem",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: mainColor,
              },
            })}
            defaultValue={"Brak"}
            value={selectedPosts.length >= 1 && (selectedPosts[1] as any)}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={(e) => handlePostSelection(e, 1)}
          />
          <p>Post 3:</p>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginTop: "0.5rem",
                marginLeft: "0.1rem",
                width: "15rem",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: mainColor,
              },
            })}
            defaultValue={"Brak"}
            value={selectedPosts.length >= 1 && (selectedPosts[2] as any)}
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            options={mapPostsToOptions(avaiblePosts)}
            onChange={(e) => handlePostSelection(e, 2)}
          />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
    </form>
  );
};

export default Top3;
