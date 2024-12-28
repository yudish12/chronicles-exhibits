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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAllBlogs, deleteData } from "@/server/actions/blogs";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
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

  const handleDeleteConfirm = async () => {
    try {
      const resp = await deleteData(deletingBlogId);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== deletingBlogId)
      );
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
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold ">Blogs</h1>
        <Button
          onClick={() => {
            // setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
            // setIsDialogOpen(true);
            router.push("/admin/blogs/add");
          }}
        >
          Add Blog
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={blog._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={blog.image}
                    alt={blog.title}
                    className=" object-cover rounded"
                  />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.short_description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {blog.title}</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        // setSingleBlog(blog);
                        // setIsEditDialogOpen(true);
                        // console.log('blog:', blog);
                        // console.log('blog._id:', blog?._id);
                        router.push(`/admin/blogs/edit/${blog._id}`);
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
      </Card>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
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
