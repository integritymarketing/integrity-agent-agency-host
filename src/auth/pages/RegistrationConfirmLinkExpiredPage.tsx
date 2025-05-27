import React, { useCallback } from "react";
import BaseConfirmationPage from "./BaseConfirmationPage";
import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import useClientId from "@/hooks/useClientId";
import useFetch from "@/hooks/useFetch";
import usePortalUrl from "@/hooks/usePortalUrl";

const RegistrationConfirmLinkExpiredPage: React.FC = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const clientId = useClientId();
  const portalUrl = usePortalUrl();

  const npn = queryParams.get("npn") || "";

  const { Post: sendConfirmationEmail } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL_V3}/resendconfirmemail`,
    true
  );

  const handleResendConfirmEmail = useCallback(async () => {
    try {
      const response = await sendConfirmationEmail({
        body: {
          npn,
          ClientId: clientId,
        },
      });

      if (
        response &&
        typeof response === "object" &&
        "ok" in response &&
        typeof (response as any).ok === "boolean" &&
        (response as any).ok
      ) {
        navigate(`/registration-email-sent?npn=${encodeURIComponent(npn)}`);
      } else {
        navigate(
          `/sorry?message=${encodeURIComponent(
            "We could not send a new confirmation email at this time."
          )}`
        );
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      navigate(
        `/sorry?message=${encodeURIComponent(
          "An error occurred while resending the confirmation email."
        )}`
      );
    }
  }, [sendConfirmationEmail, npn, clientId, navigate]);

  const handleRedirectAndRestartLoginFlow = () => {
    window.location.href = `${portalUrl}/signin`;
  };

  return (
    <BaseConfirmationPage
      footer={
        <div className="mt-2 text-body">
          <button
            type="button"
            className="link link--force-underline"
            onClick={handleRedirectAndRestartLoginFlow}
          >
            Want to try a different email address?
          </button>
        </div>
      }
      title="We’re sorry"
      body="The link you used has expired."
      button={
        <button
          type="button"
          className="btn-v2"
          onClick={handleResendConfirmEmail}
        >
          Resend Email
        </button>
      }
    />
  );
};

export default RegistrationConfirmLinkExpiredPage;
