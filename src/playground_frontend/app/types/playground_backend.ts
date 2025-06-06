import { _SERVICE } from '@/app/declarations/playground_backend/playground_backend.did';
import { ActorSubclass } from '@dfinity/agent';


export type PlaygroundBackend = ActorSubclass<_SERVICE> & {
  [key: string]: (...args: any[]) => Promise<any>;
}; 