import { baseImgPath } from '@/constants'
import { Movie } from '@/lib/tmdb'
import { getGenreNamesByIds } from '@/lib/utils'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import Rating from './Rating'
import Link from 'next/link'

const MovieCard = ({
  movie,
  containerClasses,
}: {
  movie: Movie
  containerClasses: string
}) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className={clsx(
        'group relative flex aspect-[0.7] w-[112px] max-w-[208px] cursor-default items-center justify-center rounded-[6px] shadow-card-black dark:shadow-card-white sm:w-[160px] sm:rounded-[12px] lg:w-[208px]',
        containerClasses
      )}
    >
      <div className="path shadow-inner-black absolute -left-[2px] -top-[2px] z-10 h-full w-full bg-background" />
      <Image
        src={baseImgPath + movie.poster_path}
        alt={movie.title}
        fill
        className="-z-10 rounded-[6px] object-cover object-center opacity-100 transition-opacity duration-1000 ease-in-out group-hover:opacity-0 sm:rounded-[12px]"
      />
      <Image
        src={baseImgPath + movie.backdrop_path}
        alt={movie.title}
        fill
        className="-z-10 rounded-[6px] object-cover object-center opacity-0 brightness-75 transition-opacity duration-1000 ease-in-out group-hover:opacity-100 sm:rounded-[12px]"
      />
      <div className="absolute left-0 top-0 flex size-[32px] cursor-pointer items-center justify-center rounded-[6px] backdrop-blur-[2px] backdrop-brightness-75 sm:size-[56px] sm:rounded-[12px]">
        <PlusIcon
          stroke="#ebfaff"
          strokeWidth="3px"
          className="size-4 sm:size-8 sm:stroke-[4px]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 w-full cursor-default px-4 pb-2 text-white opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100 md:pb-12">
        <h3 className="xl:h4-web truncate text-xs font-bold md:text-lg">
          {movie.title}
        </h3>
        <p className="pb-1 text-[10px] sm:text-sm md:text-base">
          {getGenreNamesByIds(movie.media_type, movie.genre_ids)
            .splice(0, 2)
            .join('/')}
        </p>
        <Rating voteAverage={movie.vote_average} />
      </div>
    </Link>
  )
}

export default MovieCard
