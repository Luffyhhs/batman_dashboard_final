import { message } from "antd";
import { selectBranch, selectTopSetting } from "./SlelectData";
import { rule } from "postcss";
// import { message } from "antd";

export const adsInputs = [
  {
    label: "Ads Name",
    name: "name",
    type: "text",
    placeholder: "Enter Ads Name",
    rules: [{ required: true, message: "Please Enter Ads Name" }],
  },
  {
    label: "Image",
    name: "img",
    type: "file",
    rules: [{ required: true, message: "Please Choose an image" }],
  },
];
export const wheelInputs = [
  {
    label: "Wheel Image",
    name: "img",
    type: "file",
    rules: [{ required: true, message: "Please Choose an image for wheel" }],
  },
  {
    label: "Slices",
    name: "slices",
    type: "text",
    placeholder: "Slices",
    rules: [
      { required: true, message: "Please Enter Slices" },
      { pattern: /^[0-9]+$/, message: "Slices must be a number" },
    ],
  },
];

export const rewardInputs = [
  {
    label: "Reward Name",
    name: "name",
    type: "text",
    placeholder: "Reward Name",
    rules: [{ required: true, message: "Please Enter Reward Name" }],
  },
  {
    label: "Reward Quantity",
    name: "quantity",
    type: "text",
    placeholder: "Reward Quantity",
    rules: [
      { required: true, message: "Please Enter Reward Quantity" },
      {
        pattern: /^[0-9]+$/,
        message: "Quantity must be a number",
      },
    ],
  },
  {
    label: "Reward Value",
    name: "value",
    type: "text",
    placeholder: "Reward's Value",
    rules: [
      { required: true, message: "Please Enter Reward's Value" },
      {
        pattern: /^[0-9]+$/,
        message: "Value must be a number",
      },
    ],
  },
];

export const updateReward = [
  {
    label: "Reward Quantity",
    name: "quantity",
    type: "text",
    placeholder: "Reward Quantity",
    rules: [
      {
        pattern: /^[0-9]+$/,
        message: "Quantity must be a number",
      },
    ],
  },
  {
    label: "Reward Value",
    name: "value",
    type: "text",
    placeholder: "Reward's Value",
    rules: [
      {
        pattern: /^[0-9]+$/,
        message: "Value must be a number",
      },
    ],
  },
];
export const updateLuckyInputs = (agentSelectBox) => {
  return [
    {
      label: "Select Agent",
      name: "presetAgent",
      type: "select",
      // placeholder: "",
      options: agentSelectBox,
      rules: [{ required: true, message: "Please Select an agent to preset!" }],
    },
    {
      label: "Date Time",
      name: "outTime",
      type: "date",
      format: "DD/MM/YYYY HH:mm:ss",
      placeholder: "dd/mm/yyyy",
      showTime: true,
      rule: [{ required: true, message: "Please choose a Date." }],
    },
  ];
};

export const modifyMoreWinnerInputs = () => {
  return [
    {
      label: "Winner Name",
      name: "name",
      type: "text",
      rules: [{ required: true, message: "Please Enter Winner Name" }],
    },
    {
      label: "Prize Name",
      name: "prize",
      type: "text",
      rules: [{ required: true, message: "Please Enter Prize Name" }],
    },
  ];
};

export const top10Inputs = [
  {
    label: "Select Setting",
    name: "settingName",
    type: "select",
    options: selectTopSetting,
    rules: [{ required: true, message: "Please Select a Setting" }],
  },
  {
    label: "Winner Name",
    name: "name",
    type: "text",
    rules: [{ required: true, message: "Please Enter Winner Name" }],
  },
  {
    label: "Prize Name",
    name: "prize",
    type: "text",
    rules: [{ required: true, message: "Please Enter Prize Name" }],
  },
];

export const termInputs = [
  {
    label: "Term & Conditions",
    name: "text",
    type: "textarea",
    rules: [{ required: true, message: "Please Enter Term Name" }],
    style: {
      height: 200,
    },
  },
];

export const createUserInputs = [
  {
    label: "Name",
    name: "name",
    type: "text",
    rules: [{ required: true, message: "Please enter Name!" }],
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    rules: [{ required: true, message: "Please enter Password!" }],
  },
];

export const carNew = [
  {
    label: "Branch (Linn/mm-link)",
    name: "branch",
    type: "select",
    options: selectBranch,
    rules: [{ required: true, message: "Please Choose a Branch!" }],
  },
  {
    label: "ယာဉ်အမှတ်",
    name: "car_no",
    type: "text",
    placeholder: "Example:  2K/1234",
    rules: [
      { required: true, message: "ယာဉ်အမှတ်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" },
    ],
  },
  {
    label: "ယာဉ်အမျိုးအမည်",
    name: "type",
    type: "text",
    placeholder: "Example: SUZUKI ERTIGA",
    rules: [
      { required: true, message: "ယာဉ်အမျိုးအမည်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" },
    ],
  },
  {
    label: "ယာဉ်အမျိုးအစား",
    name: "model",
    type: "text",
    placeholder: "Example:  STATION WAGON(4*2)(L)",
    rules: [
      { required: true, message: "ယာဉ်အမျိုးအစားထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" },
    ],
  },
  {
    label: "စက်အမှတ်",
    name: "vehicle_no",
    type: "text",
    placeholder: "Example:  K15BT1091948",
    rules: [{ required: true, message: "စက်အမှတ်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" }],
  },
  {
    label: "ဘောင်အမှတ်",
    name: "frame_no",
    type: "text",
    placeholder: "Example:  MS1ANC22S00102627",
    rules: [
      { required: true, message: "ဘောင်အမှတ်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" },
    ],
  },
  {
    label: "ယာဉ်အလေးချိန်",
    name: "weight",
    type: "text",
    placeholder: "Example:  1000 Kg",
    rules: [
      { required: true, message: "ယာဉ်အလေးချိန်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" },
    ],
  },
  {
    label: "တင်အား",
    name: "car_load",
    type: "text",
    placeholder: "Example:  4P",
    rules: [{ required: true, message: "တင်အားထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" }],
  },
  {
    label: "ဆေးရောင်",
    name: "color",
    type: "text",
    placeholder: "Example:  Black",
    rules: [{ required: true, message: "ဆေးရောင်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။" }],
  },
  {
    label: "မှတ်ပုံတင်ထားသူအမည်",
    name: "owner_name",
    type: "text",
    placeholder: "Example:  U Aung Aung",
    rules: [
      {
        required: true,
        message: "မှတ်ပုံတင်ထားသူအမည်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "သက်တမ်းကုန်ဆုံးရက်",
    name: "licenceexpiredate",
    type: "date",
    placeholder: "dd/mm/yyyy",
    className: "w-full",
    rules: [
      {
        required: true,
        message: "လိုင်စင်သက်တမ်းကုန်ဆုံးရက်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "စက်အမျိုးအမည်",
    name: "vehicle_type",
    type: "text",
    placeholder: "Example: SUZUKI K15BT",
    rules: [
      {
        required: true,
        message: "စက်အမျိုးအမည်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ဂီယာအမျိုးအမည်",
    name: "gear_type",
    type: "text",
    placeholder: "Example: SUZUKI K15BT(AUTO)",
    rules: [
      {
        required: true,
        message: "ဂီယာအမျိုးအမည်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ဘောင်အမျိုးအမည်",
    name: "frame_type",
    type: "text",
    placeholder: "Example: SUZUKI ERTIGA APK",
    rules: [
      {
        required: true,
        message: "ဘောင်အမျိုးအမည်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ရှေ့ဝင်ရိုး",
    name: "front_axis",
    type: "text",
    placeholder: "Example: SUZUKI ERTIGA INDEP",
    rules: [
      {
        required: true,
        message: "ရှေ့ဝင်ရိုးထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "အလယ်ဝင်ရိုး",
    name: "middle_axis",
    type: "text",
    placeholder: "Example: SUZUKI ERTIGA INDEP",
  },
  {
    label: "နောက်ဝင်ရိုး",
    name: "back_axis",
    type: "text",
    placeholder: "Example: SUZUKI ERTIGA INDEP",
    rules: [
      {
        required: true,
        message: "နောက်ဝင်ရိုးထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ယာဉ်အလျား(မီလီမီတာ)",
    name: "vehicle_length",
    type: "text",
    placeholder: "Example: 1000",
    rules: [
      {
        required: true,
        message: "ယာဉ်အလျားထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ယာဉ်အနံ(မီလီမီတာ)",
    name: "vehicle_height",
    type: "text",
    placeholder: "Example: 1000",
    rules: [
      {
        required: true,
        message: "ယာဉ်အနံထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "ယာဉ်အမြင့်(မီလီမီတာ)",
    name: "vehicle_ground_clearance",
    type: "text",
    placeholder: "Example: 1000",
    rules: [
      {
        required: true,
        message: "ယာဉ်အမြင့်ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "Model Year",
    name: "model_year",
    type: "text",
    placeholder: "Example: 2012",
    rules: [
      {
        required: true,
        message: "Please Enter Model Year!",
      },
    ],
  },
  {
    label: "Engine Power",
    name: "engine_power",
    type: "text",
    placeholder: "Example: 1000 CC",
    rules: [
      {
        required: true,
        message: "Please Enter Engine Power!",
      },
    ],
  },
  {
    label: "Fuel Type",
    name: "fuel_type",
    type: "text",
    placeholder: "Example: Octane/Diesel",
    rules: [
      {
        required: true,
        message: "Please Enter Engine Power!",
      },
    ],
  },
  {
    label: "မှတ်ချက်",
    name: "remark",
    type: "text",
    placeholder: "Example: Car has a specific issue.",
  },
  {
    label: "ယာဉ်ပုံ",
    name: "photo",
    type: "file",
    clearable: true,
    rules: [
      {
        required: true,
        message: "ယာဉ်ပုံထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "လိုင်စင်အရှေ့(ပုံ)",
    name: "licence_front",
    type: "file",
    clearable: true,
    rules: [
      {
        required: true,
        message: "လိုင်စင်အရှေ့(ပုံ)ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "လိုင်စင်အနောက်(ပုံ)",
    name: "licence_back",
    type: "file",
    clearable: true,
    rules: [
      {
        required: true,
        message: "လိုင်စင်အနောက်(ပုံ)ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
  {
    label: "Owner Book",
    name: "owner_book",
    type: "file",
    clearable: true,
    rules: [
      {
        required: true,
        message: "Owner Book(ပုံ)ထည့်သွင်းပေးရန်လိုအပ်ပါသည်။",
      },
    ],
  },
];

export const driverInputs = [
  {
    label: "Driver Name",
    name: "dname",
    type: "text",
    placeholder: "Aung Aung",
    rules: [{ required: true, message: "Please enter driver name" }],
  },
  {
    label: "Phone",
    name: "phone",
    type: "number",
    placeholder: "09123456789",
    rules: [{ required: true, message: "Please enter phone number" }],
  },
  {
    label: "NRC",
    name: "nrc",
    type: "text",
    placeholder: "9/ZaBaTha(N)111111",
    rules: [{ required: true, message: "Please enter nrc" }],
  },
  {
    label: "License No",
    name: "licenceNo",
    type: "text",
    placeholder: "B/11111/11",
    rules: [{ required: true, message: "Please enter license No" }],
  },
  {
    label: "License Expire Date",
    name: "licenceexpiredate",
    type: "date",
    placeholder: "dd/mm/yyyy",
    className: "w-full",
    rules: [{ required: true, message: "Please enter license expire date" }],
  },
  {
    label: "Date Of Birth",
    name: "dob",
    type: "date",
    placeholder: "dd/mm/yyyy",
    className: "w-full",
    rules: [{ required: true, message: "Please enter Date Of Birth" }],
  },
  {
    label: "Address",
    name: "address",
    type: "textarea",
    placeholder: "Pyinmana",
    rules: [{ required: true, message: "Please enter Address" }],
  },
  {
    label: "Driver Photo",
    name: "dphoto",
    type: "file",
  },
  // {
  //   label: "Login Id",
  //   name: "loginId",
  //   type: "text",
  //   placeholder: "Unique Id",
  //   rules: [{ required: true, message: "Please enter to create a login id" }],
  // },
  {
    label: "Password",
    name: "password",
    type: "text",
    placeholder: "Password",
    rules: [{ required: true, message: "Please enter password" }],
  },
];
export const driverUpdateInputs = [
  {
    label: "Driver Name",
    name: "dname",
    type: "text",
    placeholder: "Aung Aung",
    rules: [{ required: true, message: "Please enter driver name" }],
  },
  {
    label: "Phone",
    name: "phone",
    type: "number",
    placeholder: "09123456789",
    rules: [{ required: true, message: "Please enter phone number" }],
  },
  {
    label: "NRC",
    name: "nrc",
    type: "text",
    placeholder: "9/ZaBaTha(N)111111",
    rules: [{ required: true, message: "Please enter nrc" }],
  },
  {
    label: "License No",
    name: "licenceNo",
    type: "text",
    placeholder: "B/11111/11",
    rules: [{ required: true, message: "Please enter license No" }],
  },
  {
    label: "License Expire Date",
    name: "licenceexpiredate",
    type: "date",
    placeholder: "dd/mm/yyyy",
    className: "w-full",
    rules: [{ required: true, message: "Please enter license expire date" }],
  },
  {
    label: "Date Of Birth",
    name: "dob",
    type: "date",
    placeholder: "dd/mm/yyyy",
    className: "w-full",
    rules: [{ required: true, message: "Please enter Date Of Birth" }],
  },
  {
    label: "Address",
    name: "address",
    type: "textarea",
    placeholder: "Pyinmana",
    rules: [{ required: true, message: "Please enter Address" }],
  },
  {
    label: "Driver Photo",
    name: "dphoto",
    type: "file",
  },
  // {
  //   label: "Login Id",
  //   name: "loginId",
  //   type: "text",
  //   placeholder: "Unique Id",
  //   rules: [{ required: true, message: "Please enter to create a login id" }],
  // },
  {
    label: "Password",
    name: "password",
    type: "text",
    placeholder: "Password",
    // rules: [{ required: true, message: "Please enter password" }],
  },
];

export const drivingWayInputs = (driversSelectBox, carsSelectBox) => {
  return [
    {
      label: "Select Car",
      type: "select",
      name: "car_id",
      options: carsSelectBox,
      searchable: true,
    },
    {
      label: "Driver Name",
      type: "select",
      name: "driver_id",
      options: driversSelectBox,
      searchable: true,
    },
    {
      label: "Usage Name",
      type: "text",
      name: "usageName",
      placeholder: "Aung Aung",
    },
    {
      label: "Start Place",
      type: "text",
      name: "start_place",
      placeholder: "HO",
    },
    {
      label: "Reason",
      type: "text",
      name: "reason",
      placeholder: "Some Reason",
    },
    {
      label: "End Place",
      type: "text",
      name: "end_place",
      placeholder: "Linn 2",
    },
    {
      label: "Start Kilo",
      type: "text",
      name: "start_kilo",
      placeholder: "100",
    },

    {
      label: "End Kilo",
      type: "text",
      name: "end_kilo",
      placeholder: "200",
    },

    {
      label: "Start Time",
      type: "time",
      name: "start_time",
      placeholder: "10:00",
    },
    {
      label: "End Time",
      type: "time",
      name: "end_time",
      placeholder: "11:00",
    },

    {
      label: "Start Kilo Photo:",
      type: "file",
      name: "startKilo_photo",
    },
    {
      label: "End Kilo Photo",
      type: "file",
      name: "endKilo_photo",
    },
    {
      label: "Route",
      type: "text",
      name: "route",
      placeholder: "Linn 1 - Linn 2 - HO",
    },
  ];
};

export const fuelInputs = (driversSelectBox, carsSelectBox) => {
  return [
    {
      label: "Select Car",
      type: "select",
      name: "car_no",
      options: carsSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Car No." }],
    },
    {
      label: "Driver Name:",
      type: "select",
      name: "driver_name",
      options: driversSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Driver Name" }],
    },
    {
      label: "Kilo",
      type: "text",
      name: "kilo",
      placeholder: "100",
      rules: [{ required: true, message: "Please enter Kilo" }],
    },
    {
      label: "Liters",
      type: "text",
      name: "liters",
      placeholder: "20",
      rules: [{ required: true, message: "Please enter Liters" }],
    },
    {
      label: "Price",
      type: "text",
      name: "price",
      placeholder: "Example: 20000",
      rules: [{ required: true, message: "Please enter Price" }],
    },
    {
      label: "Photo",
      type: "file",
      name: "photo",
      rules: [{ required: true, message: "Please select Photo" }],
    },
  ];
};

export const maintenanceInputs = (driversSelectBox, carsSelectBox) => {
  return [
    {
      label: "Select car",
      type: "select",
      name: "car_no",
      options: carsSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Car No." }],
    },
    {
      label: "Driver Name:",
      type: "select",
      name: "driver_name",
      options: driversSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Driver Name" }],
    },
    {
      label: "Amount",
      type: "text",
      name: "amount",
      placeholder: "10000",
      rules: [{ required: true, message: "Please enter Amount" }],
    },
    {
      label: "Reason",
      type: "text",
      name: "reason",
      placeholder: "Engine Oil",
      rules: [{ required: true, message: "Please enter Reason" }],
    },
    {
      label: "Date",
      type: "date",
      name: "created_at",
      placeholder: "dd/mm/yyyy",
      className: "w-full",
      rules: [{ required: true, message: "Please enter Date" }],
    },
    {
      label: "Voucher Photo",
      type: "file",
      name: "v_photo",
      multiple: true,
      rules: [{ required: true, message: "Please select Voucher Photo" }],
    },
  ];
};
export const maintenanceEditInputs = (driversSelectBox, carsSelectBox) => {
  return [
    {
      label: "Select car",
      type: "select",
      name: "car_no",
      options: carsSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Car No." }],
    },
    {
      label: "Driver Name:",
      type: "select",
      name: "driver_name",
      options: driversSelectBox,
      searchable: true,
      rules: [{ required: true, message: "Please select Driver Name" }],
    },
    {
      label: "Amount",
      type: "text",
      name: "amount",
      placeholder: "10000",
      rules: [{ required: true, message: "Please enter Amount" }],
    },
    {
      label: "Reason",
      type: "text",
      name: "reason",
      placeholder: "Engine Oil",
      rules: [{ required: true, message: "Please enter Reason" }],
    },
    {
      label: "Date",
      type: "date",
      name: "created_at",
      placeholder: "dd/mm/yyyy",
      className: "w-full",
      rules: [{ required: true, message: "Please enter Date" }],
    },
    {
      label: "Voucher Photo",
      type: "file",
      name: "v_photo",
      multiple: true,
    },
  ];
};

export const userInputs = [
  {
    label: "Name",
    type: "text",
    name: "user_name",
    placeholder: "Aung Aung",
    rules: [{ required: true, message: "Please enter Name!" }],
  },
  {
    label: "Login ID",
    type: "text",
    name: "loginId",
    placeholder: "Enter Unique Login Id",
    rules: [{ required: true, message: "Please enter Login Id!" }],
  },
  {
    label: "Password",
    type: "text",
    name: "password",
    placeholder: "Password",
    rules: [{ required: true, message: "Please enter password!" }],
  },
];

export const userUpdateInputs = [
  {
    label: "Name",
    type: "text",
    name: "user_name",
    placeholder: "Aung Aung",
    rules: [{ required: true, message: "Please enter Name!" }],
  },
  {
    label: "Login ID",
    type: "text",
    name: "loginId",
    placeholder: "Enter Unique Login Id",
    rules: [{ required: true, message: "Please enter Login Id!" }],
  },
  {
    label: "Password",
    type: "text",
    name: "password",
    placeholder: "Password",
  },
];
