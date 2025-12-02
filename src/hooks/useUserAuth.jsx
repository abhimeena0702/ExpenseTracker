import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import  axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log("entered useUserAuth")
      return;
    }
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
           console.log("entered useUserAuth fetched data",response.data)
          updateUser(response.data);
        }
      } catch (error) {
        console.log("failed to fetch user info: ", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
  
};

export default useUserAuth;
