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
import { toast } from "sonner";
import {
  createCityPageInLocation,
  deleteData,
  fetchCitiesToAdd,
  getAllData,
  getAllDataBySearch,
} from "@/server/actions/locations";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import Link from "next/link";
import { Eye, Pencil, PlusIcon, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "./Pagination";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingLocationid, setDeletingLocationid] = useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [fetchingCities, setFetchingCities] = useState(false);
  const [citiesToAdd, setCitiesToAdd] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      const resp = await getAllData(skip, limit, "slug  _id name");
      console.log("resp", resp);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }

      setLocations(resp.data);
      setTotalPages(Math.ceil(resp.count / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleAddCity = async () => {
    try {
      const cities = selectedCities.map((e, ind) => citiesToAdd[ind]);
      console.log(cities);
      const resp = await createCityPageInLocation(cities);
      if (!resp.success) {
        toast.error(resp.err);
      }
      toast.success("City page created successfully");
    } catch (error) {
      toast.error(resp.err);
    }
  };

  const fetchCities = async () => {
    setFetchingCities(true);
    try {
      const resp = await fetchCitiesToAdd();
      console.log(resp);
      setCitiesToAdd(resp.data);
    } catch (error) {
      consnole.log(error);
    } finally {
      setFetchingCities(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const resp = await deleteData(deletingLocationid);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setLocations((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== deletingLocationid)
      );
      toast.success("Location deleted successfully");
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
      setLocations(searchResp.data);
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
        <h1 className="text-2xl font-bold ">Location Pages</h1>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <CardHeader className="flex mb-4 justify-between items-center flex-row gap-6">
          <div className="flex flex-row gap-6 w-full">
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
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={fetchCities}
                  variant="outline"
                  style={{ marginTop: "0px", height: "35px" }}
                  className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
                >
                  Inspect
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* show a list of cities whose pages are not created yet */}
                <div className="flex flex-col ">
                  {fetchingCities ? (
                    <div class="loader"></div>
                  ) : (
                    <div>
                      {citiesToAdd.map((city, index) => (
                        <div
                          className="flex ml-8 items-center gap-4 py-4"
                          key={index}
                        >
                          <Checkbox
                            checked={!!selectedCities[index]}
                            onCheckedChange={(isChecked) =>
                              setSelectedCities((prev) =>
                                prev
                                  .slice(0, index)
                                  .concat(isChecked)
                                  .slice(0, index + 1)
                              )
                            }
                            id={city._id}
                          />
                          <Label>{city.name}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleAddCity}
                  variant="outline"
                  style={{ marginTop: "0px", height: "35px" }}
                  className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
                >
                  <PlusIcon />
                  Add City
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((blog, index) => (
              <TableRow key={blog._id}>
                <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                <TableCell>{blog.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {blog.title}</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        router.push(`/admin/locations/edit/${blog._id}`);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {blog.title}</span>
                    </Button>
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
};

export default LocationPage;
