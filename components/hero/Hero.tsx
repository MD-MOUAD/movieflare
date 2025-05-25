import { BaseImgPathOriginal } from '@/constants'
import { getMovies } from '@/lib/tmdb'
import Image from 'next/image'

const Hero = async () => {
  const popularMovies = await getMovies()

  return !popularMovies || popularMovies?.length < 10 ? (
    <div>Loading ....</div>
  ) : (
    <section className="mx-auto 2xl:max-w-screen-2xl">
      {/* Hero banner */}

      <div className="relative ml-auto w-fit">
        <Image
          src={`${BaseImgPathOriginal}/${popularMovies[2].backdrop_path}`}
          priority
          height={795}
          width={1170}
          alt="banner"
          className="-z-20 h-[45vh] object-cover sm:h-[795px]"
        />
        {/* backdrop overlay */}
        <div className="bg-light-gradient dark:bg-dark-gradient absolute inset-0 h-full" />
        {/* backdrop bottom gradient effect */}
        <div className="absolute -bottom-14 -left-4 -right-14 -z-0 h-20 bg-gradient-to-t from-background from-[80%] to-background/90 blur-md sm:h-[150px]" />
      </div>
    </section>
  )
}

export default Hero
