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
        source: "/blog",
        destination: "/blogs",
      },
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
      },
    ];
  },
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
