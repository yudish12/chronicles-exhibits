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
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import CKEditorDemo from "@/components/CkEditor";
const EditEventForm = ({ singleEvent, locations }) => {
  console.log(singleEvent);
  const [event, setEvent] = useState(singleEvent);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const resp = await updateData(event._id, {
      event_name: event.event_name,
      start_date: event.start_date,
      end_date: event.end_date,
      location_id: event.location_id,
      icon: event.icon,
      body: event.body,
      slug: event.slug,
      country: event.country,
      city: event.city,
      icon_alt_text: event.icon_alt_text,
      meta_description: event.meta_description,
      meta_title: event.meta_title,
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
          <Label>Slug (No spaces, only lowercase)</Label>
          <Input
            value={event.slug}
            onChange={(e) => setEvent({ ...event, slug: e.target.value })}
            required
            pattern="^[a-z0-9-]+$"
            title="No spaces, only lowercase letters and dashes"
          />
        </div>
        <div>
          <Label>Country</Label>
          <Input
            value={event.country}
            onChange={(e) => setEvent({ ...event, country: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>City</Label>
          <Input
            value={event.city}
            onChange={(e) => setEvent({ ...event, city: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Icon</Label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setEvent({
                ...event,
                icon: res[0]?.url || "",
              });
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
        <div>
          <Label>Icon Alt Text</Label>
          <Input
            value={event.icon_alt_text}
            onChange={(e) =>
              setEvent({
                ...singleEvent,
                icon_alt_text: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={new Date(event.start_date).toISOString().slice(0, 10)}
            onChange={(e) => {
              console.log(typeof e.target.value);
              setEvent({ ...event, start_date: e.target.value });
            }}
            required
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            min={event.start_date}
            value={new Date(event.end_date).toISOString().slice(0, 10)}
            onChange={(e) => setEvent({ ...event, end_date: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <Label>Title</Label>
          <Input
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            required
          />
        </div>
        <div className="col-span-2">
          <Label>Body</Label>
          <CKEditorDemo
            value={event.body}
            onChange={(value) => {
              setEvent({ ...event, body: value });
            }}
          />
        </div>

        <div>
          <Label>Location</Label>
          <Select
            value={event.location_id}
            onValueChange={(value) =>
              setEvent({ ...event, location_id: value })
            }
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
          <Label>Meta Title</Label>
          <Input
            value={event.meta_title}
            onChange={(e) => setEvent({ ...event, meta_title: e.target.value })}
            required
          />
        </div>

        <div className="col-span-2">
          <Label>Meta Description</Label>
          <Input
            value={event.meta_description}
            onChange={(e) =>
              setEvent({
                ...event,
                meta_description: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        variant="outline"
        className="border-secondary mt-4 bg-white font-semibold text-secondary bg-secondary text-white p-4 border-2 "
      >
        Edit Event
      </Button>
    </form>
  );
};

export default EditEventForm;
