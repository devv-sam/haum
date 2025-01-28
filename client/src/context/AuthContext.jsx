import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    console.log("Initial data from localStorage:", savedData);
    return savedData?.user || null;
  });

  const updateUser = (userData, token) => {
    const storedData = { user: userData, token }; // Store token too
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(storedData));
    localStorage.setItem("token", token); // Store token separately
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
