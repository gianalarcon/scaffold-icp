import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import webpack from 'webpack';
import { config } from 'dotenv';
import DFXWebPackConfig from './dfx.webpack.config.js';
import { execSync } from 'child_process';

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Plugin
    config.plugins.push(EnvPlugin);

    // Important: return the modified config
    return config;
  },
  output: "export",
};

export default nextConfig;