'use client'
import { baseImgPath, BaseImgPathOriginal } from '@/constants'
import Image from 'next/image'
import { MovieDetails } from '@/lib/tmdb'
import Rating from '@/components/Rating'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/16/solid'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import ProductionCompanyLogo from '@/components/ProductionCompanyLogo'

const Hero = ({ movies }: { movies: MovieDetails[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-slide the hero banner every 4 seconds
  const startSliding = () => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current)

    // Set new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 4 - 1 ? 0 : prevIndex + 1))
    }, 4000)
  }

  useEffect(() => {
    startSliding()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Manually switch banners when a thumbnail is clicked
  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx)
    startSliding() // reset sliding on click
  }

  const ctaIconProps = {
    className: 'size-3.5 dark:invert',
    stroke: '#030A1B',
    fill: '#030A1B',
  }

  return (
    <section className="mx-auto min-h-[50vh] 2xl:max-w-screen-2xl">
      <div className="relative flex w-full flex-col items-end">
        {/* === Main Banner Slider === */}
        <div className="relative mb-4 h-[45vh] w-full sm:mb-10 sm:h-[705px] sm:w-[1260px]">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: index === currentIndex ? 1 : 0, x: 0 }}
              transition={{ duration: 1, ease: 'easeIn' }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={`${BaseImgPathOriginal}${movie.backdrop_path}`}
                alt={`${movie.title}'s banner`}
                priority={index === 0}
                fill
                className="-z-20 object-cover object-center"
              />
            </motion.div>
          ))}

          {/* Banner gradient overlays */}
          <div className="absolute inset-0 h-full bg-light-gradient dark:bg-dark-gradient" />
          <div className="absolute -bottom-8 -left-4 -right-14 -z-0 h-20 bg-gradient-to-t from-background from-[80%] to-background/90 blur-md sm:-bottom-20 sm:h-[135px]" />
        </div>

        {/* === Thumbnail + Details Container === */}
        <div className="absolute inset-x-0 top-[35vh] flex w-full flex-col items-center gap-4 sm:top-[50%] sm:items-start sm:gap-0 xl:bottom-0 xl:flex-row-reverse xl:items-end xl:justify-between">
          {/* === Thumbnails carousel === */}
          <div className="flex h-[100px] w-[400px] shrink-0 items-center justify-center sm:h-44 sm:self-end md:w-[692px]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              {movies.map((movie, idx) => (
                <button
                  key={movie.id}
                  onClick={() => handleThumbnailClick(idx)}
                  className={clsx(
                    'thumbnail-btn',
                    currentIndex === idx
                      ? 'thumbnail-active'
                      : 'scale-100 brightness-[0.6]',
                    currentIndex === 1 &&
                      idx === 2 &&
                      'z-[3] translate-x-3 sm:translate-x-4 lg:translate-x-6'
                  )}
                >
                  <Image
                    src={`${baseImgPath}${movie.poster_path}`}
                    fill
                    sizes="122px"
                    alt={`${movie.title} poster`}
                    className="object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </div>
          {/* === Movie Details === */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-30 mb-14 flex max-w-full flex-col gap-[10px] pl-4 sm:max-w-[600px] sm:pl-12"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeIn' }}
              className="flex flex-col gap-[10px]"
            >
              <h2 className="sm:h3-web truncate text-[32px] font-bold max-sm:pr-2">
                {movies[currentIndex].title}
              </h2>
              {/*  <em className="-mt-4 truncate text-[21px] max-lg:hidden">
                {movies[currentIndex].tagline}
              </em> */}
              <p className="p3-mobile sm:p1-web line-clamp-3 max-sm:pr-2 max-sm:tracking-wider sm:line-clamp-2">
                {movies[currentIndex].overview}
              </p>

              {/* === Stats row: Rating, TMDB score, Production company === */}
              <div className="hidden items-center gap-[10px] sm:flex">
                <Rating voteAverage={movies[currentIndex]?.vote_average} />

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
                    {movies[currentIndex]?.vote_average?.toFixed(1)}
                  </p>
                </div>

                {/* Production company logo */}
                <ProductionCompanyLogo
                  companies={movies[currentIndex].production_companies}
                />
              </div>
            </motion.div>

            {/* === CTA buttons === */}
            <div className="mt-2 flex items-center gap-2 sm:mt-4">
              <button className="hero-watch-btn">
                <PlayIcon {...ctaIconProps} />
                <span className="p1-mobile sm:p1-web capitalize">
                  Watch Movie
                </span>
              </button>
              <button className="hero-info-btn">
                <span className="p1-mobile sm:p1-web capitalize">
                  More Info
                </span>
                <ArrowRightIcon {...ctaIconProps} strokeWidth="3px" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
