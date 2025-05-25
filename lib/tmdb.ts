import { apiBaseUrl, apiKey } from '@/constants'

if (!apiKey) {
  throw new Error('TMDB api key is not set')
}

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  backdrop_path: string
}

interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const getMovies = async (): Promise<Movie[]> => {
  const res = await fetch(
    `${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status} ${res.statusText}`)
  }

  const data: TMDBResponse = await res.json()
  return data.results
}
