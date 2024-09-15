import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const CustomDropDown = ({ text, className }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Dropdown.Button
      icon={<DownOutlined />}
      menu={{
        items,
      }}
      trigger={["click"]}
      className={classNames("", className)}
    >
      {text}
    </Dropdown.Button>
  );
};

export default CustomDropDown;
