import Image from 'next/image'

export default function Home() {
  return (
    <div className="container relative mx-auto h-[200vh]">
      <Image
        src={'/images/temp/witcher.jpg'}
        priority
        height={795}
        width={1170}
        alt="banner"
        className="ml-auto object-cover"
      />
      <h1 className="mt-52 w-full text-center text-2xl font-bold">
        Whereas disregard and contempt for human rights have resulted
      </h1>
    </div>
  )
}
