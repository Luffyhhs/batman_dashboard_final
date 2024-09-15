import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { useNavigate } from "react-router-dom";

import {
  login,
  selectLoginError,
  selectLoginLoading,
  selectLoginStatus,
  selectUser,
} from "../app/UserSlice/UserSlice";
import Loader from "../components/Loader/Loader";
import Notification from "../components/Notification";
import { toast } from "react-toastify";
import CustomInput from "../components/Inputs/CustomInput";
const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector(selectUser);
  const loginMsg = useSelector((state) => state.user.loginMsg);
  const loginStatus = useSelector(selectLoginStatus);
  const loading = useSelector(selectLoginLoading);
  // console.log(error);
  const loginHandle = (e) => {
    e.preventDefault();
    const values = { name: email, password: password };

    dispatch(
      login({
        api: "user/dasAuth",
        userData: values,
      })
    );
  };
  useEffect(() => {
    loginStatus === "fail" &&
      toast.error(loginMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [loginStatus]);
  useEffect(() => {
    if (currentUser) nav("/");
  }, [currentUser]);
  return (
    <div className="login h-[100vh] w-full bg-gradient-to-br from-[#79090d] to-[#ffbc00]">
      <Loader spin={loading} fullscreen />
      <Notification />
      <div className=" box flex w-[70%] h-[80%] rounded-[5rem] overflow-hidden">
        <div className="left md:w-[50%]"></div>
        <div className="right w-full m-auto md:w-[50%] flex flex-col items-center">
          {/* <div className="logo w-[13rem] h-[13rem] mt-8 mx-auto">
            <img src="/imgs/logo.png" alt="logo" />
          </div> */}
          <h4 className="box-form--title mt-8">
            Sign in to start your session
          </h4>
          <form className="box-form mt-10 mx-auto" onSubmit={loginHandle}>
            <CustomInput
              placeholder={"Login Id (or) Email"}
              type="text"
              id="loginId"
              required={true}
              className={"w-[20rem] mx-auto rounded"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              placeholder={"Password"}
              type="password"
              id="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className={" w-[20rem] mx-auto rounded"}
            />
            <div className="box-form--btn flex flex-wrap xxs:gap-4">
              {/* <label htmlFor="remember">
                <input type="checkbox" name="remember" id="remember" />
                Remember Me
              </label> */}
              <button
                type="Submit"
                className="btn rounded-sm login-btn w-[6.5rem] mx-auto text-lg"
              >
                Login
              </button>
              {/* <CustomButton
      click={() => loginHandle()}
      text="submit"
      className="btn login-btn"
    /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
