import { useTheme } from 'next-themes'
import Image from 'next/image'

const ModeToggle = () => {
  const { setTheme } = useTheme()
  return (
    <div className="mode-toggle hidden sm:block">
      <Image
        src="icons/sun.svg"
        height={32}
        width={32}
        alt="sun"
        className="hidden size-4 transition-transform duration-500 hover:rotate-[360deg] dark:block sm:size-8"
        onClick={() => setTheme('light')}
      />
      <Image
        src="icons/moon.svg"
        height={32}
        width={32}
        alt="moon"
        className="block size-4 transition-transform duration-500 hover:scale-[1.1] dark:hidden sm:size-8"
        onClick={() => setTheme('dark')}
      />
    </div>
  )
}

export default ModeToggle
