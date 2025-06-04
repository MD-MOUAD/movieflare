import React from 'react'

const page = ({ params }: { params: { movieId: string } }) => {
  return <div>page for movie {params.movieId}</div>
}

export default page
