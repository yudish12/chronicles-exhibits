"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import CkEditor from "./CkEditor";

const FieldRender = ({ field, value, onChange, index }) => {
  useEffect(() => {
    if (!window) return <></>;
  }, []);

  console.log(field, value);
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
      return <CkEditor value={value} onChange={onChange} index={index} />;
    default:
      return <div>Field type not found</div>;
  }
};

export default FieldRender;
