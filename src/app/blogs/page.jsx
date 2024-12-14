import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import BlogsPagination from "./blogsWithpagination";
import { getAllBlogs } from "@/server/actions/blogs";

const Page = async () => {
  //fetch blogs from server action
  let blogs = await getAllBlogs()
  return (
    <>
      <SubHeader />
      <Header />
      <BlogsPagination blogs={blogs.data} />
      <Footer />
    </>
  );
};

export default Page;
