import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_TOP3 } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { Post } from "../../types";
import { BestOne } from "./BestOne";
import "./style.css";

const css = {
  bestContainer: "bestContainer",
};

export const BestThree = () => {
  const { loading, error, data } = useQuery(GET_TOP3);
  const [bestPost, setBestPost] = useState([] as Post[]);

  const getPostsData = (data: any): Post[] => {
    return data?.topThreePost;
  };

  useEffect(() => {
    if (!loading) {
      setBestPost(getPostsData(data));
    }
  }, [loading]);

  return (
    <>
      <div className="bestContainer_header">
        <h1>Dzięki danym statystycznym</h1>
        <h2>Udało się wyróżnić 3 najpopularnijesze posty</h2>
        <p>
          Jeżeli chciałabyś podzielić się swoimi odczuciami na temat postów, coś
          jest niejasne lub chciałbyś podyskutować na dany temat
          <a href="/contact"> skontaktuj się ze mną</a>
        </p>
      </div>

      <div className={BEM(css.bestContainer)}>
        {bestPost.slice(0, 3).map((post, index) => {
          return <BestOne post={post} key={index} isSecond={index === 1} />;
        })}
      </div>
    </>
  );
};
