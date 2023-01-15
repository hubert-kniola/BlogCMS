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
      dispatch(
        addSubCategory({
          categoryTitle: category.title,
          subCategory: subCategory,
        })
      );
      setShowInputSub(false);
      addCategoryMutation({
        variables: {
          title: subCategory.title,
          path: ConvertTitleToPath(subCategory.title),
          parentId: category.id,
        } as AdminAddCategoryForm,
      });
    }
  };

  const saveTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag({
      title: e.currentTarget.value,
      path: ConvertTitleToPath(e.currentTarget.value),
      subCategory: [],
    });
  };

  const addReduxTag = (index: number) => {
    if (tag) {
      dispatch(
        addTag({
          categoryTitle: category.title,
          subCategoryTitle: subCategory.title,
          indexOfSubCategory: index,
          tag: tag,
        })
      );
      setShowInputTag(false);
      addCategoryMutation({
        variables: {
          title: tag.title,
          path: ConvertTitleToPath(tag.title),
          parentId: subCategory.id,
        } as AdminAddCategoryForm,
      });
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
            {/* <IconButton
              sx={{
                borderRadius: "3px",
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                backgroundColor: "rgb(156, 156, 156)",
                color: "white",
                height: "1.8rem"
              }}
            >
              <CheckIcon />
            </IconButton> */}
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
            <div>
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
                  <IconButton onClick={() => addReduxTag(i)}>
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
                    <div>
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
