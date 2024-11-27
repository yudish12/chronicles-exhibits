import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Hero from "./(landing)/Hero";
import About from "./(landing)/About";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Header />
      <Hero />
      <About/>
      <Footer />
    </>
  );
}
