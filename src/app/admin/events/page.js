"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  getAllData,
  addData,
  getAllLocations,
  updateData,
  deleteData,
  getAllDataBySearch,
} from "@/server/actions/events";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Pagination } from "./_components/Pagination";
import { Input } from "@/components/ui/input";
import Search from "@/components/ui/search";
import { Badge } from "@/components/ui/badge";
export default function Events() {
  const router = useRouter();
  const [events, setEvents] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [deletingEventId, setDeletingEventId] = React.useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [singleEvent, setSingleEvent] = React.useState({
    event_name: "",
    start_date: "",
    end_date: "",
    location_id: "",
    icon: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;
  console.log("===single events ===", singleEvent);
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const eventResp = await getAllData(skip, limit, null, null, true);
      console.log("===events===", eventResp);
      const locationResp = await getAllLocations();
      console.log("====locations===", locationResp.data[0]);
      //   if (!eventResp.success || !locationResp.success) {
      //     toast.error("Failed to fetch data");
      //     return;
      //   }
      if (!eventResp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setEvents(eventResp.data);
      setLocations(locationResp.data);
      setTotalPages(Math.ceil(eventResp.count / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  const handleSearchClick = async () => {
    if (!searchValue) return fetchData();
    try {
      const searchResp = await getAllDataBySearch(searchValue);
      console.log("===searchResp===", searchResp);
      setEvents(searchResp.data);
      const count = searchResp.count ?? 0;
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  React.useEffect(() => {
    console.log("~fetch data");
    fetchData(currentPage);
  }, [currentPage]);
  const handleEdit = (event) => {
    router.push(`/admin/events/edit/${event._id}`);
  };

  const handleDelete = (id) => {
    setDeletingEventId(id);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    const resp = await deleteData(deletingEventId);
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    const updatedEvents = events.filter(
      (event) => event._id !== deletingEventId
    );
    setEvents(updatedEvents);
    setIsDeleteDialogOpen(false);
  };

  const getEventStatus = (start_date, end_date) => {
    const today = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (today > startDate && today < endDate) {
      return { text: "Ongoing", color: "bg-amber-700" };
    } else if (today > endDate) {
      return { text: "Expired", color: "bg-red-600" };
    } else {
      return { text: "Upcoming", color: "bg-green-600" };
    }
  };
  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button
          onClick={() => {
            // setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
            // setIsAddDialogOpen(true);
            router.push(`/admin/events/add/`);
          }}
        >
          Add Event
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
              <TableHead className="text-center">Icon</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Start Date</TableHead>
              <TableHead className="text-center">End Date</TableHead>
              <TableHead className="text-center">City</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Visibility</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={event._id}>
                <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
                <TableCell className="text-center ">
                  {event.icon && (
                    <img
                      src={event.icon}
                      alt={event.event_name}
                      className="w-16 mx-auto h-16 rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {event.event_name}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(event?.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(event.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {event.city || "N/A"}, USA{" "}
                </TableCell>
                <TableCell className="text-center">
                  <div
                    className={`${
                      getEventStatus(event?.start_date, event.end_date).color
                    } text-white p-2 px-6 mx-auto  w-max rounded-lg`}
                  >
                    {getEventStatus(event?.start_date, event.end_date).text}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={"text-white p-2 px-6 mx-auto  w-max rounded-lg"}
                  >
                    {event.isDraft === "true" ? "Draft" : "Published"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex mx-auto justify-center space-x-2">
                    <Link href={`/${event.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {event.event_name}</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/events/edit/${event._id}`}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {event.event_name}</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      //   onClick={() => {
                      //     setSingleEvent(event);
                      //     setIsDeleteDialogOpen(true);

                      //   }}
                      onClick={() => handleDelete(event._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {event.event_name}</span>
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
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
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
            <Button
              variant="destructive"
              onClick={() => handleDeleteConfirm(singleEvent?._id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
