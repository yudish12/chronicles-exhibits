import dbConnect from '@/config/db-connect';
import BoothSize from '@/server/models/booth-sizes';

export async function GET() {
    try {
        await dbConnect();
        const boothSizes = await BoothSize.find({});
        return Response.json(boothSizes, { status: 200 });
    } catch (error) {
        return Response.json({ message: 'Error retrieving booth sizes' }, { status: 500 });
    }
}
