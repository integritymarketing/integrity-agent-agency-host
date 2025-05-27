import React, { useEffect } from "react";

import useFetch from "@/hooks/useFetch";
import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";
import CheckIcon from "@/assets/v2-check";

import ResendButtonWithModal from "../UnAuthenticatedComponents/Resend-email";
import { ResendFnParams } from "../UnAuthenticatedComponents/Resend-email/ResendEmail.types";

import useAnalytics from "@/hooks/useAnalytics";

const ForgotPasswordSentPage: React.FC = () => {
  const { Post: requestPasswordReset } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL}/forgotpassword`
  );

  useEffect(() => {
    fireEvent("event-content-load", {
      pagePath: "/login/forgot-NPN/confirmation/",
    });
  }, []);

  const { fireEvent, clickClass } = useAnalytics();

  const resendPasswordReset: (
    data: ResendFnParams
  ) => Promise<{ status: number }> = async (data) => {
    const response = await requestPasswordReset({ body: data });
    return { status: (response as any)?.status ?? 200 };
  };

  return (
    <>
      <div className="content-frame v2">
        <HeaderUnAuthenticated />
        <ContainerUnAuthenticated>
          <CheckIcon className="mb-2" />
          <div className="hdg--3 mb-4">
            Check your email to complete password reset
          </div>
          <div
            className="text text--secondary"
            data-gtm="reesend-forgot-password-email"
          >
            <ResendButtonWithModal
              resendFn={resendPasswordReset}
              btnClass={clickClass("forgot-resendnow")}
            />
          </div>
        </ContainerUnAuthenticated>
        <FooterUnAuthenticated />
      </div>
    </>
  );
};

export default ForgotPasswordSentPage;
