import axios from "axios";

export const getMusicList = async()=>{
    try{
        const response = await axios.get("https://itunes.apple.com/search?term=top&media=music&limit=20");
        return response.data.results;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const searchMusic = async (q:string)=>{
    try{   
        const response = await axios.get("https://itunes.apple.com/search", {
            params: {
              term:q,
              media: "music",
              limit: 10,
            },
          });
        return response.data.results;
    }catch(error){
        console.log(error);
        throw error;
    }
}