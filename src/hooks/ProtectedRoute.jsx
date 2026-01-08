import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const ProtectedRoute = ({ children }) => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        updateUser(response.data.user);
      } catch (error) {
        console.error("Token verification failed", error);
        clearUser();
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [user, updateUser, clearUser]);

  if (loading) {
    // Show a spinner or blank screen while waiting for the API
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;  