import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const resp = await authService.getUser();
    if (resp.error) {
      setUser(null);
    } else {
      setUser(resp);
    }

    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.error) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (email, password) => {
    const response = await authService.register(email, password);
    if (response.error) {
      return response;
    }

    // auto login after register
    return login(email, password);
  };

  const logout = async () => {
    const response = await authService.logout();
    if (response.error) {
      return response;
    }
    await checkUser();
  };
};
