"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@uploadthing/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateAllPortfolios } from "@/server/actions/portfolio";
const EditPortfolio = ({ singlePortfolio }) => {
  const [portfolio, setPortfolio] = useState(singlePortfolio);
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateAllPortfolios(portfolio._id, {
      image: portfolio.image,
      image_alt_text: portfolio.image_alt_text,
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    toast.success("Blog updated successfully");
  };
  return (
    <>
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
            <div className="col-span-2">
              <Label className="mb-4 block">Image</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setPortfolio({ ...portfolio, image: res[0]?.url || "" });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {portfolio.image && (
                <img
                  src={portfolio.image}
                  alt="Blog Icon"
                  className="mt-2 w-16 h-16  rounded"
                />
              )}
            </div>
            <div className="col-span-2">
              <Label className="mb-4 block">Icon Alt Text</Label>
              <Input
                className="rounded-sm"
                value={portfolio.image_alt_text}
                onChange={(e) =>
                  setPortfolio({ ...portfolio, image_alt_text: e.target.value })
                }
                required
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center mb-4 gap-x-4">
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
    </>
  );
};
export default EditPortfolio;
