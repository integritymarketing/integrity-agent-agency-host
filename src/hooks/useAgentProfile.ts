import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useEffect } from "react";
import Cookies from "universal-cookie";

interface AgentProfile {
  fullName: string;
  firstName: string;
  lastName: string;
  npn: string;
  email: string;
  phone: string;
  agentId: string;
  roles: string[];
}

const useAgentProfile = (): AgentProfile => {
  const { user } = useAuth0();

  const profile = useMemo<AgentProfile>(() => {
    const firstName = user?.given_name || "";
    const lastName = user?.family_name || "";
    const npn = user?.npn || "";
    const email = user?.email || "";
    const phone = user?.phone || "";
    const agentId = user?.agentid || "";
    const roles = (user?.user_roles as string[]) || [];

    return {
      fullName: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      npn,
      email,
      phone,
      agentId,
      roles,
    };
  }, [user]);

  useEffect(() => {
    if (profile.npn) {
      const cookies = new Cookies();
      cookies.set("userNPN", profile.npn, { path: "/" });
    }
  }, [profile.npn]);

  return profile;
};

export default useAgentProfile;
