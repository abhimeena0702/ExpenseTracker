import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please Enter the password");
      return;
    }
    setError("");

    // Login Api Call
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.code === "ECONNABORTED") {
        setError(
          "Backend Server is Starting and can take some time.Please try again in a few seconds."
        );
      } else {
        setError("something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            isLoading={isLoading}
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            isLoading={isLoading}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            onClick={handleLogin}
          >
            {isLoading ? (
              <>
                <span className="mr-4">LOGGING IN</span>
                <span className="loading loading-spinner loading-sm border-purple-600"></span>
              </>
            ) : (
              "LOGIN"
            )}
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have a account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
