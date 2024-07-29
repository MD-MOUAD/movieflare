import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Image path base
export const baseImgPath = "https://image.tmdb.org/t/p/w500";
export const BaseImgPathOriginal = "https://image.tmdb.org/t/p/original";

// Trending
export const fetchTrending = async (timeInterval = "day", mediaType = "all") => {
    await new Promise((resolve) => setTimeout(resolve, 200)); // TODO: Remove this line later
    const { data } = await axios.get(`${baseUrl}/trending/${mediaType}/${timeInterval}?api_key=${apiKey}`);
    return data?.results;
};