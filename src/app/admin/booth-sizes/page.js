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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteData, getAllBoothSizes } from "@/server/actions/booth-sizes";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BoothSizesTable() {
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingBoothSizeId, setDeletingBoothSizeId] = React.useState(null);

  const router = useRouter();

  const getData = async () => {
    try {
      const resp = await getAllBoothSizes();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setBoothSizes(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    setDeletingBoothSizeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const resp = await deleteData(deletingBoothSizeId);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    const updatedBoothSizes = boothSizes.filter(
      (boothSize) => boothSize._id !== deletingBoothSizeId
    );
    setBoothSizes(updatedBoothSizes);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Booth Sizes</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
            onClick={() => {
              router.push("/admin/booth-sizes/add");
            }}
          >
            Add Booth Size
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boothSizes.map((boothSize, index) => (
              <TableRow key={boothSize.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={boothSize.image}
                    alt={boothSize.image_alt_text}
                    className="w-16 h-16 rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{boothSize.name}</TableCell>
                <TableCell>{boothSize.meta_title}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/booth-size/${boothSize.slug}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {boothSize.name}</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/booth-sizes/edit/${boothSize._id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {boothSize.name}</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(boothSize._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {boothSize.name}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booth size? This action
              cannot be undone.
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
