"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadButton } from "@uploadthing/react";
import { addPortfolio } from "@/server/actions/portfolio";
const AddPortfolioPage = () => {
  const [singlePortfolio, setSinglePortfolio] = useState({ image: "" , image_alt_text : ""});

  const handleAddSubmit =async  (e) => {
    e.preventDefault();
    try{
    const resp = await addPortfolio(singlePortfolio)
    if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      toast.success("Portfolio added successfully");
      setSinglePortfolio({
        image : "",
        image_alt_text : ""
      })

    }catch(error){
        console.log("error==", error);
        toast.error("Failed to add blog");
    }
    
   
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col justify-around gap-y-10"
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
          <div className="col-span-2">
              <Label className="mb-4 block">Image</Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setSinglePortfolio({
                    ...singlePortfolio,
                    image: res[0]?.url || "",
                  });
                  toast.success("Icon uploaded successfully");
                }}
                onUploadError={(error) =>
                  toast.error(`Upload failed: ${error.message}`)
                }
              />
              {singlePortfolio.image && (
                <img
                  src={singlePortfolio.image}
                  alt="Blog Icon"
                  className="mt-2 w-16 h-16 object-cover rounded"
                />
              )}
            </div>
            <div className="col-span-2">
                <Label className="mb-4 block">Image Alt Text</Label>
                <Input
                className="rounded-sm"
                value={singlePortfolio.image_alt_text}
                onChange={(e) =>
                  setSinglePortfolio({ ...singlePortfolio, image_alt_text: e.target.value })
                }
                required
                title="No spaces, only lowercase letters and dashes"
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="mt-4 hover:bg-secondary hover:text-white bg-secondary text-white">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPortfolioPage;
