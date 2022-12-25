import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { month, TextPosition, weekday } from "./types";

export const BEM = (
  block: string,
  element: string = null,
  modifier: string = null
) => {
  let result: string = "";
  element ? (result = block + "_" + element) : (result = block);
  modifier ? (result = result + "--" + modifier) : null;
  return result;
};

export const ConvertFromHtmlToEditorState = (html: string): EditorState => {
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

export const removeTags = (html: string) => {
  if (html === null || html === "") return "";
  return html.replace(/(<([^>]+)>)/gi, "") as string;
};

export const GetTextPositionStyle = (position: TextPosition) => {
  let style = {
    alignItems: "",
    justifyContent: "",
  };

  if (TextPosition[position].includes("Top")) style.alignItems = "flex-start";
  else if (TextPosition[position].includes("Bottom"))
    style.alignItems = "flex-end";
  else style.alignItems = "center";

  if (TextPosition[position].includes("Left")) style.justifyContent = "left";
  else if (TextPosition[position].includes("Right"))
    style.justifyContent = "right";
  else style.justifyContent = "center";

  return style;
};

export const GetGTMDate = () => {
  const current = new Date();
  return `${weekday[current.getDay()]}, ${current.getDate()} ${
    month[current.getMonth()]
  } ${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} GMT`;
};
