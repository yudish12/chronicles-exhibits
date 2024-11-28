import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Hero from "./(landing)/Hero";
import About from "./(landing)/About";
import Footer from "@/components/ui/footer";
import Products from "./(landing)/Products";
import Faq from "./(landing)/Faq";
import Leadingtrade from "./(landing)/Leadingtrade";
import Ourworks from "./(landing)/Ourworks";
import FactsAndFigures from "./(landing)/FactsAndFigures";
import Queryform from "./(landing)/Queryform";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Header />
      <Hero />
      <About />
      <Products />
      <FactsAndFigures />
      <Ourworks />
      <Leadingtrade />
      <Faq />
      <Queryform />
      <Footer />
    </>
  );
}
