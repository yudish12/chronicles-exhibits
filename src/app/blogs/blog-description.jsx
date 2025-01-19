"use client";
import { CardDescription } from "@/components/ui/card";
import React, { useLayoutEffect, useState } from "react";

const BlogDesc = ({ body }) => {
    const [textWith30Words, setTextWith30Words] = useState("");

    useLayoutEffect(() => {
      if (!body) return;
  
      const div = document.createElement("div");
      div.innerHTML = body;
  
      // Get all paragraphs as an array
      const paragraphs = Array.from(div.querySelectorAll("p"));
  
      // Extract 30 words from the text content of all paragraphs
      const allText = paragraphs.map((p) => p.textContent).join(" ");
      const first30Words = allText.split(" ").slice(0, 20).join(" ");
  
      // Update state with the first 30 words
      setTextWith30Words(first30Words);
    }, [body]);

  return <CardDescription className="text-sm text-black mt-2">{textWith30Words}...</CardDescription>;
};

export default BlogDesc;
