import dbConnect from '@/config/db-connect';
import Pages from "../models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from '@/utils';

export async function GET(){
    try {
        await dbConnect();
        const pages = await Pages.find({name:"locations"}).lean();
        return Response.json(getActionSuccessResponse(pages));
    } catch (error) {
        return Response.json(getActionFailureResponse(error,"toast"), { status: 500 });
    }
} 