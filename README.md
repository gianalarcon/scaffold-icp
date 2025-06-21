# Scaffold-ICP

A modern, type-safe development framework for building Internet Computer (ICP) dApps with Next.js and React. Scaffold-ICP provides a streamlined developer experience with pre-configured tooling, type-safe contract interactions, and rapid deployment capabilities.

[Video demo](https://x.com/gianmalarcon/status/1933403896246120497)
## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- Yarn package manager
- DFX (Internet Computer SDK)

### Installation

Install DFX:

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
dfx --version
```

Clone and setup the project:

```bash
git clone https://github.com/gianalarcon/scaffold-icp.git
cd scaffold-icp
yarn install
```

### Running Locally

Start the local ICP replica:

```bash
yarn chain
```

Deploy your canisters:

```bash
yarn deploy
```

Start the frontend development server:

```bash
yarn start
```

Your dApp will be available at `http://localhost:3000` with hot reload enabled.

## 🏗️ Architecture

### Project Structure

```
scaffold-icp/
├── .yarn/                 # Yarn workspace files  
├── node_modules/          # Dependencies
├── src/
│   ├── backend/
│   │   └── main.mo        # Motoko backend canister
│   └── frontend/          # Next.js frontend workspace
│       ├── app/           # Next.js App Router pages
│       │   ├── actor/     # IC Reactor hooks and setup
│       │   ├── components/ # React components
│       │   ├── declarations/ # Auto-generated Candid interfaces
│       │   ├── types/     # TypeScript type definitions
│       │   ├── layout.tsx  # App layout
│       │   └── page.tsx    # Home page
│       ├── dfx.json       # DFX configuration
│       ├── icp-config.ts  # ICP configuration
│       ├── package.json   # Frontend dependencies
├── package.json           # Root workspace configuration
```

### Key Components

**Frontend Stack:**

- **Next.js 15.2.0**: React framework with static export for IC deployment
- **TypeScript**: Full type safety throughout the application
- **IC Reactor 1.16.0**: Type-safe React hooks for canister interactions

**Backend Integration:**

- **Candid Interface Generation**: Automatic TypeScript types from Motoko/Rust canisters
- **Agent-JS**: Official ICP JavaScript agent for canister communication
- **Multi-Network Support**: Local, playground, and mainnet deployments

### Type-Safe Contract Interactions

Scaffold-ICP leverages IC Reactor for type-safe canister interactions:

```typescript
// Auto-generated from your canister interface
export const { useActorStore, useAuth, useQueryCall, useUpdateCall } = createReactor<Actor>({
  canisterId: icpConfig.canisterId,
  idlFactory,
  withLocalEnv: icpConfig.network === "local",
})

// Configuration based on your last deployed canister 
export const icpConfig: ICPConfig = {
  canisterId: "uxrrr-q7777-77774-qaaaq-cai",
  network: "local",
  host: "http://localhost:4943",
  lastDeployed: "2025-06-10T15:03:51.659Z"
}

// Separate component for each query method result
const QueryMethodResult: React.FC<{ methodName: keyof _SERVICE }> = ({ methodName }) => {
  const { data, error, refetch } = useQueryCall({
    functionName: methodName,
    args: [],
    refetchOnMount: true,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

```

## 🔧 Features Implemented

### ✅ Development Experience

- **Hot Reload**: Instant frontend updates during development
- **Type Safety**: End-to-end TypeScript with auto-generated canister types
- **Multi-Network Deployment**: Seamless deployment to local, playground, or mainnet
- **Modern Tooling**: Next.js App Router, ES modules, and latest JavaScript features
- **Yarn Workspaces**: Monorepo structure for better dependency management

### ✅ IC Integration

- **Candid Auto-Generation**: Automatic TypeScript interface generation from canisters
- **Identity Management**: Easy to integrate with Internet Identity
- **Agent Configuration**: Pre-configured IC agents for different networks
- **Static Export**: Next.js static export optimized for IC frontend canisters
- **Real-time Updates**: Auto-refresh capabilities with configurable intervals

### ✅ Developer Tools

- **Script Automation**: Yarn scripts for common development tasks
- **Environment Management**: Network-specific configurations
- **Vercel Integration**: Optional deployment to Vercel for hybrid setups
- **TypeScript Strict Mode**: Enhanced type checking and error prevention

## 📚 Usage Examples

### Basic Counter Component

```typescript
import React from 'react';
import { useQueryCall, useUpdateCall } from '../actor/actor';

const Counter: React.FC = () => {
  const { data: count, loading } = useQueryCall({
    functionName: 'getCount',
    args: [],
    refetchOnMount: true,
  });

  const { call: increment, loading: incrementing } = useUpdateCall({
    functionName: 'increment',
    args: [],
  });

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        Count: {loading ? 'Loading...' : count?.toString()}
      </h2>
      <button 
        onClick={() => increment()}
        disabled={incrementing}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg"
      >
        {incrementing ? 'Incrementing...' : 'Increment'}
      </button>
    </div>
  );
};
```

### Authentication Integration

```typescript
import { useAuth } from '../actor/actor';

const AuthComponent: React.FC = () => {
  const { identity, isAuthenticated, login, logout } = useAuth();

  return (
    <div className="p-4 border rounded-lg">
      {isAuthenticated ? (
        <div className="space-y-2">
          <p className="text-green-600">✅ Authenticated</p>
          <p className="text-sm text-gray-600 break-all">
            Principal: {identity?.getPrincipal().toString()}
          </p>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-orange-600">⚠️ Not authenticated</p>
          <button 
            onClick={login}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Login with Internet Identity
          </button>
        </div>
      )}
    </div>
  );
};
```

## 🛠️ Available Scripts

### Development

- `yarn start` - Start frontend development server
- `yarn chain` - Start local ICP replica
- `yarn deploy` - Deploy canisters to current network
- `yarn generate` - Regenerate Candid interfaces

### Building & Deployment

- `yarn build` - Build frontend for production
- `yarn deploy:upgrade` - Upgrade existing canisters
- `yarn vercel` - Deploy to Vercel (hybrid setup)

### Network Deployment

```bash
# Deploy to playground network
yarn deploy --network playground

# Deploy to mainnet
yarn deploy --network ic
```

## ⚠️ Current Limitations

### Known Constraints

- **Next.js Server Features**: No server-side rendering or API routes (static export only)
- **Node.js Dependencies**: Limited to browser-compatible packages
- **Asset Size**: Frontend canister has storage limitations for large assets
- **Real-time Updates**: No WebSocket support in current implementation
- **Mobile Optimization**: Limited mobile-specific features and PWA capabilities

### Planned Improvements

- Enhanced debugging tools and error handling
- Built-in testing framework integration with Jest and Cypress
- Additional pre-built components for common dApp patterns
- Performance monitoring and optimization tools
- Mobile-first responsive design improvements
- WebAssembly integration utilities

### Issues and Feature Requests

- Use GitHub Issues to report bugs or request features
- Provide detailed reproduction steps for bugs
- Include use cases and benefits for feature requests

## 📖 Resources

### Official Documentation

- [Internet Computer Documentation](https://internetcomputer.org/docs/)
- [IC Reactor Documentation](https://github.com/B3Pay/ic-reactor)
- [Next.js Documentation](https://nextjs.org/docs)
- [Motoko Programming Language](<https://internetcomputer.org/docs>)
