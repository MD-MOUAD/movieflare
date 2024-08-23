import { useEffect, useState } from "react";
import { genresDict } from "../services/api";
import Select from 'react-select';

const FilterComponent = ({ mediaType, setGenre, setSort, resetPage }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const genresList = [];
    for (const [id, name] of Object.entries(genresDict[mediaType])) {
      genresList.push({ id, name });
    }
    setGenres(genresList);
  }, []);

  const GenreOptions = [{value: "", label: "All Genres"}];
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
    resetPage(1);
    setGenre(option.value);
  };
  const handleSortChange = (option) => {
    resetPage(1);
    setSort(option.value);
  };

  const sortOptions = [
    {value: "vote_average.desc&vote_count.gte=1000", label: "Top Rated"},
    {value: "title.asc", label: "Title (A-Z)"},
    {value: "title.desc", label: "Title (Z-A)"},
    {value: "popularity.desc", label: "Most Popular"},
    {value: "popularity.asc", label: "Least Popular"},
  ];
  return (
    <div className="filter hiddenn px-2 py-4 rounded-md bg-slate-300 dark:bg-neutral-900">
      <form className="flex gap-10 max-sm:gap-2">
        <Select options={GenreOptions} placeholder='Select genre "All"' className="text-black w-52"
        onChange={handleGenreChange}
        styles={customStyles}/>
        <Select options={sortOptions} placeholder='Sort by "Most Popular"' className="text-black w-60"
        onChange={handleSortChange}
        styles={customStyles}/>
      </form>
    </div>
  );
};

export default FilterComponent;
