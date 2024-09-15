import { Spin } from "antd";
import React from "react";

const Loader = ({ spin = false, fullscreen = false, ...props }) => {
  return <Spin spinning={spin} fullscreen={fullscreen} {...props} />;
};

export default Loader;
