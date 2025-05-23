import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, TextField } from "@mui/material";

import { Formik, FormikHelpers } from "formik";

import useClientId from "@/hooks/useClientId";
import useFetch from "hooks/useFetch";
// import useLoading from "hooks/useLoading";
import useQueryParams from "@/hooks/useQueryParams";

import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";
import { MobileHeaderUnAuthenticated } from "../UnAuthenticatedComponents/MobileHeaderUnAuthenticated/MobileHeaderUnAuthenticated";

import useAnalytics from "hooks/useAnalytics";
import useValidationService from "hooks/useValidationService";

import Styles from "./AuthPages.module.scss";

interface ForgotPasswordValues {
  Username: string;
  ClientId?: string;
  Global?: string;
}

const ForgotPasswordpage: React.FC = () => {
  const navigate = useNavigate();
  // const loading = useLoading();
  const clientId = useClientId();
  const params = useQueryParams();
  const { fireEvent } = useAnalytics();
  const validation = useValidationService();

  const { Post: requestPasswordReset } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL}/api/v1/account/forgotpassword`,
    true
  );

  useEffect(() => {
    fireEvent("event-content-load", {
      pagePath: "/reset-password",
    });
  }, [fireEvent]);

  const appTitle = useMemo(() => {
    switch (clientId) {
      case "AgentMobile":
        return "Agent Mobile - Forgot Password";
      default:
        return "Integrity - Forgot Password";
    }
  }, [clientId]);

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <div className="content-frame v2">
        <HeaderUnAuthenticated />
        <MobileHeaderUnAuthenticated />
        <ContainerUnAuthenticated>
          <Typography variant="h5" color="blue" fontWeight="bold">
            Reset your password
          </Typography>

          <Typography variant="h2" color="blue" fontWeight="bold">
            Enter your NPN to reset your password.
          </Typography>

          <Formik<ForgotPasswordValues>
            initialValues={{ Username: "" }}
            validate={(values) =>
              validation.validateMultiple(
                [
                  {
                    name: "Username",
                    validator: validation.composeValidator([
                      validation.validateRequired,
                    ]),
                  },
                ],
                values
              )
            }
            onSubmit={async (
              values,
              { setErrors, setSubmitting }: FormikHelpers<ForgotPasswordValues>
            ) => {
              setSubmitting(true);
              // loading.begin();

              values.ClientId = clientId;

              try {
                const response = (await requestPasswordReset({
                  body: values,
                })) as Response;
                setSubmitting(false);
                // loading.end();

                if (response.ok) {
                  navigate(`/password-reset-sent?npn=${values.Username}`);
                  fireEvent("formSubmit", {
                    button: "forgotSubmit",
                    pagePath: window.location.href,
                  });
                  fireEvent("event-form-submit", {
                    formName: "Reset password",
                  });
                } else {
                  const errorsArr = await response.json();
                  const errors = validation.formikErrorsFor(errorsArr);

                  if (errors.Global === "account_unconfirmed") {
                    navigate(
                      `/registration-email-sent?npn=${values.Username}&mode=error`
                    );
                  } else {
                    fireEvent("event-form-submit-invalid", {
                      formName: "Reset password",
                    });
                    setErrors(errors);
                    navigate(`/contact-support-invalid-npn/${values.Username}`);
                  }
                }
              } catch (error) {
                setSubmitting(false);
                // loading.end();
                fireEvent("event-form-submit-invalid", {
                  formName: "Reset password",
                });
                // Optionally add Sentry or toast here for unexpected errors
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <form
                className="form form-width"
                onSubmit={handleSubmit}
                noValidate
              >
                <fieldset className="form__fields">
                  <TextField
                    id="forgot-password-username"
                    label="National Producer Number"
                    placeholder="Enter your NPN"
                    name="Username"
                    value={values.Username}
                    onChange={handleChange}
                    onBlur={(e) => {
                      fireEvent("leaveField", {
                        field: "username",
                        formName: "forgot",
                      });
                      return handleBlur(e);
                    }}
                    error={Boolean(
                      (touched.Username && errors.Username) || errors.Global
                    )}
                    helperText={
                      (touched.Username && errors.Username) ||
                      errors.Global ||
                      ""
                    }
                    InputProps={{
                      endAdornment: (
                        <div
                          className={Styles.forgot}
                          data-gtm="login-forgot-npn"
                        >
                          <a
                            href="https://nipr.com/help/look-up-your-npn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm link text-bold"
                          >
                            Forgot NPN?
                          </a>
                        </div>
                      ),
                    }}
                  />
                  <div className="centered-flex-col">
                    <Box mt="3rem">
                      <Button
                        // className={analyticsService.clickClass("main-login")}
                        type="submit"
                        size="large"
                      >
                        <Box mx="3rem">Submit</Box>
                      </Button>
                    </Box>
                  </div>
                </fieldset>
              </form>
            )}
          </Formik>
        </ContainerUnAuthenticated>
        <FooterUnAuthenticated />
      </div>
    </>
  );
};

export default ForgotPasswordpage;
