import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import EnquiryForm from "../Form";
import ScheduleCallForm from "../ScheduleCallForm";
import { Button } from "./button";
import GetFreeDesignForm from "../GetFreeDesignForm";

const SocialIconContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-white text-opacity-60">
      {children}
    </div>
  );
};

export default function Footer() {
  return (
    <div className="bg-secondary py-6 px-8 md:py-10 md:px-12 sm:px-8 lg:px-20">
      <div className=" py-8 md:py-10 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 text-white/80">
        {/* Company Section */}
        <div>
          <h3 className="font-semibold text-base mb-4 text-primary text-xl">
            Company
          </h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline text-lg" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/services">
                Our Services
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-displays-designs"
              >
                Trade Show Booth Ideas
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/faq">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/top-trade-shows">
                Top Trade Shows
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/contact-us">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-lg" href="/about-us">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        {/* Location Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary text-xl">
            Location
          </h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-las-vegas"
              >
                Las Vegas
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-chicago"
              >
                Chicago
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-orlando"
              >
                Orlando
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-anaheim"
              >
                Anaheim
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-san-diego"
              >
                San Diego
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-los-angeles"
              >
                Los Angeles
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-atlanta"
              >
                Atlanta
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/trade-show-booth-rentals-new-york"
              >
                New York
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                as="/major-exhibiting-cities/"
                href="/major-exhibiting-cities"
              >
                View More Cities
              </Link>
            </li>
          </ul>
        </div>
        {/* Booth By Size Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary text-xl">
            Booth By Size
          </h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link
                className="hover:underline text-lg"
                href="/10x10-trade-show-booth"
              >
                10x10 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/10x20-trade-show-booth"
              >
                10x20 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/10x30-trade-show-booth"
              >
                10x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/20x20-trade-show-booth"
              >
                20x20 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/20x30-trade-show-booth"
              >
                20x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/20x40-trade-show-booth"
              >
                20x40 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/30x30-trade-show-booth"
              >
                30x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/30x40-trade-show-booth"
              >
                30x40 Booth Rental
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-lg"
                href="/40x40-trade-show-booth"
              >
                40x40 Booth Rental
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary text-xl">
            Resources
          </h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline text-lg" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hover:underline cursor-pointer">
                    Get Quote
                  </div>
                </DialogTrigger>
                <DialogContent className="">
                  <EnquiryForm />
                </DialogContent>
              </Dialog>
              {/* <Link className="hover:underline text-lg" href="/get-booth-quotation">
                Get Booth Quotation
              </Link> */}
            </li>
            <li>
              {/* <Link className="hover:underline text-lg" href="/schedule-a-call">
                Schedule A Call
              </Link> */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hover:underline cursor-pointer">
                    Schedule A Call
                  </div>
                </DialogTrigger>
                <DialogContent className="">
                  <ScheduleCallForm />
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hover:underline cursor-pointer">
                    Get Free 3D Quotation
                  </div>
                </DialogTrigger>
                <DialogContent className="max-h-[700px] overflow-auto">
                  <GetFreeDesignForm />
                </DialogContent>
              </Dialog>
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3 text-primary">Address</h3>
            <p className="text-sm leading-relaxed">
              8465 W. Sahara Ave., Suite 111 Unit #1183
              <br />
              Las Vegas, NV 89117, <br />
              United States
            </p>
            <h3 className="font-bold text-lg my-4 text-primary">Follow Us</h3>
            <div className="flex items-center mt-4 gap-3">
              <SocialIconContainer>
                <Link href={"https://www.facebook.com/chronicleexhibits"}>
                  <Image
                    alt="facebook"
                    src="/facebook.svg"
                    width={30}
                    height={30}
                  />
                </Link>
              </SocialIconContainer>
              <SocialIconContainer>
                <Link href={"https://www.youtube.com/@Chronicleexhibitsllc"}>
                  <Image
                    alt="youtube"
                    src="/youtube.svg"
                    width={30}
                    height={30}
                  />
                </Link>
              </SocialIconContainer>
              <SocialIconContainer>
                <Link href={"https://x.com/chroniclexhibit/"}>
                  <Image
                    alt="twitter"
                    src="/twitter.svg"
                    width={30}
                    height={30}
                  />
                </Link>
              </SocialIconContainer>
              <SocialIconContainer>
                <Link
                  href={
                    "https://www.linkedin.com/company/chronicle-exhibits-llc/"
                  }
                >
                  <Image
                    alt="linkedin"
                    src="/linkedin.svg"
                    width={30}
                    height={30}
                  />
                </Link>
              </SocialIconContainer>
              <SocialIconContainer>
                <Link href={"https://www.instagram.com/chronicleexhibits/"}>
                  <Image
                    alt="pinterest"
                    src="/pinterest.svg"
                    width={30}
                    height={30}
                  />
                </Link>
              </SocialIconContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-auto">
        <div className="bg-secondary/[.94] w-full flex flex-wrap justify-between items-center gap-4">
          <span className="text-white/80 text-center xs:text-left text-sm mx-auto font-medium">
            © Copyright {new Date().getFullYear()}.{" "}
            <Link className="text-blue-600" href={"/privacy-policy"}>
              {" "}
              Chronicle Exhibit LLC{" "}
            </Link>{" "}
            Right Reserved.{" "}
            <Link className="text-blue-600" href={"/privacy-policy"}>
              {" "}
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
