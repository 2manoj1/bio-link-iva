/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		optimizeCss: true,
	},
	swcMinify: true,
	images: {
		domains: ["instagram.fblr2-1.fna.fbcdn.net"],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
};

module.exports = nextConfig;
