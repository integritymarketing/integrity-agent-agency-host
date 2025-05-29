import React from "react";
import styles from "./FooterUnAuthenticated.module.scss";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Integrity from "./Integrity.svg";
import usePortalUrl from "@/hooks/usePortalUrl";
import useClientId from "@/hooks/useClientId";
import ILSLogo from "./lead-center-rgb.png";

export const FooterUnAuthenticated: React.FC = () => {
  const portalUrl = usePortalUrl();
  const clientId = useClientId();

  return (
    <Grid
      alignItems="center"
      justifyContent={{ xs: "center", sm: "space-between" }}
      className={styles.footerContainer}
      container
      px={{ xs: "0rem", sm: "2rem", md: "8.5rem" }}
    >
      <Grid container>
        {clientId !== "AgentMobile" && (
          <div className={styles.hideForWebMobile}>
            <a
              href={`${portalUrl ?? ""}/terms`}
              rel="noopener noreferrer"
              className={styles.textContent}
            >
              Terms of Use
            </a>
            <Typography className={styles.textContent} px="1rem">
              |
            </Typography>
            <a
              href={`${portalUrl ?? ""}/privacy`}
              rel="noopener noreferrer"
              className={styles.textContent}
            >
              Privacy Policy
            </a>
          </div>
        )}
      </Grid>

      <Grid>
        <Grid
          alignItems="center"
          justifyContent="flex-end"
          container
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <img
            className={styles.logo}
            src={clientId === "ILSClient" ? ILSLogo : Integrity}
            alt={
              clientId === "ILSClient"
                ? "Integrity Lead Store"
                : "Integrity Logo"
            }
          />

          <Typography
            ml={{ sm: "1rem" }}
            mt={{ xs: "0.5rem", sm: 0 }}
            className={styles.textContent}
          >
            &copy; {new Date().getFullYear()} Integrity. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
