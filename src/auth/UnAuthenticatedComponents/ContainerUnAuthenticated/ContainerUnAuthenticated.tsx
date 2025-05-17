import React, { ReactNode } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Use Grid2 directly
import styles from "./ContainerUnAuthenticated.module.scss";
import bg from "./pixels.svg";

interface ContainerUnAuthenticatedProps {
  children: ReactNode;
}

const backgroundImage = `url('${bg}')`;

export const ContainerUnAuthenticated: React.FC<
  ContainerUnAuthenticatedProps
> = ({ children }) => {
  return (
    <Grid
      direction="column"
      className={styles.container}
      flexGrow={1}
      alignItems="center"
      justifyContent={{ xs: "flex-start", sm: "center" }}
      container
      my={{ xs: "3rem" }}
      sx={{ backgroundImage }}
    >
      {children}
    </Grid>
  );
};
