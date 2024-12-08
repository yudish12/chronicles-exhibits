import React from 'react'
import SubHeader from '@/components/ui/sub-header'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import Image from 'next/image'
import FactsAndFigures from '../(landing)/FactsAndFigures'
import Ourworks from '../(landing)/Ourworks'
import Leadingtrade from '../(landing)/Leadingtrade'
import Introduction from './_components/Introduction'
const page = () => {
  return (
    <>
    <SubHeader />
      <Header />
      <div className="bg-[url('/location-bg.png')] px-20 text-white gap-8 h-[420px] justify-center items-center flex flex-col">
        <Image
          src={"/info-circle.png"}
          width={40}
          height={40}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-4xl font-bold">
          ABOUT US
        </h3>
      </div>
      <Introduction/>
      <FactsAndFigures/>
      <Footer/>
      </>
  )
}

export default page