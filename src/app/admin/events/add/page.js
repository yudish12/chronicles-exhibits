"use client";
import React from "react";
import { addData } from "@/server/actions/events";
import { UploadButton } from "@uploadthing/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAllLocations } from "@/server/actions/events";

const Page = () => {
  const [locations, setLocations] = React.useState([]);

  const [singleEvent, setSingleEvent] = React.useState({
    event_name: "",
    title: "",
    slug: "",
    body: "",
    start_date: "",
    end_date: "",
    country: "",
    city: "",
    icon_alt_text: "",
    meta_title: "",
    meta_description: "",
    icon: "",
  });

  const fetchData = async () => {
    try {
      const locationResp = await getAllLocations();
      setLocations(locationResp.data || []);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleEvent);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Event added successfully");
      setSingleEvent({
        event_name: "",
        title: "",
        slug: "",
        body: "",
        start_date: "",
        end_date: "",
        country: "",
        city: "",
        icon_alt_text: "",
        meta_title: "",
        meta_description: "",
        icon: "",
      });
    } catch (error) {
      toast.error("Failed to add event");
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8 px-4 overflow-auto w-full ">
      <h1 className="text-2xl font-bold text-center mb-6">Add Event</h1>
      <form onSubmit={handleAddSubmit} className="w-full  p-6 ">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Name</Label>
            <Input
              value={singleEvent.event_name}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, event_name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Slug (No spaces, only lowercase)</Label>
            <Input
              value={singleEvent.slug}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, slug: e.target.value })
              }
              required
              pattern="^[a-z0-9-]+$"
              title="No spaces, only lowercase letters and dashes"
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              value={singleEvent.country}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, country: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              value={singleEvent.city}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, city: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Icon</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setSingleEvent({
                  ...singleEvent,
                  icon: res[0]?.url || "",
                });
                toast.success("Icon uploaded successfully");
              }}
              onUploadError={(error) =>
                toast.error(`Upload failed: ${error.message}`)
              }
            />
            {singleEvent.icon && (
              <img
                src={singleEvent.icon}
                alt="Event Icon"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>
          <div>
            <Label>Icon Alt Text</Label>
            <Input
              value={singleEvent.icon_alt_text}
              onChange={(e) =>
                setSingleEvent({
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
              value={singleEvent.start_date}
              onChange={(e) =>
                {
                console.log(e)
                if(!singleEvent.end_date){
                    console.log("oooo")
                    setSingleEvent({
                        ...singleEvent,
                        end_date: e.target.value
                    })
                }
                setSingleEvent({
                  ...singleEvent,
                  start_date: e.target.value,
                })
            }
              }
              required
            />
          </div>

          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={singleEvent.end_date}
              onChange={(e) =>
                setSingleEvent({
                  ...singleEvent,
                  end_date: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="col-span-2">
            <Label>Title</Label>
            <Input
              value={singleEvent.title}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, title: e.target.value })
              }
              required
            />
          </div>

          

          <div className="col-span-2">
            <Label>Body</Label>
            <ReactQuill
                  theme="snow"
                    value={singleEvent?.body || ""}
                    onChange={(value) =>
                    setSingleEvent({ ...singleEvent, body: value })
                    }
                />
          </div>

          <div>
            <Label>Location</Label>
            <Select
              value={singleEvent.location_id}
              onValueChange={(value) =>
                setSingleEvent({ ...singleEvent, location_id: value })
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
              value={singleEvent.meta_title}
              onChange={(e) =>
                setSingleEvent({ ...singleEvent, meta_title: e.target.value })
              }
              required
            />
          </div>

          <div className="col-span-2">
            <Label>Meta Description</Label>
            <Input
              value={singleEvent.meta_description}
              onChange={(e) =>
                setSingleEvent({
                  ...singleEvent,
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
         Add Event
       </Button>
      </form>
    </div>
  );
};

export default Page;
