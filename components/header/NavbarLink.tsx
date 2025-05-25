import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  href: string
  label: string
}
const NavbarLink = ({ href, label }: Props) => {
  const pathname = usePathname()
  const isActive =
    pathname === href || (pathname.includes(href) && href.length > 1)
  return (
    <Link
      href={href}
      key={href}
      className="h3b-mobile lg:h4b-web relative mb-[2px] text-bgTint-1 dark:text-bgTint-8"
    >
      <span
        className={clsx(
          'after:absolute after:-bottom-[2px] after:left-0 after:mx-auto after:h-[4px] after:bg-primary1 after:shadow-primary1/80 after:blur-[1.5px] after:transition-all after:duration-500 after:ease-in-out',
          isActive ? 'after:w-full' : 'after:w-0'
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export default NavbarLink
