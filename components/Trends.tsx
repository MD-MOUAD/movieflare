'use client'
import { Movie } from '@/lib/tmdb'
import React from 'react'
import MovieCard from './MovieCard'
import { motion } from 'framer-motion'

const Trends = ({ movies }: { movies: Movie[] }) => {
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
      <div className="no-scrollbar flex h-[220px] items-center gap-4 overflow-x-auto pl-4 sm:h-[300px]">
        {movies.slice(4).map((movie) => (
          <MovieCard containerClasses="shrink-0" key={movie.id} movie={movie} />
        ))}
      </div>
    </motion.section>
  )
}

export default Trends
