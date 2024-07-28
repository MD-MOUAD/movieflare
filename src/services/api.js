import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Image path base
export const baseImgPath = "https://image.tmdb.org/t/p/w500";
export const BaseImgPathOriginal = "https://image.tmdb.org/t/p/original";

// Trending
export const fetchTrending = async (timeInterval = "day") => {
    const { data } = await axios.get(`${baseUrl}/trending/all/${timeInterval}?api_key=${apiKey}`);
    return data?.results;
};