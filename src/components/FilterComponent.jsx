import { useEffect, useState } from "react";
import { fetchGenreList } from "../services/api";
import Select from 'react-select';

const FilterComponent = () => {
  const [genres, setGenres] = useState([]);
  const filters = [{ name: "genre", value: "genre" }];
  useEffect(() => {
    const fetchGenres = async () => {
      const movieGenres = JSON.parse(localStorage.getItem("movieGenres"));

      if (movieGenres) {
        const genresList = [];
        for (const [id, name] of Object.entries(movieGenres)) {
          genresList.push({ id, name });
        }
        setGenres(genresList);
      } else {
        const genresList = await fetchGenreList("movie");
        setGenres(genresList);
      }
    };
    fetchGenres();
  }, []);

  const options = [];
  genres.forEach((genre) => {
    options.push({value: genre?.id, label: genre?.name});
  })
  return (
    <form>
      <Select options={options} placeholder="Select genre" className="text-black"/>
    </form>
  );
};

export default FilterComponent;
