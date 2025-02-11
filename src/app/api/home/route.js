import dbConnect from '@/config/db-connect';
import Pages from "@/server/models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from '@/utils';
import { NextResponse } from 'next/server';
export async function  GET () {
    try {
      await dbConnect();
      const data  = Pages.findOne({name : "home"}).lean();
      return NextResponse.json(
        {data}
      );
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };
  