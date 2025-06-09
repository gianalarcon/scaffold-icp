import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixDeclarations = () => {
  const declarationsPath = path.join(__dirname, '..', 'app', 'declarations', 'playground_backend', 'index.js');
  
  try {
    // Read the file
    let content = fs.readFileSync(declarationsPath, 'utf8');
    
    // Replace the canisterId export
    content = content.replace(
      /export const canisterId =[\s\S]*?;/,
      `export const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_BACKEND;\nconsole.log("==============DEBUG NOBODY===============");\nconsole.log(canisterId);\nconsole.log(process.env.NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_BACKEND);\nconsole.log("==============DEBUG NOBODY===============");`
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