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
  getAllLocations,
  deleteData,
  getAllDataBySearch,
  exportEventsByDateRange,
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
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
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
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
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
        toast.error(eventResp.err);
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

  const handleExportStartDateChange = (date) => {
    setStartDateFilter(date);

    // If a start date is selected, automatically set end date to one day after
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      // Format as YYYY-MM-DD
      const nextDayString = nextDay.toISOString().split("T")[0];
      setEndDateFilter(nextDayString);
    } else {
      // If start date is cleared, also clear end date
      setEndDateFilter("");
    }
  };

  const handleExportEndDateChange = (date) => {
    setEndDateFilter(date);
    // Note: We don't modify the start date when end date changes
    // This allows users to manually override the automatic behavior
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

  const exportToCsv = async () => {
    try {
      setExportLoading(true);

      const resp = await exportEventsByDateRange(
        startDateFilter || null,
        endDateFilter || null,
      );

      console.log("===resp===", resp);

      if (!resp.success) {
        toast.error(resp.err || "Failed to fetch events for export");
        return;
      }

      const exportData = resp.data || [];

      if (exportData.length === 0) {
        toast.warning("No data to export");
        return;
      }

      const exportDataFormatted = exportData.map((event) => ({
        Name: event.event_name || "",
        "Start Date": event.start_date
          ? new Date(event.start_date).toLocaleDateString()
          : "",
        "End Date": event.end_date
          ? new Date(event.end_date).toLocaleDateString()
          : "",
        City: event.city || "",
        Country: event.country || "",
      }));

      const headers = Object.keys(exportDataFormatted[0]).join(",");
      const rows = exportDataFormatted
        .map((row) =>
          Object.values(row)
            .map((value) => `"${String(value).replace(/"/g, '""')}"`)
            .join(","),
        )
        .join("\n");

      const csv = `${headers}\n${rows}`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const dateSuffix =
        startDateFilter || endDateFilter
          ? `_${startDateFilter || "all"}_to_${endDateFilter || "all"}`
          : "_all";
      link.href = url;
      link.download = `events-export${dateSuffix}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        `Exported successfully (${exportDataFormatted.length} records)`,
      );
      setIsExportDialogOpen(false);
      setStartDateFilter("");
      setEndDateFilter("");
    } catch (error) {
      console.error("Error exporting events:", error);
      toast.error(
        "Failed to export file: " + (error.message || "Unknown error"),
      );
    } finally {
      setExportLoading(false);
    }
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
      (event) => event._id !== deletingEventId,
    );
    setEvents(updatedEvents);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              // setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
              // setIsAddDialogOpen(true);
              router.push(`/admin/events/add/`);
            }}
          >
            Add Event
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
            onClick={() => setIsExportDialogOpen(true)}
          >
            Export Event
          </Button>
        </div>
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
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Events</DialogTitle>
            <DialogDescription>
              Select a start date to automatically set the end date to the next
              day, or select both dates manually. Leave both empty to export all
              events.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <Input
                id="startDate"
                type="date"
                value={startDateFilter}
                onChange={(e) => handleExportStartDateChange(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <Input
                id="endDate"
                type="date"
                value={endDateFilter}
                onChange={(e) => handleExportEndDateChange(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsExportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={exportToCsv} disabled={exportLoading}>
              {exportLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                "Export"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
