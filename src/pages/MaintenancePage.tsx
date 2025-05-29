import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const MaintenancePage: React.FC = () => (
  <Box
    minHeight="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    bgcolor="background.default"
    color="text.primary"
    textAlign="center"
    px={2}
  >
    <ConstructionIcon sx={{ fontSize: 80, mb: 2, color: "warning.main" }} />
    <Typography variant="h4" gutterBottom>
      We'll be back soon!
    </Typography>
    <Typography variant="body1" mb={3}>
      Sorry for the inconvenience. We're performing some maintenance at the
      moment.
      <br />
      Please check back later.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={() => window.location.reload()}
    >
      Refresh
    </Button>
  </Box>
);

export default MaintenancePage;
