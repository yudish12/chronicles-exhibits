import pages from "@/server/models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const faqPageData = await pages.findOne({ name: "faq" }).lean();
    return NextResponse.json(getActionSuccessResponse(faqPageData));
  } catch (error) {
    return NextResponse.json(getActionFailureResponse(error, "toast"), {
      status: 500,
    });
  }
}
