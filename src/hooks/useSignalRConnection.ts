import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";

let sharedConnection: HubConnection | null = null;

const useSignalRConnection = (agentId: string): HubConnection => {
  if (sharedConnection) return sharedConnection;

  const toggleURI = `${import.meta.env.VITE_AGENT_MANAGEMENT_SIGNALR}/api/?agentid=${agentId}`;

  sharedConnection = new HubConnectionBuilder()
    .withUrl(toggleURI)
    .configureLogging(LogLevel.Information)
    .build();

  sharedConnection.start().catch(console.error);

  return sharedConnection;
};

export default useSignalRConnection;
