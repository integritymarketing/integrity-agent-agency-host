import React, { useState } from "react";
import { Link } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import { ResendEmailProps } from "./ResendEmail.types";

const ResendEmail: React.FC<ResendEmailProps> = ({
  resendFn,
  btnClass = "",
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const params = useQueryParams();

  const handleResend = async () => {
    try {
      const userId = params.get("npn");
      if (!userId) throw new Error("User ID missing in query parameters");

      const response = await resendFn({ user_id: userId }, true);

      if (response.status >= 200 && response.status < 300) {
        setEmailSent(true);
      } else {
        throw new Error("Resend failed");
      }
    } catch (error) {
      console.error("Resend email error:", error);
      setEmailError(true);
    }
  };

  return (
    <div className="mt-2 text-body">
      {emailError ? (
        <>
          Sorry, there was a problem resending the email. If the problem
          persists,{" "}
          <Link to="/contact-support" className="link link--force-underline">
            please contact support
          </Link>
          .
        </>
      ) : !emailSent ? (
        <>
          Didn’t receive an email?{" "}
          <button
            type="button"
            className={`link link--force-underline ${btnClass}`}
            onClick={handleResend}
          >
            Resend now
          </button>
        </>
      ) : (
        <>
          We have resent the email. <br />
          If the problem persists,{" "}
          <Link to="/contact-support" className="link link--force-underline">
            please contact support
          </Link>
          .
        </>
      )}
    </div>
  );
};

export default ResendEmail;
