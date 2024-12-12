import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import BlogsPagination from "./blogsWithpagination";
export const blogs = [
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
  {
    title: "BIGGEST TRADE SHOWS IN VEGAS 2025",
    description:
      "Welcome to Chronicle, your prominent partner for trade show booth displays and exhibits. With 25+...",
    imageUrl: "/what-we-do-2.png",
  },
];

const Page = async () => {
  //fetch blogs from server action
  return (
    <>
      <SubHeader />
      <Header />
      <BlogsPagination blogs={blogs} />
      <Footer />
    </>
  );
};

export default Page;
