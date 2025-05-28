import Hero from '@/components/hero/Hero'
import { getMovieDetails, getTrendingMovies, Movie } from '@/lib/tmdb'

export default async function Home() {
  const trendingData = await getTrendingMovies()
  const top4Movies = trendingData.slice(0, 4)

  const bannerMovies = await Promise.all(
    top4Movies.map((movie: Movie) => getMovieDetails(movie.id))
  )
  return (
    // todo: remove min height
    <div className="min-h-[200vh]">
      <Hero movies={bannerMovies} />
    </div>
  )
}
