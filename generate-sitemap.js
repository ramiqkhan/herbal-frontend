import fs from 'fs';
import path from 'path';

const BASE_URL = "https://www.theherbalyze.com";
const API_URL = "https://herbal-backend-chi.vercel.app/api/products";

// 1. Saare static routes jo aapko sitemap mein chahiye
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/track',
  '/blogs',
  '/services',
  '/privacy-policy',
  '/terms-of-service',
  '/shipping-policy',
  '/refund-policy'
];

async function generateSitemap() {
  try {
    console.log("⏳ Fetching dynamic products for sitemap...");
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Backend API completely offline.");
    
    const data = await res.json();
    const products = Array.isArray(data) ? data : (data.products || data.data || []);
    
    // Products ke clean slugs map karein
    const productRoutes = products
      .filter(p => p.seoUrl)
      .map(p => `/product/${p.seoUrl}`);

    // Dono arrays ko merge kar dein
    const allRoutes = [...staticRoutes, ...productRoutes];
    const currentDate = new Date().toISOString();

    // 2. Pure XML string structure build karein
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    allRoutes.forEach(route => {
      const priority = route === '/' ? '1.0' : route.startsWith('/product/') ? '0.8' : '0.6';
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    // 3. File ko direct build ke public ya dist folder mein write karein
    // Taake build foldering target clean ho sake
    const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
    
    // Ensure dist folder exists before writing
    if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
      fs.mkdirSync(path.join(process.cwd(), 'dist'));
    }

    fs.writeFileSync(distPath, xml, 'utf8');
    console.log(`✅ Rock-solid sitemap successfully generated with ${allRoutes.length} URLs!`);

  } catch (error) {
    console.error("❌ Sitemap automation processing crashed:", error);
  }
}

generateSitemap();