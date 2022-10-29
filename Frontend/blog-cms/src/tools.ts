export const BEM = (block: string, element: string = null, modifier: string = null) => {
  let result: string = "";
  element ? result = block + "_" + element : result = block;
  modifier ? result = result + "--" + modifier : null;
  return result;
};

