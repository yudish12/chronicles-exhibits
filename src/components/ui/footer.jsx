import Link from "next/link";
import Image from "next/image";

const SocialIconContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-white text-opacity-60">
      {children}
    </div>
  );
};

export default function Footer() {
  return (
    <div className="bg-secondary py-12 px-6 md:py-24 md:px-20">
      <div className="px-6 py-8 md:px-12 md:py-10 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20 text-white/80">
        {/* Company Section */}
        <div>
          <h3 className="font-semibold text-base mb-4">Company</h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/services">
                Our Services
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/trade-show-booth-ideas">
                Trade Show Booth Ideas
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/faqs">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/top-trade-shows">
                Top Trade Shows
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Booth By Size Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Booth By Size</h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline" href="/booth-rental/10x10">
                10x10 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/10x20">
                10x20 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/10x30">
                10x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/20x20">
                20x20 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/20x30">
                20x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/20x40">
                20x40 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/30x30">
                30x30 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/30x40">
                30x40 Booth Rental
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/booth-rental/40x40">
                40x40 Booth Rental
              </Link>
            </li>
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Location</h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline" href="/locations/las-vegas">
                Las Vegas
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/chicago">
                Chicago
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/orlando">
                Orlando
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/anaheim">
                Anaheim
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/san-diego">
                San Diego
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/los-angeles">
                Los Angeles
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/atlanta">
                Atlanta
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations/new-york">
                New York
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/locations">
                View More Cities
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2 footer-list">
            <li>
              <Link className="hover:underline" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/get-booth-quotation">
                Get Booth Quotation
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/schedule-a-call">
                Schedule A Call
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/get-free-3d-design">
                Get Free 3D Design
              </Link>
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3">Address</h3>
            <p className="text-sm leading-relaxed">
              500 N Rainbow Blvd Suite #300 <br />
              Las Vegas, NV 89107 <br />
              United States
            </p>
            <h3 className="font-bold text-lg my-4">Follow Us</h3>
            <div className="flex items-center mt-4 gap-3">
              <SocialIconContainer>
                <Image
                  alt="facebook"
                  src="/facebook.svg"
                  width={30}
                  height={30}
                />
              </SocialIconContainer>
              <SocialIconContainer>
                <Image
                  alt="youtube"
                  src="/youtube.svg"
                  width={30}
                  height={30}
                />
              </SocialIconContainer>
              <SocialIconContainer>
                <Image
                  alt="twitter"
                  src="/twitter.svg"
                  width={30}
                  height={30}
                />
              </SocialIconContainer>
              <SocialIconContainer>
                <Image
                  alt="linkedin"
                  src="/linkedin.svg"
                  width={30}
                  height={30}
                />
              </SocialIconContainer>
              <SocialIconContainer>
                <Image
                  alt="pinterest"
                  src="/pinterest.svg"
                  width={30}
                  height={30}
                />
              </SocialIconContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto">
        <div className="bg-secondary/[.94] w-full flex flex-wrap justify-between items-center gap-4">
          <span className="text-white/80 text-sm mx-auto font-medium">
            © Copyright 2024. Chronicle Exhibits LLC All Right Reserved. Privacy
            Policy
          </span>
        </div>
      </div>
    </div>
  );
}
