import { useEffect } from "react";
import BaseConfirmationPage from "./BaseConfirmationPage";
import useQueryParams from "@/hooks/useQueryParams";
import useFetch from "@/hooks/useFetch";

const ServerErrorPage: React.FC = () => {
  const { Put } = useFetch(`${import.meta.env.VITE_AUTH_AUTHORITY_URL}/error`);
  const params = useQueryParams();

  useEffect(() => {
    const fetchError = async () => {
      try {
        const errorId = params.get("errorId");
        if (!errorId) {
          console.warn("No errorId found in URL parameters.");
          return;
        }

        const response = await Put({
          body: {}, // Required due to hook's type
          param: errorId,
          returnHttpResponse: true,
        });

        if (response && typeof (response as Response).text === "function") {
          const errorText = await (response as Response).text();
          throw new Error(errorText);
        } else {
          throw new Error("Unexpected response type");
        }
      } catch (error) {
        console.error("Server error fetch failed:", error);
      }
    };

    fetchError();
  }, [Put, params]);

  return (
    <BaseConfirmationPage
      title="We’re sorry"
      body="An internal server error occurred. We are looking into the problem, please try again later."
      button=""
    />
  );
};

export default ServerErrorPage;
