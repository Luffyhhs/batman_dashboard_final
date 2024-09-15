import { Button } from "antd";
import React from "react";

const CustomButton = ({
  htmlType = "button",
  text,
  icon,
  className,
  click = () => {},
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Button
      className={classNames("", className)}
      onClick={click}
      htmlType={htmlType}
    >
      {icon}
      {text}
    </Button>
  );
};

export default CustomButton;
