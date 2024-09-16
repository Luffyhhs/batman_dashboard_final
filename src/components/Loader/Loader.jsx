import { Spin } from "antd";
import React from "react";

const Loader = ({ spin = false, ...props }) => {
  return <Spin spinning={spin} fullscreen {...props} />;
};

export default Loader;
