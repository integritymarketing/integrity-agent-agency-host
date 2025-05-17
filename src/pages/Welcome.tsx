import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Sample logo URL - replace with your logo if you want
const logoUrl =
  "https://ae-identity-dev.integritymarketinggroup.com/assets/Logo-C3AJYszO.svg";

const imageUrl =
  "https://ae-dev.integritymarketinggroup.com/assets/image-CVWFCRsT.jpg"; // Path to your uploaded image

const WelcomePage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLoginClick = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${window.location.origin}/dashboard`, // Redirect to dashboard after login
        },
      });
    } catch (e) {
      console.error("Login error:", e);
      // Optionally show error message to user here
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#003087" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            src={logoUrl}
            alt="Integrity Logo"
            sx={{ height: 40, cursor: "pointer" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0046bd" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)", // Full viewport height minus appbar
          alignItems: "center",
          justifyContent: "center",
          paddingY: 4,
          width: "100%",
        }}
      >
        {/* Left side image */}
        <Box
          component="img"
          src={imageUrl}
          alt="Meeting"
          sx={{
            flex: 1,
            maxWidth: 600,
            height: "auto",
            objectFit: "cover",
            borderRadius: 1,
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right side content */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: { md: 6 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            A More <br />
            Advanced Agent <br />
            Experience
          </Typography>

          <Typography
            variant="body1"
            fontWeight="600"
            color="text.primary"
            paragraph
          >
            Say hello to a powerful, easy-to-use system built to help you serve
            clients better, boost your production and take control of your
            business. Life as an agent just got better!
          </Typography>

          <Button variant="contained" sx={{ backgroundColor: "#003087" }}>
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
};

WelcomePage.propTypes = {
  // No props needed for this component currently
};

export default WelcomePage;
