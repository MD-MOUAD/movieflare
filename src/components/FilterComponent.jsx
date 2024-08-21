import { useEffect, useState } from "react";
import { genresDict } from "../services/api";
import Select from 'react-select';

const FilterComponent = ({ setGenre, mediaType }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const genresList = [];
    for (const [id, name] of Object.entries(genresDict[mediaType])) {
      genresList.push({ id, name });
    }
    setGenres(genresList);
  }, []);

  const GenreOptions = [];
  genres.forEach((genre) => {
    GenreOptions.push({value: genre?.id, label: genre?.name});
  });
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'rgb(248, 113, 113)' : provided.borderColor,
      '&:hover': {
        borderColor: 'rgb(248, 113, 113)',
      },
      boxShadow: state.isFocused ? `0 0 0 1px rgb(248, 113, 113)` : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'rgb(248, 113, 113)'
        : state.isFocused
        ? 'rgb(254, 202, 202)'
        : provided.backgroundColor,
      color: state.isSelected ? 'white' : provided.color,
    }),

  };
  const handleGenreChange = (option) => {
    setGenre(option.value);
  };

  return (
    <div className="hidden rounded-md filter w-full h-[25vh] px-10 py-5 bg-slate-200 dark:bg-neutral-900">
      <form>
        <Select options={GenreOptions} placeholder="Select genre" className="text-black max-w-56"
        onChange={handleGenreChange}
        styles={customStyles}/>
      </form>
    </div>
  );
};

export default FilterComponent;
