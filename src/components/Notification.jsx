import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return <ToastContainer transition={Bounce} />;
};

export default Notification;
