import axios from "axios";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import axiosConfig from "./axiosConfig";
import { BlobStorageURL } from "./settings";
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

export const AddImageToAzure = async (images: File[]) => {
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  const response = await axios
    .post("http://localhost:7011/api/FileUpload", formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
  return response;
};

export const GetImageFromAzure = async (fileName: string) => {
  let headers = {
    "Access-Control-Allow-Origin": "*",
  };

  const response = await axiosConfig
    .get(`${BlobStorageURL}${fileName}`, { headers })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.error(err));
  return response;
};

export const ConvertTitleToPath = (title: string): string => {
  return `/${title.replace(" ", "-").toLowerCase()}/`;
};

export const GetDate = (date: string, onlyDate: boolean = false): string => {
  var dateTime = new Date(date);

  const day = getFormatedDate(dateTime.getDate());
  const month = getFormatedDate(dateTime.getMonth() + 1);
  const year = dateTime.getFullYear();
  const hours = getFormatedDate(dateTime.getHours());
  const minutes = getFormatedDate(dateTime.getMinutes());

  let currentDate = `${year}-${month}-${day}`;
  let currenTime = `${hours}:${minutes}`;

  return onlyDate ? currentDate : `${currentDate} ${currenTime}`;
};

const getFormatedDate = (value: number): string => {
  return value < 10 ? `0${value}` : value.toLocaleString();
};
