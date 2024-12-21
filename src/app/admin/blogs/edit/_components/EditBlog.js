"use client";
import { useState } from "react";
import { updateData } from "@/server/actions/blogs";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import CkeEditor from "@/components/CkEditor";

const EditBlog = ({ singleBlog }) => {
  const [blog, setBlog] = useState(singleBlog);
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(blog._id, {
      title: blog.title,
      slug: blog.slug,
      icon: blog.icon,
      icon_alt_text: blog.icon_alt_text,
      short_description: blog.short_description,
      long_description: blog.long_description,
      body: blog.body,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    toast.success("Blog updated successfully");
  };
  return (
    <>
      <form onSubmit={handleEditSubmit} className="w-full bg-white p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Title</Label>
            <Input
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              value={blog.slug}
              onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
              required
              title="No spaces, only lowercase letters and dashes"
            />
          </div>
          <div>
            <Label>Icon</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setBlog({
                  ...blog,
                  image: res[0]?.url || "",
                });
                toast.success("Icon uploaded successfully");
              }}
              onUploadError={(error) =>
                toast.error(`Upload failed: ${error.message}`)
              }
            />
            {blog.image && (
              <img
                src={blog.image}
                alt="Blog Icon"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>
          <div>
            <Label>Image Alt Text</Label>
            <Input
              value={blog.image_alt_text}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  image_alt_text: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label>Short description</Label>
            <Input
              value={blog.short_description}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  short_description: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label>Long description</Label>
            <Input
              value={blog.long_description}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  long_description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="col-span-2">
            <Label>Body</Label>
            <CkeEditor
              value={blog.body}
              onChange={(value) => {
                setBlog({ ...blog, body: value });
              }}
            />
          </div>
          <div>
            <Label>Meta Title</Label>
            <Input
              value={blog.meta_title}
              onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Input
              value={blog.meta_description}
              onChange={(e) =>
                setBlog({
                  ...blog,
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
            Edit Blog
          </Button>
        </div>
      </form>
    </>
  );
};
export default EditBlog;
