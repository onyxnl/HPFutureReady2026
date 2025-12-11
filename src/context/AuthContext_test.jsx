import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start (supports reload + new tab)
  useEffect(() => {
    api.get("/api/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email) => {
    await api.get("/sanctum/csrf-cookie");
    await api.post("/login", { email });

    // Get authenticated user
    const { data } = await api.get("/api/user");
    setUser(data);
  };

  

  return (
    <AuthContext.Provider value={{ user, login,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
