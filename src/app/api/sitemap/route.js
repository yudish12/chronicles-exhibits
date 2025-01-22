
import dbConnect from '@/config/db-connect';
import sitemap from '@/server/models/sitemap';


// Get all sitemaps
export async function GET() {
  try {
    await dbConnect();
    const sitemaps = await sitemap.find({});
    return Response.json(sitemaps, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Error retrieving sitemaps' }, { status: 500 });
  }
}

// Create a new sitemap entry
export async function POST(req) {
  try {
    await dbConnect();
    const { url, priority, changefreq } = await req.json();
    
    if (!url || !priority || !changefreq) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newSitemap = await sitemap.create({ url, priority, changefreq });
    return Response.json(newSitemap, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Error creating sitemap' }, { status: 500 });
  }
}

// Update an existing sitemap
export async function PUT(req) {
  try {
    await dbConnect();
    const { id, url, priority, changefreq } = await req.json();
    
    const updatedSitemap = await sitemap.findByIdAndUpdate(id, { url, priority, changefreq }, { new: true });
    if (!updatedSitemap) {
      return Response.json({ message: 'Sitemap not found' }, { status: 404 });
    }
    return Response.json(updatedSitemap, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Error updating sitemap' }, { status: 500 });
  }
}

// Delete a sitemap entry
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    const deletedSitemap = await sitemap.findByIdAndDelete(id);
    if (!deletedSitemap) {
      return Response.json({ message: 'Sitemap not found' }, { status: 404 });
    }
    return Response.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Error deleting sitemap' }, { status: 500 });
  }
}
