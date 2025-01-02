export const extractLinks = (text:string) => {
    const urlPattern = /((https?:\/\/|www\.)[^\s]+)/g;
    const links = text.match(urlPattern);
    return links || [];
};

export const hasLink = (text:string) => {
    const urlPattern = /((https?:\/\/|www\.)[^\s]+)/g;
    return urlPattern.test(text); 
};
