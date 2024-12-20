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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditBlog = ({singleBlog}) =>{

    const [blog, setBlog] = useState(singleBlog);
    const handleEditSubmit = async (e)=>{
        e.preventDefault();
        const resp = await updateData(blog._id , {
            title : blog.title,
            slug : blog.slug,
            icon: blog.icon,
            icon_alt_text: blog.icon_alt_text,
            short_description: blog.short_description,
            long_description: blog.long_description,
            body: blog.body,
            meta_title: blog.meta_title,
            meta_description : blog.meta_description,
        })
        if (!resp.success) {
            toast.error(resp.err);
            return;
          }
      
          toast.success("Blog updated successfully");
    }
    return (
        <>
    <form onSubmit={handleEditSubmit} className="w-full bg-white p-6">
  <div className="grid grid-cols-2 gap-6">
    <div>
      <Label>Title</Label>
      <Input
        value={blog.title}
        onChange={(e) =>
          setBlog({ ...blog, title: e.target.value })
        }
        required
      />
    </div>
    <div>
      <Label>Slug</Label>
      <Input
        value={blog.slug}
        onChange={(e) =>
          setBlog({ ...blog, slug: e.target.value })
        }
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
      <ReactQuill
        theme="snow"
        value={blog.body}
        onChange={(value) =>
          setBlog({ ...blog, body: value })
        }
      />
    </div>
    <div>
      <Label>Meta Title</Label>
      <Input
        value={blog.meta_title}
        onChange={(e) =>
          setBlog({ ...blog, meta_title: e.target.value })
        }
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
    )

}
export default EditBlog




// return (
//     <>
//   <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8 px-4 overflow-auto w-full">
//   <h1 className="text-2xl font-bold text-center mb-6">Add Blog</h1>
//   <form onSubmit={handleAddSubmit} className="w-full bg-white p-6">
//     <div className="grid grid-cols-2 gap-6">
//       <div>
//         <Label>Title</Label>
//         <Input
//           value={Blog.title}
//           onChange={(e) =>
//             setSingleBlog({ ...singleBlog, title: e.target.value })
//           }
//           required
//         />
//       </div>
//       <div>
//         <Label>Slug</Label>
//         <Input
//           value={singleBlog.slug}
//           onChange={(e) =>
//             setSingleBlog({ ...singleBlog, slug: e.target.value })
//           }
//           required
//         //   pattern="^[a-z0-9-]+$"
//           title="No spaces, only lowercase letters and dashes"
//         />
//       </div>
//       <div>
//         <Label>Icon</Label>
//         <UploadButton
//           endpoint="imageUploader"
//           onClientUploadComplete={(res) => {
//             setSingleBlog({
//               ...singleBlog,
//               image: res[0]?.url || "",
//             });
//             toast.success("Icon uploaded successfully");
//           }}
//           onUploadError={(error) =>
//             toast.error(`Upload failed: ${error.message}`)
//           }
//         />
//         {singleBlog.image && (
//           <img
//             src={singleBlog.image}
//             alt="Blog Icon"
//             className="mt-2 w-16 h-16 object-cover rounded"
//           />
//         )}
//       </div>
//       <div>
//         <Label>Icon Alt Text</Label>
//         <Input
//           value={singleBlog.image_alt_text}
//           onChange={(e) =>
//             setSingleBlog({
//               ...singleBlog,
//               image_alt_text: e.target.value,
//             })
//           }
//           required
//         />
//       </div>
//       <div>
//         <Label>Short description</Label>
//         <Input
//           value={singleBlog.short_description}
//           onChange={(e) =>
//             setSingleBlog({
//               ...singleBlog,
//               short_description: e.target.value,
//             })
//           }
//           required
//         />
//       </div>
//       <div>
//         <Label>Long description</Label>
//         <Input
//           value={singleBlog.long_description}
//           onChange={(e) =>
//             setSingleBlog({
//               ...singleBlog,
//               long_description: e.target.value,
//             })
//           }
//           required
//         />
//       </div>
//       <div className="col-span-2">
//         <Label>Body</Label>
//         <ReactQuill
//           theme="snow"
//           value={singleBlog.body}
//           onChange={(value) =>
//             setSingleBlog({ ...singleBlog, body: value })
//           }
//         />
//       </div>
//       <div>
//         <Label>Meta Title</Label>
//         <Input
//           value={singleBlog.meta_title}
//           onChange={(e) =>
//             setSingleBlog({ ...singleBlog, meta_title: e.target.value })
//           }
//           required
//         />
//       </div>
//       <div>
//         <Label>Meta Description</Label>
//         <Input
//           value={singleBlog.meta_description}
//           onChange={(e) =>
//             setSingleBlog({
//               ...singleBlog,
//               meta_description: e.target.value,
//             })
//           }
//           required
//         />
//       </div>
//     </div>
//     <div className="mt-4">
//       <Button
//         type="submit"
//         variant="outline"
//         className="border-secondary bg-secondary text-white font-semibold px-4 py-2 mr-4"
//       >
//         Add Blog
//       </Button>
//       <Button
//         variant="outline"
//         className="border-secondary bg-secondary text-white font-semibold px-4 py-2"
//       >
//         Save Draft
//       </Button>
//     </div>
//   </form>
// </div>

//     </>
// )