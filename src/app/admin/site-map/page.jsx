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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import Search from "@/components/ui/search";
import { Pagination } from "../blogs/_components/Pagination";

export default function SitemapTable() {
  const [sitemaps, setSitemaps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deletingSitemapId, setDeletingSitemapId] = React.useState(null);
  const [currentSitemap, setCurrentSitemap] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const limit = 6;

  const fetchSitemaps = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sitemap?page=${page}&limit=${limit}`);
      const data = await response.json();
      setSitemaps(data);
      setTotalPages(Math.ceil(data.length / limit));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sitemaps:", error);
      toast.error("Error fetching sitemaps");
    }
  };

  useEffect(() => {
    fetchSitemaps(currentPage);
  }, [currentPage]);

  const openDialog = (sitemap = null) => {
    setCurrentSitemap(sitemap);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (currentSitemap._id) {
      await fetch(`/api/sitemap`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSitemap),
      });
      toast.success("Sitemap updated successfully");
    } else {
      await fetch(`/api/sitemap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSitemap),
      });
      toast.success("Sitemap added successfully");
    }
    setIsDialogOpen(false);
    fetchSitemaps(currentPage);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Sitemap Management</h1>
        <Button onClick={() => openDialog()}>Add Sitemap</Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <CardHeader className="flex mb-4 flex-row gap-6">
          <Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Change Frequency</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sitemaps.map((sitemap, index) => (
              <TableRow key={sitemap._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{sitemap.url}</TableCell>
                <TableCell>{sitemap.priority}</TableCell>
                <TableCell>{sitemap.changefreq}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={sitemap.url} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => openDialog(sitemap)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(sitemap._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentSitemap ? "Edit Sitemap" : "Add Sitemap"}</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="URL"
            value={currentSitemap?.url || ""}
            onChange={(e) => setCurrentSitemap({ ...currentSitemap, url: e.target.value })}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>{currentSitemap ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
