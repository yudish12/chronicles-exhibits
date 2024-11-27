import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Hero from "./(landing)/Hero";
import About from "./(landing)/About";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Header />
      <Hero />
      <About/>
    </>
  );
}
