import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import useClientId from "@/hooks/useClientId";

import styles from "./HeaderUnAuthenticated.module.scss";
import LogoSVG from "./Logo.svg";
import MobileLogo from "./MobileLogo.svg";
import ILSLogo from "./lead-center-rgb.png";

export const HeaderUnAuthenticated: React.FC = () => {
  const clientId = useClientId();

  if (clientId === "AgentMobile") return null;

  return (
    <Grid
      className={styles.headerContainer}
      alignItems="center"
      justifyContent={{ xs: "center", sm: "flex-start" }}
      container
    >
      {clientId === "ILSClient" ? (
        <img className={styles.logo} src={ILSLogo} alt="Integrity Lead Store" />
      ) : (
        <img
          className={styles.logo}
          src={clientId === "AgentMobile" ? MobileLogo : LogoSVG}
          alt={
            clientId === "AgentMobile"
              ? "Integrity Mobile Logo"
              : "Medicare Logo"
          }
        />
      )}
    </Grid>
  );
};
