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
  addData,
  deleteData,
  getAllData,
  updateData,
} from "@/server/actions/booths";
import { useRouter } from "next/navigation";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function BoothTable() {
  const [booths, setBooths] = React.useState([]);
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleBooth, setSingleBooth] = React.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingBoothId, setDeletingBoothId] = React.useState(null);

  const router = useRouter();

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
      code: singleBooth.code,
      boothSize: singleBooth.boothSize,
      main_image: singleBooth.main_image,
      images: singleBooth.images || [],
    });

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    setBooths((prevBooths) =>
      prevBooths.map((booth) =>
        booth._id === singleBooth._id ? resp.data : booth
      )
    );
    toast.success("Booth updated successfully");
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBooth);

      if (!resp.success) {
        toast.error(resp.err);
        return;
      }

      // Add only the new booth to the state
      setBooths((prevBooths) => [...prevBooths, resp.data]);
      toast.success("Booth added successfully");
      setIsAddDialogOpen(false);
      setSingleBooth(null);
    } catch (error) {
      toast.error("Failed to add booth");
      console.error(error);
    }
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
      </Card>
    </div>
  );
}
