import React from "react";
import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const UnderConstruction: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="60vh"
    textAlign="center"
    px={2}
  >
    <ConstructionIcon sx={{ fontSize: 60, mb: 2, color: "warning.main" }} />
    <Typography variant="h5" gutterBottom>
      This page is under construction
    </Typography>
    <Typography variant="body1">
      We're working hard to finish the development of this page.
      <br />
      Please check back soon!
    </Typography>
  </Box>
);

export default UnderConstruction;
