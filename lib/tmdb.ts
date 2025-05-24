export async function getPopularMovies() {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error('Failed to fetch movies')

  return res.json()
}
