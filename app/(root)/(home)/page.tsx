import Hero from '@/components/hero/Hero'
import Trends from '@/components/Trends'
import { getMovieWithImages, getTrendingMovies, Movie } from '@/lib/tmdb'

export default async function Home() {
  const trendingData = await getTrendingMovies()
  const top4Movies = trendingData.slice(0, 4)

  const bannerMovies = await Promise.all(
    top4Movies.map(async (movie: Movie) => getMovieWithImages(movie.id))
  )
  return (
    // todo: remove min height
    <div className="min-h-[200vh]">
      <Hero movies={bannerMovies} />
      <div className="mb-5 xl:mb-6" />
      <Trends movies={trendingData} />
    </div>
  )
}
