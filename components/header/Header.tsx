'use client'

import { NavLinks } from '@/constants'
import Image from 'next/image'
import NavbarLink from './NavbarLink'

const Header = () => {
  return (
    <header className="border-gradient fixed left-1/2 top-0 z-50 mt-2 w-11/12 max-w-[1232px] -translate-x-1/2 overflow-hidden rounded-[8px] bg-[rgba(255,255,255,0.2)] backdrop-blur-sm dark:bg-[rgba(26,25,25,0.3)] sm:mt-8 sm:rounded-[20px]">
      <div className="flex h-10 w-full flex-row-reverse items-center justify-between gap-4 px-7 sm:h-20 sm:flex-row lg:justify-start lg:px-0">
        {/* Logo */}
        <div className="sm:ml-3">
          <Image
            src="/images/logo-light.svg"
            height={92}
            width={92}
            alt="logo"
            className="block dark:hidden max-sm:size-12"
          />
          <Image
            src="/images/logo-dark.svg"
            height={92}
            width={92}
            alt="logo"
            className="hidden dark:block max-sm:size-12"
          />
        </div>
        {/* Navigation links */}
        <div className="hidden flex-1 gap-6 lg:flex xl:ml-8">
          {NavLinks.map(({ label, href }) => (
            <NavbarLink key={href} label={label} href={href} />
          ))}
        </div>
        {/* User interactions */}
        <div className="mr-8 flex h-12 items-center gap-2 sm:gap-4 lg:gap-8">
          <div className="mobile-menu sm:hidden">
            <Image
              src="icons/mobile-menu-dark.svg"
              height={32}
              width={32}
              alt="menu"
              className="hidden size-4 dark:block sm:size-8"
            />
            <Image
              src="icons/mobile-menu-light.svg"
              height={32}
              width={32}
              alt="menu"
              className="block size-4 dark:hidden sm:size-8"
            />
          </div>
          <div className="search">
            <Image
              src="icons/search-dark.svg"
              height={32}
              width={32}
              alt="search"
              className="hidden size-4 dark:block sm:size-8"
            />
            <Image
              src="icons/search-light.svg"
              height={32}
              width={32}
              alt="search"
              className="block size-4 dark:hidden sm:size-8"
            />
          </div>
          <div className="notification hidden sm:block">
            <Image
              src="icons/notification-dark.svg"
              height={32}
              width={32}
              alt="notification"
              className="hidden size-4 dark:block sm:size-8"
            />
            <Image
              src="icons/notification-light.svg"
              height={32}
              width={32}
              alt="notification"
              className="block size-4 dark:hidden sm:size-8"
            />
          </div>
          <div className="profile hidden sm:block">
            <Image
              src="icons/profile-dark.svg"
              height={32}
              width={32}
              alt="profile"
              className="hidden size-4 dark:block sm:size-8"
            />
            <Image
              src="icons/profile-light.svg"
              height={32}
              width={32}
              alt="profile"
              className="block size-4 dark:hidden sm:size-8"
            />
          </div>
          <div className="mode hidden sm:block">
            <Image
              src="icons/sun.svg"
              height={32}
              width={32}
              alt="sun"
              className="hidden size-4 dark:block sm:size-8"
            />
            <Image
              src="icons/moon.svg"
              height={32}
              width={32}
              alt="moon"
              className="block size-4 dark:hidden sm:size-8"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
