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
    <div className="bg-secondary/[.94] w-full flex justify-between items-center py-3 px-4 sm:px-20  gap-4">
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
      <div className="flex items-center justify-between w-full sm:justify-normal sm:w-[320px] gap-6">
        <SocialIconContainer>
          <Image alt="pinterest" src="/phone.svg" width={20} height={20} />
          <span className="text-sm text-white font-medium">+91 9876543210</span>
        </SocialIconContainer>
        <SocialIconContainer>
          <Image alt="pinterest" src="/mail.svg" width={20} height={20} />
          <span className="text-sm text-white font-medium">
            {" "}
            xabysb@gmail.com
          </span>
        </SocialIconContainer>
      </div>
    </div>
  );
};

export default SubHeader;
