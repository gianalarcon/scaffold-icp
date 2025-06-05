import path from "path"
import { fileURLToPath } from "url"
import fs from "fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let localCanisters, playgroundCanisters, canisters

async function initCanisterIds() {
  try {
    const localContent = await fs.readFile(path.resolve(".dfx", "local", "canister_ids.json"), "utf-8")
    localCanisters = JSON.parse(localContent)
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production", error)
  }

  try {
    const playgroundContent = await fs.readFile(path.resolve(".dfx", "playground", "canister_ids.json"), "utf-8")
    playgroundCanisters = JSON.parse(playgroundContent)
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local")
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "playground" ? "playground" : "local");

  console.info(`initCanisterIds: network=${network}`)

  canisters = network === "local" ? localCanisters : playgroundCanisters

  for (const canister in canisters) {
    process.env[`CANISTER_ID_PLAYGROUND_BACKEND`] =
      canisters[canister][network]
  }

  process.env[`DFX_NETWORK`] = network

}

export default {
  initCanisterIds
}