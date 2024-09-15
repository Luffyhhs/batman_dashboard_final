import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
const { TextArea } = Input;
const CustomInput = ({
  placeholder,
  className,
  type = "text",
  clearable = false,
  onChange,
  value,
  defaultValue,
  multiple = false,
  id = "",
  required = false,
  onKeyDown,
  style = {},
}) => {
  // console.log(style);
  if (type === "date") {
    return (
      <DatePicker
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        allowClear={clearable}
        placeholder={placeholder}
        className={className}
        format="DD/MM/YYYY"
        value={value}
        onChange={onChange}
      />
    );
  }
  if (type === "file") {
    return (
      <Input
        allowClear={clearable}
        placeholder={placeholder}
        className={className}
        type={type}
        id={id}
        multiple={multiple}
        onChange={(e) => onChange(e)}
      />
    );
  }
  if (type === "textarea") {
    return (
      <TextArea
        placeholder={placeholder}
        className={className}
        type={type}
        onChange={onChange}
        value={value}
        required={required}
        style={style}
      />
    );
  }
  return (
    <Input
      allowClear={clearable}
      placeholder={placeholder}
      className={className}
      type={type}
      onChange={onChange}
      value={value}
      required={required}
      onKeyDown={onKeyDown}
    />
  );
};

export default CustomInput;

// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Upload } from 'antd';
// const fileList = [
//   {
//     uid: '0',
//     name: 'xxx.png',
//     status: 'uploading',
//     percent: 33,
//   },
//   {
//     uid: '-1',
//     name: 'yyy.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-2',
//     name: 'zzz.png',
//     status: 'error',
//   },
// ];
// const App = () => (
//   <Upload
//     action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//     listType="picture"
//     defaultFileList={fileList}
//   >
//     <Button type="primary" icon={<UploadOutlined />}>
//       Upload
//     </Button>
//   </Upload>
// );
// export default App;
