"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { updateData } from "@/server/actions/user";
import { useRouter } from "next/navigation";
const Edituser = ({ userData }) => {
  const [singleUser, setsingleUser] = React.useState(userData);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateData(singleUser._id, {
      email : singleUser.email,
      password: singleUser.password
    });
    if (!resp.success) {
      toast.error(resp.err);
      return;
    }
    toast.success("User updated successfully");
    router.push("/admin/users");
  };


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
              <Label className="mb-4 block">Email</Label>
              <Input
                className="rounded-sm"
                value={singleUser.email}
                onChange={(e) =>
                  setsingleUser({ ...singleUser, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label className="mb-4 block">Password</Label>
              <Input
                className="rounded-sm"
                value={singleUser.password}
                onChange={(e) =>
                  setsingleUser({
                    ...singleUser,
                    password: e.target.value,
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
            Edit Booth
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edituser;
