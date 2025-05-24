/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { getYear } from '@/utils/helpers'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, PlayCircle } from 'lucide-react'
import { BaseImgPathOriginal, baseImgPath } from '@/constants'
import Image from 'next/image'

const MotionDiv = motion.div

const BannerSlider = ({ movies }: { movies: any[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === movies?.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide, movies?.length])

  return (
    <div className="relative h-[14rem] w-full overflow-hidden rounded-md md:h-[24rem] lg:h-[26rem] xl:h-[30rem]">
      {movies.map((item, index) => (
        <MotionDiv
          key={index}
          className="absolute left-0 top-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: currentSlide === index ? 1 : -1 }}
        >
          <div
            className="relative h-full rounded-md bg-cover bg-center"
            style={{
              backgroundImage: `url("${BaseImgPathOriginal}/${item?.backdrop_path}")`,
            }}
          >
            <div className="from-black/70 absolute inset-0 rounded-md bg-gradient-to-r to-transparent" />
            <div className="relative flex h-full items-center px-4 sm:px-12">
              <div className="flex w-fit max-w-5xl items-center gap-3 bg-opacity-75 text-white md:gap-6">
                <Image
                  src={`${baseImgPath}/${item?.poster_path}`}
                  alt="Movie Poster"
                  className="hidden w-28 rounded-lg opacity-65 shadow-lg sm:block md:w-48"
                />
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {item.title || item.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-3 text-sm text-white/65 sm:text-base">
                    <p>{getYear(item)}</p>
                    <div className="flex items-center gap-1 rounded-sm bg-slate-500/50 px-2 font-bold text-yellow-500">
                      <Star />
                      {item?.vote_average?.toFixed(1)}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white sm:text-lg">
                    action history anime
                  </p>
                  <p className="mt-4 line-clamp-2 hidden text-sm font-medium text-white/50 sm:text-base md:block">
                    {item?.overview}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/${item?.media_type}/${item?.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red-700"
                    >
                      <PlayCircle className="size-4" />
                      <span>watchNow</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      ))}

      {/* Circle indicators */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 transform gap-3">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerSlider
