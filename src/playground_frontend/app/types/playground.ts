import { ActorSubclass } from '@dfinity/agent';
import { _SERVICE } from 'declarations/playground_backend/playground_backend.did';

export type PlaygroundBackend = ActorSubclass<_SERVICE> & {
  [key: string]: (...args: any[]) => Promise<any>;
};

declare global {
  interface Window {
    playground_backend: PlaygroundBackend;
  }
} 