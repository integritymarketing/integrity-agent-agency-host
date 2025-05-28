import { useContext } from 'react';
import { AgentProfileContext } from './AgentProfileContext';

const useAgentProfile = () => {
  const context = useContext(AgentProfileContext);
  if (context === undefined) {
    throw new Error('useAgentProfile must be used within an AgentProfileProvider');
  }
  return context;
};

export default useAgentProfile; 