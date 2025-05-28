import React from "react";
import Grid from "@mui/material/Grid";
import useClientId from "@/hooks/useClientId";

import styles from "./MobileHeaderUnAuthenticated.module.scss";
import MobileLogo from "./mobileLogo.svg";

export const MobileHeaderUnAuthenticated: React.FC = () => {
  const clientId = useClientId();

  if (clientId !== "AgentMobile") return null;

  return (
    <Grid
      className={styles.headerContainer}
      alignItems="center"
      justifyContent={{ xs: "center", sm: "flex-start" }}
      container
    >
      <img
        className={styles.mobileLogo}
        src={MobileLogo}
        alt="Agent Mobile Logo"
      />
    </Grid>
  );
};
