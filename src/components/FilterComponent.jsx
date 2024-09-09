import { useEffect, useState } from "react";
import { genresDict } from "../services/api";
import Select, { components } from "react-select";
import selectStyles from "../utils/selectStyles";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const FilterComponent = ({ mediaType, setGenre, setSort, resetPage }) => {
  const [genres, setGenres] = useState([]);
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    const genresList = [];
    for (const [id, name] of Object.entries(genresDict[mediaType])) {
      genresList.push({ id, name });
    }
    setGenres(genresList);
  }, []);

  const GenreOptions = genres.map((genre) => ({
    value: genre?.id,
    label: t(genre?.name),
  }));

  const handleGenreChange = (selected) => {
    resetPage(1);
    setGenre(selected.map((option) => option.value).join(", "));
  };
  const handleSortChange = (option) => {
    resetPage(1);
    setSort(option.value);
  };
  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    );
  };

  const titleOptionValue = mediaType === "tv" ? "name" : "title";
  const titleOptionLabel = mediaType === "tv" ? "Name" : "Title";

  const sortOptions = [
    { value: "popularity.desc&vote_count.gte=100", label: t('mostPopular') },
    { value: "vote_average.desc&vote_count.gte=1000", label: t('topRated') },
    {
      value: `${titleOptionValue}.asc&vote_count.gte=100`,
      label: `${t(titleOptionLabel)} (A-Z)`,
    },
    {
      value: `${titleOptionValue}.desc&vote_count.gte=100`,
      label: `${t(titleOptionLabel)} (Z-A)`,
    },
    { value: "popularity.asc&vote_count.gte=100", label: t('leastPopular') },
  ];

  return (
    <div className="filter hidden px-2 py-4 rounded-md bg-slate-300 dark:bg-neutral-900">
      <form className="flex flex-wrap items-center gap-10 max-lg:gap-2" dir={language === "ar-MA" ? "rtl": "ltr"}>
        <Select
          options={GenreOptions}
          placeholder={t('containGenresAny')}
          className="text-black max-lg:text-sm  shrink-0 flex-grow max-w-full"
          onChange={handleGenreChange}
          styles={selectStyles}
          closeMenuOnSelect={false}
          isMulti
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
        />
        <Select
          options={sortOptions}
          placeholder={t('sortByMostPopular')}
          className="text-black max-lg:text-sm  shrink-0 flex-grow max-w-full"
          onChange={handleSortChange}
          styles={selectStyles}
        />
      </form>
    </div>
  );
};

export default FilterComponent;
