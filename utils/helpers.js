export const getYear = (item) => {
  const date = item?.release_date || item?.first_air_date
  if (!date) return 'N/A'
  return new Date(date).getFullYear()
}

export const ratingPercentage = (rating) => (rating * 10)?.toFixed(0)

export const createGenreDict = (genres) => {
  const genreDict = {}
  genres.forEach(({ id, name }) => {
    genreDict[id] = name
  })
  return genreDict
}

export const mapGenreIdsToNames = (genreIds, genreDict) => {
  return genreIds?.map((id) => genreDict[id] || 'Unknown')
}

export const minutesToHours = (time) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  return `${hours}h ${minutes}m`
}
