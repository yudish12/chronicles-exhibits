"use client";
import { cn } from "@/lib/utils";
import { RevalidatePath } from "@/server/actions/revalidate-path";
import { useRouter } from "next/navigation";
import React from "react";

const ClientLink = ({ className, link, children, revalidate }) => {
  const router = useRouter();
  return (
    <div
      className={cn("w-full h-full cursor-pointer", className)}
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
