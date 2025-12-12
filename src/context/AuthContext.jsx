
import React, { createContext, useContext, useState, useEffect } from "react";

const EmailContext = createContext(null);

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem("email") || "";
  });

  // save only while session is alive
  useEffect(() => {
    if (email) {
      sessionStorage.setItem("email", email);
    }
  }, [email]);

  return (
    <EmailContext.Provider value={{ email, setEmail}}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error("useEmail must be used inside EmailProvider");
  return ctx;
}
