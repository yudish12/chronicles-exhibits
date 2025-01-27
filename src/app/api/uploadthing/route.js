import { ourFileRouter } from "@/server/services/uploadthing";
import { createRouteHandler } from "uploadthing/next";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
    callbackUrl: process.env.UPLOADTHING_CALLBACK_URL,
  }
  // Apply an (optional) custom config:
  // config: { ... },
});
