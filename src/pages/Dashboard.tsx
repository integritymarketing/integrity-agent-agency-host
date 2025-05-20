import { useAgentAvailability, useAgentDetails } from "@/contexts";
import { AvailabilityToggle } from "@/components";
import AgentDashboard from "IntegrityAgentDashboard/AgentDashboard";
import userState from "@/store/userState.tsx"

const Dashboard = () => {
  const { data, loading, error } = useAgentAvailability();
  const { data: agentDetails, isLifeNonRTS } = useAgentDetails();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching agent availability</div>;

  console.log("Agent Availability Data:", data);
  console.log("Agent Details Data:", agentDetails);
  console.log("Is Life Non RTS:", isLifeNonRTS);

    const [count, setCount] = userState();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>
        Agent Availability: {data?.availability ? "Available" : "Unavailable"}
      </p>
      <AvailabilityToggle />
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                count in Host Application: {count}
            </button>
        </div>
        <AgentDashboard  />
    </div>
  );
};

Dashboard.propTypes = {
  // No props needed for this component currently
};

export default Dashboard;
