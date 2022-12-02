// Custom hook to use refresh token and add new access token to auth state

import useAuth from "./useAuth";
import axios from "../http-common";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("auth/refresh", {
      withCredentials: true,
    });
  
    setAuth((prev) => {
      return { ...prev, user:res.data.user, accessToken: res.data.token };
    });
    return res.data.token;
  };
  return refresh;
};

export default useRefreshToken;
