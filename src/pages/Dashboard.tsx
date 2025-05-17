import { useAgentAvailability, useAgentDetails } from "@/contexts";
import { AvailabilityToggle } from "@/components";

const Dashboard = () => {
  const { data, loading, error } = useAgentAvailability();
  const { data: agentDetails, isLifeNonRTS } = useAgentDetails();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching agent availability</div>;

  console.log("Agent Availability Data:", data);
  console.log("Agent Details Data:", agentDetails);
  console.log("Is Life Non RTS:", isLifeNonRTS);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>
        Agent Availability: {data?.availability ? "Available" : "Unavailable"}
      </p>
      <AvailabilityToggle />
    </div>
  );
};

Dashboard.propTypes = {
  // No props needed for this component currently
};

export default Dashboard;
