import { baseImgPath } from '@/constants'
import { Movie } from '@/lib/tmdb'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const MovieCard = ({
  movie,
  containerClasses,
}: {
  movie: Movie
  containerClasses: string
}) => {
  return (
    <div
      className={clsx(
        'relative h-[160px] w-[112px] max-w-[208px] overflow-hidden rounded-[6px] shadow-xl dark:shadow-card-white sm:h-[296px] sm:w-[208px] sm:rounded-[12px]',
        containerClasses
      )}
    >
      <Image
        src={baseImgPath + movie.poster_path}
        alt={movie.title}
        fill
        className="z-0 object-cover object-center"
      />
      <div className="absolute -left-[2px] -top-[2px] z-20 flex size-[32px] cursor-pointer items-center justify-center rounded-[6px] border-2 border-background backdrop-blur-[2px] backdrop-brightness-[0.7] sm:-left-1 sm:-top-1 sm:size-[64px] sm:rounded-[12px] sm:border-4">
        <PlusIcon
          stroke="#ebfaff"
          strokeWidth="3px"
          className="size-4 sm:size-8 sm:stroke-[4px]"
        />
      </div>

      <div className="absolute -left-[4px] -top-[4px] size-[36px] rounded-br-[6px] border-b-[4px] border-r-[4px] border-background sm:-left-[6px] sm:-top-[8px] sm:size-[72px] sm:rounded-br-[12px] sm:border-b-[10px] sm:border-r-[10px]" />

      <div className="absolute -left-[2px] top-[30px] size-[28px] rounded-tl-[6px] border-l-2 border-t-2 border-background sm:-left-1 sm:top-[60px] sm:rounded-tl-[12px] sm:border-l-4 sm:border-t-4" />

      <div className="absolute -top-[2px] left-[30px] size-[28px] rounded-tl-[6px] border-l-[2px] border-t-[2px] border-background sm:-top-1 sm:left-[62px] sm:rounded-tl-[12px] sm:border-l-4 sm:border-t-4" />
    </div>
  )
}

export default MovieCard
