import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import BlogsPagination from "./blogsWithpagination";
import { getAllBlogs } from "@/server/actions/blogs";

const Page = async ({ params, searchParams }) => {
  const searchparams = await searchParams;
  const page = Number(searchparams?.page) ?? 1;
  const limit = 6;

  const skip = (page - 1) * limit;

  const blogs = await getAllBlogs(
    skip,
    limit,
    "name title slug image image_alt_text"
  );

  console.log(blogs);

  const totalPages = Math.ceil(blogs.count / limit);

  return (
    <>
      <SubHeader />
      <Header />
      <BlogsPagination
        currentPage={page}
        limit={limit}
        totalPages={totalPages}
        blogs={blogs.data}
      />
      <Footer />
    </>
  );
};

export default Page;
