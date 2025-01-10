"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import CkEditor from "./CkEditor";
import { UploadButton } from "@uploadthing/react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteUTFiles } from "@/server/services/uploadthing";
import Keyvalueinput from "./ui/Keyvalueinput";

const FieldRender = ({ field, value, onChange, index }) => {
  useEffect(() => {
    if (!window) return <></>;
  }, []);

  switch (field.type) {
    case "text":
      return (
        <Input
          onChange={(e) => onChange(index, e.target.value)}
          value={value}
        />
      );
    case "textarea":
      return (
        <Textarea
          onChange={(e) => onChange(index, e.target.value)}
          value={value}
        />
      );
    case "body":
      return (
        <CkEditor
          value={value}
          onChange={(index, value) => onChange(index, value)}
          index={index}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          onChange={(e) => onChange(index, e.target.value)}
          value={value}
        />
      );
    case "key-value-array":
      return <Keyvalueinput />;
    case "upload":
      return (
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              onChange(index, res[0]?.url || "");
              toast.success("Icon uploaded successfully");
            }}
            onUploadError={(error) =>
              toast.error(`Upload failed: ${error.message}`)
            }
          />
          {value && (
            <div className="relative w-max">
              <Button
                variant="destructive"
                size="icon"
                className="absolute z-50 top-1 -right-8 w-6 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  const res = deleteUTFiles([value.split("f/")[1]]);
                  onChange(index, "");
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <img src={value} alt="Image" className="mt-2 w-16 h-16 rounded" />
            </div>
          )}
        </div>
      );
    default:
      return <div>Field type not found</div>;
  }
};

export default FieldRender;
