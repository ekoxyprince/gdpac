import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(
    typeof window !== "undefined" && !!localStorage.getItem("gdpac_token")
  );

  const login = (token) => {
    if (typeof window !== "undefined" && token) {
      localStorage.setItem("gdpac_token", token);
    }
    setIsAuthed(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gdpac_token");
    }
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
