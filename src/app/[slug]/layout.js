import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <SubHeader />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
