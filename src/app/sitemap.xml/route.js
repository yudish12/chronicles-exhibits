
import dbConnect from '@/config/db-connect';
import sitemap from '@/server/models/sitemap';

export async function GET() {
    await dbConnect();

    const urls = await sitemap.find().select('url lastModified').lean();

    const sitemapSchema = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((item) => `
        <url>
            <loc>${item.url}</loc>
            <lastmod>${new Date(item.lastModified).toISOString()}</lastmod>
            <priority>0.8</priority>
        </url>
    `).join('')}
</urlset>`;

    return new Response(sitemapSchema, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
