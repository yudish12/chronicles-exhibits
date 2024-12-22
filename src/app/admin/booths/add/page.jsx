"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import "../../../globals.css";
import CkeEditor from "@/components/CkEditor";
import { addData } from "@/server/actions/events";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllData } from "@/server/actions/booths";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";

const AddBoothPage = () => {
  const [singleBooth, setsingleBooth] = React.useState({
    booth_code: "",
    slug: "",
    booth_size: "",
    thumbnail_image: "",
    all_images: [],
    image_alt_text: "",
    packge_title: "",
    packge_description: "",
    meta_title: "",
    meta_description: "",
  });

  const [boothSizes, setBoothSizes] = React.useState([]);

  const getData = async () => {
    try {
      const boothSizesResp = await getAllBoothSizes();
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setBoothSizes(boothSizesResp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBooth);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Booth added successfully");
      setsingleBooth({
        booth_code: "",
        slug: "",
        booth_size: "",
        thumbnail_image: "",
        all_images: [],
        image_alt_text: "",
        packge_title: "",
        packge_description: "",
        meta_title: "",
        meta_description: "",
      });
    } catch (error) {
      toast.error("Failed to add booth");
      console.error(error);
    }
  };

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
              <Label className="mb-4 block">Booth Code</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.event_name}
                onChange={(e) =>
                  setsingleBooth({ ...singleBooth, booth_code: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Slug</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.slug}
                onChange={(e) =>
                  setsingleBooth({ ...singleBooth, slug: e.target.value })
                }
                required
                pattern="^[a-z0-9-]+$"
                title="No spaces, only lowercase letters and dashes"
              />
            </div>
            <div>
              <Label className="mb-4 block">Booth Size</Label>
              <Select
                value={singleBooth?.boothSize || ""}
                onValueChange={(value) =>
                  setSingleBooth({ ...singleBooth, boothSize: value })
                }
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select booth size" />
                </SelectTrigger>
                <SelectContent>
                  {boothSizes?.map((size) => (
                    <SelectItem key={size._id} value={size._id}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-4 block">Thumbnail Image</Label>
              <UploadButton
                className="ut-label:bg-black"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setsingleBooth({
                    ...singleBooth,
                    thumbnail_image: res[0]?.url || "",
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {singleBooth.thumbnail_image && (
                <img
                  src={singleBooth.icon}
                  alt="Event Icon"
                  className="mt-2 w-16 h-16 object-cover rounded"
                />
              )}
            </div>
            <div>
              <Label className="mb-4 block">All Images</Label>
              <UploadButton
                className="ut-label:bg-black"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setsingleBooth({
                    ...singleBooth,
                    all_images: [
                      ...(singleBooth?.all_images || []),
                      res[0].url,
                    ],
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {singleBooth.all_images?.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 w-6 h-6"
                    onClick={() => {
                      const newImages = singleBooth.all_images.filter(
                        (_, i) => i !== index
                      );
                      setsingleBooth({
                        ...singleBooth,
                        all_images: newImages,
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <Label className="mb-4 block">Image Alt Text</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.image_alt_text}
                onChange={(e) =>
                  setsingleBooth({
                    ...singleBooth,
                    image_alt_text: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Package Title</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.slug}
                onChange={(e) =>
                  setsingleBooth({
                    ...singleBooth,
                    packge_title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={singleBooth.packge_description}
                onChange={(value) => {
                  setsingleBooth({ ...singleBooth, packge_description: value });
                }}
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
                value={singleBooth.meta_title}
                onChange={(e) =>
                  setsingleBooth({ ...singleBooth, meta_title: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Meta Description</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.meta_description}
                onChange={(e) =>
                  setsingleBooth({
                    ...singleBooth,
                    meta_description: e.target.value,
                  })
                }
                required
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

export default AddBoothPage;
