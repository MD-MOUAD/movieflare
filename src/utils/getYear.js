const getYear = (item) => {
    const date = (item?.release_date || item?.first_air_date);
    if (!date) return 'N/A';
    return new Date(date).getFullYear();
}
export default getYear;