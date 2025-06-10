import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateICPConfig = () => {
  const configPath = path.join(__dirname, '..', 'icp-config.ts');
  
  try {
    // Get values from .env
    const canisterId = process.env.CANISTER_ID_BACKEND || "";
    const network = process.env.DFX_NETWORK;
    const host = process.env.DFX_NETWORK === "local" ? "http://localhost:4943" : "https://icp0.io";

    // Create the new config content
    const content = `export type ICPConfig = {
  canisterId: string;
  network: "local" | "playground" | "ic";
  host: string;
  lastDeployed: string;
}

export const icpConfig: ICPConfig = {
  canisterId: "${canisterId}",
  network: "${network}",
  host: "${host}",
  lastDeployed: "${new Date().toISOString()}"
}`;
    
    // Write the modified content back
    fs.writeFileSync(configPath, content, 'utf8');
    console.log('Successfully updated icp-config.ts');
  } catch (error) {
    console.error('Error updating icp-config.ts:', error);
    process.exit(1);
  }
};

updateICPConfig(); 