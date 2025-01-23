import mongoose from 'mongoose';

const SitemapSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    lastModified: { type: Date, default: Date.now },
});

export default mongoose.models.Sitemap || mongoose.model('Sitemap', SitemapSchema);
