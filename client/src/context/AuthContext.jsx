import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Initialize currentUser from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update user and token
  const updateUser = (userData, token) => {
    console.log("Updating user to:", userData);

    // Store user data and token separately
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data
    localStorage.setItem("token", token);
  };

  // Logout user
  const logoutUser = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("token"); // Remove token
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
