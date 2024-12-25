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
  getCities,
  deleteCity,
  addCity,
  updateCity,
  bulkInsertCities,
} from "@/server/actions/locations";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { majorExhibitingCities } from "../cities";

export default function citys() {
  const [citys, setcitys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singlecity, setSinglecity] = React.useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingcityId, setDeletingcityId] = React.useState(null);

  const getData = async () => {
    try {
      const resp = await getCities();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setcitys(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleEdit = (city) => {
    setIsAddDialogOpen(false);
    setSinglecity(city);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingcityId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singlecity._id, {
      continent: singlecity.continent,
      city: singlecity.city,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedcitys = citys.map((city) =>
      city._id === singlecity._id ? singlecity : city
    );

    setcitys(updatedcitys);
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const resp = await addData(singlecity);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    setcitys([...citys, resp.data]);
    setIsAddDialogOpen(false);
    setSinglecity(null);
  };

  const handleDeleteConfirm = async () => {
    const resp = await deleteData(deletingcityId);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    const updatedcitys = citys.filter((city) => city._id !== deletingcityId);
    setcitys(updatedcitys);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">citys</h1>
        <Button
          onClick={() => {
            setSinglecity(null);
            setIsEditDialogOpen(false);
            setIsAddDialogOpen(true);
          }}
        >
          Add city
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {citys.map((city) => (
              <TableRow key={city._id}>
                <TableCell>{city.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(city)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {city.city}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(city._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {city.city}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={isEditDialogOpen || isAddDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsAddDialogOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Edit city" : "Add city"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? "Make changes to the city here. Click save when you&apos;re done."
                : "Enter the details of the city you want to add."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  value={singlecity?.name ?? ""}
                  onChange={(e) =>
                    setSinglecity({
                      ...singlecity,
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
              Are you sure you want to delete this city? This action cannot be
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
