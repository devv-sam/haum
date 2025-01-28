import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    console.log("Initial data from localStorage:", savedData);
    return savedData || null; // Ensure it's just the user object
  });

  const updateUser = (userData, token) => {
    console.log("Updating user:", userData);
    setCurrentUser(userData);

    localStorage.setItem("user", JSON.stringify(userData)); // Save only user details
    localStorage.setItem("token", token); // Save token separately
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
