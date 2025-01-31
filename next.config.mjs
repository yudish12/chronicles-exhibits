/** @type {import('next').NextConfig} */
const nextConfig = {
  //https://stackoverflow.com/questions/61880435/adding-prefix-to-nextjs-dynamic-route for rewrites
  rewrites: async () => {
    return [
      {
        source: "/:size-trade-show-booth",
        destination: "/booth/size/:size",
      },
      {
        source: "/:size-trade-show-booth/:booth_code",
        destination: "/booth/size/:size/:booth_code",
      },
      {
        source: "/blog",
        destination: "/blogs",
      },
      {
        source: "/trade-show-booth-rentals-:city",
        destination: "/locations/:city",
      },
      {
        source: "/major-exhibiting-cities",
        destination: "/locations",
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    domains: ["utfs.io"], // Add the domain here
  },
};

export default nextConfig;
