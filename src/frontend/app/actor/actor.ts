// actor.ts
import { createReactor } from "@ic-reactor/react"
import { idlFactory, backend } from "@/app/declarations/backend"

type Actor = typeof backend

export const { useActorStore, useAuth, useQueryCall, useUpdateCall } = createReactor<Actor>({
  canisterId: process.env.NEXT_PUBLIC_CANISTER_ID_BACKEND || "",
  idlFactory,
  withLocalEnv: process.env.NEXT_PUBLIC_DFX_NETWORK === "local",
})