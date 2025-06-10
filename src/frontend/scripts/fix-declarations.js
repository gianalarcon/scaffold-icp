import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixDeclarations = () => {
  const declarationsPath = path.join(__dirname, '..', 'app', 'declarations', 'backend', 'index.js');
  
  try {
    const content = `import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./backend.did.js";
import { icpConfig } from '@/icp-config';
export { idlFactory } from "./backend.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId = icpConfig.canisterId;

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ 
    ...options.agentOptions,
    host: icpConfig.host
  });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (icpConfig.network !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const backend = canisterId ? createActor(canisterId) : undefined;`;
    
    // Write the modified content back
    fs.writeFileSync(declarationsPath, content, 'utf8');
    console.log('Successfully updated declarations file');
  } catch (error) {
    console.error('Error updating declarations file:', error);
    process.exit(1);
  }
};

fixDeclarations(); 