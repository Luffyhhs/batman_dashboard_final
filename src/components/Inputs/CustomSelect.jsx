import React from "react";
import { Select, Space } from "antd";
// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };
const CustomSelect = ({
  options = [],
  onChange,
  className,
  searchable = false,
  clearable = false,
  value,
  defaultValue = "",
}) => {
  const { Option } = Select;
  return (
    <Select
      allowClear={clearable}
      showSearch={searchable}
      defaultValue={defaultValue}
      value={value}
      optionFilterProp="children"
      onChange={onChange}
      className={className}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option, i) => (
        <Option key={i} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
