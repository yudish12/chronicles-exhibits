"use client";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSinglePage } from "@/server/actions/pages";
import { Textarea } from "@/components/ui/textarea";
import CkeEditor from "@/components/CkEditor";
import { updateData } from "@/server/actions/pages";

const Page = () => {
  const router = useRouter();
  const [boothSizePage, setBoothSizePage] = useState({
    fields: {
      top_title: "",
      top_btn_text: "",
      booth_size_title: "",
      booth_size_subtitle: "",
      second_title: "",
      second_subtitle: "",
      second_btn_text: "",
      third_title: "",
      third_body: "<p>Hello</p>",
    },
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
  });
  const [loading, setLoading] = React.useState(true);

  const getBoothsizePageData = async () => {
    try {
      const pageData = await getSinglePage({ name: "booth-size" });
      console.log("pageData", pageData);
      if (!pageData.success) {
        toast.error(pageData.error);
        return;
      }
      setBoothSizePage(
        pageData.data ?? {
          fields: {
            top_title: "",
            top_btn_text: "",
            booth_size_title: "",
            booth_size_subtitle: "",
            second_title: "",
            second_subtitle: "",
            second_btn_text: "",
            third_title: "",
            third_body: "<p>Hello</p>",
          },
          meta_title: "",
          meta_description: "",
          meta_keywords: [],
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch booth size page");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateData("booth-size", boothSizePage);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Booth size added successfully");
      router.push("/admin/booth-sizes");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to add booth size");
    }
  };

  useEffect(() => {
    getBoothsizePageData();
  }, []);

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
            <div>
              <Label className="mb-4 block">Top Title</Label>
              <Input
                className="rounded-sm"
                value={boothSizePage.fields.top_title}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      top_title: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Top Button Text</Label>
              <Input
                className="rounded-sm"
                value={boothSizePage.fields.top_btn_text}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      top_btn_text: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-4 block">Booth size title</Label>

              <Input
                className="rounded-sm"
                value={boothSizePage.fields.booth_size_title}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      booth_size_title: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Booth size subtitle</Label>

              <Input
                className="rounded-sm"
                value={boothSizePage.fields.booth_size_subtitle}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      booth_size_subtitle: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Second title</Label>

              <Input
                className="rounded-sm"
                value={boothSizePage.fields.second_title}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      second_title: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Second subtitle</Label>

              <Textarea
                className="rounded-sm"
                value={boothSizePage.fields.second_subtitle}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      second_subtitle: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Second button text</Label>
              <Input
                className="rounded-sm"
                value={boothSizePage.fields.second_btn_text}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      second_btn_text: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Third title</Label>
              <Input
                className="rounded-sm"
                value={boothSizePage.fields.third_title}
                onChange={(e) =>
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: {
                      ...boothSizePage.fields,
                      third_title: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Body</Label>
              <CkeEditor
                value={boothSizePage.fields.third_body}
                onChange={(value) => {
                  setBoothSizePage({
                    ...boothSizePage,
                    fields: { ...boothSizePage.fields, third_body: value },
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

export default Page;
