// actor.ts
import { createReactor } from "@ic-reactor/react"
import { idlFactory, backend } from "@/app/declarations/backend"
import { icpConfig } from "@/icp-config"

type Actor = typeof backend

export const { useActorStore, useAuth, useQueryCall, useUpdateCall } = createReactor<Actor>({
  canisterId: icpConfig.canisterId,
  idlFactory,
  withLocalEnv: icpConfig.network === "local",
})