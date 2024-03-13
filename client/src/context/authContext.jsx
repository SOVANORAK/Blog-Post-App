import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {

  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(response.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout");
    setCurrentUser(null);
  };

  //Store user information on localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]); //useEffect re-render when currentUser change

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
