"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addData } from "@/server/actions/blogs";
import CkeEditor from "@/components/CkEditor";
import { Trash2 } from "lucide-react";

const AddBlogPage = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [singleBlog, setSingleBlog] = React.useState({
    title: "",
    image: "",
    slug: "",
    image_alt_text: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    body: "",
    blog_count: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBlog);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      toast.success("Blog added successfully");
      setSingleBlog({
        title: "",
        image: "",
        slug: "",
        image_alt_text: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        body: "",
        blog_count: "",
      });
    } catch (error) {
      console.log("error==", error);
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col justify-around gap-y-10  "
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Add Page Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-4 block">Title</Label>
              <Input
                className="rounded-sm"
                value={singleBlog.title}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Slug</Label>
              <Input
                className="rounded-sm"
                value={singleBlog.slug}
                onChange={(e) =>
                  setSingleBlog({
                    ...singleBlog,
                    slug: e.target.value.replace(" ", "-").toLowerCase(),
                  })
                }
                required
                title="No spaces, only lowercase letters and dashes"
              />
            </div>
            <div>
              <Label className="mb-4 block">Icon</Label>
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
                <div className="relative w-max">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute z-50 top-1 -right-8 w-6 h-6"
                    onClick={() => {
                      console.log(
                        singleBlog.image.split("f/")[1],
                        singleBlog.image
                      );
                      const res = deleteUTFiles([
                        singleBlog.image.split("f/")[1],
                      ]);
                      setSingleBlog({
                        ...singleBlog,
                        image: null,
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <img
                    src={singleBlog.image}
                    alt="Event Icon"
                    className="mt-2 w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <Label className="mb-4 block">Icon Alt Text</Label>
              <Input
                className="rounded-sm"
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
              <Label className="mb-4 block">Blog Count</Label>
              <Input
                type="number"
                className="rounded-sm"
                value={singleBlog.blog_count}
                onChange={(e) =>
                  setSingleBlog({
                    ...singleBlog,
                    blog_count: e.target.value,
                  })
                }
                min="0"
                step="1"
                required
              />
            </div>

            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={singleBlog.body}
                onChange={(value) => {
                  setSingleBlog({ ...singleBlog, body: value });
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Add SEO Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <div>
              <Label className="mb-4 block">Meta Title</Label>
              <Input
                className="rounded-sm"
                value={singleBlog.meta_title}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, meta_title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Meta Description</Label>
              <Input
                className="rounded-sm"
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
            <div>
              <Label className="mb-4 block">Meta Keywords</Label>
              <TagsInput
                value={singleBlog.meta_keywords}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, meta_keywords: e })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-end justify-end mb-4 gap-x-4 ">
          <Button
            type="submit"
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Add Blog
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
