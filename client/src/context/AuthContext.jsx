import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    console.log("Initial data from localStorage:", savedData);
    return savedData?.user || null; // Extract only the user object
  });

  const updateUser = (userData, token) => {
    console.log("Updating user to:", userData);
    const storedData = { token, user: userData };
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(storedData)); // Save token and user together
    localStorage.setItem("token", token); // Also store token separately for API requests
  };

  const logoutUser = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
