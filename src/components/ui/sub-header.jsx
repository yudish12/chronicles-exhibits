import HeaderBtns from "@/app/(landing)/nav-btns";
import { PhoneCallIcon } from "lucide-react";
import Image from "next/image";
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
          <Image alt="pinterest" src="/facebook.svg" width={30} height={30} />
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/youtube.svg" width={30} height={30} />
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/twitter.svg" width={30} height={30} />
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/linkedin.svg" width={30} height={30} />
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/pinterest.svg" width={30} height={30} />
        </SocialIconContainer>
      </div>
      <div className="flex items-center w-full justify-end sm:w-[320px] md:gap-0 gap-4">
        <HeaderBtns />
      </div>
    </div>
  );
};

export default SubHeader;
