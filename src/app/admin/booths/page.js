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
import {
  addData,
  deleteData,
  getAllData,
  updateData,
} from "@/server/actions/booths";
import { getAllData as getAllBoothSizes } from "@/server/actions/booth-sizes";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { UploadButton } from "@uploadthing/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export default function BoothTable() {
  const [booths, setBooths] = React.useState([]);
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleBooth, setSingleBooth] = React.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingBoothId, setDeletingBoothId] = React.useState(null);

  const getData = async () => {
    try {
      const resp = await getAllData();
      const boothSizesResp = await getAllBoothSizes();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setBooths(resp.data);
      setBoothSizes(boothSizesResp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleEdit = (booth) => {
    setIsAddDialogOpen(false);
    setSingleBooth(booth);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingBoothId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleBooth._id, {
      name: singleBooth.name,
      description: singleBooth.description,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedBooth = [
      ...booths.map((boothSize) => {
        if (boothSize._id === singleBooth._id) {
          return singleBooth;
        }
        return boothSize;
      }),
    ];

    setBooths(updatedBooth);
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const resp = await addData(singleBooth);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    setBooths([...booths, resp.data]);
    setIsAddDialogOpen(false);
    setSingleBooth(null);
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

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Booths</h1>
        <Button
          onClick={() => {
            setSingleBooth({ images: [] });
            setIsEditDialogOpen(false);
            setIsAddDialogOpen(true);
          }}
        >
          Add Booth
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Main Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Booth Size</TableHead>
              <TableHead>Gallery</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booths.map((booth) => (
              <TableRow key={booth._id}>
                <TableCell>
                  {booth.main_image && (
                    <img
                      src={booth.main_image}
                      alt={booth.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{booth.name}</TableCell>
                <TableCell>{booth.description}</TableCell>
                <TableCell>{booth.code}</TableCell>
                <TableCell>
                  {boothSizes.find((size) => size._id === booth.boothSize)
                    ?.name || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {booth.images?.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-8 h-8 object-cover rounded"
                      />
                    ))}
                    {booth.images?.length > 3 && (
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">
                        +{booth.images.length - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(booth)}
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
      </div>

      <Dialog
        open={isEditDialogOpen || isAddDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsAddDialogOpen
        }
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Edit Booth" : "Add Booth"}
            </DialogTitle>
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
                  value={singleBooth?.name || ""}
                  onChange={(e) =>
                    setSingleBooth({ ...singleBooth, name: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={singleBooth?.description || ""}
                  onChange={(e) =>
                    setSingleBooth({
                      ...singleBooth,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={singleBooth?.code || ""}
                  onChange={(e) =>
                    setSingleBooth({ ...singleBooth, code: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="boothSize" className="text-right">
                  Booth Size
                </Label>
                <Select
                  value={singleBooth?.boothSize || ""}
                  onValueChange={(value) =>
                    setSingleBooth({ ...singleBooth, boothSize: value })
                  }
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select booth size" />
                  </SelectTrigger>
                  <SelectContent>
                    {boothSizes.map((size) => (
                      <SelectItem key={size._id} value={size._id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Main Image</Label>
                <div className="col-span-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setSingleBooth({
                        ...singleBooth,
                        main_image: res[0].url,
                      });
                      toast.success("Main image uploaded successfully");
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  {singleBooth?.main_image && (
                    <img
                      src={singleBooth.main_image}
                      alt="Main preview"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Gallery Images</Label>
                <div className="col-span-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setSingleBooth({
                        ...singleBooth,
                        images: [...(singleBooth?.images || []), res[0].url],
                      });
                      toast.success("Gallery image uploaded successfully");
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {singleBooth?.images?.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-6 h-6"
                          onClick={() => {
                            const newImages = singleBooth.images.filter(
                              (_, i) => i !== index
                            );
                            setSingleBooth({
                              ...singleBooth,
                              images: newImages,
                            });
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditDialogOpen ? "Save Changes" : "Add Booth"}
              </Button>
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
