export const BEM = (block: string, element: string, modifier: string) => {
  let result: string = "";
  element ? result = block + "_" + element : result = block;
  modifier ? result = result + "--" + modifier : null;
  return result;
};

