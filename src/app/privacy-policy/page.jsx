import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
const Page = () => {
    const bulletPoints = [
        {
          pt :  "To provide and improve our services"  
        }, 
        {
          pt: "To personalize your experience"
        },
        {
          pt: "To send you marketing communications"
        },
        {
          pt: "To respond to your inquiries and requests"
        },
        {
         pt: "For security and fraud prevention purposes"
        },
    ]
    
  return (
    <>
    <SubHeader/>
    <Header/>
    <div className=" flex items-center justify-center bg-white ">
    <div className="container py-12 px-4 lg:px-24">
      <h1 className="text-4xl font-bold  mb-6 heading-font ">
        Privacy Policy
      </h1>
      <p className="text-lg mb-8">
        Chronicle Exhibits ("Chronicle," "we," "us," or "our") is committed to protecting the privacy of our users ("you" or "your"). This Privacy Policy explains what information we collect, how we use it, and how we protect it.
      </p>

      <section className="gap-y-8">
        {/* Section: Information We Collect */}
        <div>
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Information We Collect
          </h2>
          <p className="leading-relaxed mb-4">
            We collect several different types of information for various purposes to improve our services to you.
          </p>
          <p className="leading-relaxed py-2">
            Personal Information: We may collect personal information, such as your name, email address, phone number, and mailing address, when you register for an account, subscribe to our newsletter, or contact us.
            Usage Data: We may also collect information about your use of our website, such as the pages you visit, the links you click, and the searches you conduct. This data is collected anonymously and does not identify you personally.
          </p>
        </div>

        {/* Section: Use of Information */}
        <div className="py-8">
          <h2 className="text-lg font-semibold text-secondary ">
            We use the information we collect for various purposes, including:
          </h2>
          {
            bulletPoints.map((bullet , index)=>(
              <li
              key={index}
              className="flex items-center py-2 " >
                <Image
                width={10}
                height={10}
                src="/Rectangle 99.svg"/>
                <span className="px-2">{bullet.pt}</span>
              </li>
            ))
          }
        </div>

        {/* Section: Sharing of Information */}
        <div>
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Sharing of Information
          </h2>
          <p className=" leading-relaxed py-2">
            We may share your information with third-party service providers who help us operate our website and conduct our business. These service providers are contractually obligated to keep your information confidential and secure.
          </p>
          <p className="py-2 leading-relaxed">
            We will not share your personal information with any third-party advertisers or marketing companies without your consent.
          </p>
        </div>

        {/* Section: Data Security */}
        <div className="py-4">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Data Security
          </h2>
          <p className="leading-relaxed">
            We take reasonable precautions to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure. We cannot guarantee the security of your information.
          </p>
        </div>

        {/* Section: Changes to This Privacy Policy */}
        <div>
          <h2 className="text-lg font-semibold text-secondary py-4">
            Changes to This Privacy Policy
          </h2>
          <p className="py-2 leading-relaxed">
            We take reasonable precautions to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure. We cannot guarantee the security of your information.
          </p>
        </div>

        {/* Section: Contact Us */}
        <div>
          <h2 className="text-lg font-semibold text-secondary py-4">
            Contact Us
          </h2>
          <p className="py-2 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us by email at [enquiry@triumfous] 
          </p>
        </div>
      </section>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Page;
