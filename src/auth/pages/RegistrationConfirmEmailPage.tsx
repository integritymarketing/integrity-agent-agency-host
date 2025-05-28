import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useClientId from "@/hooks/useClientId";
import useQueryParams from "@/hooks/useQueryParams";
import useValidationService from "@/hooks/useValidationService";

interface ConfirmEmailValues {
  npn: string | null;
  token: string | null;
  ClientId: string | null;
}

const confirmEmailAPI = async (
  values: ConfirmEmailValues
): Promise<Response> => {
  return fetch(`${import.meta.env.VITE_AUTH_AUTHORITY_URL}/confirmemail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      npn: values.npn,
      token: values.token,
      ClientId: values.ClientId,
    }),
  });
};

const RegistrationConfirmEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const clientId = useClientId();
  const validationService = useValidationService();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      const response = await confirmEmailAPI({
        npn: params.get("npn"),
        token: params.get("token"),
        ClientId: clientId,
      });

      if (response.ok) {
        navigate("/registration-complete");
      } else {
        try {
          const errorsArr = await response.json();
          const errors = validationService.formikErrorsFor(errorsArr);

          if (errors?.NPN === "account_already_confirmed") {
            navigate("/registration-complete");
          } else {
            navigate(
              `/confirm-link-expired?npn=${encodeURIComponent(params.get("npn") || "")}`
            );
          }
        } catch {
          // In case JSON parsing fails, fallback to expired link redirect
          navigate(
            `/confirm-link-expired?npn=${encodeURIComponent(params.get("npn") || "")}`
          );
        }
      }
    };

    handleConfirmEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RegistrationConfirmEmailPage;
