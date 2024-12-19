"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addData } from "@/server/actions/blogs";
const page = ()=>{
const [blogs, setBlogs] = React.useState([]);
const [singleBlog, setSingleBlog] = React.useState(null);
const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBlog);
      console.log("add data response" , resp)
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setBlogs((prevBlogs) => [...prevBlogs, resp.data]);
      toast.success("Blog added successfully");
      setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add blog");
    }
  };
return (
    <>
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-8 px-4 overflow-auto w-full ">
      <h1 className="text-2xl font-bold text-center mb-6">Add Event</h1>
      <form onSubmit={handleAddSubmit} className="w-full max-w-3xl bg-white p-6 shadow-md rounded-lg">
        <div className="grid gap-6">
          <div>
            <Label>Title</Label>
            <Input
                  value={singleBlog?.title || ""}
                  onChange={(e) => setSingleBlog({ ...singleBlog, title: e.target.value })}
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
              pattern="^[a-z0-9-]+$"
              title="No spaces, only lowercase letters and dashes"
            />
          </div>

          <div>
            <Label>Body</Label>
            <Textarea
              value={singleBlog.body}
              onChange={(e) =>
                setSingleBlog({ ...singleBlog, body: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              value={singleEvent.country}
              onChange={(e) =>
                setSingleBlog({ ...singleEvent, country: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              value={singleEvent.city}
              onChange={(e) =>
                setSingleBlog({ ...singleEvent, city: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Location</Label>
            <Select
              value={singleEvent.location_id}
              onValueChange={(value) =>
                setSingleBlog({ ...singleEvent, location_id: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location._id} value={location._id}>
                    {`${location.city}, ${location.country}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Textarea
              rows={4}
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
                src={singleBlog.icon}
                alt="Event Icon"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Add Blog
        </Button>
      </form>
    </div>
    </>
)
}

export default page;