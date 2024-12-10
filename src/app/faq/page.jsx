import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import SubHeader from '@/components/ui/sub-header';
import React from 'react'

const page = () => {
    const faqs = [
        {
          question: "Why should I hire a stand builder?",
          answer:
            "A professional stand builder knows the importance of a good exhibition stand. They embody your brand personality and highlight your key marketing message. An expertly designed booth can help you attract a maximum number of visitors and boost brand recall value as well.",
        },
        {
          question: "Do you ship?",
          answer:
            "Yes, we do. We possess a fleet of vehicles. This way, we ensure that your booth is always in professional and competent hands that take care of it throughout the way - right from the workshop to the exhibition venue.",
        },
        {
          question: "Do you provide booth graphics?",
          answer:
            "Yes. We have an excellent in-house design studio & own production facilities. Our client servicing team works closely with clients to ensure the best of design and fabrication. We employ latest and competent design software solutions to produce graphics of any kind. The execution of a stand design is structured on a phased approach that rests on a platform of absolute planning; defining all the parameters necessary for a perfect stall design.",
        },
        {
          question: "Do you offer booth storage and warehousing?",
          answer:
            "Yes. If you want to use your stand at multiple shows year after year, then you must check our storage costs as displayed as option on all of our booth design quotes.",
        },
        {
          question: "Who will manage my booth design project in your office?",
          answer:
            "Once you've decided to hire us for designing and building your exhibit stand, we will assign a dedicated project manager who'll make sure that your stand is delivered right on time and construction costs fall within your budget.",
        },
        {
          question: "Where are you located or based?",
          answer: "Our office is located in Las Vegas.",
        },
        {
          question: "Do you offer booth building in Europe?",
          answer:
            "Yes. We've built, shipped and installed exhibition stands throughout Europe.",
        },
        {
          question: "What type of stands do you build?",
          answer:
            "We specialize in high-quality bespoke custom exhibition stands, modular exhibition stand, and double-decker exhibition stand. We undertake all elements of the exhibition build process, from concept to completion.",
        },
        {
          question: "How old is your establishment?",
          answer:
            "We have 25+ years of extensive experience in the exhibition industry, with a blend of enthusiastic and creative designers, highly-skilled workers, and a wide network of associates.",
        },
      ];
    
  return (
    <>
    <SubHeader/>
    <Header/>
    <div className='flex items-center justify-center py-4 '>
    <div className='container  py-12 px-12 '>
        <h1 className='text-secondary font-bold text-4xl py-2 texxt-center '>FAQs</h1>
        <p className="text-secondary text-lg pt-4 mb-8">
        A professional stand builder knows the importance of a good exhibition stand. They embody your brand personality and highlight your key marketing message. An expertly designed booth can help you attract a maximum number of visitors and boost brand recall value as well.
      </p>
      <div className='gap-y-8'>
        {
            faqs.map((faq , index) =>(
                <div key={index}>
                <h2 className='text-lg font-semibold text-secondary pt-4 '>{faq.question}</h2>
                <p className='py-2'>{faq.answer}</p>
                </div>
            ))
        }
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default page