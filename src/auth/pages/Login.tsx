import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";

import showMobileAppDeepLinking from "@/utils/mobileDeepLinking";
import useDeviceInfo, { DEVICES } from "@/hooks/useDeviceInfo";
import useMobileVersionCheck from "@/hooks/useMobileVersionCheck";
import useQueryParams from "@/hooks/useQueryParams";
import { useFetch } from "@/hooks";
import useValidationService from "hooks/useValidationService";

import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";
import { MobileHeaderUnAuthenticated } from "../UnAuthenticatedComponents/MobileHeaderUnAuthenticated/MobileHeaderUnAuthenticated";

import { getParameterFromUrl } from "@/utils/getParameterFromUrl";
import useAnalytics from "hooks/useAnalytics";

import "./mobileStyle.scss";

type LoginForm = {
  Username: string;
  Password: string;
  returnUrl?: string | null;
  Global?: string;
};

const ServerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const device = useDeviceInfo();
  const isOutdatedVersion = useMobileVersionCheck();
  const params = useQueryParams();
  const { fireEvent } = useAnalytics();
  const validation = useValidationService();

  const returnUrl = params.get("ReturnUrl");
  const clientId = getParameterFromUrl(returnUrl, "client_id") ?? "";
  const isMobileSSO = getParameterFromUrl(returnUrl, "isMobileSSO") ?? "";

  const [mobileAppLogin, setMobileAppLogin] = useState(false);
  const [appTitle, setAppTitle] = useState("");

  const { Post: loginUser } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL}/login`
  );
  const { Post: loginUserWithClientID } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL}/login`
  );

  useEffect(() => {
    if (clientId === "AEPortal" && device === DEVICES.IPHONE) {
      showMobileAppDeepLinking();
    }

    if (isOutdatedVersion && clientId === "AgentMobile") {
      navigate("/mobile-app-update");
    }
  }, [device, isOutdatedVersion, clientId, navigate]);

  useEffect(() => {
    const checkForExternalLogin = async () => {
      const returnUrlValue = params.get("ReturnUrl");
      if (!returnUrlValue) return;

      const urlObj = new URL(returnUrlValue);
      const searchParams = new URLSearchParams(urlObj.search);
      const username = searchParams.get("username") ?? "";

      if (clientId === "AgentMobile") {
        setMobileAppLogin(true);
        setAppTitle("Agent Mobile - Login");
      } else {
        setAppTitle("Integrity - Login");
      }

      const isExternalClient =
        ["ASBClient", "FFLClient", "AgentMobileSunfire"].includes(clientId) ||
        Boolean(isMobileSSO);

      if (isExternalClient) {
        searchParams.set("client_id", clientId);
        const fullReturnUrl = `${urlObj.origin}${urlObj.pathname}?${searchParams.toString()}`;

        const payload: LoginForm = {
          Username: username,
          Password: "",
          returnUrl: fullReturnUrl,
        };

        const response = await loginUserWithClientID({ body: payload });
        await postLogin(response as Response, {}, payload);
      } else {
        fireEvent("event-content-load", {
          pagePath: "/login/",
        });
      }
    };

    checkForExternalLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const postLogin = async (
    response: Response,
    { setErrors, setSubmitting }: Partial<FormikHelpers<LoginForm>>,
    payload: LoginForm
  ) => {
    if (response && response.status >= 500) {
      navigate(
        `sorry?message=${encodeURIComponent(
          "Something went wrong with your login request. Please try again."
        )}`
      );
      return;
    }

    const data = await response.json();

    if (setSubmitting) setSubmitting(false);

    if (data?.isOk) {
      fireEvent("event-form-submit", { formName: "Login" });
      const redirectUrl = new URL(data.redirectUrl);
      redirectUrl.searchParams.append("clientId", clientId);
      window.location.href = redirectUrl.toString();
    } else {
      const errors = validation.formikErrorsFor(data);

      if (errors.Global === "account_unconfirmed") {
        fireEvent("event-form-submit-account-unconfirmed", {
          formName: "Login",
        });
        navigate(`/registration-email-sent?npn=${payload.Username}&mode=error`);
      } else {
        fireEvent("event-form-submit-invalid", {
          formName: "Login",
        });
        setErrors?.(errors);
      }
    }
  };

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
            Login to your account
          </Typography>
          <Box mt="1rem">
            <Formik<LoginForm>
              initialValues={{ Username: "", Password: "" }}
              validate={(values) =>
                validation.validateMultiple(
                  [
                    {
                      name: "Username",
                      validator: validation.composeValidator([
                        validation.validateRequired,
                      ]),
                    },
                    {
                      name: "Password",
                      validator: validation.validatePasswordAccess,
                    },
                  ],
                  values
                )
              }
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                values.returnUrl = params.get("ReturnUrl");
                const response = await loginUser({
                  body: values,
                });
                await postLogin(response as Response, actions, values);
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
                <form className="form form-width" onSubmit={handleSubmit}>
                  <fieldset className="form__fields">
                    <TextField
                      id="login-username"
                      className="mb-3"
                      label="National Producer Number (NPN)"
                      placeholder="Enter your NPN"
                      name="Username"
                      value={values.Username}
                      onChange={handleChange}
                      onBlur={(e) => {
                        fireEvent("leaveField", {
                          field: "username",
                          formName: "login",
                        });
                        return handleBlur(e);
                      }}
                      error={touched.Username && !!errors.Username}
                      helperText={
                        touched.Username && errors.Username
                          ? errors.Username
                          : ""
                      }
                      autoComplete="username"
                      autoFocus
                    />

                    <TextField
                      id="login-password"
                      type="password"
                      label="Password"
                      placeholder="Enter your Password"
                      name="Password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={(e) => {
                        fireEvent("leaveField", {
                          field: "password",
                          formName: "login",
                        });
                        return handleBlur(e);
                      }}
                      error={
                        (touched.Password && !!errors.Password) ||
                        !!errors.Global
                      }
                      helperText={
                        touched.Password && errors.Password
                          ? errors.Password
                          : errors.Global
                            ? errors.Global
                            : ""
                      }
                      autoComplete="current-password"
                    />

                    <div className="centered-flex-col">
                      <Button type="submit" size="large">
                        <Box mx="4rem">Login</Box>
                      </Button>
                    </div>

                    {!mobileAppLogin && (
                      <div className="centered-flex-col">
                        <p className="text-sm">Don&apos;t have an account?</p>
                        <Link to="/register">
                          <span className="link text-bold">Register</span>
                        </Link>
                      </div>
                    )}
                  </fieldset>
                </form>
              )}
            </Formik>
          </Box>
        </ContainerUnAuthenticated>
        <FooterUnAuthenticated />
      </div>
    </>
  );
};

export default ServerLoginPage;
