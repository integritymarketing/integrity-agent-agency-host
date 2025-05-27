import React from "react";
import BaseConfirmationPage from "./BaseConfirmationPage";
import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import usePortalUrl from "@/hooks/usePortalUrl";

const requestPasswordReset = async (npn: string | null): Promise<Response> => {
  return fetch(`${import.meta.env.VITE_AUTH_AUTHORITY_URL}/forgotpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      npn,
    }),
  });
};

const PasswordResetExpiredPage: React.FC = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const portalUrl = usePortalUrl();

  const handleResendForgotPasswordEmail = async () => {
    const npn = queryParams.get("npn");
    if (!npn) {
      navigate(
        `/sorry?message=${encodeURIComponent("NPN parameter missing.")}`
      );
      return;
    }
    try {
      const response = await requestPasswordReset(npn);

      if (response.ok) {
        navigate(`/password-reset-sent?npn=${encodeURIComponent(npn)}`);
      } else {
        navigate(
          `/sorry?message=${encodeURIComponent(
            "We could not send a password reset at this time."
          )}`
        );
      }
    } catch {
      navigate(
        `/sorry?message=${encodeURIComponent(
          "Network error while attempting to resend password reset."
        )}`
      );
    }
  };

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
          onClick={handleResendForgotPasswordEmail}
        >
          Resend Email
        </button>
      }
    />
  );
};

export default PasswordResetExpiredPage;
