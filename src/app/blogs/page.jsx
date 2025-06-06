import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

import BlogsPagination from "./blogsWithpagination";
import { getAllBlogs } from "@/server/actions/blogs";
import { notFound } from "next/navigation";
import { getSinglePage } from "@/server/actions/pages";

export const generateMetadata = async ({}) => {
  const { data } = await getSinglePage({ name: "blogs" });
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
    alternates: {
      canonical: `https://chronicleexhibits.com/blog`,
    },
  };
};

const Page = async ({ params, searchParams }) => {
  const searchparams = await searchParams;
  const page = Number(searchparams?.page) ?? 1;
  const limit = 10;

  const skip = (page - 1) * limit;

  const blogs = await getAllBlogs(
    { isDraft: "false" },
    skip,
    limit,
    "name title slug image image_alt_text body"
  );

  if (!blogs?.data) {
    notFound();
  }

  const totalPages = Math.ceil(blogs.count / limit);

  const { data } = await getSinglePage({ name: "blogs" });

  return (
    <>
      {/* {/* <  /> */}
      <Header />
      <BlogsPagination
        currentPage={page}
        limit={limit}
        totalPages={totalPages}
        pageData={data}
        blogs={blogs.data}
      />
      <Footer />
    </>
  );
};

export default Page;
