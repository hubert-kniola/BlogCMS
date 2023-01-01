import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    updateNewest
  } from "../../../store/slices/configureSlice";
  import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import FaqTable from "../Tables/FaqTable";
import "./style.css";

interface NewestProps {
    onSubmit: () => void;
  }
  

const Newest = ({ onSubmit }: NewestProps) => {
  const dispatch = useAppDispatch();
  const newest = useAppSelector((state: RootState) => state.configure.newest);
  const { register, setValue, handleSubmit } = useForm();
  const cssClasses = {
    configure: "configure",
    newest: "newest",
    container: "container",
    title: "title",
    description: "description",
  };

  const [description, setDescription] = useState<string>();

  useEffect(() => {
    const fetchData = () => {
      if (newest) {
        setDescription(newest);
      }
    };

    fetchData();
  }, []);

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
    dispatch(updateNewest(e.target.value));
  };

  const onSubmitNewest: SubmitHandler<any> = async (data) => {
    dispatch(updateNewest(description));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitNewest)}>
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
          <div className={BEM(cssClasses.title, cssClasses.container)}>
            <p>Hasło zachęcające:</p>
            <input
              className={BEM(cssClasses.title, cssClasses.title)}
              type="text"
              value={description}
              onChange={handleDescription}
            ></input>
          </div>
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
    </form>
  );
};

export default Newest;
