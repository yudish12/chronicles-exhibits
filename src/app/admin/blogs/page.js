"use client";
import React, { useState, useEffect } from "react";
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
import {
  getAllBlogs,
  deleteData,
  getAllDataBySearch,
} from "@/server/actions/blogs";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "./_components/Pagination";
import Search from "@/components/ui/search";
import { Badge } from "@/components/ui/badge"
export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState(null);
  const [searchValue, setSearchValue] = React.useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6; // Number of blogs per page

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      const resp = await getAllBlogs({},skip, limit, "slug  _id title image isDraft");
      console.log("resp", resp);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }

      setBlogs(resp.data);
      setTotalPages(Math.ceil(resp.count / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
      setLoading(false);
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

  const handleSearchClick = async () => {
    if (!searchValue) return fetchData();
    try {
      const searchResp = await getAllDataBySearch(searchValue);
      console.log("===searchResp===", searchResp);
      setBlogs(searchResp.data);
      const count = searchResp.count ?? 0;
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  // Fetch data on mount and when page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold ">Blogs</h1>
        <Button
          onClick={() => {
            router.push("/admin/blogs/add");
          }}
        >
          Add Blog
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <CardHeader className="flex mb-4 flex-row gap-6">
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            onClick={handleSearchClick}
            variant="outline"
            style={{ marginTop: "0px", height: "35px" }}
            className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
          >
            Search
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Blog Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={blog._id}>
                <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                <TableCell>
                  <Image
loading="eager"
                    width={100}
                    height={100}
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.short_description}</TableCell>
                <TableCell><Badge className={'text-white p-2 px-6 mx-auto  w-max rounded-lg'}>{blog.isDraft === "true" ? "Draft" : "Published" }</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/${blog.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {blog.title}</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/blogs/edit/${blog._id}`}>
                      <Button
                        variant="outline"
                        size="icon"

                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {blog.title}</span>
                      </Button>
                    </Link>
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
