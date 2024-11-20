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
import { addData, getAllData, updateData } from "@/server/actions/locations"; // Adjust the import path
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";

export default function Locations() {
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleLocation, setSingleLocation] = React.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingLocationId, setDeletingLocationId] = React.useState(null);

  const getData = async () => {
    try {
      const resp = await getAllData();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setLocations(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleEdit = (location) => {
    setIsAddDialogOpen(false);
    setSingleLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingLocationId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleLocation._id, {
      continent: singleLocation.continent,
      city: singleLocation.city,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedLocations = locations.map((location) =>
      location._id === singleLocation._id ? singleLocation : location
    );

    setLocations(updatedLocations);
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const resp = await addData(singleLocation);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    setLocations([...locations, resp.data]);
    setIsAddDialogOpen(false);
    setSingleLocation(null);
  };

  const handleDeleteConfirm = () => {
    const updatedLocations = locations.filter(
      (location) => location._id !== deletingLocationId
    );
    setLocations(updatedLocations);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Locations</h1>
        <Button
          onClick={() => {
            setSingleLocation(null);
            setIsEditDialogOpen(false);
            setIsAddDialogOpen(true);
          }}
        >
          Add Location
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Continent</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location._id}>
                <TableCell className="font-medium">{location.continent}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(location)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {location.city}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(location._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {location.city}</span>
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
              {isEditDialogOpen ? "Edit Location" : "Add Location"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? "Make changes to the location here. Click save when you&apos;re done."
                : "Enter the details of the location you want to add."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="continent" className="text-right">
                  Continent
                </Label>
                <Input
                  id="continent"
                  value={singleLocation?.continent || ""}
                  onChange={(e) =>
                    setSingleLocation({
                      ...singleLocation,
                      continent: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  value={singleLocation?.city || ""}
                  onChange={(e) =>
                    setSingleLocation({
                      ...singleLocation,
                      city: e.target.value,
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
              Are you sure you want to delete this location? This action cannot
              be undone.
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
