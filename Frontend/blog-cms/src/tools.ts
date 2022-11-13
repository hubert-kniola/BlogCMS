import { TextPosition } from "./types";

export const BEM = (block: string, element: string = null, modifier: string = null) => {
  let result: string = "";
  element ? result = block + "_" + element : result = block;
  modifier ? result = result + "--" + modifier : null;
  return result;
};

export const GetTextPositionStyle = (position: TextPosition) => {

  let style = {
    alignItems: "",
    justifyContent: "",
  }

  if(TextPosition[position].includes("Top"))
    style.alignItems = "flex-start";
  else if (TextPosition[position].includes("Bottom"))
    style.alignItems = "flex-end";
  else 
    style.alignItems = "center";
    
  if(TextPosition[position].includes("Left"))
    style.justifyContent = "left";
  else if (TextPosition[position].includes("Right"))
    style.justifyContent = "right";
  else 
    style.justifyContent = "center";
  
  return style;
}
