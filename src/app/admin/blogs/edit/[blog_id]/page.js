import { findBlogById } from "@/server/actions/blogs";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@uploadthing/react";
import EditBlog from "../_components/EditBlog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = async ({ params }) => {
  console.log("params:", params); // E
  const { blog_id: blogId } = params;
  const blogResponse = await findBlogById({ _id: blogId });
  console.log("blog res", blogResponse);
  let singleBlog = blogResponse.data[0];
  console.log("blogId:", blogId);
  return (
    <>
      <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
        <EditBlog singleBlog={singleBlog} />
      </div>
    </>
  );
};
export default Page;
