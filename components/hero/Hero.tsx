import { baseImgPath, BaseImgPathOriginal } from '@/constants'
import Image from 'next/image'
import { getMovieDetails, getTrendingMovies, Movie } from '@/lib/tmdb'
import Rating from '@/components/Rating'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/16/solid'

const Hero = async () => {
  const trendingData = await getTrendingMovies()
  const top4Movies = trendingData.slice(0, 4)

  const bannerMovies = await Promise.all(
    top4Movies.map((movie: Movie) => getMovieDetails(movie.id))
  )

  return (
    <section className="mx-auto 2xl:max-w-screen-2xl">
      {/* Hero banner */}
      <div className="relative flex w-full flex-col items-end">
        {/* Banner backdrop image */}
        <div className="relative w-fit overflow-hidden">
          <Image
            src={`${BaseImgPathOriginal}${bannerMovies[1].backdrop_path}`}
            priority
            height={795}
            width={1170}
            alt="banner"
            className="-z-20 h-[45vh] object-cover sm:h-[705px]"
          />
          {/* backdrop overlay */}
          <div className="absolute inset-0 h-full bg-light-gradient dark:bg-dark-gradient" />
          {/* backdrop bottom gradient effect */}
          <div className="absolute -bottom-8 -left-4 -right-14 -z-0 h-20 bg-gradient-to-t from-background from-[80%] to-background/90 blur-md sm:-bottom-20 sm:h-[135px]" />

          <div className="absolute bottom-0 flex h-[100px] w-[300px] items-center justify-center max-sm:left-1/2 max-sm:-translate-x-[calc(50%-7px)] sm:right-0 sm:h-44 sm:w-[692px]">
            <div className="relative z-[2] aspect-square w-[76px] overflow-clip rounded-[8px] border-[0.5px] border-primary2-shade-8 brightness-[0.6] sm:w-[122px] sm:rounded-[20px]">
              <Image
                src={`${baseImgPath}${bannerMovies[0].poster_path}`}
                fill
                alt="poster"
                className="object-cover"
              />
            </div>
            <div className="relative z-[3] aspect-square w-[76px] scale-[1.315] overflow-clip rounded-[8px] border-[0.5px] border-primary2-shade-8 sm:w-[122px] sm:scale-[1.426] sm:rounded-[20px]">
              <Image
                src={`${baseImgPath}${bannerMovies[1].poster_path}`}
                fill
                alt="poster"
                className="object-cover"
              />
            </div>
            <div className="relative z-[2] aspect-square w-[76px] overflow-clip rounded-[8px] border-[0.5px] border-primary2-shade-8 brightness-[0.6] sm:w-[122px] sm:rounded-[20px]">
              <Image
                src={`${baseImgPath}${bannerMovies[2].poster_path}`}
                fill
                alt="poster"
                className="object-cover"
              />
            </div>
            <div className="relative z-[1] aspect-square w-[76px] -translate-x-3.5 overflow-clip rounded-[8px] border-[0.5px] border-primary2-shade-8 brightness-[0.6] sm:w-[122px] sm:-translate-x-5 sm:rounded-[20px]">
              <Image
                src={`${baseImgPath}${bannerMovies[3].poster_path}`}
                fill
                alt="poster"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="z-30 flex w-[600px] flex-col gap-[10px] pl-4 max-sm:w-full sm:absolute sm:bottom-6 sm:left-0 sm:pl-12">
          <h2 className="h3-web">{bannerMovies[1].title}</h2>
          <em className="-mt-4 text-[21px]">{bannerMovies[1].tagline}</em>
          <p className="p1-web">{bannerMovies[1].overview}</p>
          <div className="flex items-center gap-[10px]">
            {/* Rating */}
            <Rating voteAverage={bannerMovies[1]?.vote_average} />
            <div className="flex items-center gap-1">
              <Image
                src="/icons/tmdb-logo.svg"
                height={20}
                width={40}
                alt="logo"
              />
              <p className="p1-web text-black dark:text-white">
                {bannerMovies[1]?.vote_average?.toFixed(1)}
              </p>
            </div>
            {/* //Todo: make this dynamic */}
            <Image
              src="/images/temp/netflix.svg"
              height={14}
              width={54}
              alt="company"
            />
          </div>
          <div className="mt-1 flex items-center gap-2">
            <button className="flex h-10 w-fit items-center justify-center gap-1 rounded-[28px] bg-primary1 px-6 pb-[12px] pt-[10px] text-foreground hover:bg-primary1-tint-1">
              <PlayIcon
                className="hidden size-3.5 dark:block"
                stroke="#eBFAFF"
                fill="#EBFAFF"
              />
              <PlayIcon
                className="size-3.5 dark:hidden"
                stroke="#030A1B"
                fill="#030A1B"
              />
              <span className="p1-web capitalize">Watch Movie</span>
            </button>
            <button className="flex h-10 w-fit items-center justify-center gap-1 rounded-[28px] border border-primary1 px-6 pb-[12px] pt-[10px] text-foreground">
              <span className="p1-web capitalize">More Info</span>
              <ArrowRightIcon
                className="hidden size-3.5 dark:block"
                stroke="#eBFAFF"
                fill="#EBFAFF"
                strokeWidth="3px"
              />
              <ArrowRightIcon
                className="size-3.5 dark:hidden"
                stroke="#030A1B"
                fill="#030A1B"
                strokeWidth="3px"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
