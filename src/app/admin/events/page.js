"use client";

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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { UploadButton } from "@uploadthing/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"; // Use your select component
import { getAllData, addData, getAllLocations , updateData , deleteData} from "@/server/actions/events";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

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
  const [singleEvent, setSingleEvent] = React.useState({
    event_name: "",
    start_date: "",
    end_date: "",
    location_id: "",
    icon : ""
  });
  console.log("===single events ===", singleEvent)
  const fetchData = async () => {
    try {
      const eventResp = await getAllData();
      console.log("===events===",eventResp)
      const locationResp = await getAllLocations();
      console.log('====locations===' , locationResp.data[0])
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
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleEvent);
    console.log("==add response ===" ,)
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      // Add only the new event to the state
      setEvents((prevEvent) => [...prevEvent, resp.data]);
      await fetchData();
      toast.success("Event added successfully");
      setIsAddDialogOpen(false);
    //   setSingleEvent(null);
    setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
    } catch (error) {
      toast.error("Failed to add booth");
      console.error(error);
    }
  };
  React.useEffect(() => {
    console.log("~fetch data")
    fetchData();
  }, []);
  const handleEdit = (event) => {
    // setIsDialogOpen(false);
    // setSingleEvent(event);
    // setIsEditDialogOpen(true);
    router.push(`/admin/events/edit/${event._id}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await addData(singleEvent);

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    setEvents([...events, resp.data]);
    setIsDialogOpen(false);
    setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleEvent._id, {
        event_name: singleEvent.event_name,
        start_date: singleEvent.start_date,
        end_date: singleEvent.end_date,
        location_id: singleEvent.location_id,
        icon : singleEvent.icon
    });

    console.log("==resp===" , resp)
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    console.log("==resp update ==" , resp.data)
    setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === singleEvent._id ? resp.data : event
        )
      );
      await fetchData();
      toast.success("event updated successfully");
      setIsEditDialogOpen(false);
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

  if (loading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        <Button onClick={() => {
            // setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
            // setIsAddDialogOpen(true);
            router.push(`/admin/events/add/`);


          }}>
            Add Event</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>
                  {event.icon && (
                    <img
                      src={event.icon}
                      alt={event.event_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{event.event_name}</TableCell>
                <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(event.end_date).toLocaleDateString()}</TableCell>
                <TableCell>{event.location_id?.city|| "N/A"}, {event.location_id?.continent|| "N/A"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(event)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {event.event_name}</span>
                    </Button>
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
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isEditDialogOpen || isAddDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={isEditDialogOpen ? handleEditSubmit : handleAddSubmit}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Name</Label>
                <Input
                  value={singleEvent?.event_name || ""}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, event_name: e.target.value })
                  }
                  required
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={singleEvent?.start_date || ""}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, start_date: e.target.value })
                  }
                  required
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={singleEvent?.end_date || ""}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, end_date: e.target.value })
                  }
                  required
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={singleEvent.location_id}
                  onValueChange={(value) =>
                    setSingleEvent({ ...singleEvent, location_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location._id} value={location._id}>
                        {`${location.city}, ${location.continent}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Icon</Label>
                <div className="col-span-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setSingleEvent({
                        ...singleEvent,
                        icon: res[0].url,
                      });
                      toast.success("Icon uploaded successfully");
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                  {singleEvent?.icon && (
                    <img
                      src={singleEvent.icon}
                      alt="Event Icon"
                      className="mt-2 w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditDialogOpen ? "Save Changes" : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
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
