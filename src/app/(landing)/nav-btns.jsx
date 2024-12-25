"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleCallForm from "@/components/ScheduleCallForm";
import EnquiryForm from "@/components/Form";
const HeaderBtns = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full hover:bg-primary hover:text-white px-8 py-4 font-thin text text-lg rounded-e-none text-black border bg-transparent border-primary">
            Schedule Call
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <ScheduleCallForm />
        </DialogContent>
      </Dialog>
      <Dialog>
      <DialogTrigger asChild>
      <Button className="rounded-full hover:bg-primary hover:text-white px-8 py-4 font-thin text text-lg rounded-s-none text-black border border-l-0 bg-transparent border-primary">
        Get Quote
      </Button>
      </DialogTrigger>
      <DialogContent className="">
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderBtns;
