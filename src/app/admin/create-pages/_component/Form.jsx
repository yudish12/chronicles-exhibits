"use client";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateData } from "@/server/actions/pages";
import { convertHumanReadableText } from "@/utils";
import FieldRender from "@/components/FieldRender";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const PageEditForm = ({ pageData }) => {
  console.log(pageData);
  const router = useRouter();
  const [boothSizePage, setBoothSizePage] = React.useState({
    name: pageData.name,
    slug: pageData.slug ?? "",
    fields: pageData.fields ?? [],
    meta_description: pageData.meta_description ?? "",
    meta_keywords: pageData.meta_keywords ?? [],
    meta_title: pageData.meta_title ?? "",
  });

  const handleFieldChange = (index, value) => {
    setBoothSizePage({
      ...boothSizePage,
      fields: [
        ...boothSizePage.fields.slice(0, index),
        { ...boothSizePage.fields[index], value },
        ...boothSizePage.fields.slice(index + 1),
      ],
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateData(pageData.name, boothSizePage);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Page updated successfully");
      router.push("/admin/create-pages");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update page");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
      <form
        onSubmit={handleEdit}
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
    </div>
  );
};

export default PageEditForm;