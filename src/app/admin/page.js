import { Card } from "@/components/ui/card";
import React from "react";
import "../globals.css";

const Page = () => {
  return (
    <main className="flex-1 bg-border p-4">
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold">
          Hello Admin, Welcome to the Dashboard 👋
        </h1>
        <p>Below are some important links to get you started.</p>
      </Card>
    </main>
  );
};

export default Page;
