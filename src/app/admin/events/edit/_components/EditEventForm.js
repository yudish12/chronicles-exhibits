"use client";

import { useState } from "react";
import { updateData } from "@/server/actions/events";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";

const EditEventForm = ({ singleEvent, locations }) => {
  const [event, setEvent] = useState(singleEvent);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const resp = await updateData(event._id, {
      event_name: event.event_name,
      start_date: event.start_date,
      end_date: event.end_date,
      location_id: event.location_id,
      icon: event.icon,
    });

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    toast.success("Event updated successfully");
  };

  return (
    <form onSubmit={handleEditSubmit} className="w-full  bg-white p-6 ">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>Name</Label>
          <Input
            value={event.event_name}
            onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={event.start_date}
            onChange={(e) => setEvent({ ...event, start_date: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={event.end_date}
            onChange={(e) => setEvent({ ...event, end_date: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Location</Label>
          <Select
            value={event.location_id}
            onValueChange={(value) => setEvent({ ...event, location_id: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location._id} value={location._id}>
                  {`${location.city}, ${location.country}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Icon</Label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setEvent({ ...event, icon: res[0]?.url || "" });
              toast.success("Icon uploaded successfully");
            }}
            onUploadError={(error) =>
              toast.error(`Upload failed: ${error.message}`)
            }
          />
          {event.icon && (
            <img
              src={event.icon}
              alt="Event Icon"
              className="mt-2 w-16 h-16 object-cover rounded"
            />
          )}
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full">
        Update Event
      </Button>
    </form>
  );
};

export default EditEventForm;
