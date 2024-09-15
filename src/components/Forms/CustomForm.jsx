import { Button, DatePicker, Form, TimePicker } from "antd";
import CustomInput from "../Inputs/CustomInput";
import CustomSelect from "../Inputs/CustomSelect";
import ImgBox from "../Boxes/ImgBox";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // load on demand
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    lg: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    lg: {
      span: 16,
    },
  },
};
const CustomForm = ({
  data = [],
  initialValues = {},
  onFinish = () => {},
  text = "Save",
}) => {
  const nav = useNavigate();
  const normFile = (e, multiple) => {
    // console.log("Upload event:", e.target.files[0]);
    if (Array.isArray(e)) {
      return e;
    }
    // console.log(e.target.files);
    return multiple ? [...e.target.files] : e.target.files[0];
  };

  return (
    <Form
      {...formItemLayout}
      className="flex flex-col sm:flex-row flex-wrap w-[100%] mx-auto"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        // Convert initial date values to dayjs format to show in input
        ...Object.keys(initialValues).reduce((acc, key) => {
          const item = data.find((item) => item.name === key);
          if (item) {
            if (item.type === "date") {
              acc[key] = dayjs(initialValues[key], "DD-MM-YYYY");
            } else if (item.type === "time") {
              acc[key] = dayjs(initialValues[key], "HH:mm");
            }
          }
          return acc;
        }, {}),
      }}
    >
      {data.map((item, i) => {
        // console.log(
        //   item.name,
        //   initialValues.user_name,
        //   initialValues.loginId,
        //   initialValues.password
        // );
        return (
          <div
            key={i}
            className={`w-[90%] ${data.length > 4 ? "sm:w-[50%]" : ""}`}
          >
            <Form.Item
              label={item?.label}
              name={item?.name}
              rules={item?.rules}
              valuePropName={item.type === "file" ? "file" : "value"}
              getValueFromEvent={
                item.type === "file"
                  ? (e) => normFile(e, item.multiple)
                  : undefined
              }
              // labelAlign={``}
              // validateStatus=""
              // help="Should be combination of numbers & alphabets"
            >
              {item.type === "select" ? (
                <CustomSelect
                  options={item.options}
                  clearable={item?.clearable}
                  value={initialValues[item?.name]}
                  searchable={item?.searchable}
                />
              ) : item.type === "date" ? (
                <DatePicker
                  placeholder={item.placeholder}
                  className={item?.className}
                  format={item?.format ? item.format : "DD/MM/YYYY"}
                  showTime={
                    item?.showTime
                      ? { defaultValue: dayjs("00:00:00", "HH:mm:ss") }
                      : false
                  }
                  allowClear={item?.clearable}
                />
              ) : item.type === "time" ? (
                <TimePicker format={"HH:mm"} className={item.className} />
              ) : (
                <CustomInput
                  placeholder={item.placeholder}
                  className={item?.className}
                  type={item?.type}
                  clearable={item?.clearable}
                  multiple={item?.multiple}
                  value={
                    item.type !== "file" ? initialValues[item?.name] : undefined
                  }
                  style={item?.style}
                />
              )}

              {/* <Input placeholder="unavailable choice" id="error" /> */}
              {/* <CustomSelect options={selectBranch} /> */}
            </Form.Item>
            {item.type === "file" &&
              Object.keys(initialValues).length !== 0 && (
                <div className="text-center">
                  <ImgBox
                    width={100}
                    height={100}
                    img={initialValues[item.name]}
                  />
                </div>
              )}
          </div>
        );
      })}

      <div className="flex mt-4 w-full justify-center gap-5">
        {/* <CustomButton
          text={"Back"}
          className={"text-white bg-[#3c8dbc] w-[20rem]"}
          click={() => nav(-1)}
        /> */}
        <Button
          htmlType="submit"
          className={"text-white bg-[#867503] w-[20rem]"}
        >
          {text}
        </Button>
      </div>
    </Form>
  );
};
export default CustomForm;

{
  /* <Form.Item label="Error" hasFeedback validateStatus="error">
        <Select placeholder="I'm Select" allowClear>
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Validating"
        hasFeedback
        validateStatus="error"
        help="Something breaks the rule."
      >
        <Cascader
          placeholder="I'm Cascader"
          options={[
            {
              value: "xx",
              label: "xx",
            },
          ]}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Warning"
        hasFeedback
        validateStatus="warning"
        help="Need to be checked"
      >
        <TreeSelect
          placeholder="I'm TreeSelect"
          treeData={[
            {
              value: "xx",
              label: "xx",
            },
          ]}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="inline"
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          validateStatus="error"
          help="Please select right date"
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
        >
          <DatePicker />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            lineHeight: "32px",
            textAlign: "center",
          }}
        >
          -
        </span>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
        >
          <DatePicker />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <Input allowClear placeholder="with allowClear" />
      </Form.Item>

      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Input.Password placeholder="with input password" />
      </Form.Item>

      <Form.Item label="Error" hasFeedback validateStatus="error">
        <Input.Password
          allowClear
          placeholder="with input password and allowClear"
        />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <Input.OTP />
      </Form.Item>
      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <Input.OTP />
      </Form.Item>

      <Form.Item label="Error" hasFeedback validateStatus="error">
        <Input.OTP />
      </Form.Item>

      <Form.Item label="Fail" validateStatus="error" hasFeedback>
        <Mentions />
      </Form.Item>

      <Form.Item
        label="Fail"
        validateStatus="error"
        hasFeedback
        help="Should have something"
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>
       */
}
{
  /* <Form.Item
        label="Branch"
        name="branch"
        // validateStatus=""
        // help="Should be combination of numbers & alphabets"
      >
        {/* <Input placeholder="unavailable choice" id="error" /> */
}
// <CustomSelect options={selectBranch} />
// </Form.Item>

// <Form.Item
// label="Car No"
// name="car_no"
//  validateStatus="warning"
// >
{
  /* <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} /> */
}
// <CustomInput placeholder="Example:  2K-1234" />
// </Form.Item>

// <Form.Item
// label="Car Model"
// name="car_model"
// hasFeedback
// validateStatus="error"
// help="The information is being validated..."
// >
// <CustomInput placeholder={"Example:  Toyota Alphard"} />
// </Form.Item>

// <Form.Item
// label="Color"
// name="color"
//  hasFeedback validateStatus="success"
// >
// <CustomInput placeholder={"Example:  Black"} />
// </Form.Item>

// <Form.Item
// label="License Expire Date"
// name="license_expire_date"
//  hasFeedback validateStatus="warning"
// >
{
  /* <Input placeholder="Warning" id="warning2" /> */
}
// <CustomInput
// type="date"
// placeholder={"dd/mm/yyyy"}
// className={"w-full"}
// />
// </Form.Item>

// <Form.Item
// label="Remark"
// name="remark"
// hasFeedback
// validateStatus="error"
// help="Should be combination of numbers & alphabets"
// >
// <CustomInput placeholder={"Example: Car has a specific issue."} />
// </Form.Item>

// <Form.Item
// label="Photo"
// name="photo"
// hasFeedback
// validateStatus="success"
// >
// <CustomInput type="file" clearable={true} />
// </Form.Item>

// <Form.Item
// label="License Front"
// name="license_front"
//  hasFeedback validateStatus="warning"
// >
{
  /* <CustomInput type="file" clearable={true} /> */
}
{
  /* </Form.Item> */
}

// <Form.Item
// label="License Back"
// name="license_back"
//  hasFeedback validateStatus="error"
// >
{
  /* <CustomInput type="file" clearable={true} /> */
}
{
  /* </Form.Item> */
}
