import dbConnect from '@/config/db-connect';
import Pages from "@/server/models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from '@/utils';
import { NextResponse } from 'next/server';
export async function  GET () {
    try {
      await dbConnect();
      const data  = await Pages.findOne({name : "home"}).lean();
      // return NextResponse.json(
      //   {data}
      // );
      return Response.json(getActionSuccessResponse(data));
    } catch (error) {
      return Response.json(getActionFailureResponse(error, "toast"), {status : 500});
    }
  };
  