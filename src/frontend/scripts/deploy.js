import { execSync } from 'child_process';

const isUpgrade = process.argv[2] === 'upgrade';
const network = process.argv[3] ? `--network ${process.argv[3]}` : '';

try {
  // Generate candid files
  console.log('Generating candid files...');
  execSync('yarn generate', { stdio: 'inherit' });
  
  // Deploy the backend
  console.log(`Deploying backend (${isUpgrade ? 'upgrade' : 'reinstall'})...`);
  const mode = isUpgrade ? 'upgrade' : 'reinstall';
  execSync(`dfx deploy backend --yes -m ${mode} ${network}`, { stdio: 'inherit' });
  
  // Update ICP config
  console.log('Updating ICP config...');
  execSync('node scripts/update-icp-config.js', { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} 