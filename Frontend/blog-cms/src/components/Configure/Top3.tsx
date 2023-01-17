import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateTop3 } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { UPDATE_CAROUSEL_ELEMENT } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { AdminUpdateTop3Form, Post } from "../../types";
import { mainColor } from "../../types/consts";
import "./style.css";

interface Top3Props {
  onSubmit: () => void;
}

const Top3 = ({ onSubmit }: Top3Props) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const top3 = useAppSelector((state: RootState) => state.configure.top3);
  const [avaiblePosts, setAvaiblePosts] = useState(posts);
  const [selectedPosts, setSelectedPosts] = useState({});
  const { register, setValue, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState([false, true, true]);
  const [updateTop3Mutation] = useMutation(UPDATE_CAROUSEL_ELEMENT);

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
        setDisabled([false, false, false]);
      } else if (posts.length === 0) {
        setDisabled([true, true, true]);
      }
    };

    fetchData();
  }, []);

  const onSubmitTop3: SubmitHandler<any> = async (data) => {
    let postsFromSelects = Object.values(selectedPosts).map((element: any) => {
      if (element.value) {
        return element.value;
      }
    });
    dispatch(updateTop3(postsFromSelects));
    let idsFromPosts = postsFromSelects.map((element: any) => {
      return element.id;
    });
    const payload: any = {
      top: idsFromPosts,
    };
    updateTop3Mutation({ variables: payload as AdminUpdateTop3Form });
    onSubmit();
  };

  const mapPostsToOptions = (posts: Post[]): any => {
    if (!posts.includes(undefined)) {
      const options = posts.map((element) => {
        return {
          value: element,
          label: `${element.title}-${element.publicationDate}`,
        };
      });
      return options;
    } else {
      return [];
    }
  };

  const handlePostSelection = (e: any, index: number) => {
    if (e) {
      const restPosts = avaiblePosts.filter((elem) => elem.id !== e.id);
      if (Object.values(selectedPosts)[index] !== undefined) {
        restPosts.push(Object.values(selectedPosts)[index]);
      }
      setAvaiblePosts(restPosts);
    } else {
      const clearedPost: any = Object.values(selectedPosts)[index];
      if (avaiblePosts && avaiblePosts.indexOf(clearedPost.value) === -1) {
        setAvaiblePosts([...avaiblePosts, clearedPost.value]);
      }
    }

    let items = selectedPosts;
    if (e) {
      Object.assign(items, { [index]: e });
      setSelectedPosts(items);
      handleDisabled(index, e);
    } else {
      Object.assign(items, { [index]: undefined });
      setSelectedPosts(items);
      if (
        Object.values(items).every(
          (x) => x === null || x === "" || x === undefined
        )
      ) {
        setDisabled([false, true, true]);
      }
    }
  };

  const handleDisabled = (index: number, e: any) => {
    let disable = [...disabled];
    const restPosts = avaiblePosts.filter((elem) => elem.id !== e.id);
    if (disable[index] && disable[index] === true) {
      disable[index] = false;
    }
    if (
      disable[index + 1] &&
      disable[index + 1] === true &&
      restPosts.length > 0
    ) {
      disable[index + 1] = false;
    }
    setDisabled(disable);
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
            value={
              Object.values(selectedPosts).length >= 1 &&
              (Object.values(selectedPosts)[0] as any)
            }
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            isClearable={true}
            isDisabled={disabled[0]}
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
            value={
              Object.values(selectedPosts).length >= 1 &&
              (Object.values(selectedPosts)[1] as any)
            }
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            isClearable={true}
            isDisabled={disabled[1]}
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
            value={
              Object.values(selectedPosts).length >= 1 &&
              (Object.values(selectedPosts)[2] as any)
            }
            placeholder={"Nie wybrano"}
            noOptionsMessage={() => "Brak"}
            name="color"
            isClearable={true}
            isDisabled={disabled[2]}
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
