import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const ManufacturingUnit = () => {
    const images = [
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
        "/photo1-ourwork.png",
      ];
  return (
<>
<div className='flex flex-col items-center justify-center py-10 px-8'>
    <div className='text-secondary text-3xl heading-font py-4 '>
        <h2>CHRONICLE EXHIBIT'S MANUFACTURING UNIT </h2>
    </div>
    
        <p className='text-secondary text-center '>
          At Chronicle Exhibits LLC, our state-of-the-art manufacturing unit in
          Las Vegas spans an impressive warehouse and a cutting-edge production
          facility. With a comprehensive range of modern equipment, we ensure a
          seamless and efficient end-to-end trade show booth-building process.
          </p>

          <div className="p-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[420px,420px,420px] w-full md:w-max mx-auto gap-x-4 sm:gap-x-6 md:gap-x-6 gap-y-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl w-full sm:w-[420px] h-[200px] sm:h-[250px] md:h-[230px]"
            >
              <Image
                width={370}
                height={300}
                className="transition-transform w-full h-full duration-300 transform hover:scale-110"
                src={src}
                alt={`photo-${index}`}
              />
            </div>
          ))}
        </div>
        <Link className="flex mt-10" href="/portfolio">
          <Button
            style={{ transitionDuration: "500ms" }}
            className="bg-secondary hover:bg-[#B0CB1F] hover:text-secondary mx-auto  font-semibold text-white text-sm sm:text-base"
          >
            View Portfolio
          </Button>
        </Link>
      </div>
</div>
</>
  )
}

export default ManufacturingUnit