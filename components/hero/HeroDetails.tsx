'use client'

import Image from 'next/image'
import Rating from '@/components/Rating'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/16/solid'
import { motion } from 'framer-motion'
import ProductionCompanyLogo from '@/components/ProductionCompanyLogo'
import { MovieDetails } from '@/lib/tmdb'

const ctaIconProps = {
  className: 'size-3.5 dark:invert',
  stroke: '#030A1B',
  fill: '#030A1B',
}

type Props = {
  movie: MovieDetails
  containerClass?: string
}

const MovieDetailsCard = ({ movie, containerClass }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={`'z-30 sm:pl-12' mb-2 flex max-w-full flex-col gap-[10px] pl-4 sm:max-w-[80%] lg:max-w-[70%] xl:mb-14 xl:max-w-[600px] ${containerClass}`}
    >
      <motion.div
        key={movie.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeIn' }}
        className="flex flex-col gap-[10px]"
      >
        <h2 className="sm:h3-web z-10 truncate text-[32px] font-bold max-sm:pr-2">
          {movie.title}
        </h2>
        {/*  <em className="-mt-4 truncate text-[21px] max-lg:hidden">
        {movie.tagline}
      </em> */}
        <p className="p3-mobile sm:p1-web line-clamp-3 min-h-[4rem] max-sm:pr-2 max-sm:tracking-wider sm:line-clamp-2 sm:min-h-[4.5rem]">
          {movie.overview}
        </p>

        {/* === Stats row: Rating, TMDB score, Production company === */}
        <div className="hidden items-center gap-[10px] sm:flex">
          <Rating voteAverage={movie.vote_average} />

          {/* TMDB logo + rating(TMDB vote average) */}
          <div className="flex items-center gap-1">
            <Image
              src="/icons/tmdb-logo.svg"
              height={20}
              width={40}
              alt="logo"
              className="object-cover max-sm:w-8"
            />
            <p className="p1-mobile md:p1-web cursor-default text-black dark:text-white">
              {movie?.vote_average?.toFixed(1)}
            </p>
          </div>

          {/* Production company logo */}
          <ProductionCompanyLogo companies={movie.production_companies} />
        </div>
      </motion.div>

      {/* === CTA buttons === */}
      <div className="mt-2 flex items-center gap-2 sm:mt-4">
        <button className="hero-watch-btn">
          <PlayIcon {...ctaIconProps} />
          <span className="p1-mobile sm:p1-web capitalize">Watch Movie</span>
        </button>
        <button className="hero-info-btn">
          <span className="p1-mobile sm:p1-web capitalize">More Info</span>
          <ArrowRightIcon {...ctaIconProps} strokeWidth="3px" />
        </button>
      </div>
    </motion.div>
  )
}

export default MovieDetailsCard
