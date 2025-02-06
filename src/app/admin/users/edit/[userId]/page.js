import React from "react";
import { findSingleUser } from "@/server/actions/user";
import Edituser from "../../_components/Edituser";
const Page = async ({ params }) => {
  console.log("params" , params)
  const { userId } = await params;
  console.log(userId);
  const userResponse = await findSingleUser({ _id: userId });
  console.log("user res", userResponse);
  let singleUser = userResponse.data;

  return (
    <>
      <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
        <Edituser userData={singleUser} />
      </div>
    </>
  );
};
export default Page;
