import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "pg"], // Keeps Prisma isolated on the server side
  
  turbopack: {
    resolveAlias: {
      "@prisma/client/runtime/client": "@prisma/client/runtime/library",
    },
  },
};

export default nextConfig;
