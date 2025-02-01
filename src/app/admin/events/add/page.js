"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import "../../../globals.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "sonner";
import CkeEditor from "@/components/CkEditor";
import { addData, getAllLocations } from "@/server/actions/events";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";
import { majorExhibitingCities } from "../../cities";
import { Trash2 } from "lucide-react";
import { CitySearchSelect } from "@/components/ui/city-search-select";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { deleteUTFiles } from "@/server/services/uploadthing";

const AddEventPage = () => {
  const [cityLoading, setCityLoading] = React.useState(true);
  const [singleEvent, setSingleEvent] = React.useState({
    event_name: "",
    title: "",
    slug: "",
    body: "",
    start_date: "",
    end_date: "",
    country: "USA",
    city: "",
    icon: "",
    icon_alt_text: "",
    booth_title: "",
    booth_description: "",
    website: '',
    email: '',
    address: '',
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
  });

  const router = useRouter();
  const [cities,setCities] = useState([]);

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
        icon: "",
        icon_alt_text: "",
        booth_description: "",
        booth_title: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        website: '',
        email: '',
        address: '',
      });
      router.push("/admin/events");
    } catch (error) {
      toast.error("Failed to add event");
      console.error(error);
    }
  };

  const fetchCities = async () => {
    try {
      const resp = await getAllLocations();
      console.log(resp.data)
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      setCities(resp.data);
      setCityLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }finally {
      setCityLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  },[])

  useEffect(() => {
    setSingleEvent({
      ...singleEvent,
      slug: singleEvent.event_name.toLowerCase().replaceAll(" ", "-").replace(".", ""),
    })
  },[singleEvent.event_name])

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-screen bg-gray-200 p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col gap-y-10"
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Add Page Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-4 block">Event Name</Label>
              <Input
                className="rounded-sm"
                value={singleEvent.event_name}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, event_name: e.target.value })
                }
                required
              />
            </div>
            
            <div>
              <Label className="mb-4 block">Slug</Label>
              <Input
                className="rounded-sm"
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
              <Label className="mb-4 block">Country</Label>
              <Input
                className="rounded-sm"
                value={singleEvent.country}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, country: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">City</Label>
              <CitySearchSelect
                className="w-full"
                value={singleEvent?.city || ""}
                changeValue={(value) => {
                  console.log(value);
                  setSingleEvent({
                    ...singleEvent,
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
              <div className="grid grid-cols-4 gap-2">
                {singleEvent.icon && (
                  <div className="relative">
                    <img
                      src={singleEvent.icon}
                      alt={`Gallery`}
                      className=" object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute z-50 top-1 right-1 w-6 h-6"
                      onClick={() => {
                        deleteUTFiles([singleEvent.icon.split("/").pop()]);
                        setSingleEvent({
                          ...singleEvent,
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
              <Label className="mb-[4px] block">Icon Alt Text</Label>
              <Input
                className="rounded-sm"
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
              <Label className="mb-4 block">Start Date</Label>
              <Input
                className="rounded-sm"
                type="date"
                value={singleEvent.start_date}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, start_date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">End Date</Label>
              <Input
                className="rounded-sm"
                type="date"
                min={singleEvent.start_date}
                value={singleEvent.end_date}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, end_date: e.target.value })
                }
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-2 block">Title</Label>
              <Input
                className="rounded-sm"
                value={singleEvent.title}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={singleEvent.body}
                onChange={(value) => {
                  setSingleEvent({ ...singleEvent, body: value });
                }}
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Booth Title</Label>
              <Input
                className="rounded-sm"
                value={singleEvent.booth_title}
                onChange={(e) =>
                  setSingleEvent({
                    ...singleEvent,
                    booth_title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Booth Description</Label>
              <Textarea
                value={singleEvent.booth_description}
                onChange={(e) =>
                  setSingleEvent({
                    ...singleEvent,
                    booth_description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
            <Label>Website</Label>
            <Input
              value={singleEvent.website}
              onChange={(e) => setSingleEvent({ ...singleEvent, website: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Contact Email</Label>
            <Input
              value={singleEvent.email}
              onChange={(e) => setSingleEvent({ ...singleEvent, email: e.target.value })}
              required
            />
          </div>
          <div className="col-span-2">
            <Label>Address</Label>
            <Input
              value={singleEvent.address}
              onChange={(e) => setSingleEvent({ ...singleEvent, address: e.target.value })}
              required
            />
          </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Add SEO Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label className="mb-4 block">Meta Title</Label>
              <Input
                className="rounded-sm"
                value={singleEvent.meta_title}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, meta_title: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Meta Description</Label>
              <Input
                className="rounded-sm"
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
            <div>
              <Label className="mb-4 block">Meta Keywords</Label>
              <TagsInput
                value={singleEvent.meta_keywords}
                onChange={(e) =>
                  setSingleEvent({ ...singleEvent, meta_keywords: e })
                }
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-4 mb-4 ">
          <Button
            type="submit"
            className="bg-secondary hover:bg-secondary text-white hover:text-white font-semibold px-4 py-2"
          >
            Add Event
          </Button>
          <Button
            variant="outline"
            className="border-secondary text-secondary font-semibold px-4 py-2"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;
