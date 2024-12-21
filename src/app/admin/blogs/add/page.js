"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@uploadthing/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
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
import CkeEditor from "@/components/CkEditor";

const AddBlogPage = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [singleBlog, setSingleBlog] = React.useState({
    title: "",
    short_description: "",
    long_description: "",
    image: "",
    slug: "",
    image_alt_text: "",
    meta_title: "",
    meta_description: "",
    body: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBlog);
      console.log("Add data response:", resp);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      //   setBlogs((prevBlogs) => [...prevBlogs, resp.data]);
      toast.success("Blog added successfully");
      setSingleBlog({
        title: "",
        short_description: "",
        long_description: "",
        image: "",
        slug: "",
        image_alt_text: "",
        meta_title: "",
        meta_description: "",
        body: "",
      });
    } catch (error) {
      console.log("error==", error);
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8 px-4 overflow-auto w-full">
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
            <CkeEditor
              value={singleBlog.body}
              onChange={(value) => {
                setSingleBlog({ ...singleBlog, body: value });
              }}
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
    </div>
  );
};

export default AddBlogPage;

// () => {
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   return (
//     <>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         selectsStart
//         showIcon
//         startDate={startDate}
//         endDate={endDate}
//       />
//       <DatePicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         selectsEnd
//         showIcon
//         startDate={startDate}
//         endDate={endDate}
//         minDate={startDate}
//       />
//     </>
//   );
// };
{
  /* <div className="flex flex-col">
          <Label>Start Date</Label>
          <DatePicker
            selected={event.start_date}
            onChange={(date) => setEvent({ ...event, start_date: date })}
            selectsStart
            showIcon
            startDate={event.start_date}
            endDate={event.end_date}
          />
        </div>

        <div>
          <Label>End Date</Label>
          <DatePicker
            selected={event.end_date}
            onChange={(date) => setEvent({ ...event, end_date: date })}
            selectsEnd
            showIcon
            startDate={event.start_date}
            endDate={event.end_date}
            minDate={event.start_date}
          />
        </div> */
}
