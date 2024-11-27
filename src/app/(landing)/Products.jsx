import React from 'react'
import { Card , CardContent } from '@/components/ui/card'
const Products = () => {
  return (
    <>
   <div className="bg-[#400D25] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg capitalize *:font-semibold text-[#D6FF43]">
            Product Lineup
          </h3>
          <h2 className="mt-2 heading-font text-3xl font-bold text-white sm:text-4xl">
            EYE-CATCHING TRADE SHOW BOOTH DESIGNS <br /> FOR SUCCESSFUL
            EXHIBITIONS
          </h2>
          <p className="mt-6 text-lg text-[#EDEDED] font-light">
            Explore over 1,000 trade show booth designs by selecting your booth
            size. All designs are fully customizable.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              imgSrc: 'path/to/image1.jpg',
              size: '10X10',
              link: '#',
            },
            {
              imgSrc: 'path/to/image2.jpg',
              size: '10X20',
              link: '#',
            },
            {
              imgSrc: 'path/to/image3.jpg',
              size: '10X30',
              link: '#',
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="group relative bg-[#5F1835] rounded-lg shadow-lg overflow-hidden transition-transform hover:bg-white"
            >
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={item.imgSrc}
                  alt={`Booth ${item.size}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-[#5F1835]">
                  {item.size}
                </h3>
                <a
                  href={item.link}
                  className="mt-2 text-sm font-semibold text-[#D6FF43] group-hover:text-[#400D25]"
                >
                  View More
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>


    </>
  )
}

export default Products