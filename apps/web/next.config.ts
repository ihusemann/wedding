import { env } from "./trpc/env";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/schemas"],
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
};

export default nextConfig;
