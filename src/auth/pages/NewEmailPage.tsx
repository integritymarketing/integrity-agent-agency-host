import React from "react";
import { Formik, FormikHelpers } from "formik";
import { ContainerUnAuthenticated } from "../UnAuthenticatedComponents/ContainerUnAuthenticated/ContainerUnAuthenticated";
import { FooterUnAuthenticated } from "../UnAuthenticatedComponents/FooterUnAuthenticated/FooterUnAuthenticated";
import { HeaderUnAuthenticated } from "../UnAuthenticatedComponents/HeaderUnAuthenticated/HeaderUnAuthenticated";

import Textfield from "@/components/Temp/textfield";

import useValidationService from "@/hooks/useValidationService";

interface NewEmailValues {
  email: string;
  emailRepeat: string;
}

const NewEmailPage: React.FC = () => {
  const validationService = useValidationService();
  return (
    <div className="content-frame v2">
      <HeaderUnAuthenticated />
      <ContainerUnAuthenticated>
        <h1 className="hdg hdg--2 mb-4">Update your email address</h1>
        <Formik
          initialValues={{ email: "", emailRepeat: "" }}
          validate={(values: NewEmailValues) => {
            return validationService.validateMultiple(
              [
                {
                  name: "email",
                  validator: validationService.composeValidator([
                    validationService.validateRequired,
                    validationService.validateEmail,
                  ]),
                },
                {
                  name: "emailRepeat",
                  validator: validationService.validateFieldMatch(values.email),
                  args: ["Email Addresses"],
                },
              ],
              values
            );
          }}
          onSubmit={(
            values: NewEmailValues,
            { setSubmitting }: FormikHelpers<NewEmailValues>
          ) => {
            setSubmitting(false);
            // You can add your submit logic here (e.g., API call)
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
              action="/email-updated"
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (Object.keys(errors).length === 0) {
                  handleSubmit(e);
                  // If you want to submit the form natively, consider using a ref or different approach
                  // Here, we just call Formik's handleSubmit
                }
              }}
              noValidate
            >
              <fieldset className="form__fields">
                <Textfield
                  id="new-email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email ? null : undefined}
                  readOnly={false}
                />
                <Textfield
                  id="new-email-repeat"
                  type="email"
                  label="Re-enter Email Address"
                  placeholder="Re-enter your email address"
                  name="emailRepeat"
                  value={values.emailRepeat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.emailRepeat && errors.emailRepeat ? null : undefined
                  }
                  readOnly={false}
                />
                <div className="form__submit">
                  <button className="btn-v2" type="submit">
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        </Formik>
      </ContainerUnAuthenticated>
      <FooterUnAuthenticated />
    </div>
  );
};

export default NewEmailPage;
