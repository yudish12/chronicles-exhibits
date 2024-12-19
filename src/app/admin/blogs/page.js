"use client";
import * as React from "react";

// import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@uploadthing/react";
import { toast } from "sonner";
// import ReactQuill from "react-quill"; // Import Quill
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { getAllBlogs , updateData , addData , deleteData} from "@/server/actions/blogs";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Blogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [singleBlog, setSingleBlog] = React.useState({
//     title: "",
//     short_description: "",
//     long_description: "",
//     image: "",
//   });
//   const [deletingBlogId, setDeletingBlogId] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const router = useRouter();
const [blogs, setBlogs] = React.useState([]);
const [loading, setLoading] = React.useState(true);
const [singleBlog, setSingleBlog] = React.useState(null);
const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
const [isDialogOpen, setIsDialogOpen] = React.useState(false);
const [deletingBlogId, setDeletingBlogId] = React.useState(null);

  const fetchData = async () => {
    try {
      const resp = await getAllBlogs();
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setBlogs(resp.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    }
  };

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateData(singleBlog._id, singleBlog);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog._id === singleBlog._id ? resp.data : blog))
      );
      toast.success("Blog updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const resp = await deleteData(deletingBlogId);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== deletingBlogId));
      toast.success("Blog deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>
        <Button
          onClick={() => {
            // setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
            // setIsDialogOpen(true);
            router.push('/admin/blogs/add')
          }}
        >
          Add Blog
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.short_description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toast.info(blog.long_description)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View {blog.title}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSingleBlog(blog);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {blog.title}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setDeletingBlogId(blog._id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {blog.title}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen || isEditDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Edit Blog" : "Add Blog"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Title</Label>
                <Input
                  value={singleBlog?.title || ""}
                  onChange={(e) => setSingleBlog({ ...singleBlog, title: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Short Description</Label>
                <Input
                  value={singleBlog?.short_description || ""}
                  onChange={(e) =>
                    setSingleBlog({ ...singleBlog, short_description: e.target.value })
                  }
                  required
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label>Long Description</Label>
                <Input
                  value={singleBlog?.long_description || ""}
                  onChange={(e) =>
                    setSingleBlog({ ...singleBlog, long_description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Image</Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                        console.log("Upload response:", res);
                        setSingleBlog({ ...singleBlog, image: res[0].url });
                        toast.success("Image uploaded successfully");
                      } else {
                        toast.error("Upload failed: No file returned.");
                      }
                  }}
                  onUploadError={(error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
                {singleBlog?.image && (
                    <img
                      src={singleBlog.image}
                      alt="Blog Image"
                      className="mt-2 w-16 h-16 object-cover rounded"
                    />
                  )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditDialogOpen ? "Update Blog" : "Add Blog"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}







// quill code 
// "use client";
// import * as React from "react";

// // import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { UploadButton } from "@uploadthing/react";
// import { toast } from "sonner";
// import ReactQuill from "react-quill"; // Import Quill
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS
// import { getAllBlogs , updateData , addData , deleteData} from "@/server/actions/blogs";
// import TableSkeletonLoader from "@/components/loaders/table-skeleton";
// import { Pencil, Trash2, Eye } from "lucide-react";
// export default function Blogs() {
// const [blogs, setBlogs] = React.useState([]);
// const [loading, setLoading] = React.useState(true);
// const [singleBlog, setSingleBlog] = React.useState(null);
// const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
// const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
// const [isDialogOpen, setIsDialogOpen] = React.useState(false);
// const [deletingBlogId, setDeletingBlogId] = React.useState(null);

//   const fetchData = async () => {
//     try {
//       const resp = await getAllBlogs();
//       if (!resp.success) {
//         toast.error(resp.error);
//         return;
//       }
//       setBlogs(resp.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch blogs");
//     }
//   };

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const resp = await addData(singleBlog);
//       console.log("add data response" , resp)
//       if (!resp.success) {
//         toast.error(resp.error);
//         return;
//       }
//       setBlogs((prevBlogs) => [...prevBlogs, resp.data]);
//       toast.success("Blog added successfully");
//       setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
//       setIsDialogOpen(false);
//     } catch (error) {
//       toast.error("Failed to add blog");
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const resp = await updateData(singleBlog._id, singleBlog);
//       if (!resp.success) {
//         toast.error(resp.error);
//         return;
//       }
//       setBlogs((prevBlogs) =>
//         prevBlogs.map((blog) => (blog._id === singleBlog._id ? resp.data : blog))
//       );
//       toast.success("Blog updated successfully");
//       setIsEditDialogOpen(false);
//     } catch (error) {
//       toast.error("Failed to update blog");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       const resp = await deleteData(deletingBlogId);
//       if (!resp.success) {
//         toast.error(resp.error);
//         return;
//       }
//       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== deletingBlogId));
//       toast.success("Blog deleted successfully");
//       setIsDeleteDialogOpen(false);
//     } catch (error) {
//       toast.error("Failed to delete blog");
//     }
//   };

//   React.useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return <TableSkeletonLoader />;
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-bold mb-4">Blogs</h1>
//         <Button
//           onClick={() => {
//             setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
//             setIsDialogOpen(true);
//           }}
//         >
//           Add Blog
//         </Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Title</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {blogs.map((blog) => (
//               <TableRow key={blog._id}>
//                 <TableCell>
//                   <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded" />
//                 </TableCell>
//                 <TableCell>{blog.title}</TableCell>
//                 <TableCell>{blog.short_description}</TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex justify-end space-x-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => toast.info(blog.long_description)}
//                     >
//                       <Eye className="h-4 w-4" />
//                       <span className="sr-only">View {blog.title}</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => {
//                         setSingleBlog(blog);
//                         setIsEditDialogOpen(true);
//                       }}
//                     >
//                       <Pencil className="h-4 w-4" />
//                       <span className="sr-only">Edit {blog.title}</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => {
//                         setDeletingBlogId(blog._id);
//                         setIsDeleteDialogOpen(true);
//                       }}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       <span className="sr-only">Delete {blog.title}</span>
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Add/Edit Dialog */}
//       <Dialog open={isDialogOpen || isEditDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{isEditDialogOpen ? "Edit Blog" : "Add Blog"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label>Title</Label>
//                 <Input
//                   value={singleBlog?.title || ""}
//                   onChange={(e) => setSingleBlog({ ...singleBlog, title: e.target.value })}
//                   required
//                   className="col-span-3"
//                 />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label>Short Description</Label>
//                 <Input
//                   value={singleBlog?.short_description || ""}
//                   onChange={(e) =>
//                     setSingleBlog({ ...singleBlog, short_description: e.target.value })
//                   }
//                   required
//                   className="col-span-3"
//                 />
//               </div>

//               <div className="grid grid-cols-4 items-start gap-4">
//                     <Label>Long Description</Label>
//                     <div className="col-span-3">
//                     <ReactQuill
//                     theme="snow"
//                     value={singleBlog?.long_description || ""}
//                     onChange={(value) =>
//                     setSingleBlog({ ...singleBlog, long_description: value })
//                     }
//                     />
//                     </div>
//                     </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label>Image</Label>
//                 <UploadButton
//                   endpoint="imageUploader"
//                   onClientUploadComplete={(res) => {
//                     if (res && res.length > 0) {
//                         console.log("Upload response:", res);
//                         setSingleBlog({ ...singleBlog, image: res[0].url });
//                         toast.success("Image uploaded successfully");
//                       } else {
//                         toast.error("Upload failed: No file returned.");
//                       }
//                   }}
//                   onUploadError={(error) => {
//                     toast.error(`Upload failed: ${error.message}`);
//                   }}
//                 />
//                 {singleBlog?.image && (
//                     <img
//                       src={singleBlog.image}
//                       alt="Blog Image"
//                       className="mt-2 w-16 h-16 object-cover rounded"
//                     />
//                   )}
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit">
//                 {isEditDialogOpen ? "Update Blog" : "Add Blog"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Blog</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this blog? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteConfirm}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }