import React, { ReactNode } from "react";
import usePortalUrl from "@/hooks/usePortalUrl";
import useClientId from "@/hooks/useClientId";
import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated";
import { Button } from "@mui/material";

const DefaultButton: React.FC = () => {
  const portalUrl = usePortalUrl();

  const handleRedirectAndRestartLoginFlow = () => {
    window.location.href = `${portalUrl}/signin`;
  };

  return (
    <Button size="large" onClick={handleRedirectAndRestartLoginFlow}>
      Back to Login
    </Button>
  );
};

interface ConfirmationPageProps {
  footer?: ReactNode;
  title?: string;
  body?: ReactNode | null;
  button?: ReactNode;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  footer,
  title,
  body = null,
  button = <DefaultButton />,
}) => {
  const clientId = useClientId();

  return (
    <div className="content-frame v2">
      <HeaderUnAuthenticated />
      <ContainerUnAuthenticated>
        {title && <h1 className="hdg hdg--2 mb-1">{title}</h1>}
        {body && <div className="text-body mb-4">{body}</div>}
        {button && clientId !== "ILSClient" && <div>{button}</div>}
        {footer}
      </ContainerUnAuthenticated>
      <FooterUnAuthenticated />
    </div>
  );
};

export default ConfirmationPage;
