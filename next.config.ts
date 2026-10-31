const path = require('path');

/**
 * Turbopack can treat `../investment` as the PostCSS root when the parent folder
 * has no package.json, so `@import "tailwindcss"` fails there (Next.js #92452).
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		root: path.join(__dirname),
	},
	images: {
		domains: ['trustochain.com', 'res.cloudinary.com'],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
};

module.exports = nextConfig;
