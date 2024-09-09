import axios from "axios";
import { createGenreDict } from "../utils/helpers";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Image path base
export const baseImgPath = "https://image.tmdb.org/t/p/w500";
export const BaseImgPathOriginal = "https://image.tmdb.org/t/p/original";

// Trending
export const fetchTrending = async (
  timeFrame = "day",
  mediaType = "all",
  page = 1,
  language = "en-US"
) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // TODO: Remove this line later
  const { data } = await axios.get(
    `${baseUrl}/trending/${mediaType}/${timeFrame}?api_key=${apiKey}&page=${page}&language=${language}`
  );
  return data?.results;
};

// Top Rated
export const fetchTopRated = async (
  mediaType = "movie",
  page = 1,
  language = "en-US"
) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/top_rated?api_key=${apiKey}&page=${page}&language=${language}`
  );
  return data?.results;
};

// Upcoming Movies
export const fetchUpcomingMovies = async (language = "en-US") => {
  const { data } = await axios.get(
    `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=${language}`
  );
  return data?.results;
};

// Movies - Latest Trailer
export const fetchLatestTrailer = async (
  mediaType,
  movieId,
  language = "en-US"
) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${movieId}/videos?api_key=${apiKey}&language=${language}`
  );
  const officialTrailers = data.results.filter(
    (video) =>
      video.type === "Trailer" &&
      video.official === true &&
      video.site === "YouTube"
  );
  officialTrailers.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );
  return officialTrailers.length > 0 ? officialTrailers[0] : null;
};

// Movies & Tv - Details
export const fetchDetails = async (mediaType, id, language = "en-US") => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}&language=${language}`
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

const genresDict = {};

const loadGenresFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveGenresToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initializeGenresDict = async () => {
  const movieGenres = loadGenresFromLocalStorage("movieGenres");
  const tvGenres = loadGenresFromLocalStorage("tvGenres");

  if (movieGenres && tvGenres) {
    genresDict["movie"] = movieGenres;
    genresDict["tv"] = tvGenres;
  } else {
    try {
      const [movieGenresData, tvGenresData] = await Promise.all([
        fetchGenreList("movie"),
        fetchGenreList("tv"),
      ]);

      const movieGenreDict = createGenreDict(movieGenresData);
      const tvGenreDict = createGenreDict(tvGenresData);

      saveGenresToLocalStorage("movieGenres", movieGenreDict);
      saveGenresToLocalStorage("tvGenres", tvGenreDict);

      genresDict["movie"] = movieGenreDict;
      genresDict["tv"] = tvGenreDict;
    } catch (error) {
      console.log("Failed to fetch genres data:", error);
    }
  }
};

initializeGenresDict();

export { genresDict };

// Movies & Tv - Videos
export const fetchVideos = async (mediaType, id) => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
  );
  return data;
};

// Movies & Tv - Similar
export const fetchSimilar = async (mediaType, id, language = "en-US") => {
  const { data } = await axios.get(
    `${baseUrl}/${mediaType}/${id}/similar?api_key=${apiKey}&language=${language}`
  );
  return data?.results;
};

// Discover
export const fetchMovies = async (
  page = 1,
  genreId,
  sortOption,
  language = "en-US"
) => {
  const today = new Date().toISOString().split("T")[0];
  let voteCountGte = 100;
  let sort = sortOption;

  if (sort.includes("&vote_count.gte=1000")) {
    sort = sort.replace("&vote_count.gte=1000", "");
    voteCountGte = 1000;
  }
  const { data } = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&release_date.lte=${today}&with_genres=${genreId}&sort_by=${sort}&vote_count.gte=${voteCountGte}&page=${page}&language=${language}`
  );

  return data;
};

export const fetchTvShows = async (
  page = 1,
  genreId,
  sortOption,
  language = "en-US"
) => {
  const today = new Date().toISOString().split("T")[0];
  let voteCountGte = 10;
  let sort = sortOption;

  if (sort.includes("&vote_count.gte=1000")) {
    sort = sort.replace("&vote_count.gte=1000", "");
    voteCountGte = 1000;
  }

  const { data } = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&air_date.lte=${today}&with_genres=${genreId}&sort_by=${sort}&vote_count.gte=${voteCountGte}&page=${page}&language=${language}`
  );

  return data;
};

// Search
export const searchMulti = async (query, page = 1, language = "en-US") => {
  const { data } = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&page=${page}&query=${query}&language=${language}`
  );
  return data;
};
