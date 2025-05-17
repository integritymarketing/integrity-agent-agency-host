import { Switch } from "@mui/material";
import { useAgentAvailabilitySignalR } from "@/contexts";

const AvailabilityToggle = () => {
  const { updateAvailability, isAvailable } = useAgentAvailabilitySignalR();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateAvailability(event.target.checked);
  };

  return (
    <Switch
      checked={isAvailable}
      onChange={handleToggle}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default AvailabilityToggle;
