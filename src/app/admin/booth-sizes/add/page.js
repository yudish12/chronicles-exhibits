"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import "../../../globals.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { addData } from "@/server/actions/booth-sizes";

const AddBoothSizePage = () => {
  const [singleBoothSize, setSingleBoothSize] = React.useState({
    name: "",
    image: "",
    image_alt_text: "",
    meta_title: "",
    meta_description: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBoothSize);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Booth size added successfully");
      setSingleBoothSize({
        name: "",
        image: "",
        image_alt_text: "",
        meta_title: "",
        meta_description: "",
      });
    } catch (error) {
      console.log("error==", error);
      toast.error("Failed to add booth size");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-screen bg-gray-200 p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col justify-around gap-y-10  "
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
              <Label className="mb-4 block">Name</Label>
              <Input
                className="rounded-sm"
                value={singleBoothSize.name}
                onChange={(e) =>
                  setSingleBoothSize({
                    ...singleBoothSize,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Image</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setSingleBoothSize({
                    ...singleBoothSize,
                    image: res[0]?.url || "",
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {singleBoothSize.image && (
                <div className="relative w-max">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute z-50 top-1 -right-8 w-6 h-6"
                    onClick={() => {
                      console.log(
                        singleBoothSize.image.split("f/")[1],
                        singleBoothSize.image
                      );
                      const res = deleteUTFiles([
                        singleBoothSize.image.split("f/")[1],
                      ]);
                      setSingleBoothSize({
                        ...singleBoothSize,
                        image: null,
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <img
                    src={singleBoothSize.image}
                    alt="Event Icon"
                    className="mt-2 w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <Label className="mb-4 block">Image Alt Text</Label>
              <Input
                className="rounded-sm"
                value={singleBoothSize.image_alt_text}
                onChange={(e) =>
                  setSingleBoothSize({
                    ...singleBoothSize,
                    image_alt_text: e.target.value,
                  })
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Add SEO Data
            </CardTitle>
            <hr className="w-[40%]" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <div>
              <Label className="mb-4 block">Meta Title</Label>
              <Input
                className="rounded-sm"
                value={singleBoothSize.meta_title}
                onChange={(e) =>
                  setSingleBoothSize({
                    ...singleBoothSize,
                    meta_title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Meta Description</Label>
              <Input
                className="rounded-sm"
                value={singleBoothSize.meta_description}
                onChange={(e) =>
                  setSingleBoothSize({
                    ...singleBoothSize,
                    meta_description: e.target.value,
                  })
                }
                required
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end mb-4 gap-x-4 ">
          <Button
            type="submit"
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Add Booth Size
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBoothSizePage;
