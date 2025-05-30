'use client'
import { baseImgPath, BaseImgPathOriginal } from '@/constants'
import Image from 'next/image'
import { MovieWithImages } from '@/lib/tmdb'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import MovieDetailsCard from './HeroDetails'

const Hero = ({ movies }: { movies: MovieWithImages[] }) => {
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

  return (
    <section className="mx-auto min-h-[100px] 2xl:max-w-screen-2xl">
      <div className="relative flex w-full flex-col items-end">
        {/* === Main Banner Slider === */}
        <div className="relative mb-4 h-[45vh] w-full sm:mb-10 sm:h-[60vh] xl:h-[705px] xl:w-[1260px]">
          {movies.map((movie, index) => {
            const logoUrl =
              movie.images.logos.length > 0
                ? `${baseImgPath}${movie.images.logos[0].file_path}`
                : null

            return (
              <div key={index}>
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
                {/* === Banner Logo === */}
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0, x: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute left-[10%] top-[40%] z-10 max-sm:top-[30%]"
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={`${movie.title} logo`}
                      width={160}
                      height={90}
                      className="pointer-events-none object-cover object-center max-sm:max-w-36"
                      priority
                    />
                  )}
                </motion.div>
              </div>
            )
          })}

          {/* Banner gradient overlays */}
          <div className="absolute inset-0 h-full bg-light-gradient dark:bg-dark-gradient" />
          <div className="absolute -bottom-8 -left-4 -right-14 -z-0 h-20 bg-gradient-to-t from-background from-[80%] to-background/90 blur-md sm:-bottom-20 sm:h-[135px]" />
        </div>

        {/* === Thumbnail + Details Container === */}
        <div className="absolute inset-x-0 top-[35vh] flex w-full flex-col items-center gap-4 sm:top-[45vh] sm:items-start sm:gap-0 xl:bottom-0 xl:flex-row-reverse xl:items-end xl:justify-between">
          {/* === Thumbnails carousel === */}
          <div className="flex h-[100px] w-[400px] shrink-0 items-center justify-center sm:h-44 sm:w-[692px] xl:self-end">
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
          <MovieDetailsCard
            movie={movies[currentIndex]}
            containerClass="hidden xl:block"
          />
        </div>
        <MovieDetailsCard
          movie={movies[currentIndex]}
          containerClass="xl:hidden self-start mt-2 lg:mt-8"
        />
      </div>
    </section>
  )
}

export default Hero
