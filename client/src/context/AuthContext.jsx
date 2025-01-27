import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    console.log("Initial user from localStorage:", savedUser);
    return JSON.parse(savedUser) || null;
  });

  const updateUser = (data) => {
    console.log("Updating user to:", data);
    setCurrentUser(data);
  };

  useEffect(() => {
    console.log("Saving user to localStorage:", currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
