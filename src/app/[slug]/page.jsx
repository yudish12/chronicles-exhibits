import { getSingleBlog } from "@/server/actions/blogs";
import React from "react";
import Blogpage from "../blogs/[blog_id]/page";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const resp = await getSingleBlog({ slug });

  if (resp.data) {
    return <Blogpage />;
  }

  return <div>Page</div>;
};

export default Page;
