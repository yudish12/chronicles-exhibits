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
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addData, getAllData, updateData } from "@/server/actions/booth-sizes";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";

export default function BoothSizesTable() {
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleBoothSize, setSingleBoothSize] = React.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingBoothSizeId, setDeletingBoothSizeId] = React.useState(null);

  const getData = async () => {
    try {
      const resp = await getAllData();
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

  const handleEdit = (boothSize) => {
    setIsAddDialogOpen(false);
    setSingleBoothSize(boothSize);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingBoothSizeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleBoothSize._id, {
      name: singleBoothSize.name,
      description: singleBoothSize.description,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedBoothSizes = [
      ...boothSizes.map((boothSize) => {
        if (boothSize._id === singleBoothSize._id) {
          return singleBoothSize;
        }
        return boothSize;
      }),
    ];

    setBoothSizes(updatedBoothSizes);
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const resp = await addData(singleBoothSize);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    setBoothSizes([...boothSizes, resp.data]);
    setIsAddDialogOpen(false);
    setSingleBoothSize(null);
  };

  const handleDeleteConfirm = () => {
    const updatedBoothSizes = boothSizes.filter(
      (boothSize) => boothSize.id !== deletingBoothSizeId
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
        <Button
          onClick={() => {
            setSingleBoothSize(null);
            setIsEditDialogOpen(false);
            setIsAddDialogOpen(true);
          }}
        >
          Add Booth Size
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boothSizes.map((boothSize) => (
              <TableRow key={boothSize.id}>
                <TableCell className="font-medium">{boothSize.name}</TableCell>
                <TableCell>{boothSize.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(boothSize)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {boothSize.name}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(boothSize.id)}
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

      <Dialog
        open={isEditDialogOpen || isAddDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsAddDialogOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Edit Booth Size" : "Add Booth Size"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? "Make changes to the booth size here. Click save when you&apos;re done."
                : "Enter the details of the booth size you want to add."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={singleBoothSize?.name || ""}
                  onChange={(e) =>
                    setSingleBoothSize({
                      ...singleBoothSize,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={singleBoothSize?.description || ""}
                  onChange={(e) =>
                    setSingleBoothSize({
                      ...singleBoothSize,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
