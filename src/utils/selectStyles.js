const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "rgb(248, 113, 113)" : provided.borderColor,
    "&:hover": {
      borderColor: "rgb(248, 113, 113)",
    },
    boxShadow: state.isFocused
      ? `0 0 0 1px rgb(248, 113, 113)`
      : provided.boxShadow,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgb(248, 113, 113)"
      : state.isFocused
      ? "rgb(254, 202, 202)"
      : provided.backgroundColor,
    color: state.isSelected ? "white" : provided.color,
  }),
};

export default selectStyles;
