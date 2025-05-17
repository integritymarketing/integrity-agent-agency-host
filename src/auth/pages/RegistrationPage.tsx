import * as Sentry from "@sentry/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Formik, FormikHelpers } from "formik";

import useFlashMessage from "../../hooks/useFlashMessage";
import useToast from "../../hooks/useToast";
import useClientId from "hooks/auth/useClientId";
import useLoading from "hooks/useLoading";
import useQueryParams from "hooks/useQueryParams";

import { Button, TextButton } from "packages/Button";
import Heading2 from "packages/Heading2";

import { ContainerUnAuthenticated } from "components/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "components/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "components/HeaderUnAuthenticated";
import Textfield from "components/ui/textfield";

import analyticsService from "services/analyticsService";
import validationService from "services/validationService";

import Styles from "./AuthPages.module.scss";
import "./mobileStyle.scss";

const LEADCENTER_LOGIN_URL = "https://www.integrityleadcenter.com/login";

interface RegistrationValues {
  ClientId?: string;
  FirstName: string;
  LastName: string;
  NPN?: string | null;
  Phone: string;
  Email?: string | null;
  Password: string;
}

const registerUser = async (values: RegistrationValues): Promise<Response> => {
  return fetch(`${import.meta.env.VITE_AUTH_REGISTRATION_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ClientId: values.ClientId,
      FirstName: values.FirstName,
      LastName: values.LastName,
      NPN: values.NPN,
      Phone: values.Phone,
      Email: values.Email,
      Password: values.Password,
    }),
  });
};

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const loading = useLoading();
  const params = useQueryParams();
  const clientId = useClientId();
  const showToast = useToast();
  const { show: showMessage } = useFlashMessage();
  const [hasNPN] = useState<string | null>(params.get("npn"));
  const [hasEmail] = useState<string | null>(params.get("email"));

  useEffect(() => {
    analyticsService.fireEvent("event-content-load", {
      pagePath: "/register/account-registration-form/",
    });
  }, []);

  const login = () => {
    try {
      window.location.href = `${import.meta.env.VITE_AUTH0_REDIRECT_URI}/login-redirect-sso`;
    } catch (e) {
      Sentry.captureException(e);
      showMessage("Unable to sign in at this time.", { type: "error" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Integrity - Register Account</title>
      </Helmet>
      <div className="content-frame v2">
        <HeaderUnAuthenticated />
        <ContainerUnAuthenticated>
          <Heading2
            className={Styles.registerTitle}
            text="Register your account"
          />
          <Formik
            initialValues={{
              FirstName: "",
              LastName: "",
              NPN: hasNPN || "",
              Phone: "",
              Email: hasEmail || "",
              Password: "",
            }}
            validate={(values: RegistrationValues) =>
              validationService.validateMultiple(
                [
                  {
                    name: "NPN",
                    validator: hasNPN
                      ? validationService.validateUsername
                      : () => null,
                    args: ["NPN Number"],
                  },
                  {
                    name: "FirstName",
                    validator: validationService.validateName,
                    args: ["First Name"],
                  },
                  {
                    name: "LastName",
                    validator: validationService.validateName,
                    args: ["Last Name"],
                  },
                  {
                    name: "Phone",
                    validator: validationService.composeValidator([
                      validationService.validateRequired,
                      validationService.validatePhone,
                    ]),
                  },
                  {
                    name: "Email",
                    validator: validationService.composeValidator([
                      validationService.validateRequired,
                      validationService.validateEmail,
                    ]),
                  },
                  {
                    name: "Password",
                    validator: validationService.validatePasswordCreation,
                  },
                ],
                values
              )
            }
            onSubmit={async (
              values: RegistrationValues,
              { setErrors, setSubmitting }: FormikHelpers<RegistrationValues>
            ) => {
              setSubmitting(true);
              loading.begin();

              const formattedValues: RegistrationValues = {
                ...values,
                Phone: values.Phone ? values.Phone.replace(/\D/g, "") : "",
                ClientId: clientId,
              };

              try {
                const response = await registerUser(formattedValues);
                setSubmitting(false);
                loading.end();

                if (response.ok) {
                  analyticsService.fireEvent("event-form-submit", {
                    formName: "Register Account",
                  });
                  const data = await response.json();
                  // Assuming data is an array of { key: string, value: string }
                  const userObject = data.find(
                    (item: { key: string; value: string }) =>
                      item.key === "User"
                  );
                  const auth0UserId = userObject ? userObject.value : null;
                  navigate(`/registration-email-sent?npn=${auth0UserId}`);
                } else {
                  const errorsArr = await response.json();

                  // Map key "User" to "NPN"
                  const updatedErrorsArr = errorsArr.map((error: any) => {
                    if (error.key === "User") {
                      return { ...error, key: "NPN" };
                    }
                    return error;
                  });

                  // Extract error message safely
                  const errMsg =
                    updatedErrorsArr[0]?.value ||
                    updatedErrorsArr[0]?.FirstName?.[0] ||
                    updatedErrorsArr[0]?.LastName?.[0] ||
                    updatedErrorsArr[0]?.NPN?.[1] ||
                    null;

                  if (errMsg) {
                    showToast({
                      message: errMsg,
                      type: "error",
                    });
                  }

                  analyticsService.fireEvent("event-form-submit-invalid", {
                    formName: "Register Account",
                  });

                  setErrors(
                    validationService.formikErrorsFor(updatedErrorsArr)
                  );
                }
              } catch (error) {
                setSubmitting(false);
                loading.end();
                Sentry.captureException(error);
                showToast({
                  message: "An unexpected error occurred. Please try again.",
                  type: "error",
                });
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
                  <Textfield
                    id="register-npn"
                    className="mb-4"
                    label="National Producer Number"
                    placeholder="Enter your NPN"
                    name="NPN"
                    value={values.NPN}
                    onChange={handleChange}
                    onBlur={(e) => {
                      analyticsService.fireEvent("leaveField", {
                        field: "npn",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={(touched.NPN && errors.NPN) || errors.Global}
                    auxLink={
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
                    }
                  />
                  <div className="first-last-name">
                    <Textfield
                      id="register-fname"
                      label="First Name"
                      placeholder="Enter your first name"
                      name="FirstName"
                      value={values.FirstName}
                      onChange={handleChange}
                      onBlur={(e) => {
                        analyticsService.fireEvent("leaveField", {
                          field: "firstName",
                          formName: "registration",
                        });
                        return handleBlur(e);
                      }}
                      error={
                        (touched.FirstName && errors.FirstName) || errors.Global
                      }
                    />
                  </div>
                  <div className="first-last-name">
                    <Textfield
                      id="register-lname"
                      className="mb-4"
                      label="Last Name"
                      placeholder="Enter your last name"
                      name="LastName"
                      value={values.LastName}
                      onChange={handleChange}
                      onBlur={(e) => {
                        analyticsService.fireEvent("leaveField", {
                          field: "lastName",
                          formName: "registration",
                        });
                        return handleBlur(e);
                      }}
                      error={
                        (touched.LastName && errors.LastName) || errors.Global
                      }
                    />
                  </div>
                  <Textfield
                    id="register-email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    name="Email"
                    value={values.Email}
                    readOnly={!!hasEmail}
                    onChange={handleChange}
                    onBlur={(e) => {
                      analyticsService.fireEvent("leaveField", {
                        field: "emailAddress",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={(touched.Email && errors.Email) || errors.Global}
                  />

                  <Textfield
                    id="register-phone"
                    className="mb-4"
                    label="Phone Number"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    name="Phone"
                    value={values.Phone}
                    onChange={handleChange}
                    onBlur={(e) => {
                      analyticsService.fireEvent("leaveField", {
                        field: "phoneNumber",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={(touched.Phone && errors.Phone) || errors.Global}
                  />

                  <Textfield
                    id="register-password"
                    type="password"
                    label="Create Password"
                    placeholder="Create a new password"
                    name="Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={(e) => {
                      analyticsService.fireEvent("leaveField", {
                        field: "password",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={
                      (touched.Password && errors.Password) || errors.Global
                    }
                    success={
                      touched.Password && !errors.Password && !errors.Global
                    }
                    focusBanner={
                      <div className="form-tip">
                        <p>Your password must: </p>
                        <ul className="list-basic">
                          <li>Be at least 8 characters long</li>
                          <li>
                            Include at least one uppercase and lowercase letter
                          </li>
                          <li>Include at least one number</li>
                          <li>
                            Include at least one non-alphanumeric character
                          </li>
                        </ul>
                      </div>
                    }
                    focusBannerVisible={Boolean(errors.Password)}
                  />
                  <div className="centered-flex-col">
                    <Button
                      className={analyticsService.clickClass(
                        "registration-submit"
                      )}
                      type="submit"
                      size="large"
                    >
                      <Box mx="3rem">Submit</Box>
                    </Button>
                  </div>
                  {clientId !== "AgentMobile" && (
                    <div className="centered-flex-col">
                      <p>Already have an account?</p>
                      {clientId === "ILSClient" ? (
                        <TextButton
                          href={LEADCENTER_LOGIN_URL}
                          className="text-sm link text-bold"
                        >
                          Login
                        </TextButton>
                      ) : (
                        <TextButton
                          onClick={login}
                          className="text-sm link text-bold"
                        >
                          Login
                        </TextButton>
                      )}
                    </div>
                  )}
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

export default RegistrationPage;
