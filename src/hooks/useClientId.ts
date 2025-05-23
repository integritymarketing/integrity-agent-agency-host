import Cookies from "universal-cookie";

const useClientId = (): string => {
  const cookies = new Cookies();
  const clientId = cookies.get("client_id");
  return clientId ?? "AEPortal";
};

export default useClientId;
