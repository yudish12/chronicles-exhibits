"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  deleteData,
  getAllData,
  getAllDataBySearch,
} from "@/server/actions/booths";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pagination } from "./_components/Pagination";
import Search from "@/components/ui/search";
export default function BoothTable() {
  const [booths, setBooths] = React.useState([]);
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingBoothId, setDeletingBoothId] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const limit = 6;
  const router = useRouter();

  const getData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const resp = await getAllData(skip, limit);
      console.log("resp booths", resp);
      const boothSizesResp = await getAllBoothSizes();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setBooths(resp.data);
      setTotalPages(Math.ceil(resp.count / limit));
      setBoothSizes(boothSizesResp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    setDeletingBoothId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const resp = await deleteData(deletingBoothId);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    const updatedBooths = booths.filter(
      (booth) => booth._id !== deletingBoothId
    );
    setBooths(updatedBooths);
    setIsDeleteDialogOpen(false);
  };

  const handleSearchClick = async () => {
    if (!searchValue) return getData();
    try {
      const searchResp = await getAllDataBySearch(searchValue);
      console.log("===searchResp===", searchResp);
      setBooths(searchResp.data);
      const count = searchResp.count ?? 0;
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Booths</h1>
        <Button
          onClick={() => {
            router.push("/admin/booths/add");
          }}
        >
          Add Booth
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
              <TableHead>Thumbnail Image</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Booth Size</TableHead>
              <TableHead>Package Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booths.map((booth, index) => (
              <TableRow key={booth._id}>
                <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
                <TableCell>
                  {booth.thumbnail_image && (
                    <img
                      src={booth.thumbnail_image}
                      alt={booth.image_alt_text}
                      className="w-16 h-16 rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {booth.booth_code}
                </TableCell>
                <TableCell>{booth.booth_size.name}</TableCell>
                <TableCell>{booth.packge_title}</TableCell>
                <TableCell>{booth.slug}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/booth/code/${booth.booth_code}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {booth.booth_code}</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        router.push(`/admin/booths/edit/${booth._id}`)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(booth._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
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
