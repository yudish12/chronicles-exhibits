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
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { UploadButton } from "@uploadthing/react";

import CKEditorDemo from "@/components/CkEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { majorExhibitingCities } from "@/app/admin/cities";
import { Trash2 } from "lucide-react";
import { CitySearchSelect } from "@/components/ui/city-search-select";
import { useRouter } from "next/navigation";
const EditEventForm = ({ singleEvent, cities }) => {
  console.log(singleEvent);
  const [event, setEvent] = useState(singleEvent);
  const router = useRouter();

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
      meta_keywords: event.meta_keywords ?? [],
    });

    if (!resp.success) {
      toast.error(resp.err);
      return;
    }

    toast.success("Event updated successfully");
    router.push("/admin/events");
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className="w-full flex flex-col justify-around gap-y-10"
    >
      <Card className="w-full">
        <CardHeader>
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Edit Page Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <Label>Name</Label>
            <Input
              value={event.event_name}
              onChange={(e) =>
                setEvent({ ...event, event_name: e.target.value })
              }
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
            <Label className="mb-4 block">City</Label>
            <CitySearchSelect
              className="w-full"
              value={event?.city || ""}
              changeValue={(value) => {
                console.log(value);
                setEvent({
                  ...event,
                  city: value,
                });
              }}
              cities={cities.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
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
            <div className="grid grid-cols-4 gap-2">
              {event.icon && (
                <div className="relative">
                  <img
                    src={event.icon}
                    alt={`Gallery`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute z-50 top-1 right-1 w-6 h-6"
                    onClick={() => {
                      deleteUTFiles([event.icon.split("/").pop()]);
                      setEvent({
                        ...event,
                        icon: "",
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
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
                console.log("body called");
                setEvent((prev) => {
                  const temp = JSON.parse(JSON.stringify(prev));
                  temp.body = value;
                  return temp;
                });
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row gap-2 items-center">
          <hr className="w-[40%]" />
          <CardTitle className="text-2xl w-[20%] font-bold text-center">
            Edit SEO Data
          </CardTitle>
          <hr className="w-[40%]" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6">
          <div>
            <Label>Meta Title</Label>
            <Input
              value={event.meta_title}
              onChange={(e) =>
                setEvent({ ...event, meta_title: e.target.value })
              }
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
          <div>
            <Label className="mb-4 block">Meta Keywords</Label>
            <TagsInput
              value={event?.meta_keywords ?? []}
              onChange={(e) => setEvent({ ...event, meta_keywords: e })}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex items-end justify-end mb-4 gap-x-4">
        <Button
          type="submit"
          variant="outline"
          className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
        >
          Save Changes
        </Button>
        <Button
          variant="outline"
          className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditEventForm;
