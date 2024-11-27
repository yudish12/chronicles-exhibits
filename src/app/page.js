import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Hero from "./(landing)/Hero";
import About from "./(landing)/About";
import Footer from "@/components/ui/footer";
import Products from "./(landing)/Products";
import FactsAndFigures from "./(landing)/FactsAndFigures";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Header />
      <Hero />
      <About/>
      <Products/>
      <FactsAndFigures/>
      <Footer />
    </>
  );
}
