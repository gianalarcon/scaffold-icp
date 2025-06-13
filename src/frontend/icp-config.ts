export type ICPConfig = {
  canisterId: string;
  network: "local" | "playground" | "ic";
  host: string;
  lastDeployed: string;
}

export const icpConfig: ICPConfig = {
  canisterId: "5jw7w-wiaaa-aaaab-qacza-cai",
  network: "playground",
  host: "https://icp0.io",
  lastDeployed: "2025-06-13T05:01:37.078Z"
}