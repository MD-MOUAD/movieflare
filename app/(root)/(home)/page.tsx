import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex h-[200vh] flex-col items-end">
      <Image
        src={'/images/witcher.jpg'}
        height={795}
        width={1190}
        className="relative"
        alt="banner"
      />
      <Image
        src={'/images/framer12.jpg'}
        height={795}
        width={1190}
        className="absolute inset-0"
        alt="framer"
      />

      <h1 className="mt-52 text-2xl font-bold text-amber-300">Home Page</h1>
    </div>
  )
}
