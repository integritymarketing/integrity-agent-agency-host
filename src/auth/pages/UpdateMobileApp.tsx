import React, { useCallback } from "react";

import { Box } from "@mui/material";

import useDeviceInfo, { DEVICES } from "@/hooks/useDeviceInfo";

import Heading2 from "@/components/Temp/Heading2";

import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";
import { MobileHeaderUnAuthenticated } from "../UnAuthenticatedComponents/MobileHeaderUnAuthenticated/MobileHeaderUnAuthenticated";

import Styles from "./AuthPages.module.scss";
import "./mobileStyle.scss";

const UpdateMobileApp = () => {
  const device = useDeviceInfo();

  const updateMobile = useCallback(() => {
    if (device === DEVICES.ANDROID) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.medicarecenter"
      );
    } else if (device === DEVICES.IOS || device === DEVICES.IPHONE) {
      window.open("https://apps.apple.com/us/app/medicarecenter/id1623328763");
    }
  }, [device]);

  return (
    <React.Fragment>
      <div className="content-frame v2">
        <HeaderUnAuthenticated />
        <MobileHeaderUnAuthenticated />
        <ContainerUnAuthenticated>
          <Heading2
            className={Styles.versionText}
            text="A New Version of Integrity is Available"
          />
          <Box mt={"1rem"} className={Styles.downloadText}>
            Please download the latest version of the app in order to continue.
          </Box>
          <div className={Styles.buttonContainer}>
            <button className={Styles.submitButton} onClick={updateMobile}>
              Update
            </button>
          </div>
        </ContainerUnAuthenticated>
        <FooterUnAuthenticated />
      </div>
    </React.Fragment>
  );
};

export default UpdateMobileApp;
