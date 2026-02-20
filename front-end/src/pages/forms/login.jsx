import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/ApiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // عند نجاح تسجيل الدخول
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email Is Required");
    if (password.trim() === "") return toast.error("Password Is Required");

    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />

      <h1 className="form-title">Login to Your Account</h1>

      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter Your Password"
          />
        </div>

        <button type="submit" className="form-btn">
          Login
        </button>
      </form>

      <div className="form-footer">
        Did You Forgot Your Password?{" "}
        <Link to="/forgot-password">Forgot password</Link>
      </div>
    </section>
  );
};

export default Login;
