"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
const EnquiryForm = dynamic(() => import("@/components/Form"), { ssr: false });
const ScheduleCallForm = dynamic(
  () => import("@/components/ScheduleCallForm"),
  { ssr: false }
);

const HeaderBtns = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-lg md:rounded-full bg-primary hover:text-white md:px-8 px-3 py-4 font-thin text text-lg  md:rounded-e-none text-black border  border-primary">
            Schedule Call
          </Button>
        </DialogTrigger>
        <DialogContent className={"overflow-y-scroll max-h-screen"}>
          <ScheduleCallForm />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-lg md:rounded-full hover:bg-primary hover:text-white md:px-8 px-3 py-4 font-thin text text-lg md:rounded-s-none text-black border md:border-l-0 bg-transparent border-primary">
            Get Quote
          </Button>
        </DialogTrigger>
        <DialogContent className={"overflow-y-scroll max-h-screen"}>
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderBtns;
