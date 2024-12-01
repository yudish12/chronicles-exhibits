import React from 'react'
import SubHeader from '@/components/ui/sub-header';
import Header from '@/components/ui/header';
import Queryform from '@/app/(landing)/Queryform';
// import Queryform from '../(landing)/Queryform';
import BoothGrid from './_components/BoothCardGrid';
import BoothEnquiry from './_components/BoothInuiry';
import { BoothDetails } from './_components/BoothDetails';
import Footer from '@/components/ui/footer';
const BoothByCode = async ({params}) => {
    const resolvedParams = await params ;
    const boothCode = resolvedParams.booth_code;

  return (
   <>
    <SubHeader />
    <Header />
    {/* <div>

    </div> */}
    <BoothDetails/>
    <BoothEnquiry/>
    <BoothGrid/>
    <Queryform/>
    <Footer/>
   </>
  )
}

export default BoothByCode