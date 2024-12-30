"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { updateData } from "@/server/actions/booth-sizes";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateData as updatePageData } from "@/server/actions/pages";
import FieldRender from "@/components/FieldRender";
import { cn } from "@/lib/utils";
import { convertHumanReadableText } from "@/utils";
const Editboothsize = ({ singleBoothsizeData, pageData }) => {
  const [singleBoothSize, setSingleBoothSize] = React.useState({
    name: singleBoothsizeData.name,
    image: singleBoothsizeData.image,
    image_alt_text: singleBoothsizeData.image_alt_text,
    meta_title: singleBoothsizeData.meta_title,
    meta_description: singleBoothsizeData.meta_description,
    meta_keywords: singleBoothsizeData.meta_keywords ?? [],
  });

  const [boothSizePage, setBoothSizePage] = React.useState({
    name: pageData.name,
    slug: pageData.slug ?? "",
    fields: pageData.fields ?? [],
    meta_description: pageData.meta_description ?? "",
    meta_keywords: pageData.meta_keywords ?? [],
    meta_title: pageData.meta_title ?? "",
  });

  const router = useRouter();

  const handleFieldChange = (index, value) => {
    console.log(value, "vq");
    setBoothSizePage((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp.fields[index].value = value;
      console.log(temp);
      return temp;
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateData(singleBoothsizeData._id, singleBoothSize);
      const resp2 = await updatePageData(pageData.name, boothSizePage);
      console.log("resp2", resp2);
      if (!resp.success || !resp2.success) {
        toast.error(resp.err || resp2.err);
        return;
      }
      toast.success("Booth size added successfully");
      router.push("/admin/booth-sizes");
    } catch (error) {
      console.log("error==", error);
      toast.error("Failed to add booth size");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-screen bg-gray-200 p-8 gap-y-6 w-full">
      <form
        onSubmit={handleEditSubmit}
        className="w-full flex flex-col justify-around gap-y-10  "
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row gap-2 items-center">
            <hr className="w-[40%]" />
            <CardTitle className="text-2xl w-[20%] font-bold text-center">
              Edit Size Data
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
            {boothSizePage.fields.map((field, index) => (
              <div
                className={cn(field.type === "body" && "col-span-2")}
                key={index}
              >
                <Label className="mb-4 block">
                  Enter {convertHumanReadableText(field.key)}
                </Label>
                <FieldRender
                  value={field.value}
                  onChange={handleFieldChange}
                  field={field}
                  index={index}
                />
              </div>
            ))}
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
              <Label className="mb-4 block">Meta Title</Label>
              <Input
                className="rounded-sm"
                value={boothSizePage.meta_title}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
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
                value={boothSizePage.meta_description}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    meta_description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Meta Keywords</Label>
              <TagsInput
                value={boothSizePage.meta_keywords ?? []}
                onChange={(e) =>
                  setBoothSizePage({ ...boothSizePage, meta_keywords: e })
                }
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
            Edit Booth Size
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

export default Editboothsize;
