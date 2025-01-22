import mongoose from 'mongoose';

const SitemapSchema = new mongoose.Schema({
  url: { type: String, required: true },
  priority: { type: String, required: true },
  changefreq: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Sitemap || mongoose.model('Sitemap', SitemapSchema);
