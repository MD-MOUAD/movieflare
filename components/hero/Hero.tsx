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

const Hero = ({ movies }: { movies: MovieDetails[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx)
    startSliding() // reset sliding on click
  }

  return (
    <section className="mx-auto min-h-[50vh] 2xl:max-w-screen-2xl">
      <div className="flex w-full flex-col items-end">
        {/* Banner Slider */}
        <div className="relative mb-4 h-[45vh] w-full sm:mb-10 sm:h-[705px] sm:w-[1260px]">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
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
          <div className="absolute inset-0 h-full bg-light-gradient dark:bg-dark-gradient" />
          {/* backdrop bottom gradient effect */}
          <div className="absolute -bottom-8 -left-4 -right-14 -z-0 h-20 bg-gradient-to-t from-background from-[80%] to-background/90 blur-md sm:-bottom-20 sm:h-[135px]" />

          <div className="absolute -bottom-4 flex h-[100px] w-[350px] items-center justify-center max-sm:left-1/2 max-sm:-translate-x-[calc(50%-6px)] sm:-bottom-10 sm:right-0 sm:h-44 sm:w-[692px]">
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
                    'relative z-[2] aspect-square w-[76px] overflow-clip rounded-[8px] border-[0.5px] border-primary2-shade-8 transition-all duration-700 hover:brightness-90 sm:w-[122px] sm:rounded-[20px]',
                    currentIndex === idx
                      ? 'z-[4] scale-[1.315] sm:scale-[1.426]'
                      : 'scale-100 brightness-[0.6]',
                    currentIndex === 1 &&
                      idx === 2 &&
                      'z-[3] translate-x-3 sm:translate-x-6'
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
        </div>

        {/* Movie details */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-30 flex w-[600px] flex-col gap-[10px] pl-4 max-sm:w-full sm:pl-12"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 20 }}
            transition={{ ease: 'easeIn' }}
            className="flex flex-col gap-[10px]"
          >
            <h2 className="h3-web truncate">{movies[currentIndex].title}</h2>
            <em className="-mt-4 truncate text-[21px]">
              {movies[currentIndex].tagline}
            </em>
            <p className="p1-web line-clamp-2">
              {movies[currentIndex].overview}
            </p>
            <div className="flex items-center gap-[10px]">
              {/* Rating */}
              <Rating voteAverage={movies[currentIndex]?.vote_average} />
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/tmdb-logo.svg"
                  height={20}
                  width={40}
                  alt="logo"
                />
                <p className="p1-web text-black dark:text-white">
                  {movies[currentIndex]?.vote_average?.toFixed(1)}
                </p>
              </div>
              {/* //Todo: make this dynamic */}
              {movies[currentIndex].production_companies && (
                <Image src={''} height={14} width={54} alt="company" />
              )}
            </div>
          </motion.div>
          <div className="mt-4 flex items-center gap-2">
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
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
