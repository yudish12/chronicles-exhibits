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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"; // Use your select component
import { getAllData, addData, getAllLocations } from "@/server/actions/events";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { toast } from "sonner";

export default function Events() {
  const [events, setEvents] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [singleEvent, setSingleEvent] = React.useState({
    event_name: "",
    start_date: "",
    end_date: "",
    location_id: "",
  });

  const fetchData = async () => {
    try {
      const eventResp = await getAllData();
      const locationResp = await getAllLocations();
    console.log('locations' , locationResp)
      if (!eventResp.success || !locationResp.success) {
        toast.error("Failed to fetch data");
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

  React.useEffect(() => {
    console.log("~fetch data")
    fetchData();
  }, []);

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

//   if (loading) {
//     return <TableSkeletonLoader />;
//   }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        <Button
          onClick={() => {
            setSingleEvent({ event_name: "", start_date: "", end_date: "", location_id: "" });
            setIsDialogOpen(true);
          }}
        >
          Add Event
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(event.end_date).toLocaleDateString()}</TableCell>
                <TableCell>{`${event.location_id.city}, ${event.location_id.continent}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="event_name">Event Name</Label>
                <Input
                  id="event_name"
                  value={singleEvent.event_name}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, event_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={singleEvent.start_date}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, start_date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={singleEvent.end_date}
                  onChange={(e) =>
                    setSingleEvent({ ...singleEvent, end_date: e.target.value })
                  }
                />
              </div>
              <div>
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
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
