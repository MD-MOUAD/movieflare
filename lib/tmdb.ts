import 'server-only'
import { apiBaseUrl, apiKey } from '@/constants'

if (!apiKey) {
  throw new Error('TMDB api key is not set')
}

export interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  backdrop_path: string
  vote_average: number
}
export interface MovieDetails extends Movie {
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  genres: [id: number, name: string]
  tagline: string
}

interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const getTrendingMovies = async (): Promise<Movie[]> => {
  // Todo: change this to trending
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

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const res = await fetch(
    `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch movie (id: ${movieId}): ${res.status} ${res.statusText}`
    )
  }

  const data: MovieDetails = await res.json()
  return data
}
