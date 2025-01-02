export const capitalizeFirstLetter = (str: string) => {
    if (typeof str !== 'string' || str.length === 0) return ""; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  };



export const isGroupSystemMessage = (text:string)=> {
  const pattern = /^%!@#\{.*\}#@!%$/; 
  return pattern.test(text);
}


export const extractContentFromGroupSystemMessage = (text: string) => {
  if (typeof text !== "string" || !text) return "";
  const match = text.match(/^%!@#\{(.*)\}#@!%$/);
  return match ? match[1] : null;
};

