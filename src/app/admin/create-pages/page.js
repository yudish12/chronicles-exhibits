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
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { deleteData, getAllPages } from "@/server/actions/pages";
import Link from "next/link";
export default function CreatePages() {
  const router = useRouter();
  const [pages, setPages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletePageId, setDeletingPageId] = React.useState(null);
  const fetchData = async () => {
    try {
      const resp = await getAllPages();
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setPages(resp.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const resp = await deleteData(deletePageId);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setPages((prev) => prev.filter((page) => page._id !== deletePageId));
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
        <h1 className="text-2xl font-bold ">Pages</h1>
        <Button
          onClick={() => {
            // setSingleBlog({ title: "", short_description: "", long_description: "", image: "" });
            // setIsDialogOpen(true);
            router.push("/admin/create-pages/add");
          }}
        >
          Add Page
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead>Meta Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <TableRow key={page._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{page.name}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.meta_title}</TableCell>
                <TableCell>{page.meta_description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/${page.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {page.name}</span>
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
                        router.push(`/admin/create-pages/edit/${page._id}/`);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {page.name}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setDeletingPageId(page._id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {page.name}</span>
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
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be
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
