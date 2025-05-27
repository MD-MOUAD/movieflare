import { StarIcon, StarHalf } from 'lucide-react'

const Rating = ({ voteAverage }: { voteAverage: number }) => {
  const rating = (voteAverage || 0) / 2 // convert to 5-star scale
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon
          key={`full-${i}`}
          className="size-4"
          stroke="#E5DB22"
          fill="#E5DB22"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="half"
          className="size-4"
          stroke="#E5DB22"
          fill="#E5DB22"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          className={`size-4 ${hasHalfStar && '-ml-1'}`}
          stroke="#E5DB22"
          fill="none"
        />
      ))}
    </div>
  )
}

export default Rating
