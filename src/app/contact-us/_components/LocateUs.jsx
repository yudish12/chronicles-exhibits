import React from 'react'

const LocateUs = () => {
  return (
    <div className='bg-background flex flex-col justify-center items-center '>
        <div className='text-[#B0CB1F] text-xl font-bold py-4 '>
        Locate Us On The Map 
        </div>
        <div className='text-secondary font-light  py-2  '>
   <p> Want to meet us ? You are welcome at Chronicle's head office . Refer to the map given below to find our location.  </p>
        </div>
        <div className='py-6'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5139890547102!2d55.38061577561039!3d25.2869296776533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42e5a9ddaf97%3A0x563a582dbda7f14c!2sChronicle%20Exhibition%20Organizing%20L.L.C%20%7C%20Exhibition%20Stand%20Design%20Construction%20and%20Booth%20Builder%20Company!5e0!3m2!1sen!2sin!4v1733596971374!5m2!1sen!2sin" style={{width:"1000px", height:"500px", border:"2px solid #B0CB1F" , borderRadius: 5  }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default LocateUs