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
        destination: "/booth/code/:booth_code",
      },
      {
        source: "/blog",
        destination: "/blogs",
      },
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
      },
      {
        source: "/trade-show-booth-rental-and-exhibits-:city",
        destination: "/locations/:city",
      },
      {
        source: "/major-exhibiting-cities",
        destination: "/locations",
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
