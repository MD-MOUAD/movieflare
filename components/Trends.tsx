'use client'
import { Movie } from '@/lib/tmdb'
import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Trends = ({ movies }: { movies: Movie[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollAmount, setScrollAmount] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const calculateScrollAmount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const remainingSpace = containerWidth % (208 + 16) // movie width + gap
        setScrollAmount(containerWidth - remainingSpace + 12)
      }
    }

    const updateScrollButtons = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateScrollAmount()
      updateScrollButtons()
    })

    const container = containerRef.current
    if (container) {
      resizeObserver.observe(container)
      container.addEventListener('scroll', updateScrollButtons)
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container)
        container.removeEventListener('scroll', updateScrollButtons)
      }
    }
  }, [])

  const scrollMovies = (direction: 1 | -1) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-auto sm:pl-12 2xl:max-w-screen-2xl"
    >
      <div className="flex w-full items-center justify-between px-4 lg:mb-3.5 xl:mb-4">
        <h3 className="h3-mobile sm:h3-web text-foreground">Trends</h3>
        <span className="flex gap-4 capitalize text-primary1 underline">
          See More
        </span>
      </div>

      <div className="relative">
        {/* Previous Button */}
        {canScrollLeft && (
          <Button
            onClick={() => scrollMovies(-1)}
            className="absolute -left-0 top-[45%] z-10 hidden size-12 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black hover:bg-opacity-75 sm:flex"
          >
            <ChevronLeft />
          </Button>
        )}
        <div
          ref={containerRef}
          className="no-scrollbar flex items-center gap-4 overflow-x-auto pb-10 pl-4 pt-[2px] sm:overflow-x-hidden"
        >
          {movies.slice(4).map((movie) => (
            <MovieCard
              containerClasses="shrink-0"
              key={movie.id}
              movie={movie}
            />
          ))}
          {/* Next Button */}
        </div>
        {canScrollRight && (
          <Button
            onClick={() => scrollMovies(1)}
            className="absolute right-0 top-[45%] z-10 hidden size-12 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black hover:bg-opacity-75 sm:flex"
          >
            <ChevronRight />
          </Button>
        )}
      </div>
    </motion.section>
  )
}

export default Trends
