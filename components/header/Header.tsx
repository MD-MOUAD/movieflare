'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-4 z-50 w-11/12 bg-black-700 px-2 backdrop-blur-md transition-all duration-500 2xl:px-8',
        hasScrolled ? 'top-2' : 'top-4'
      )}
    ></header>
  )
}

export default Header
