/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "style")],
  },
};

module.exports = nextConfig;
