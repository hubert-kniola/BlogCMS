import React, { ChangeEvent, useEffect, useState } from "react";
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
import { BEM, ConvertTitleToPath } from "../../tools";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckIcon from "@mui/icons-material/Check";
import { mainColor } from "../../types/consts";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY_WITH_SUBCATEGORY,
} from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { AdminAddCategoryForm, AdminRemoveCategoryForm } from "../../types";

interface TileProps {
  category: CategoryState;
  style?: string;
}

export const Tiles = ({ category, style }: TileProps) => {
  const dispatch = useAppDispatch();
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const categoryIndex = categoriesRedux.findIndex(
    (element: CategoryState) => element.title === category.title
  );
  const subCategoriesRedux = categoriesRedux[categoryIndex].subCategory;

  const [showInputSub, setShowInputSub] = useState<boolean>(false);
  const [showInputTag, setShowInputTag] = useState<any>({
    show: false,
    index: 0,
  });
  const [subCategory, setSubCategory] = useState<CategoryState>(null);
  const [indexOfSubCategory, setIndexOfSubcategory] = useState<number>(null);
  const [tag, setTag] = useState<CategoryState>(null);
  const [addCategoryMutation, { data, loading, error }] =
    useMutation(ADD_CATEGORY);
  const [removeCategoryMutation] = useMutation(
    REMOVE_CATEGORY_WITH_SUBCATEGORY
  );

  const cssClasses = {
    tile: "tile",
    title: "title",
    input: "input",
    tag: "tag",
    subInput: "subInput",
    sub: "sub",
    container: "container",
  };

  useEffect(() => {
    const fetchData = () => {
      if (data && (indexOfSubCategory !== undefined && indexOfSubCategory !== null)) {
        setTag({ id: data.createCategory.id, ...tag });
        dispatch(
          addTag({
            categoryTitle: category.title,
            subCategoryTitle: subCategory.title,
            indexOfSubCategory: indexOfSubCategory,
            tag: { id: data.createCategory.id, ...tag },
          })
        );
        setIndexOfSubcategory(null);
      } else if (data && (indexOfSubCategory === undefined || indexOfSubCategory === null)) {
        dispatch(
          addSubCategory({
            categoryTitle: category.title,
            subCategory: { id: data.createCategory.id, ...subCategory },
          })
        );
      }
    };

    fetchData();
  }, [data]);

  const saveSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setSubCategory({
      title: e.currentTarget.value,
      path: ConvertTitleToPath(e.currentTarget.value),
      subCategory: [],
    });
  };

  const addReduxSubCategory = () => {
    const existedSubCategories = subCategoriesRedux.findIndex(
      (element: CategoryState) => element.title === subCategory.title
    );
    if (subCategory && existedSubCategories === -1) {
      setShowInputSub(false);
      addCategoryMutation({
        variables: {
          title: subCategory.title,
          path: ConvertTitleToPath(subCategory.title),
          parentId: category.id,
        } as AdminAddCategoryForm,
      });
      setIndexOfSubcategory(null);
    }
  };

  const saveTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag({
      title: e.currentTarget.value,
      path: ConvertTitleToPath(e.currentTarget.value),
      subCategory: [],
    });
  };

  const addReduxTag = (index: number, subCat: CategoryState) => {
    if (tag) {
      setSubCategory(subCat);
      addCategoryMutation({
        variables: {
          title: tag.title,
          path: ConvertTitleToPath(tag.title),
          parentId: subCat.id,
        } as AdminAddCategoryForm,
      });
      setIndexOfSubcategory(index);
      setShowInputTag(false);
    }
  };

  return (
    <div className={BEM(cssClasses.tile, cssClasses.container)}>
      <div className={cssClasses.tile}>
        <p>{category.title}</p>
        <IconButton onClick={() => setShowInputSub(true)}>
          <AddBoxIcon fontSize="small" sx={{ color: mainColor }} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteCategory(category));
            removeCategoryMutation({
              variables: {
                id: category.id,
              } as AdminRemoveCategoryForm,
            });
          }}
        >
          <IndeterminateCheckBoxIcon
            fontSize="small"
            sx={{ color: mainColor }}
          />
        </IconButton>
      </div>
      <div>
        {showInputSub && (
          <div className={BEM(cssClasses.tile, cssClasses.sub)}>
            <input
              className={BEM(cssClasses.tile, cssClasses.subInput)}
              type="text"
              onChange={saveSubCategory}
            />
            <IconButton onClick={addReduxSubCategory}>
              <AddBoxIcon fontSize="small" sx={{ color: mainColor }} />
            </IconButton>
            <IconButton onClick={() => setShowInputSub(false)}>
              <IndeterminateCheckBoxIcon
                fontSize="small"
                sx={{ color: mainColor }}
              />
            </IconButton>
          </div>
        )}
        {subCategoriesRedux.map((element: CategoryState, i: number) => {
          return (
            <div key={element.id}>
              <div className={BEM(cssClasses.tile, cssClasses.sub)}>
                <p>{element.title}</p>
                <IconButton
                  onClick={() => setShowInputTag({ show: true, index: i })}
                >
                  <AddBoxIcon fontSize="small" sx={{ color: mainColor }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(
                      deleteSubCategory({
                        categoryTitle: category.title,
                        indexOfSubCategory: i,
                      })
                    );
                    removeCategoryMutation({
                      variables: {
                        id: element.id,
                      } as AdminRemoveCategoryForm,
                    });
                  }}
                >
                  <IndeterminateCheckBoxIcon
                    fontSize="small"
                    sx={{ color: mainColor }}
                  />
                </IconButton>
              </div>
              {showInputTag.show && showInputTag.index === i && (
                <div className={BEM(cssClasses.tile, cssClasses.tag)}>
                  <input
                    className={BEM(cssClasses.tile, cssClasses.subInput)}
                    type="text"
                    onChange={saveTag}
                  />
                  <IconButton onClick={() => addReduxTag(i, element)}>
                    <AddBoxIcon fontSize="small" sx={{ color: mainColor }} />
                  </IconButton>
                  <IconButton onClick={() => setShowInputTag(false)}>
                    <IndeterminateCheckBoxIcon
                      fontSize="small"
                      sx={{ color: mainColor }}
                    />
                  </IconButton>
                </div>
              )}
              {subCategoriesRedux[i].subCategory.map(
                (element: CategoryState, index: number) => {
                  return (
                    <div key={element.id}>
                      <div className={BEM(cssClasses.tile, cssClasses.tag)}>
                        <p>{element.title}</p>
                        <IconButton
                          onClick={() => {
                            dispatch(
                              deleteTag({
                                categoryTitle: category.title,
                                indexOfSubCategory: i,
                                indexOfTag: index,
                              })
                            );
                            removeCategoryMutation({
                              variables: {
                                id: element.id,
                              } as AdminRemoveCategoryForm,
                            });
                          }}
                        >
                          <IndeterminateCheckBoxIcon
                            fontSize="small"
                            sx={{ color: mainColor }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
