import * as Sentry from "@sentry/react";
import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link, Typography, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";

import useClientId from "@/hooks/useClientId";
import useQueryParams from "@/hooks/useQueryParams";
import useValidationService from "@/hooks/useValidationService";
import useAnalytics from "@/hooks/useAnalytics";

import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";

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
  Global?: string;
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
  const { fireEvent } = useAnalytics();
  const params = useQueryParams();
  const clientId = useClientId();
  const validation = useValidationService();

  // If you had loading or toast, re-enable here.
  // const loading = useLoading();
  // const showToast = useToast();

  const [hasNPN] = useState<string | null>(params.get("npn"));
  const [hasEmail] = useState<string | null>(params.get("email"));

  useEffect(() => {
    fireEvent("event-content-load", {
      pagePath: "/register/account-registration-form/",
    });
  }, [fireEvent]);

  const login = () => {
    try {
      window.location.href = `${import.meta.env.VITE_AUTH0_REDIRECT_URI}/login-redirect-sso`;
    } catch (e) {
      Sentry.captureException(e);
      // showMessage("Unable to sign in at this time.", { type: "error" });
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Integrity - Register Account</title>
      </Helmet> */}
      <div className="content-frame v2">
        <HeaderUnAuthenticated />
        <ContainerUnAuthenticated>
          <Typography variant="h5" color="blue" fontWeight="bold">
            Register your account
          </Typography>
          <Formik<RegistrationValues>
            initialValues={{
              FirstName: "",
              LastName: "",
              NPN: hasNPN || "",
              Phone: "",
              Email: hasEmail || "",
              Password: "",
            }}
            validate={(values) =>
              validation.validateMultiple(
                [
                  {
                    name: "NPN",
                    validator: hasNPN
                      ? validation.validateUsername
                      : () => null,
                    args: ["NPN Number"],
                  },
                  {
                    name: "FirstName",
                    validator: validation.validateName,
                    args: ["First Name"],
                  },
                  {
                    name: "LastName",
                    validator: validation.validateName,
                    args: ["Last Name"],
                  },
                  {
                    name: "Phone",
                    validator: validation.composeValidator([
                      validation.validateRequired,
                      validation.validatePhone,
                    ]),
                  },
                  {
                    name: "Email",
                    validator: validation.composeValidator([
                      validation.validateRequired,
                      validation.validateEmail,
                    ]),
                  },
                  {
                    name: "Password",
                    validator: validation.validatePasswordCreation,
                  },
                ],
                values
              )
            }
            onSubmit={async (
              values,
              { setErrors, setSubmitting }: FormikHelpers<RegistrationValues>
            ) => {
              setSubmitting(true);
              // loading?.begin(); // Uncomment if you use loading hook

              const formattedValues: RegistrationValues = {
                ...values,
                Phone: values.Phone ? values.Phone.replace(/\D/g, "") : "",
                ClientId: clientId,
              };

              try {
                const response = await registerUser(formattedValues);
                setSubmitting(false);
                // loading?.end(); // Uncomment if you use loading hook

                if (response.ok) {
                  fireEvent("event-form-submit", {
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
                    // showToast({
                    //   message: errMsg,
                    //   type: "error",
                    // });
                  }

                  fireEvent("event-form-submit-invalid", {
                    formName: "Register Account",
                  });

                  setErrors(validation.formikErrorsFor(updatedErrorsArr));
                }
              } catch (error) {
                setSubmitting(false);
                // loading?.end();
                Sentry.captureException(error);
                // showToast({
                //   message: "An unexpected error occurred. Please try again.",
                //   type: "error",
                // });
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
                    id="register-npn"
                    className="mb-4"
                    label="National Producer Number"
                    placeholder="Enter your NPN"
                    name="NPN"
                    value={values.NPN}
                    onChange={handleChange}
                    onBlur={(e) => {
                      fireEvent("leaveField", {
                        field: "npn",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={Boolean(
                      (touched.NPN && errors.NPN) || errors.Global
                    )}
                    helperText={
                      (touched.NPN && errors.NPN) || errors.Global || ""
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
                    disabled={Boolean(hasNPN)}
                  />

                  <div className="first-last-name">
                    <TextField
                      id="register-fname"
                      label="First Name"
                      placeholder="Enter your first name"
                      name="FirstName"
                      value={values.FirstName}
                      onChange={handleChange}
                      onBlur={(e) => {
                        fireEvent("leaveField", {
                          field: "firstName",
                          formName: "registration",
                        });
                        return handleBlur(e);
                      }}
                      error={Boolean(
                        (touched.FirstName && errors.FirstName) || errors.Global
                      )}
                      helperText={
                        (touched.FirstName && errors.FirstName) ||
                        errors.Global ||
                        ""
                      }
                    />
                  </div>

                  <div className="first-last-name">
                    <TextField
                      id="register-lname"
                      className="mb-4"
                      label="Last Name"
                      placeholder="Enter your last name"
                      name="LastName"
                      value={values.LastName}
                      onChange={handleChange}
                      onBlur={(e) => {
                        fireEvent("leaveField", {
                          field: "lastName",
                          formName: "registration",
                        });
                        return handleBlur(e);
                      }}
                      error={Boolean(
                        (touched.LastName && errors.LastName) || errors.Global
                      )}
                      helperText={
                        (touched.LastName && errors.LastName) ||
                        errors.Global ||
                        ""
                      }
                    />
                  </div>

                  <TextField
                    id="register-email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    name="Email"
                    value={values.Email}
                    InputProps={{
                      readOnly: Boolean(hasEmail),
                    }}
                    onChange={handleChange}
                    onBlur={(e) => {
                      fireEvent("leaveField", {
                        field: "emailAddress",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={Boolean(
                      (touched.Email && errors.Email) || errors.Global
                    )}
                    helperText={
                      (touched.Email && errors.Email) || errors.Global || ""
                    }
                  />

                  <TextField
                    id="register-phone"
                    className="mb-4"
                    label="Phone Number"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    name="Phone"
                    value={values.Phone}
                    onChange={handleChange}
                    onBlur={(e) => {
                      fireEvent("leaveField", {
                        field: "phoneNumber",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={Boolean(
                      (touched.Phone && errors.Phone) || errors.Global
                    )}
                    helperText={
                      (touched.Phone && errors.Phone) || errors.Global || ""
                    }
                  />

                  <TextField
                    id="register-password"
                    type="password"
                    label="Create Password"
                    placeholder="Create a new password"
                    name="Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={(e) => {
                      fireEvent("leaveField", {
                        field: "password",
                        formName: "registration",
                      });
                      return handleBlur(e);
                    }}
                    error={Boolean(
                      (touched.Password && errors.Password) || errors.Global
                    )}
                    helperText={
                      touched.Password && !errors.Password && !errors.Global
                        ? "Password looks good"
                        : (touched.Password && errors.Password) ||
                          errors.Global ||
                          ""
                    }
                    // Optional: show password requirements
                    FormHelperTextProps={{ component: "div" }}
                  />

                  <div className="centered-flex-col">
                    <Button
                      // className={analyticsService.clickClass("registration-submit")}
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
                        <Link
                          href={LEADCENTER_LOGIN_URL}
                          className="text-sm link text-bold"
                        >
                          Login
                        </Link>
                      ) : (
                        <Link
                          onClick={login}
                          className="text-sm link text-bold"
                        >
                          Login
                        </Link>
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
