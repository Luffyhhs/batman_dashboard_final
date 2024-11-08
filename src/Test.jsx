// import React from "react";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, theme } from "antd";
// const { Header, Content, Footer, Sider } = Layout;
// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));
// const Test = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout hasSider aria-haspopup>
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         onBreakpoint={(broken) => {
//           // console.log(broken);
//         }}
//         onCollapse={(collapsed, type) => {
//           // console.log(collapsed, type);
//         }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["4"]}
//           items={items}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: "24px 16px 0",
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             content
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: "center",
//           }}
//         >
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };
// export default Test;
// import React, { useState } from "react";
// import { Table } from "antd";
// import { Resizable } from "react-resizable";

// // import "./App.scss";

// const ResizableTitle = ({ onResize, width, ...restProps }) => {
//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       handle={
//         <span
//           className="react-resizable-handle"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         />
//       }
//       onResize={onResize}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// const Demo = () => {
//   const [columns, setColumns] = useState([
//     {
//       title: "Date",
//       dataIndex: "date",
//       width: 200,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       width: 100,
//       sorter: (a, b) => a.amount - b.amount,
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       width: 100,
//     },
//     {
//       title: "Note",
//       dataIndex: "note",
//       width: 100,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: () => <a>Delete</a>,
//     },
//   ]);

//   const data = [
//     {
//       key: 0,
//       date: "2018-02-11",
//       amount: 120,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 1,
//       date: "2018-03-11",
//       amount: 243,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 2,
//       date: "2018-04-11",
//       amount: 98,
//       type: "income",
//       note: "transfer",
//     },
//   ];

//   const handleResize =
//     (index) =>
//     (e, { size }) => {
//       setColumns((prevColumns) => {
//         const nextColumns = [...prevColumns];
//         nextColumns[index] = {
//           ...nextColumns[index],
//           width: size.width,
//         };
//         return nextColumns;
//       });
//     };

//   const resizedColumns = columns.map((col, index) => ({
//     ...col,
//     onHeaderCell: (column) => ({
//       width: column.width,
//       onResize: handleResize(index),
//     }),
//   }));

//   return (
//     <Table
//       bordered
//       columns={resizedColumns}
//       dataSource={data}
//       components={{
//         header: {
//           cell: ResizableTitle,
//         },
//       }}
//     />
//   );
// };

// export const App = () => (
//   <>
//     <Demo /> Example copy+pasted and made working from{" "}
//     <a href="https://github.com/ant-design/ant-design/blob/master/components/table/demo/resizable-column.md">
//       Ant Design GitHub
//     </a>
//   </>
// );

// export const carsColumns = (nav, setOpen, setCarId, setCarStatus) => {
//   return [
//     {
//       title: "No",
//       dataIndex: "id",
//       key: "id",
//       render: (text, record, index) => <a>{index + 1}</a>,
//     },
//     {
//       title: "Photo",
//       dataIndex: "photo",
//       key: "photo",
//       render: (text) => {
//         return <Avatar src={text} className="w-20 h-20" />;
//       },
//     },
//     {
//       title: "Branch",
//       dataIndex: "branch",
//       key: "branch",
//     },
//     {
//       title: "Car No",
//       dataIndex: "car_no",
//       key: "car_no",
//     },
//     {
//       title: "Model",
//       dataIndex: "model",
//       key: "model",
//     },
//     {
//       title: "Color",
//       dataIndex: "color",
//       key: "color",
//     },
//     {
//       title: "Fuel Type",
//       dataIndex: "fuel_type",
//       key: "fuel_type",
//     },
//     {
//       title: "License Expire",
//       dataIndex: "licenceexpiredate",
//       key: "licenceexpiredate",
//       render: (text) => dateFormatChange(text),
//       align: "right",
//     },
//     {
//       title: "Using",
//       dataIndex: "status",
//       key: "status",
//       render: (text, record) => {
//         // console.log(text);
//         return (
//           <Switch
//             defaultChecked={text == 1}
//             onChange={(e) => {
//               // console.log(e);
//               setCarStatus(e ? 1 : 0);
//               setCarId(record.id);
//             }}
//           />
//         );
//       },
//     },
//     {
//       title: "Actions",
//       key: "action",
//       render: (text, record) => {
//         const menu = (
//           <Menu>
//             <Menu.Item
//               key="view"
//               onClick={() => nav(`${record.id}`, { state: { ...record } })}
//             >
//               <FaEye /> View
//             </Menu.Item>
//             <Menu.Item
//               key="edit"
//               onClick={() => nav(`${record.id}/edit`, { state: { ...record } })}
//             >
//               <FaRegEdit /> Edit
//             </Menu.Item>
//             <Menu.Item
//               key="delete"
//               onClick={() => {
//                 setOpen(true);
//                 setCarId(record.id);
//               }}
//             >
//               <FaTrashCan /> Delete
//             </Menu.Item>
//           </Menu>
//         );
//         // console.log(record);
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <a
//               className="ant-dropdown-link flex items-center"
//               onClick={(e) => e.preventDefault()}
//             >
//               Actions{" "}
//               <span>
//                 <FaAngleDown />
//               </span>
//             </a>
//           </Dropdown>
//         );
//       },
//     },
//   ];
// };

// import CustomTable from "./components/Tables/Table";
// import Container from "./components/Container";
// import CustomInput from "./components/Inputs/CustomInput";
// import CustomButton from "./components/Buttons/CustomButton";
// import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
// import CustomSelect from "./components/Inputs/CustomSelect";
// import {
//   selectBranch,
//   selectFuelType,
//   selectStatus,
//   selectValidation,
// } from "./constants/SlelectData";
// import { carsColumns } from "./constants/TableColumn";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   changeCar,
//   deleteCar,
//   getCarsListPaginate,
//   selectCarList,
//   selectCarListLoading,
//   selectChangeCarStatus,
//   selectDeleteCarError,
//   selectDeleteCarLoading,
//   selectDeleteCarMsg,
//   selectDeleteCarSuccess,
//   selectTotalCars,
//   selectUpdateCarMsg,
//   selectUpdateCarSuccess,
// } from "./app/CarSlice/CarSlice";
// import { generateQueryString, photoUrlFix } from "./utilities/UtilFunctions";
// import { toast } from "react-toastify";
// import ModalCmp from "./components/Modal/ModalCmp";
// import Notification from "./components/Notification";
// import Loader from "./components/Loader/Loader";

// const Test = () => {
//   const nav = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     current: 1, // Current page number
//     total: 0, // Total number of records
//   });
//   const [open, setOpen] = useState(false);
//   const [carId, setCarId] = useState(null);
//   const [carStatus, setCarStatus] = useState(null);
//   const [searchInputs, setSearchInputs] = useState({
//     keyword: "",
//     check_valid: null,
//     branch: "",
//     status: "",
//   });
//   const [initialCallMade, setInitialCallMade] = useState(false);
//   const carList = useSelector(selectCarList);
//   const total = useSelector(selectTotalCars);
//   const carListLoading = useSelector(selectCarListLoading);
//   const updateCarSuccess = useSelector(selectUpdateCarSuccess);
//   const updateCarMsg = useSelector(selectUpdateCarMsg);
//   const deleteCarSuccess = useSelector(selectDeleteCarSuccess);
//   const deleteCarLoading = useSelector(selectDeleteCarLoading);
//   const deleteCarError = useSelector(selectDeleteCarError);
//   const deleteCarMsg = useSelector(selectDeleteCarMsg);
//   const changeCarStatusState = useSelector(selectChangeCarStatus);

//   const getCarList = () => {
//     const queryString = generateQueryString(searchInputs);
//     dispatch(
//       getCarsListPaginate({
//         api: `carlists?page=${pagination.current}${queryString}`,
//       })
//     );
//   };

//   const searchHandler = () => {
//     setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
//     setSearchInputs(searchParams);

//     const queryString = generateQueryString(searchParams);
//     nav(`${location.pathname}?${queryString}`, { replace: true });
//   };

//   const fixAttributes = [
//     { folder: "car/", attributes: ["photo"] },
//     { folder: "front_licence/", attributes: ["licence_front"] },
//     { folder: "back_licence/", attributes: ["licence_back"] },
//     { folder: "owner_book", attributes: ["owner_book"] },
//   ];
//   const finalCarList = photoUrlFix(carList, fixAttributes);

//   const handleTableChange = (pagination) => {
//     setPagination(pagination);
//   };

//   const handleInputKeyPress = (e) => {
//     if (e.key === "Enter") {
//       searchHandler();
//     }
//   };

//   const changeCarStatus = () => {
//     dispatch(
//       changeCar({
//         api: "updateStatus",
//         pData: { car_id: carId, status: carStatus },
//       })
//     );
//   };

//   const columns = carsColumns(nav, setOpen, setCarId, setCarStatus);

//   const getCarRowClassName = (record) => {
//     const licenseDate = new Date(record.licenceexpiredate);
//     const currentDate = new Date();
//     const oneMonthFromNow = new Date();
//     oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
//     if (licenseDate < currentDate) {
//       return "table-row-red";
//     } else if (licenseDate <= oneMonthFromNow) {
//       return "table-row-yellow";
//     } else {
//       return "table-row-default";
//     }
//   };

//   useEffect(() => {
//     deleteCarSuccess &&
//       toast.success(deleteCarMsg, {
//         position: "bottom-right",
//         autoClose: 5000,
//         closeOnClick: true,
//         theme: "light",
//       });
//     deleteCarError &&
//       toast.error(deleteCarMsg, {
//         position: "bottom-right",
//         autoClose: 5000,
//         closeOnClick: true,
//         theme: "light",
//       });
//   }, [deleteCarSuccess, deleteCarError]);

//   useEffect(() => {
//     updateCarSuccess &&
//       toast.success(updateCarMsg, {
//         position: "bottom-right",
//         autoClose: 5000,
//         closeOnClick: true,
//         theme: "light",
//       });
//   }, [updateCarSuccess]);

//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);
//     setSearchParams((prev) => ({ ...prev, ...params }));
//     setSearchInputs((prev) => ({ ...prev, ...params }));
//     setInitialCallMade(true);
//   }, [searchParams]);

//   useEffect(() => {
//     if (initialCallMade) {
//       getCarList();
//     }
//   }, [
//     pagination.current,
//     searchInputs,
//     deleteCarSuccess,
//     changeCarStatusState,
//     initialCallMade,
//   ]);

//   useEffect(() => {
//     setLoading(carListLoading);
//     setPagination({ ...pagination, total: total });
//   }, [carListLoading, total]);

//   useEffect(() => {
//     carStatus !== null && changeCarStatus();
//   }, [carStatus]);

//   useEffect(() => {
//     searchHandler();
//   }, [
//     searchParams.branch,
//     searchParams.status,
//     searchParams.check_valid,
//     searchParams.fuel_type,
//   ]);

//   return (
//     <Container>
//       <Loader spin={deleteCarLoading} />
//       <Notification />
//       <ModalCmp
//         title={"Delete"}
//         open={open}
//         text={"Are you sure to delete this Car?"}
//         onCancel={() => setOpen(false)}
//         onOk={() => {
//           setOpen(false);
//           dispatch(deleteCar({ api: `car_delete/${carId}` }));
//         }}
//       />
//       <h1 className="text-4xl py-4">Car List</h1>
//       <div className="row justify-between flex flex-wrap w-auto mb-4 sm:mb-2">
//         <div className="flex w-auto gap-10 mb-2 flex-wrap">
//           <CustomInput
//             placeholder={"2K-1234"}
//             className={"sm:w-[10rem] w-[80%]"}
//             value={searchParams.keyword}
//             onChange={(e) =>
//               setSearchParams((prev) => ({ ...prev, keyword: e.target.value }))
//             }
//             onKeyPress={handleInputKeyPress}
//           />
//           <CustomSelect
//             className={"sm:w-[12rem] w-[80%]"}
//             options={selectFuelType}
//             value={searchParams.fuel_type}
//             onChange={(value) =>
//               setSearchParams((prev) => ({ ...prev, fuel_type: value }))
//             }
//           />
//           <CustomSelect
//             className={"sm:w-[12rem] w-[80%]"}
//             options={selectValidation}
//             value={searchParams.check_valid}
//             onChange={(value) =>
//               setSearchParams((prev) => ({ ...prev, check_valid: value }))
//             }
//           />
//           <CustomSelect
//             value={searchParams.branch}
//             options={selectBranch}
//             className={"sm:w-[12rem] w-[80%]"}
//             onChange={(value) =>
//               setSearchParams((prev) => ({ ...prev, branch: value }))
//             }
//           />
//           <CustomSelect
//             value={searchParams.status}
//             options={selectStatus}
//             className={"sm:w-[10rem] w-[80%]"}
//             onChange={(value) =>
//               setSearchParams((prev) => ({ ...prev, status: value }))
//             }
//           />
//         </div>
//         <div className="w-auto">
//           <CustomButton
//             text={"Add New Car"}
//             icon={<FaPlus />}
//             className={"text-white bg-[#00a65a] "}
//             click={() => {
//               nav("create");
//             }}
//           />
//         </div>
//       </div>

//       <p>Total - {total}</p>
//       <CustomTable
//         columns={columns}
//         data={finalCarList}
//         rowClassName={getCarRowClassName}
//         scroll={{ x: "100vw" }}
//         pagination={pagination}
//         onChange={handleTableChange}
//         loading={loading}
//       />
//     </Container>
//   );
// };

// export default Test;
