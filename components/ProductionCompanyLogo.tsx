import { baseImgPath } from '@/constants'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const excludeLogos = ['netflix', 'warner bros. pictures']

type Props = {
  companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  containerClass?: string
}
const ProductionCompanyLogo = ({ companies, containerClass }: Props) => {
  const netflixCompany = companies.find(
    (company) => company.name.toLowerCase() === 'netflix'
  )
  const displayCompany = netflixCompany || companies[0]

  return displayCompany?.logo_path ? (
    <div className={clsx('relative h-7 w-28', containerClass)}>
      <Image
        src={baseImgPath + displayCompany.logo_path}
        fill
        alt={displayCompany.name}
        className={`object-contain object-left ${
          !excludeLogos.includes(displayCompany.name.toLowerCase()) &&
          'dark:invert'
        }`}
      />
    </div>
  ) : null
}

export default ProductionCompanyLogo
