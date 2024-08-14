import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Image path base
export const baseImgPath = "https://image.tmdb.org/t/p/w500";
export const BaseImgPathOriginal = "https://image.tmdb.org/t/p/original";

// Trending
export const fetchTrending = async (
  timeFrame = "day",
  mediaType = "all",
  page = 1
) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: Remove this line later
  const { data } = await axios.get(
    `${baseUrl}/trending/${mediaType}/${timeFrame}?api_key=${apiKey}&page=${page}`
  );
  return data?.results;
};
// Top Rated
export const fetchTopRated = async (mediaType = "movie", page = 1) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/top_rated?api_key=${apiKey}&page=${page}`
  );
  console.log("requested")
  return data?.results;
};

// Movies & Tv - Details
export const fetchDetails = async (mediaType, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
  );
  return data;
};

// Movies & Tv - Credits
export const fetchCredits = async (mediaType, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`
  );
  return data;
};

// Movies & Tv - Genres
export const fetchGenreList = async (genreType) => {
  const { data } = await axios.get(
    `${baseUrl}/genre/${genreType}/list?api_key=${apiKey}`
  );
  return data?.genres;
};
