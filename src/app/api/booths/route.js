import dbConnect from "@/config/db-connect";
import Booth from "@/server/models/booths";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const size = searchParams.get("size");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;
    const skip = (page - 1) * limit;

    if (!size) {
      return Response.json(
        getActionFailureResponse("Size parameter is required", "toast"),
        { status: 400 }
      );
    }

    const data = await Booth.aggregate([
      {
        $lookup: {
          from: "boothsizes",
          localField: "booth_size",
          foreignField: "_id",
          as: "boothSizeData",
        },
      },
      {
        $unwind: {
          path: "$boothSizeData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "boothSizeData.name": size.toLowerCase(),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const totalCount = await Booth.aggregate([
      {
        $lookup: {
          from: "boothsizes",
          localField: "booth_size",
          foreignField: "_id",
          as: "boothSizeData",
        },
      },
      {
        $unwind: {
          path: "$boothSizeData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "boothSizeData.name": size.toLowerCase(),
        },
      },
      {
        $count: "total",
      },
    ]);

    const total = totalCount[0]?.total || 0;
    const hasMore = skip + limit < total;

    return Response.json(
      getActionSuccessResponse({
        booths: data,
        pagination: {
          page,
          limit,
          total,
          hasMore,
          totalPages: Math.ceil(total / limit),
        },
      })
    );
  } catch (error) {
    return Response.json(getActionFailureResponse(error, "toast"), {
      status: 500,
    });
  }
}
