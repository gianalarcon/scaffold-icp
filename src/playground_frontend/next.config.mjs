/** @type {import('next').NextConfig} */
import webpack from "webpack";
import nextPWA from "next-pwa";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { config } from 'dotenv';
import DFXWebPackConfig from './dfx.webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only load .env if environment variables are not set (for local development)
config({ path: resolve(__dirname, '.env') });

// Initialize canister IDs
DFXWebPackConfig.initCanisterIds();

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
  NEXT_PUBLIC_DFX_NETWORK: process.env.DFX_NETWORK,
  NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_BACKEND: process.env.CANISTER_ID_PLAYGROUND_BACKEND,
  NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_FRONTEND: process.env.CANISTER_ID_PLAYGROUND_FRONTEND || process.env.CANISTER_ID,
  NEXT_PUBLIC_CANISTER_ID: process.env.CANISTER_ID,
  NEXT_PUBLIC_CANISTER_CANDID_PATH: process.env.CANISTER_CANDID_PATH,
});


const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  logging: {
    incomingRequests: false,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "identicon.starknet.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.starkurabu.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(EnvPlugin);
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:(.*)$/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }),
    );

    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: "error",
      };

      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: 1000,
        aggregateTimeout: 300,
        followSymlinks: true,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);
