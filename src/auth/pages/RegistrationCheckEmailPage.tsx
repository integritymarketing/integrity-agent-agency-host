import React from "react";

import useClientId from "@/hooks/useClientId";
import useFetch from "@/hooks/useFetch";
import useQueryParams from "@/hooks/useQueryParams";

import InfoIcon from "@/components/Temp/icons/info";

import ResendButtonWithModal from "../UnAuthenticatedComponents/Resend-email";

import useAnalytics from "@/hooks/useAnalytics";

import BaseConfirmationPage from "./BaseConfirmationPage";

const RegistrationCheckEmailPage: React.FC = () => {
  const clientId = useClientId();
  const queryParams = useQueryParams();
  const { clickClass } = useAnalytics();
  const { Post: resendConfirmationEmailRaw } = useFetch(
    `${import.meta.env.VITE_AGENTS_URL}/api/v1.0/Account/ResendVerificationEmail`,
    true
  );

  const resendConfirmationEmail = async (data: any) => {
    const result = await resendConfirmationEmailRaw({ body: data });
    return { status: (result as any)?.status ?? 200 };
  };
  const isModeError = queryParams.get("mode") === "error";

  return (
    <>
      <BaseConfirmationPage
        footer={
          <ResendButtonWithModal
            resendFn={resendConfirmationEmail}
            btnClass={clickClass("registration-resendnow")}
          />
        }
        title={isModeError ? "Something’s not right" : "Confirm your account"}
        body={
          <>
            {isModeError && (
              <p className="mb-2 mt-2">
                Your account’s email address hasn’t been confirmed. Complete the
                steps below before logging in or changing your password:
              </p>
            )}

            <div className="pt-1 pb-1 pr-1 pl-1 mb-2 confirm-notification">
              <InfoIcon />
              <p>
                Please confirm your account within <strong>72 hours</strong> to
                complete registration.
              </p>
            </div>
            <ol className="number-list text-body pt-3">
              <li>
                <div>
                  Open the inbox for the email address that you registered with
                </div>
              </li>
              <li>
                <div>
                  {clientId === "ILSClient" ? (
                    <p className="mb-2">
                      Find the confirmation email from Integrity LeadCENTER
                      (integrityLeadCENTER@integritymarketing.com)
                    </p>
                  ) : (
                    <p className="mb-2">
                      Find the confirmation email from Integrity
                      (accounts@clients.integrity.com)
                    </p>
                  )}

                  <p className="text-body text-body--small">
                    Note: You may need to look in your spam/junk folder
                  </p>
                </div>
              </li>
              <li>
                {clientId === "ILSClient" ? (
                  <div>
                    Click the confirm button in the email to return to Integrity
                    LeadCENTER for login
                  </div>
                ) : (
                  <div>
                    Click the confirm button in the email to return to Integrity
                    for login
                  </div>
                )}
              </li>
            </ol>
          </>
        }
        button={null}
      />
    </>
  );
};

export default RegistrationCheckEmailPage;
