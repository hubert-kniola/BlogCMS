import React, { ChangeEvent, useState } from "react";
import { CategoryState } from "../../../store/slices/categorySlice";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import {
  deleteCategory,
  addSubCategory,
  addTag,
  deleteSubCategory,
  deleteTag,
} from "../../../store/slices/categorySlice";
import { BEM } from "../../tools";

interface TileProps {
  category: CategoryState;
  style?: string;
}

const Tiles = ({ category, style }: TileProps) => {
  const dispatch = useAppDispatch();
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const categoryIndex = categoriesRedux.findIndex(
    (element: CategoryState) => element.title === category.title
  );
  const subCategoriesRedux = categoriesRedux[categoryIndex].subMenu;

  const [showInputSub, setShowInputSub] = useState<boolean>(false);
  const [showInputTag, setShowInputTag] = useState<any>({
    show: false,
    index: 0,
  });
  const [subCategory, setSubCategory] = useState<CategoryState>(null);
  const [tag, setTag] = useState<CategoryState>(null);

  const cssClasses = {
    tile: "tile",
    title: "title",
    input: "input",
    tag: "tag",
    subInput: "subInput",
    sub: "sub",
    container: "container",
  };

  const saveSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setSubCategory({
      title: e.currentTarget.value,
      url: `/${e.currentTarget.value}/`,
      subMenu: [],
    });
  };

  const addReduxSubCategory = () => {
    const existedSubCategories = subCategoriesRedux.findIndex(
      (element: CategoryState) => element.title === subCategory.title
    );
    if (subCategory && existedSubCategories === -1) {
      dispatch(
        addSubCategory({
          categoryTitle: category.title,
          subCategory: subCategory,
        })
      );
      setShowInputSub(false);
    }
  };

  const saveTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag({
      title: e.currentTarget.value,
      url: `/${e.currentTarget.value}/`,
      subMenu: [],
    });
  };

  const addReduxTag = (index: number) => {
    if (tag) {
      dispatch(
        addTag({
          categoryTitle: category.title,
          subCategoryTitle: subCategory.title,
          index: index,
          tag: tag,
        })
      );
      setShowInputTag(false);
    }
  };

  return (
    <div className={BEM(cssClasses.tile, cssClasses.container)}>
      <div className={cssClasses.tile}>
        <p>{category.title}</p>
        <input
          className={BEM(cssClasses.tile, cssClasses.input)}
          type="button"
          value="+"
          onClick={() => setShowInputSub(true)}
        />
        <input
          className={BEM(cssClasses.tile, cssClasses.input)}
          type="button"
          value="-"
          onClick={() => dispatch(deleteCategory(category))}
        />
      </div>
      <div>
        {showInputSub && (
          <div className={BEM(cssClasses.tile, cssClasses.sub)}>
            <input
              className={BEM(cssClasses.tile, cssClasses.subInput)}
              type="text"
              onChange={saveSubCategory}
            />
            <input
              className={BEM(cssClasses.tile, cssClasses.input)}
              type="button"
              value="+"
              onClick={addReduxSubCategory}
            />
            <input
              className={BEM(cssClasses.tile, cssClasses.input)}
              type="button"
              value="-"
              onClick={() => setShowInputSub(false)}
            />
          </div>
        )}
        {subCategoriesRedux.map((element: CategoryState, i: number) => {
          return (
            <div>
              <div className={BEM(cssClasses.tile, cssClasses.sub)}>
                <p>{element.title}</p>
                <input
                  className={BEM(cssClasses.tile, cssClasses.input)}
                  type="button"
                  value="+"
                  onClick={() => setShowInputTag({ show: true, index: i })}
                />
                <input
                  className={BEM(cssClasses.tile, cssClasses.input)}
                  type="button"
                  value="-"
                  onClick={() =>
                    dispatch(
                      deleteSubCategory({
                        categoryTitle: category.title,
                        subCategoryTitle: subCategory.title,
                      })
                    )
                  }
                />
              </div>
              {showInputTag.show && showInputTag.index === i && (
                <div className={BEM(cssClasses.tile, cssClasses.tag)}>
                  <input
                    className={BEM(cssClasses.tile, cssClasses.subInput)}
                    type="text"
                    onChange={saveTag}
                  />
                  <input
                    className={BEM(cssClasses.tile, cssClasses.input)}
                    type="button"
                    value="+"
                    onClick={() => addReduxTag(i)}
                  />
                  <input
                    className={BEM(cssClasses.tile, cssClasses.input)}
                    type="button"
                    value="-"
                    onClick={() => setShowInputTag(false)}
                  />
                </div>
              )}
              {subCategoriesRedux[i].subMenu.map((element: CategoryState) => {
                return (
                  <div>
                    <div className={BEM(cssClasses.tile, cssClasses.tag)}>
                      <p>{element.title}</p>
                      <input
                        className={BEM(cssClasses.tile, cssClasses.input)}
                        type="button"
                        value="-"
                        onClick={() =>
                          dispatch(
                            deleteTag({
                              categoryTitle: category.title,
                              subCategoryTitle: subCategory.title,
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tiles;
