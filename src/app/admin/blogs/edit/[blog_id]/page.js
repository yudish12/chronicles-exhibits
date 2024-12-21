import { findBlogById } from "@/server/actions/blogs";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@uploadthing/react";
import EditBlog from "../_components/EditBlog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = async ({ params }) => {
    console.log('params:', params); // E
    const { blog_id: blogId } = params;
    const blogResponse = await findBlogById({ _id: blogId });
    console.log("blog res" , blogResponse)
    let singleBlog = blogResponse.data[0]
    console.log('blogId:', blogId);
    return (
        <>
      {/* <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8 px-4 overflow-auto w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Add Blog</h1>
      <form onSubmit={handleAddSubmit} className="w-full bg-white p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Title</Label>
            <Input
              value={singleBlog.title}
              onChange={(e) =>
                setSingleBlog({ ...singleBlog, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              value={singleBlog.slug}
              onChange={(e) =>
                setSingleBlog({ ...singleBlog, slug: e.target.value })
              }
              required
            //   pattern="^[a-z0-9-]+$"
              title="No spaces, only lowercase letters and dashes"
            />
          </div>
          <div>
            <Label>Icon</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setSingleBlog({
                  ...singleBlog,
                  image: res[0]?.url || "",
                });
                toast.success("Icon uploaded successfully");
              }}
              onUploadError={(error) =>
                toast.error(`Upload failed: ${error.message}`)
              }
            />
            {singleBlog.image && (
              <img
                src={singleBlog.image}
                alt="Blog Icon"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>
          <div>
            <Label>Icon Alt Text</Label>
            <Input
              value={singleBlog.image_alt_text}
              onChange={(e) =>
                setSingleBlog({
                  ...singleBlog,
                  image_alt_text: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label>Short description</Label>
            <Input
              value={singleBlog.short_description}
              onChange={(e) =>
                setSingleBlog({
                  ...singleBlog,
                  short_description: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label>Long description</Label>
            <Input
              value={singleBlog.long_description}
              onChange={(e) =>
                setSingleBlog({
                  ...singleBlog,
                  long_description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="col-span-2">
            <Label>Body</Label>
            <ReactQuill
              theme="snow"
              value={singleBlog.body}
              onChange={(value) =>
                setSingleBlog({ ...singleBlog, body: value })
              }
            />
          </div>
          <div>
            <Label>Meta Title</Label>
            <Input
              value={singleBlog.meta_title}
              onChange={(e) =>
                setSingleBlog({ ...singleBlog, meta_title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Input
              value={singleBlog.meta_description}
              onChange={(e) =>
                setSingleBlog({
                  ...singleBlog,
                  meta_description: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-2 mr-4"
          >
            Add Blog
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-2"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </div> */}
    
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 py-8 px-4 overflow-auto w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Blog</h1>
      <EditBlog singleBlog={singleBlog} />
    </div>

        </>
    )


}
export default Page