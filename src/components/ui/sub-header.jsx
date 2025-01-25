import HeaderBtns from "@/app/(landing)/nav-btns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SocialIconContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-white text-opacity-60">
      {children}
    </div>
  );
};

const SubHeader = () => {
  return (
    <div className="bg-white w-full flex justify-between items-center py-3 px-6 sm:px-8 md:px-12 lg:px-20  gap-4">
      <div className="hidden sm:flex items-center gap-3">
        <SocialIconContainer>
          <Link href={"https://www.facebook.com/chronicleexhibits"}>
            <Image alt="facebook" src="/facebook.svg" width={30} height={30} />
          </Link>
        </SocialIconContainer>
        <SocialIconContainer>
          <Link href={"https://www.youtube.com/@Chronicleexhibitsllc"}>
            <Image alt="youtube" src="/youtube.svg" width={30} height={30} />
          </Link>
        </SocialIconContainer>
        <SocialIconContainer>
          <Link href={"https://x.com/chroniclexhibit/"}>
            <Image alt="twitter" src="/twitter.svg" width={30} height={30} />
          </Link>
        </SocialIconContainer>
        <SocialIconContainer>
          <Link
            href={"https://www.linkedin.com/company/chronicle-exhibits-llc/"}
          >
            <Image alt="linkedin" src="/linkedin.svg" width={30} height={30} />
          </Link>
        </SocialIconContainer>
        <SocialIconContainer>
          <Link href={"https://www.instagram.com/chronicleexhibits/"}>
            <Image
              alt="pinterest"
              src="/insta.svg"
              width={30}
              height={30}
            />
          </Link>
        </SocialIconContainer>
      </div>
      <div className="flex items-center justify-between w-full sm:justify-normal sm:w-[320px] gap-6">
        <SocialIconContainer>
          <Image alt="pinterest" src="/phone.svg" width={20} height={20} />
          <span className="text-sm text-secondary font-medium">
            +91 9876543210
          </span>
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/mail.svg" width={20} height={20} />
          <span className="text-sm text-secondary font-medium">
            {" "}
            xabysb@gmail.com
          </span>
        </SocialIconContainer>
      </div>
    </div>
  );
};

export default SubHeader;
