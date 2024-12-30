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
} from "@/server/actions/locations";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Pagination } from "./_components/Pagination";

export default function Cities() {
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleCity, setSingleCity] = React.useState({ name: "" });
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deletingCityId, setDeletingCityId] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 6;

  const getData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const resp = await getCities(skip, limit);

      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }

      setCities(resp.data);
      setTotalPages(Math.ceil(resp.count / limit));
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.");
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleEdit = (city) => {
    setIsAddDialogOpen(false);
    setSingleCity({ ...city });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingCityId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateCity(singleCity._id, { name: singleCity.name });

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedCities = cities.map((city) =>
      city._id === singleCity._id ? { ...city, name: singleCity.name } : city
    );

    setCities(updatedCities);
    setIsEditDialogOpen(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const resp = await addCity(singleCity);

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    setCities([...cities, resp.data]);
    setIsAddDialogOpen(false);
    setSingleCity({ name: "" });
  };

  const handleDeleteConfirm = async () => {
    const resp = await deleteCity(deletingCityId);

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    const updatedCities = cities.filter((city) => city._id !== deletingCityId);
    setCities(updatedCities);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Cities</h1>
        <Button
          onClick={() => {
            setSingleCity({ name: "" });
            setIsEditDialogOpen(false);
            setIsAddDialogOpen(true);
          }}
        >
          Add City
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city, index) => (
              <TableRow key={city._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(city)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {city.name}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(city._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {city.name}</span>
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

      <Dialog
        open={isEditDialogOpen || isAddDialogOpen}
        onOpenChange={(isOpen) => {
          if (isEditDialogOpen) setIsEditDialogOpen(isOpen);
          else setIsAddDialogOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Edit City" : "Add City"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? "Make changes to the city here. Click save when you're done."
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
                  type="text"
                  value={singleCity.name}
                  onChange={(e) =>
                    setSingleCity({ ...singleCity, name: e.target.value })
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
