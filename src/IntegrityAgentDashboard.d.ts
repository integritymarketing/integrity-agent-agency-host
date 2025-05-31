type AgentDashboardProps = object;

declare module "IntegrityAgentDashboard/AgentDashboard" {
  import { ComponentType } from "react";
  const AgentDashboard: ComponentType<AgentDashboardProps>;
  export default AgentDashboard;
}

type IntegrityClients = object;

declare module "IntegrityClients/App" {
  import { ComponentType } from "react";
  const IntegrityClients: ComponentType<IntegrityClients>;
  export default IntegrityClients;
}
