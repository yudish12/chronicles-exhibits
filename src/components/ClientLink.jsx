"use client";
import { RevalidatePath } from "@/server/actions/revalidate-path";
import { useRouter } from "next/navigation";
import React from "react";

const ClientLink = ({ link, children, revalidate }) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-full cursor-pointer"
      onClick={() => {
        if (!revalidate) {
          router.push(link);
        } else {
          window.location.href = link;
        }
      }}
    >
      {children}
    </div>
  );
};

export default ClientLink;
