import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const randomToken = Math.random().toString(36).substring(2, 15);

const fixDeclarations = () => {
  const declarationsPath = path.join(__dirname, '..', 'app', 'declarations', 'playground_backend', 'index.js');
  
  try {
    // Read the file
    let content = fs.readFileSync(declarationsPath, 'utf8');
    
    // Create a more resilient canisterId initialization
    const canisterIdCode = `
// Store the canister ID in a way that persists across hot reloads
let _canisterId = null;
export const canisterId = (() => {
  if (!_canisterId) {
    _canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_BACKEND;
    console.log("==============DEBUG CANISTER ID===============");
    console.log("Random token:", "${randomToken}");
    console.log("Initial canisterId:", _canisterId);
    console.log("Environment:", process.env.NEXT_PUBLIC_DFX_NETWORK);
    console.log("============================================");
  }
  return _canisterId;
})();
`;

    // Replace the canisterId export
    content = content.replace(
      /export const canisterId =[\s\S]*?;/,
      canisterIdCode
    );
    
    // Replace the createActor function while preserving the rest
    content = content.replace(
      /export const createActor = \(canisterId, options = \{\}\) => \{[\s\S]*?const agent = options\.agent \|\| new HttpAgent\(\{[\s\S]*?\}\);/,
      `export const createActor = (canisterId, options = {}) => {
  console.log("==============DEBUG CREATE ACTOR===============");
  console.log("Creating actor with canisterId:", canisterId);
  const agent = options.agent || new HttpAgent({ 
    ...options.agentOptions,
    host: process.env.NEXT_PUBLIC_DFX_NETWORK === "local" ? "http://localhost:4943" : "https://icp0.io"
  });`
    );
    
    // Write the modified content back
    fs.writeFileSync(declarationsPath, content, 'utf8');
    console.log('Successfully updated declarations file');
  } catch (error) {
    console.error('Error updating declarations file:', error);
    process.exit(1);
  }
};

fixDeclarations(); 