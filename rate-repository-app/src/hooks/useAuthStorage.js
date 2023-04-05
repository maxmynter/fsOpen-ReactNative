import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

export const useAuthStorage = () => {
  const UseAuthStorageContext = useContext(AuthStorageContext);
  return UseAuthStorageContext;
};

export default AuthStorageContext;
