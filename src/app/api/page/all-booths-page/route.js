import dbConnect from '@/config/db-connect';
import Pages from "@/server/models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from '@/utils';

export async function GET(){
    try {
        await dbConnect();
        const pages = await Pages.findOne({name:"trade-show-booth-displays-designs"}).lean();
        return Response.json(getActionSuccessResponse(pages));
    } catch (error) {
        return Response.json(getActionFailureResponse(error,"toast"), { status: 500 });
    }
} 