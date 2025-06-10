export type ICPConfig = {
  canisterId: string;
  network: "local" | "playground" | "ic";
  host: string;
  lastDeployed: string;
}

export const icpConfig: ICPConfig = {
  canisterId: "6zfvq-kiaaa-aaaab-qacra-cai",
  network: "playground",
  host: "https://icp0.io",
  lastDeployed: "2025-06-10T14:48:49.211Z"
}