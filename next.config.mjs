/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Don’t include mongoose in client bundles
    serverComponentsExternalPackages: ["mongoose"],
    esmExternals: "loose",
  },
  serverExternalPackages: ["mongoose"],
  webpack(config) {
    config.experiments = {
      // keep all Next.js defaults…
      ...config.experiments,
      // …then add yours
      topLevelAwait: true,
      // ensure layers remains enabled
      layers: true,
    };
    return config;
  },
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
        destination: "/major-exhibiting-cities/:city",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
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
  productionBrowserSourceMaps: true,
};

export default nextConfig;
