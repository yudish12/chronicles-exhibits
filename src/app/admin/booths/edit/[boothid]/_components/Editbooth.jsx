"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import CkeEditor from "@/components/CkEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { Trash2 } from "lucide-react";
import { deleteUTFiles } from "@/server/services/uploadthing";
import { updateData } from "@/server/actions/booths";
import { useRouter } from "next/navigation";

const Editbooth = ({ boothData }) => {
  const [boothSizes, setBoothSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [singleBooth, setsingleBooth] = React.useState(boothData);

  const router = useRouter();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleBooth._id, {
      booth_code: singleBooth.booth_code,
      slug: singleBooth.slug,
      booth_size: singleBooth.booth_size,
      thumbnail_image: singleBooth.thumbnail_image,
      all_images: singleBooth.all_images,
      image_alt_text: singleBooth.image_alt_text,
      package_title: singleBooth.package_title,
      package_description: singleBooth.package_description,
      meta_title: singleBooth.meta_title,
      meta_description: singleBooth.meta_description,
      meta_keywords: singleBooth.meta_keywords ?? [],
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    toast.success("Booth updated successfully");
    router.push("/admin/booths");
  };

  const getData = async () => {
    try {
      const resp = await getAllBoothSizes();
      console.log(resp);
      if (!resp.success) {
        toast.error(resp.err);
        setLoading(false);
        return;
      }
      setBoothSizes(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-screen bg-gray-200 p-8 gap-y-6 w-full">
      <form
        onSubmit={handleEditSubmit}
        className="w-full flex flex-col gap-y-10"
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Edit Page Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-4 block">Booth Code</Label>
              <Input
                className="rounded-sm"
                value={singleBooth.booth_code}
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
                  setsingleBooth({
                    ...singleBooth,
                    slug: e.target.value.replace(" ", "-").toLowerCase(),
                  })
                }
                required
                title="No spaces, only lowercase letters and dashes"
              />
            </div>
            <div>
              <Label className="mb-4 block">Booth Size</Label>
              <Select
                value={singleBooth?.booth_size || ""}
                onValueChange={(value) => {
                  console.log(value);
                  setsingleBooth({
                    ...singleBooth,
                    booth_size: value,
                  });
                }}
                required
              >
                <SelectTrigger className="col-span-3">
                  {!singleBooth.booth_size
                    ? "Select Booth Size"
                    : boothSizes.find((e) => e._id === singleBooth.booth_size)
                        ?.name}
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
                <div className="relative w-max">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute z-50 top-1 -right-8 w-6 h-6"
                    onClick={() => {
                      console.log(
                        singleBooth.thumbnail_image.split("f/")[1],
                        singleBooth.thumbnail_image
                      );
                      const res = deleteUTFiles([
                        singleBooth.thumbnail_image.split("f/")[1],
                      ]);
                      setsingleBooth({
                        ...singleBooth,
                        thumbnail_image: null,
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <img
                    src={singleBooth.thumbnail_image}
                    alt="Event Icon"
                    className="mt-2 w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <Label className="mb-4 block">All Images</Label>
              <UploadButton
                className="ut-label:bg-black"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log(res);
                  setsingleBooth({
                    ...singleBooth,
                    all_images: [
                      ...(singleBooth?.all_images || []),
                      ...res.map((e) => e.url),
                    ],
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              <div className="grid grid-cols-4 gap-2">
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
                      className="absolute z-50 top-1 right-1 w-6 h-6"
                      onClick={() => {
                        const newImages = singleBooth.all_images.filter(
                          (_, i) => i !== index
                        );
                        deleteUTFiles([img.split("/").pop()]);
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
                value={singleBooth.package_title}
                onChange={(e) =>
                  setsingleBooth({
                    ...singleBooth,
                    package_title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={singleBooth.package_description}
                onChange={(value) => {
                  setsingleBooth({ ...singleBooth, package_description: value });
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Edit SEO Data
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
            <div>
              <Label className="mb-4 block">Meta Keywords</Label>
              <TagsInput
                value={singleBooth.meta_keywords ?? []}
                onChange={(e) =>
                  setsingleBooth({ ...singleBooth, meta_keywords: e })
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
            Edit Booth
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

export default Editbooth;
