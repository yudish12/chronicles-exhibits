"use client";
import React, { useState } from "react";
import { updateData } from "@/server/actions/blogs";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CkeEditor from "@/components/CkEditor";

const EditBlog = ({ singleBlog }) => {
  const [blog, setBlog] = useState(singleBlog);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(blog._id, {
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      image_alt_text: blog.image_alt_text,
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 p-8 gap-y-6 w-full">
      <form onSubmit={handleEditSubmit} className="w-full flex flex-col justify-around gap-y-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Edit Blog Data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-4 block">Title</Label>
              <Input
                className="rounded-sm"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Slug</Label>
              <Input
                className="rounded-sm"
                value={blog.slug}
                onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
                required
                title="No spaces, only lowercase letters and dashes"
              />
            </div>
            <div>
              <Label className="mb-4 block">Icon</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setBlog({ ...blog, image: res[0]?.url || "" });
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
              <Label className="mb-4 block">Icon Alt Text</Label>
              <Input
                className="rounded-sm"
                value={blog.image_alt_text}
                onChange={(e) =>
                  setBlog({ ...blog, image_alt_text: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Short description</Label>
              <Input
                className="rounded-sm"
                value={blog.short_description}
                onChange={(e) =>
                  setBlog({ ...blog, short_description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Long description</Label>
              <Input
                className="rounded-sm"
                value={blog.long_description}
                onChange={(e) =>
                  setBlog({ ...blog, long_description: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={blog.body}
                onChange={(value) => {
                  setBlog({ ...blog, body: value });
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Edit SEO Data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <div>
              <Label className="mb-4 block">Meta Title</Label>
              <Input
                className="rounded-sm"
                value={blog.meta_title}
                onChange={(e) =>
                  setBlog({ ...blog, meta_title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Meta Description</Label>
              <Input
                className="rounded-sm"
                value={blog.meta_description}
                onChange={(e) =>
                  setBlog({ ...blog, meta_description: e.target.value })
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-end justify-end mb-4 gap-x-4">
          <Button
            type="submit"
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
