import { moviesGenres } from '@/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGenreNamesByIds = (mediaType: string, genreIds: number[]) => {
  const genresArray = mediaType === 'tv' ? [] : moviesGenres
  return genreIds
    .map((id) => {
      const genre = genresArray.find((g) => g.id === id)
      return genre ? genre.name : null
    })
    .filter((name): name is string => name !== null)
}
