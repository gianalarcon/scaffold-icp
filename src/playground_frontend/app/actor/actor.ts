// actor.ts
import { createReactor } from "@ic-reactor/react"
import { idlFactory, playground_backend } from "@/app/declarations/playground_backend"

type Actor = typeof playground_backend

export const { useActorStore, useAuth, useQueryCall, useUpdateCall } = createReactor<Actor>({
  canisterId: process.env.NEXT_PUBLIC_CANISTER_ID_PLAYGROUND_BACKEND || "",
  idlFactory,
  withLocalEnv: process.env.NEXT_PUBLIC_DFX_NETWORK === "local",
})