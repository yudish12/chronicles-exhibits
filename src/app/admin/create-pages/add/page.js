"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import "../../../globals.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { addData } from "@/server/actions/booth-sizes";
import { Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddPage = () => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const [addingField, setAddingField] = React.useState({
    key: "",
    value: "",
  });

  const [singlePage, setSinglePage] = React.useState({
    name: "",
    slug: "",
    fields: [],
    meta_description: "",
    meta_keywords: [],
    meta_title: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singlePage);
      if (!resp.success) {
        toast.error(resp.err);
        return;
      }
      toast.success("Booth size added successfully");
      setSinglePage({
        name: "",
        image: "",
        image_alt_text: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
      });
      router.push("/admin/create-pages");
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
                value={singlePage.name}
                onChange={(e) =>
                  setSinglePage({
                    ...singlePage,
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
                  setSinglePage({
                    ...singlePage,
                    image: res[0]?.url || "",
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {singlePage.image && (
                <div className="relative w-max">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute z-50 top-1 -right-8 w-6 h-6"
                    onClick={() => {
                      console.log(
                        singlePage.image.split("f/")[1],
                        singlePage.image
                      );
                      const res = deleteUTFiles([
                        singlePage.image.split("f/")[1],
                      ]);
                      setSinglePage({
                        ...singlePage,
                        image: null,
                      });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <img
                    src={singlePage.image}
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
                value={singlePage.image_alt_text}
                onChange={(e) =>
                  setSinglePage({
                    ...singlePage,
                    image_alt_text: e.target.value,
                  })
                }
                required
              />
            </div>
            {singlePage.fields.map((field, index) => (
              <div key={index} className="relative">
                <Label className="mb-4 block">Enter {field.key}</Label>
                <Input
                  className="rounded-sm"
                  value={field.value}
                  onChange={(e) =>
                    setSinglePage({
                      ...singlePage,
                      fields: [
                        ...singlePage.fields.slice(0, index),
                        { ...field, value: e.target.value },
                        ...singlePage.fields.slice(index + 1),
                      ],
                    })
                  }
                  required
                />
                <div
                  onClick={() =>
                    setSinglePage({
                      ...singlePage,
                      fields: [
                        ...singlePage.fields.slice(0, index),
                        ...singlePage.fields.slice(index + 1),
                      ],
                    })
                  }
                >
                  <X
                    className="top-0 cursor-pointer absolute size-5 right-0 border-red-600 border-2 rounded-full"
                    stroke="#ff0000"
                  />
                </div>
              </div>
            ))}
            <button
              style={{ minHeight: "150px" }}
              onClick={() => setOpen(!open)}
              className="rounded-md col-span-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r4:"
              data-state="closed"
            >
              <Image
                alt="addForm"
                src={"/add-form.svg"}
                width={40}
                height={40}
              />
              <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
                Add Field
              </p>
            </button>
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
                value={singlePage.meta_title}
                onChange={(e) =>
                  setSinglePage({
                    ...singlePage,
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
                value={singlePage.meta_description}
                onChange={(e) =>
                  setSinglePage({
                    ...singlePage,
                    meta_description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label className="mb-4 block">Image Alt Text</Label>
              <Input
                className="rounded-sm"
                value={singlePage.image_alt_text}
                onChange={(e) =>
                  setSinglePage({
                    ...singlePage,
                    image_alt_text: e.target.value,
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
            Create Page
          </Button>
          <Button
            variant="outline"
            className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
          >
            Save Draft
          </Button>
        </div>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new field to your page</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="mb-4 block">Field Key</Label>
            <Input
              className="rounded-sm"
              value={addingField.key}
              onChange={(e) =>
                setAddingField({ ...addingField, key: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label className="mb-4 block">Field Value</Label>
            <Input
              className="rounded-sm"
              value={addingField.value}
              onChange={(e) =>
                setAddingField({ ...addingField, value: e.target.value })
              }
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="border-secondary bg-secondary text-white font-semibold px-4 py-4"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSinglePage({
                  ...singlePage,
                  fields: [...singlePage.fields, addingField],
                });
                setAddingField({
                  key: "",
                  value: "",
                });
                setOpen(false);
              }}
              variant="destructive"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPage;
