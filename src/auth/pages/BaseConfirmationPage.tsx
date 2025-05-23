import React, { ReactNode } from "react";
import usePortalUrl from "hooks/usePortalUrl";
import useClientId from "hooks/auth/useClientId";
import { HeaderUnAuthenticated } from "components/HeaderUnAuthenticated";
import { FooterUnAuthenticated } from "components/FooterUnAuthenticated";
import { ContainerUnAuthenticated } from "components/ContainerUnAuthenticated";
import { Button } from "packages/Button";

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
