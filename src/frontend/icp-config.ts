export type ICPConfig = {
  canisterId: string;
  network: "local" | "playground" | "ic";
  host: string;
  lastDeployed: string;
}

export const icpConfig: ICPConfig = {
  canisterId: "uxrrr-q7777-77774-qaaaq-cai",
  network: "local",
  host: "http://localhost:4943",
  lastDeployed: "2025-06-13T05:30:02.196Z"
}